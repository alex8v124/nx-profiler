'use client';

import { Canvas } from '@react-three/fiber';
import { Stars, Float, Sphere, MeshDistortMaterial } from '@react-three/drei';

function AnimatedSphere() {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere args={[1.5, 64, 64]} position={[0, 0, -2]}>
        <MeshDistortMaterial
          color="#3b82f6"
          attach="material"
          distort={0.4}
          speed={1.5}
          roughness={0.2}
          metalness={0.8}
          wireframe={true}
        />
      </Sphere>
    </Float>
  );
}

function AnimatedSphere2() {
  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.5}>
      <Sphere args={[1, 32, 32]} position={[3, 2, -5]}>
        <MeshDistortMaterial
          color="#8b5cf6"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.3}
          metalness={0.5}
          wireframe={true}
        />
      </Sphere>
    </Float>
  );
}

function AnimatedSphere3() {
  return (
    <Float speed={2.5} rotationIntensity={1.2} floatIntensity={2.5}>
      <Sphere args={[0.8, 32, 32]} position={[-4, -1, -4]}>
        <MeshDistortMaterial
          color="#06b6d4"
          attach="material"
          distort={0.5}
          speed={1}
          roughness={0.1}
          metalness={0.9}
          wireframe={true}
        />
      </Sphere>
    </Float>
  );
}

export default function Background3D() {
  return (
    <div className="absolute inset-0 z-0 bg-background overflow-hidden pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={1} fade speed={1.5} />
        <AnimatedSphere />
        <AnimatedSphere2 />
        <AnimatedSphere3 />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background z-10" />
    </div>
  );
}
