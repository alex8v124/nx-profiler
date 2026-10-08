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
    title: 'Sitio Web Institucional - Winnetka',
    client: 'CEP Winnetka',
    description: 'Plataforma web integral con portal administrativo para gestionar preinscripciones, docentes y alumnos, optimizando la operativa del centro educativo.',
    imageUrl: '/images/pag_winnetka.png',
    imageHint: 'school website',
    technologies: ['Next.js', 'React', 'TypeScript', 'Vercel', 'Tailwind CSS'],
    problemSolved: 'El centro educativo necesitaba una presencia digital moderna para comunicar su propuesta de valor, historia y niveles educativos, además de facilitar un portal de preinscripción en línea para nuevos apoderados.',
  },
  {
    id: 2,
    title: 'The Roost - E-commerce de Café',
    client: 'The Roost',
    description: 'Tienda en línea para café artesanal con un recomendador de mezclas basado en IA que personaliza la experiencia de compra y fomenta la lealtad a la marca.',
    imageUrl: '/images/pag_the_roost.png',
    imageHint: 'coffee ecommerce',
    technologies: ['Next.js', 'React', 'AI', 'Vercel', 'E-commerce'],
    problemSolved: 'Crear una plataforma de e-commerce para una marca de café artesanal, conectando a los amantes del café con productores locales y ofreciendo una experiencia de compra única con un recomendador de productos basado en IA.',
  },
  {
    id: 3,
    title: 'Clínica Dental ArtDent - Sistema de Citas',
    client: 'Clínica ArtDent',
    description: "Plataforma web con sistema de citas y un chatbot con IA, 'Denty', para asistencia 24/7, mejorando la eficiencia y el servicio al cliente.",
    imageUrl: '/images/pag_artdent.png',
    imageHint: 'dental clinic website',
    technologies: ['Next.js', 'React', 'AI Chatbot', 'Calendly Integration'],
    problemSolved: 'La clínica dental requería un sistema digital para gestionar citas, presentar sus servicios y responder preguntas frecuentes a través de un asistente virtual, mejorando la experiencia del paciente y optimizando la administración.',
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
    imageUrl: '/images/team/jesus.jpg',
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
