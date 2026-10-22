import { NextRequest, NextResponse } from 'next/server';

const NODUX_SYSTEM_INSTRUCTION = `Eres "Nodux AI", el asistente inteligente y consultor virtual oficial de Nodux.
Tu objetivo es orientar a potenciales clientes, socios y visitantes sobre los servicios, capacidades, equipo y proyectos de Nodux.

INFORMACIÓN SOBRE NODUX:
- Lema: "Soluciones que se adaptan a ti, tecnología que transforma."
- Propósito: Nodux combina consultoría de operaciones industriales, ingeniería de datos y automatización para transformar la gestión de inventarios y procesos en pequeñas y medianas empresas (pymes).
- Qué problemas resolvemos: Entramos a la operación del cliente para ordenar inventarios, balancear flujos de trabajo, estandarizar datos maestros y reemplazar registros manuales o dispersos por herramientas digitales ligeras y tableros analíticos en tiempo real. Eliminamos fugas de dinero por mermas y quiebres de stock.
- Servicios principales:
  1. Consultoría de Operaciones y Procesos (diagnóstico en planta Gemba Walk, estudio de tiempos y métodos, modelado BPMN).
  2. Ingeniería de Datos y BI (estandarización de bases de datos maestras, pipelines ETL, tableros de control ejecutivos en Power BI).
  3. Desarrollo de Software y Automatizaciones a Medida (plataformas web, comercio electrónico, integración de APIs y flujos low-code).

EQUIPO FUNDADOR Y ESPECIALISTAS:
- Nicolás López Olivas: Chief Executive Officer (CEO) & Tech Founder. Lidera la dirección estratégica, discovery comercial B2B e ingeniería de requerimientos.
- Juan Alexander Miranda Quispe: Chief Technology Officer (CTO) & Lead Full-Stack Architect. Diseña la arquitectura de software, infraestructura cloud y automatizaciones.
- Walter J. Sánchez P.: Head of Data Engineering & Business Intelligence. Experto en pipelines ETL, normalización de datos y tableros en Power BI.
- Jesús Roberto Regalado Avendaño: Chief Operating Officer (COO) & Lead de Procesos Industriales. Especialista en diagnóstico operativo en planta, balance de líneas y BPMN.
- Luis Eduardo Piscoya Poma: Software Developer & Data Operations. Experto en SQL, desarrollo frontend y normalización masiva de inventarios.

PORTAFOLIO DE PROYECTOS DESTACADOS:
1. Plataforma E-Commerce Nodux: Solución integral de comercio electrónico con gestión de inventarios, carrito optimizado y pasarelas de pago (Angular, TypeScript, Tailwind CSS, RxJS).
2. Nodux Educa - EdTech: Plataforma educativa interactiva (LMS) para gestión de cursos, alumnos y métricas en tiempo real (Next.js, React, TypeScript).
3. Web Corporativa Institucional: Portal web de alta conversión para empresas B2B, optimizado para captación de leads cualificados.

CANALES DE CONTACTO OFICIALES:
- WhatsApp Directo: +51 919 620 888 (Link directo: https://wa.me/51919620888)
- LinkedIn Oficial: https://www.linkedin.com/company/nodux-b2b

INSTRUCCIONES DE COMPORTAMIENTO:
- Responde siempre de manera concisa, amable, profesional y tecnológica en español.
- Si el usuario pregunta por precios, cotizaciones o desea una reunión, dale un resumen de cómo trabaja Nodux e invítalo a contactar al equipo por WhatsApp (+51 919 620 888) para una sesión de diagnóstico.
- Puedes utilizar formato Markdown (negritas, viñetas cortas) para que las respuestas sean fáciles de leer.
- No inventes información que no corresponda a Nodux.`;

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    const { messages }: { messages: ChatMessage[] } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'No se recibieron mensajes válidos' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY?.trim();

    // Prepare contents for Gemini API format
    const contents = messages
      .filter((m) => m.role === 'user' || m.role === 'assistant')
      .map((m) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      }));

    if (apiKey) {
      // Try calling Gemini API with fallback models
      const models = ['gemini-2.5-flash', 'gemini-1.5-flash', 'gemini-2.0-flash'];

      for (const model of models) {
        try {
          const res = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'x-goog-api-key': apiKey,
              },
              body: JSON.stringify({
                system_instruction: {
                  parts: [{ text: NODUX_SYSTEM_INSTRUCTION }],
                },
                contents,
                generationConfig: {
                  temperature: 0.7,
                  maxOutputTokens: 800,
                },
              }),
            }
          );

          if (res.ok) {
            const data = await res.json();
            const reply =
              data.candidates?.[0]?.content?.parts?.[0]?.text ||
              'Hola, en este momento no pude generar una respuesta. ¿Puedo ayudarte con otra consulta sobre Nodux?';
            return NextResponse.json({ reply });
          } else {
            const errData = await res.text();
            console.warn(`Gemini API model ${model} failed:`, res.status, errData);
          }
        } catch (apiErr) {
          console.warn(`Error connecting to model ${model}:`, apiErr);
        }
      }
    }

    // Knowledge-base fallback in case API key is invalid/restricted or offline
    const lastUserMsg = messages[messages.length - 1]?.content?.toLowerCase() || '';

    let fallbackReply =
      '¡Hola! Soy el asistente virtual de **Nodux**. Ayudamos a pymes a ordenar sus inventarios, automatizar flujos operativos y transformar datos en decisiones de negocio rentables.\n\n¿En qué te puedo asesorar hoy? También puedes escribirnos directamente a nuestro **[WhatsApp (+51 919 620 888)](https://wa.me/51919620888)**.';

    if (lastUserMsg.includes('servicio') || lastUserMsg.includes('hacen') || lastUserMsg.includes('ofrecen')) {
      fallbackReply =
        'En **Nodux** ofrecemos tres pilares clave para la eficiencia de tu negocio:\n\n' +
        '1. **Consultoría de Operaciones:** Diagnóstico en campo (Gemba Walk), optimización de tiempos y eliminación de cuellos de botella.\n' +
        '2. **Ingeniería de Datos & BI:** Bases de datos maestras, pipelines ETL y tableros interactivos en Power BI para control de mermas y stock.\n' +
        '3. **Desarrollo y Automatización:** Soluciones de software a medida, e-commerce y conexiones entre sistemas para eliminar tareas manuales.\n\n' +
        '¿Te gustaría una sesión de diagnóstico para tu empresa?';
    } else if (lastUserMsg.includes('equipo') || lastUserMsg.includes('fundador') || lastUserMsg.includes('quienes')) {
      fallbackReply =
        'Nuestro equipo está conformado por especialistas con visión integral:\n\n' +
        '- **Nicolás López Olivas** (CEO & Tech Founder): Dirección estratégica y discovery comercial B2B.\n' +
        '- **Juan Alexander Miranda** (CTO & Lead Architect): Arquitectura de software y soluciones cloud.\n' +
        '- **Walter J. Sánchez** (Head of Data & BI): Estandarización de datos maestros y Power BI.\n' +
        '- **Jesús Roberto Regalado** (COO & Procesos): Diagnóstico operativo y modelado BPMN.\n' +
        '- **Luis Eduardo Piscoya** (Software & Data Ops): Desarrollo SQL y operaciones de datos.\n\n' +
        'Conoce más de ellos en la sección **Equipo** de nuestra web.';
    } else if (lastUserMsg.includes('proyecto') || lastUserMsg.includes('portafolio') || lastUserMsg.includes('trabajo')) {
      fallbackReply =
        'Entre nuestros proyectos más destacados se encuentran:\n\n' +
        '1. **Plataforma E-Commerce Nodux:** Tienda en línea escalable con sincronización de inventario y pagos en tiempo real.\n' +
        '2. **Nodux Educa:** Plataforma EdTech moderna para gestión de alumnos, cursos y contenidos.\n' +
        '3. **Web Corporativa B2B:** Portales institucionales orientados a conversión y autoridad de marca.\n\n' +
        'Puedes revisar el detalle de cada uno en la sección **Portafolio**.';
    } else if (lastUserMsg.includes('contacto') || lastUserMsg.includes('precio') || lastUserMsg.includes('cotiz') || lastUserMsg.includes('reunion') || lastUserMsg.includes('whatsapp')) {
      fallbackReply =
        '¡Será un gusto conversar sobre tu proyecto!\n\n' +
        'Puedes comunicarte de inmediato con nuestro equipo comercial y técnico:\n' +
        '- 📱 **WhatsApp:** [+51 919 620 888](https://wa.me/51919620888)\n' +
        '- 💼 **LinkedIn:** [Nodux B2B](https://www.linkedin.com/company/nodux-b2b)\n\n' +
        'Respondemos con rapidez para agendar un diagnóstico inicial sin costo.';
    }

    return NextResponse.json({ reply: fallbackReply });
  } catch (error: any) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Ocurrió un error al procesar el mensaje', details: error.message },
      { status: 500 }
    );
  }
}
