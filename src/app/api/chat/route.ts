import { NextRequest, NextResponse } from 'next/server';

const CONTACT_FOOTER =
  '\n\n📌 *Para más información, resolver dudas específicas o solicitar un diagnóstico operativo de tu empresa, contáctanos directamente a nuestro **[WhatsApp (+51 919 620 888)](https://wa.me/51919620888)** o encuéntranos en **[LinkedIn](https://www.linkedin.com/company/nodux-b2b)**.*';

const NODUX_SYSTEM_INSTRUCTION = `Eres "Nodux AI", el consultor virtual y asistente oficial de Nodux.
Tu objetivo es responder de manera clara, convincente, profesional y detallada sobre el valor de Nodux, sus objetivos, beneficios de invertir o contratar a la empresa, servicios, equipo y proyectos.

INFORMACIÓN INSTITUCIONAL DE NODUX:
- Lema: "Soluciones que se adaptan a ti, tecnología que transforma."
- Objetivo y Propósito: Conectar la realidad física del negocio con la ingeniería de datos y la automatización. Entramos directamente a la operación para ordenar inventarios, estandarizar flujos y reemplazar registros manuales o dispersos por herramientas digitales ligeras y tableros analíticos en tiempo real. Ayudamos a dueños y gerentes a eliminar fugas de dinero por mermas o quiebres de stock y tomar decisiones basadas en números reales.
- ¿Por qué invertir o contratar a Nodux?:
  1. Reducción directa de pérdidas por mermas y quiebres de stock.
  2. Soluciones diseñadas a la medida de la trinchera comercial (no software genérico ni ERPs sobrecargados).
  3. Visibilidad ejecutiva en tiempo real con tableros interactivos (Power BI).
  4. Equipo multidisciplinario especializado en procesos industriales, arquitectura cloud, ingeniería de datos y desarrollo de software.
- Misión: Ser el puente tecnológico entre la operación física tradicional y los estándares de la industria moderna, ordenando inventarios y flujos con datos precisos.
- Visión: Ser el laboratorio de eficiencia operativa líder para pymes y empresas en crecimiento en la región.
- Servicios Principales:
  1. Consultoría de Operaciones y Procesos (Gemba Walk en planta, tiempos y métodos, modelado BPMN).
  2. Ingeniería de Datos y BI (Bases de datos maestras, pipelines ETL, tableros en Power BI).
  3. Desarrollo de Software y Automatización (plataformas web, comercio electrónico, integración de APIs y flujos low-code).
- Equipo:
  * Nicolás López Olivas (CEO & Tech Founder): Dirección estratégica, discovery comercial B2B e ingeniería de requerimientos.
  * Juan Alexander Miranda Quispe (CTO & Lead Full-Stack Architect): Arquitectura de software, infraestructura cloud y automatizaciones.
  * Walter J. Sánchez P. (Head of Data & BI): Estandarización de datos maestros, pipelines ETL y tableros Power BI.
  * Jesús Roberto Regalado Avendaño (COO & Procesos Industriales): Diagnóstico operativo en planta, balance de flujos y BPMN.
  * Luis Eduardo Piscoya Poma (Software Developer & Data Operations): Extracción SQL, frontend y normalización masiva de inventarios.
- Portafolio:
  * Plataforma E-Commerce Nodux (Angular, TypeScript, Tailwind CSS, RxJS).
  * Nodux Educa - EdTech (Next.js, React, TypeScript).
  * Web Corporativa Institucional (Angular, SCSS, TypeScript).
- Contacto: WhatsApp (+51 919 620 888), LinkedIn (https://www.linkedin.com/company/nodux-b2b).

REGLA CLAVE: Al final de cada respuesta que des, debes incluir siempre una invitación formal para más información y contacto directo vía WhatsApp (+51 919 620 888) o LinkedIn.`;

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// Helper to remove accents and normalize text for semantic matching
function cleanText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function getKnowledgeBaseResponse(query: string): string {
  const q = cleanText(query);

  // 1. Objetivo / Propósito / Meta de Nodux
  if (
    q.includes('objetivo') ||
    q.includes('proposito') ||
    q.includes('meta') ||
    q.includes('mision') ||
    q.includes('vision') ||
    q.includes('que busca') ||
    q.includes('a que se dedica') ||
    q.includes('para que sirve')
  ) {
    return (
      '**El objetivo principal de Nodux** es conectar la realidad operativa de tu negocio con la ingeniería de datos y la automatización moderna.\n\n' +
      'Entramos directamente a la operación de las empresas para:\n' +
      '• **Ordenar y transparentar inventarios:** Acabando con el descontrol en almacenes y puntos de venta.\n' +
      '• **Eliminar fugas de capital:** Reduciendo drásticamente pérdidas por mermas y quiebres de stock.\n' +
      '• **Digitalizar procesos clave:** Reemplazando hojas de cálculo dispersas y anotaciones manuales por herramientas digitales ligeras.\n' +
      '• **Facilitar la toma de decisiones:** Desplegando tableros analíticos en tiempo real (Power BI) para que gerentes y dueños decidan con números en mano y no con intuición.' +
      CONTACT_FOOTER
    );
  }

  // 2. Por qué invertir / Por qué contratar / Beneficios / Valor / ROI
  if (
    q.includes('invertir') ||
    q.includes('inversion') ||
    q.includes('por que') ||
    q.includes('por que deberiamos') ||
    q.includes('contratar') ||
    q.includes('elegir') ||
    q.includes('beneficio') ||
    q.includes('ventaja') ||
    q.includes('razon') ||
    q.includes('valor') ||
    q.includes('roi') ||
    q.includes('retorno')
  ) {
    return (
      '**¿Por qué invertir en Nodux y contratarnos como tu socio tecnológico?**\n\n' +
      'Invertir en Nodux genera un retorno tangible y medible en la salud financiera de tu empresa por 4 razones clave:\n\n' +
      '1. **Recuperación directa de capital:** Un inventario desordenado retiene flujo de caja o genera ventas perdidas. Optimizamos tus niveles de stock y rotación desde el primer mes.\n' +
      '2. **Soluciones hechas para la trinchera comercial:** No imponemos software genérico ni ERPs complejos que nadie usa. Analizamos tu operación en el terreno (Gemba Walk) y diseñamos soluciones modulares que tu equipo realmente adopta.\n' +
      '3. **Control gerencial en tiempo real:** Transformamos datos dispersos en tableros de Business Intelligence (Power BI) donde visualizas márgenes, productos críticos y rendimiento al instante.\n' +
      '4. **Equipo multidisciplinario especializado:** Cuentas con ingenieros de procesos industriales, arquitectos de software, expertos en datos maestros y automatizadores trabajando en conjunto.' +
      CONTACT_FOOTER
    );
  }

  // 3. Inventarios / Mermas / Almacén / Stock
  if (
    q.includes('inventario') ||
    q.includes('stock') ||
    q.includes('merma') ||
    q.includes('almacen') ||
    q.includes('quiebre') ||
    q.includes('logistica')
  ) {
    return (
      '**Gestión Inteligente de Inventarios y Almacenes en Nodux:**\n\n' +
      'Ayudamos a las empresas a superar el caos de stock mediante:\n' +
      '• Diagnóstico en campo del flujo de mercancía y tiempos de despacho.\n' +
      '• Estandarización y depuración de bases de datos maestras de productos.\n' +
      '• Implementación de conteos cíclicos y trazabilidad digital.\n' +
      '• Alertas tempranas de stock mínimo y prevención de mermas por vencimiento o extravío.' +
      CONTACT_FOOTER
    );
  }

  // 4. Datos / Business Intelligence / Power BI / ETL
  if (
    q.includes('dato') ||
    q.includes('bi') ||
    q.includes('power bi') ||
    q.includes('etl') ||
    q.includes('dashboard') ||
    q.includes('reporte') ||
    q.includes('analitica') ||
    q.includes('inteligencia de negocio')
  ) {
    return (
      '**Ingeniería de Datos y Business Intelligence en Nodux:**\n\n' +
      'Convertimos el desorden de tus archivos Excel y bases de datos en activos estratégicos:\n' +
      '• **Pipelines ETL:** Extracción, limpieza y carga automatizada de datos desde tus sistemas de ventas y almacén.\n' +
      '• **Modelado Relacional:** Estructuración de datos confiables y sin duplicados.\n' +
      '• **Tableros en Power BI:** Dashboards visuales e interactivos accesibles desde tu computadora o teléfono móvil para monitorear KPIs clave.' +
      CONTACT_FOOTER
    );
  }

  // 5. Servicios / Qué hacen / Qué ofrecen / Soluciones
  if (
    q.includes('servicio') ||
    q.includes('hacen') ||
    q.includes('ofrecen') ||
    q.includes('solucion') ||
    q.includes('trabajan') ||
    q.includes('ayudan')
  ) {
    return (
      'En **Nodux** ofrecemos tres pilares integrales para impulsar la rentabilidad de tu negocio:\n\n' +
      '1. **Consultoría de Operaciones y Procesos:** Diagnóstico operativo (Gemba Walk), optimización de tiempos, balance de líneas y modelado BPMN.\n' +
      '2. **Ingeniería de Datos & BI:** Bases de datos maestras, pipelines ETL y tableros ejecutivos en Power BI.\n' +
      '3. **Desarrollo de Software y Automatizaciones:** Plataformas web, comercio electrónico escalable e integración de APIs y herramientas para eliminar tareas repetitivas.' +
      CONTACT_FOOTER
    );
  }

  // 6. Equipo / Quiénes son / Fundadores / CEO / CTO
  if (
    q.includes('equipo') ||
    q.includes('fundador') ||
    q.includes('quienes') ||
    q.includes('nicolas') ||
    q.includes('juan') ||
    q.includes('walter') ||
    q.includes('jesus') ||
    q.includes('luis') ||
    q.includes('ceo') ||
    q.includes('cto') ||
    q.includes('integrante')
  ) {
    return (
      '**El equipo directivo y técnico de Nodux:**\n\n' +
      '• **Nicolás López Olivas** (CEO & Tech Founder): Dirección estratégica, discovery comercial B2B y requerimientos.\n' +
      '• **Juan Alexander Miranda Quispe** (CTO & Lead Architect): Arquitectura de software, infraestructura cloud y automatizaciones.\n' +
      '• **Walter J. Sánchez P.** (Head of Data & BI): Pipelines ETL, estandarización de datos y Power BI.\n' +
      '• **Jesús Roberto Regalado Avendaño** (COO & Procesos): Diagnóstico operativo en planta, balance de flujos y BPMN.\n' +
      '• **Luis Eduardo Piscoya Poma** (Software Developer & Data Ops): Desarrollo SQL, interfaces web y depuración de inventarios.' +
      CONTACT_FOOTER
    );
  }

  // 7. Portafolio / Proyectos / Clientes / Casos
  if (
    q.includes('proyecto') ||
    q.includes('portafolio') ||
    q.includes('cliente') ||
    q.includes('caso') ||
    q.includes('experiencia') ||
    q.includes('trabajo')
  ) {
    return (
      '**Proyectos destacados en el Portafolio de Nodux:**\n\n' +
      '1. **Plataforma E-Commerce Nodux:** Tienda en línea de alto desempeño con sincronización de inventario, pasarela de pagos y catálogo centralizado.\n' +
      '2. **Nodux Educa - EdTech:** Plataforma interactiva de gestión educativa y contenidos virtuales para instituciones de formación.\n' +
      '3. **Web Corporativa Institucional:** Portales empresariales B2B con arquitectura moderna, carga veloz y enfoque en captación de leads.\n\n' +
      'Puedes explorar más detalles y tecnologías en la sección de **Portafolio** de esta web.' +
      CONTACT_FOOTER
    );
  }

  // 8. Cotización / Precios / Costos / Reunión / Agendar
  if (
    q.includes('cotiz') ||
    q.includes('precio') ||
    q.includes('costo') ||
    q.includes('cuanto') ||
    q.includes('cobran') ||
    q.includes('tarifa') ||
    q.includes('reunion') ||
    q.includes('agendar') ||
    q.includes('cita') ||
    q.includes('contacto') ||
    q.includes('whatsapp') ||
    q.includes('telefono')
  ) {
    return (
      '**Cotizaciones y Diagnóstico Operativo en Nodux:**\n\n' +
      'En Nodux no cobramos licencias innecesarias ni tarifas genéricas. Cada cotización se diseña a la medida tras una sesión de diagnóstico inicial, donde evaluamos el tamaño de tu operación, el volumen de datos y los procesos a optimizar.\n\n' +
      'Agendemos una breve llamada de descubrimiento para conocer tu caso y proponerte un plan de acción concreto.' +
      CONTACT_FOOTER
    );
  }

  // 9. Valores de la empresa
  if (q.includes('valor') || q.includes('principio') || q.includes('cultura')) {
    return (
      '**Los valores fundamentales de Nodux:**\n\n' +
      '• **Innovación continua:** Apostamos por tecnologías emergentes y mejoras constantes.\n' +
      '• **Compromiso:** Asumimos cada proyecto con responsabilidad hasta asegurar su éxito operativo.\n' +
      '• **Calidad:** Soluciones robustas, seguras y eficientes.\n' +
      '• **Trabajo en equipo:** Colaboración cercana con la gerencia y el personal del cliente.\n' +
      '• **Adaptabilidad:** Ajuste ágil a las particularidades de cada industria y negocio.\n' +
      '• **Ética profesional:** Integridad y transparencia en el manejo de la información.' +
      CONTACT_FOOTER
    );
  }

  // 10. Saludos / Hola
  if (q.includes('hola') || q.includes('buenos dias') || q.includes('buenas tardes') || q.includes('saludos')) {
    return (
      '¡Hola! Es un gusto saludarte. Soy **Nodux AI**, el consultor virtual de Nodux.\n\n' +
      'Puedo orientarte sobre:\n' +
      '• Cuál es el objetivo de Nodux y por qué invertir en nuestras soluciones.\n' +
      '• Cómo optimizamos almacenes e inventarios para erradicar pérdidas.\n' +
      '• Creación de tableros de control en Power BI y automatizaciones de software.\n' +
      '• Detalles de nuestro equipo y portafolio de proyectos.\n\n' +
      '¿Sobre qué tema te gustaría profundizar?' +
      CONTACT_FOOTER
    );
  }

  // 11. Respuesta contextual amplia para cualquier otra consulta
  return (
    'En **Nodux** nos especializamos en transformar empresas conectando su operación física con ingeniería de datos y automatización.\n\n' +
    'Nuestro objetivo es que dejes atrás hojas de cálculo desactualizadas y pérdidas por mermas o quiebres de inventario, brindándote herramientas digitales a medida y tableros analíticos en tiempo real para tomar decisiones certeras.\n\n' +
    '¿Tienes alguna duda sobre nuestros servicios, casos de éxito, equipo o cómo podemos intervenir en tu empresa?' +
    CONTACT_FOOTER
  );
}

