export interface Project {
  id: number;
  title: string;
  client: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  technologies: string[];
  problemSolved: string;
  liveUrl?: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  subtitle?: string;
  bio: string;
  imageUrl: string;
  specializations: string[];
  linkedinUrl?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Plataforma E-Commerce Nodux',
    client: 'Proyecto Interno / Demo',
    description: 'Solución integral de comercio electrónico diseñada para alto rendimiento y escalabilidad. Incluye gestión de inventarios, carrito de compras optimizado y pasarela de pagos, construido con arquitectura moderna.',
    imageUrl: '/images/portfolio/nx-e-commerce.png',
    imageHint: 'ecommerce dashboard',
    technologies: ['Angular', 'TypeScript', 'Tailwind CSS', 'RxJS'],
    problemSolved: 'Digitalización del canal de ventas para pymes con una experiencia de usuario fluida y una gestión de catálogo centralizada.',
    liveUrl: 'https://nx-e-commerce.vercel.app/',
  },
  {
    id: 2,
    title: 'Nodux Educa - EdTech',
    client: 'Sector Educativo',
    description: 'Plataforma educativa interactiva (LMS) orientada a la gestión de cursos, alumnos y material didáctico. Interfaz intuitiva y rápida, optimizada para SEO y rendimiento.',
    imageUrl: '/images/portfolio/nx-educa.png',
    imageHint: 'lms dashboard',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    problemSolved: 'Centralización de recursos educativos en un entorno virtual ligero y accesible, permitiendo a instituciones gestionar su currículo.',
    liveUrl: 'https://nx-educa.vercel.app/',
  },
  {
    id: 3,
    title: 'Web Corporativa Institucional',
    client: 'Empresas B2B',
    description: 'Sitio web corporativo de alto impacto, enfocado en la conversión y la presentación profesional de servicios. Estructura robusta, carga rápida y diseño responsivo.',
    imageUrl: '/images/portfolio/nx-web-corp.png',
    imageHint: 'corporate website',
    technologies: ['Angular', 'SCSS', 'TypeScript', 'Responsive Design'],
    problemSolved: 'Creación de una presencia digital de autoridad que comunica la propuesta de valor empresarial de manera clara, captando leads cualificados.',
    liveUrl: 'https://nx-aut.vercel.app/',
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Nicolas López Olivas',
    role: 'Chief Executive Officer (CEO) & Tech Founder',
    bio: 'Dirección estratégica, discovery comercial B2B, ingeniería de requerimientos y alianzas institucionales.',
    imageUrl: '/images/team/nicolas.jpg',
    specializations: ['Dirección Estratégica', 'Discovery Comercial', 'Ingeniería de Requerimientos'],
    linkedinUrl: 'https://www.linkedin.com/in/nicolas-johny-l%C3%B3pez-olivas-182a71304/',
  },
  {
    id: 2,
    name: 'Juan Alexander Miranda Quispe',
    role: 'Chief Technology Officer (CTO) & Lead Full-Stack Architect',
    bio: 'Arquitectura de software, automatizaciones low-code, integración de APIs transaccionales e infraestructura cloud.',
    imageUrl: '/images/team/juan.jpg',
    specializations: ['Arquitectura de Software', 'Automatizaciones Low-Code', 'Cloud Infrastructure'],
    linkedinUrl: 'https://www.linkedin.com/in/juanalexmiranda/',
  },
  {
    id: 3,
    name: 'Walter J. Sánchez P.',
    role: 'Head of Data Engineering & Business Intelligence',
    bio: 'Estandarización y pipelines ETL de datos maestros, modelado dimensional relacional y tableros analíticos en Power BI.',
    imageUrl: '/images/team/walter.jpg',
    specializations: ['Data Engineering', 'ETL Pipelines', 'Power BI'],
    linkedinUrl: 'https://www.linkedin.com/in/walterjsp/',
  },
  {
    id: 4,
    name: 'Jesús Roberto Regalado Avendaño',
    role: 'Chief Operating Officer (COO) & Lead de Procesos Industriales',
    bio: 'Diagnóstico operativo en planta (Gemba Walk), estudio de tiempos y métodos, balance de flujos y modelado BPMN.',
    imageUrl: '/images/team/jesus.png',
    specializations: ['Procesos Industriales', 'Gemba Walk', 'Modelado BPMN'],
    linkedinUrl: 'https://www.linkedin.com/in/jesus-roberto-regalado-avenda%C3%B1o-a9222b442/',
  },
  {
    id: 5,
    name: 'Luis Eduardo Piscoya Poma',
    role: 'Software Developer & Data Operations',
    bio: 'Extracción y depuración en bases de datos relacionales (SQL), maquetación frontend y normalización masiva de inventarios.',
    imageUrl: '/images/team/luis.jpg',
    specializations: ['SQL', 'Frontend', 'Data Operations'],
    linkedinUrl: 'https://www.linkedin.com/in/luis-eduardo-piscoya-poma-54a126367/',
  },
];
