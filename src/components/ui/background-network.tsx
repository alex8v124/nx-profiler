'use client';

import React, { useRef, useEffect } from 'react';

export default function BackgroundNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let frameCount = 0;
    let cx = window.innerWidth / 2;
    let cy = window.innerHeight / 2;
    let mouseX = cx;
    let mouseY = cy;

    const focalLength = 600;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cx = canvas.width / 2;
      cy = canvas.height / 2;
    };
    window.addEventListener('resize', resize);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Colores de marca Nodux
    const BLUE = { r: 37, g: 99, b: 235 };   // #2563EB
    const GREEN = { r: 16, g: 185, b: 129 };  // #10B981
    const SLATE = { r: 148, g: 163, b: 184 };  // Slate claro para nodos

    class Particle {
      x: number; y: number; z: number;
      vx: number; vy: number; vz: number;
      baseSpeed: number;
      phase: number; // Para movimiento ondulatorio asimétrico

      constructor() {
        this.x = (Math.random() - 0.5) * 8000;
        this.y = (Math.random() - 0.5) * 5000;
        this.z = (Math.random() - 0.5) * 4000;
        this.baseSpeed = 0.3 + Math.random() * 0.8;
        this.vx = (Math.random() - 0.5) * this.baseSpeed;
        this.vy = (Math.random() - 0.5) * this.baseSpeed;
        this.vz = (Math.random() - 0.5) * this.baseSpeed;
        this.phase = Math.random() * Math.PI * 2;
      }

      update(time: number) {
        // Movimiento orgánico ondulatorio (respiración asimétrica)
        this.x += this.vx + Math.sin(time * 0.3 + this.phase) * 0.15;
        this.y += this.vy + Math.cos(time * 0.25 + this.phase * 1.3) * 0.12;
        this.z += this.vz + Math.sin(time * 0.2 + this.phase * 0.7) * 0.1;

        const lx = 4000, ly = 2500, lz = 2000;
        if (this.x > lx || this.x < -lx) this.vx *= -1;
        if (this.y > ly || this.y < -ly) this.vy *= -1;
        if (this.z > lz || this.z < -lz) this.vz *= -1;
      }
    }

    const particles: Particle[] = [];
    const num = Math.min(Math.floor((canvas.width * canvas.height) / 2500), 800);
    for (let i = 0; i < num; i++) particles.push(new Particle());

    interface Pulse {
      sx: number; sy: number; ex: number; ey: number;
      progress: number; speed: number;
      r: number; g: number; b: number;
    }
    let pulses: Pulse[] = [];

    const animate = () => {
      // Estela sutil en lugar de clear total — da un efecto de movimiento más suave
      ctx.fillStyle = 'rgba(15, 23, 42, 0.15)'; // #0F172A con opacidad
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      frameCount++;
      const time = frameCount / 60;

      // --- CÁMARA ---
      let camZ = 0;
      let rotY = 0;
      let rotX = 0;

      const introDuration = 5.0;

      if (time < introDuration) {
        const t = time / introDuration;
        // Curva ease-out-quint para una desaceleración ultra suave
        const ease = 1 - Math.pow(1 - t, 5);
        camZ = -4000 + (4000 * ease);
        // Giro panorámico de 220° durante la entrada
        rotY = (1 - ease) * Math.PI * 1.2;
        rotX = Math.sin(t * Math.PI) * 0.4;
      } else {
        camZ = 0;
        // Interactividad con el mouse: la cámara se inclina según el cursor
        const targetRotY = (time - introDuration) * 0.04 + ((mouseX - cx) / cx) * 0.15;
        const targetRotX = Math.sin((time - introDuration) * 0.15) * 0.08 + ((mouseY - cy) / cy) * 0.1;
        rotY = targetRotY;
        rotX = targetRotX;
      }

      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);

      interface Projected {
        p: Particle; px: number; py: number;
        scale: number; z: number; visible: boolean;
        x3d: number; y3d: number; z3d: number;
      }

      const projected: Projected[] = [];

      for (const p of particles) {
        p.update(time);

        let x = p.x * cosY - p.z * sinY;
        let z = p.z * cosY + p.x * sinY;
        let y = p.y * cosX - z * sinX;
        z = z * cosX + p.y * sinX;
        z += camZ;

        const depth = focalLength + z + 2000;
        if (depth > 50) {
          const scale = focalLength / depth;
          const px = cx + x * scale;
          const py = cy + y * scale;
          projected.push({ p, px, py, scale, z, visible: true, x3d: x, y3d: y, z3d: z });
        }
      }

      // Ordenar por profundidad (de más lejano a más cercano)
      projected.sort((a, b) => a.z - b.z);

      // --- CONEXIONES ---
      const maxDist3D = 700;
      const screenConns: { ax: number; ay: number; bx: number; by: number; opacity: number }[] = [];

      for (let i = 0; i < projected.length; i++) {
        const pA = projected[i];
        for (let j = i + 1; j < projected.length; j++) {
          const pB = projected[j];
          const dx = pA.x3d - pB.x3d;
          const dy = pA.y3d - pB.y3d;
          const dz = pA.z3d - pB.z3d;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < maxDist3D) {
            const avgScale = (pA.scale + pB.scale) / 2;
            const opacity = Math.min(1, (1 - dist / maxDist3D) * avgScale * 2.5);

            if (opacity > 0.02) {
              // Líneas azul eléctrico de marca
              ctx.beginPath();
              ctx.strokeStyle = `rgba(${BLUE.r}, ${BLUE.g}, ${BLUE.b}, ${opacity * 0.6})`;
              ctx.lineWidth = Math.max(0.3, 1.2 * avgScale);
              ctx.moveTo(pA.px, pA.py);
              ctx.lineTo(pB.px, pB.py);
              ctx.stroke();

              screenConns.push({ ax: pA.px, ay: pA.py, bx: pB.px, by: pB.py, opacity });
            }
          }
        }
      }

      // --- NODOS ---
      for (const proj of projected) {
        if (proj.scale > 0) {
          const r = Math.max(0.8, 2.5 * proj.scale);
          const alpha = Math.min(1, proj.scale * 2.5);

          // Glow sutil detrás del nodo
          ctx.beginPath();
          ctx.arc(proj.px, proj.py, r * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${BLUE.r}, ${BLUE.g}, ${BLUE.b}, ${alpha * 0.08})`;
          ctx.fill();

          // Nodo principal
          ctx.beginPath();
          ctx.arc(proj.px, proj.py, r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${SLATE.r}, ${SLATE.g}, ${SLATE.b}, ${alpha})`;
          ctx.fill();
        }
      }

      // --- PULSOS DE DATOS ---
      if (time > 3.5 && screenConns.length > 0) {
        for (let k = 0; k < 2; k++) {
          if (Math.random() < 0.2) {
            const conn = screenConns[Math.floor(Math.random() * screenConns.length)];
            const useGreen = Math.random() > 0.6;
            const col = useGreen ? GREEN : BLUE;
            pulses.push({
              sx: conn.ax, sy: conn.ay,
              ex: conn.bx, ey: conn.by,
              progress: 0,
              speed: 0.02 + Math.random() * 0.025,
              r: col.r, g: col.g, b: col.b
            });
          }
        }
      }

      // Limitar la cola de pulsos para no sobrecargar
      if (pulses.length > 80) pulses.splice(0, pulses.length - 80);

      for (let i = pulses.length - 1; i >= 0; i--) {
        const pls = pulses[i];
        pls.progress += pls.speed;
        if (pls.progress >= 1) { pulses.splice(i, 1); continue; }

        const currX = pls.sx + (pls.ex - pls.sx) * pls.progress;
        const currY = pls.sy + (pls.ey - pls.sy) * pls.progress;
        // Brillo del pulso: crece y se desvanece
        const pulseAlpha = Math.sin(pls.progress * Math.PI);

        ctx.beginPath();
        ctx.arc(currX, currY, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${pls.r}, ${pls.g}, ${pls.b}, ${pulseAlpha})`;
        ctx.shadowColor = `rgba(${pls.r}, ${pls.g}, ${pls.b}, ${pulseAlpha})`;
        ctx.shadowBlur = 18;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" style={{ backgroundColor: '#0F172A' }}>
      <canvas ref={canvasRef} className="block w-full h-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0F172A]/40 to-[#0F172A] z-10" />
    </div>
  );
}