export async function POST(req: NextRequest) {
  try {
    const { messages }: { messages: ChatMessage[] } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'No se recibieron mensajes válidos' }, { status: 400 });
    }

    const lastUserMessage = messages[messages.length - 1]?.content || '';
    const apiKey = process.env.GEMINI_API_KEY?.trim();

    // 1. Try Gemini API if an API key is provided
    if (apiKey) {
      const models = ['gemini-2.5-flash', 'gemini-1.5-flash', 'gemini-2.0-flash'];

      const contents = messages
        .filter((m) => m.role === 'user' || m.role === 'assistant')
        .map((m) => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }],
        }));

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
            let reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (reply) {
              // Ensure contact information is present at the end
              if (!reply.includes('919 620 888') && !reply.includes('WhatsApp')) {
                reply += CONTACT_FOOTER;
              }
              return NextResponse.json({ reply });
            }
          } else {
            console.warn(`Gemini API model ${model} HTTP status:`, res.status);
          }
        } catch (apiErr) {
          console.warn(`Error calling Gemini model ${model}:`, apiErr);
        }
      }
    }

    // 2. Intelligent, comprehensive knowledge engine response
    const reply = getKnowledgeBaseResponse(lastUserMessage);
    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      {
        reply:
          'En **Nodux** estamos listos para atender tu consulta sobre inventarios, datos y operaciones.' +
          CONTACT_FOOTER,
      },
      { status: 200 }
    );
  }
}
