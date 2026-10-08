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
    name: 'Roy Meza',
    role: 'Ingeniero Backend',
    bio: 'Desarrollador Backend con experiencia en la creación de sistemas robustos y escalables.',
    imageUrl: '/images/team/roy-meza.jpg',
    specializations: ['Desarrollo Backend', 'Node.js', 'Bases de Datos', 'APIs'],
    linkedinUrl: 'https://www.linkedin.com/in/roymeza/',
  },
  {
    id: 2,
    name: 'Omer Runco',
    role: 'Desarrollador Frontend',
    subtitle: 'El jefazo ricazo',
    bio: 'Especialista en Frontend enfocado en crear interfaces de usuario interactivas y eficientes.',
    imageUrl: '/images/team/omer-runco.jpg',
    specializations: ['Desarrollo Frontend', 'React', 'Next.js', 'UI/UX'],
    linkedinUrl: 'https://www.linkedin.com/in/omer-runco-b7a261310/',
  },
  {
    id: 3,
    name: 'Juan Miranda',
    role: 'Desarrollador de Software',
    bio: 'Desarrollador versátil con pasión por la tecnología y la resolución de problemas complejos.',
    imageUrl: '/images/team/juan-miranda.jpg',
    specializations: ['Desarrollo Web', 'Aplicaciones Móviles', 'Gestión de Proyectos'],
    linkedinUrl: 'https://www.linkedin.com/in/juan-alexander-miranda-quispe-0673812a3/',
  },
  {
    id: 4,
    name: 'Rubén Cuadros',
    role: 'Ingeniero Backend',
    bio: 'Arquitecto de software y desarrollador backend, enfocado en soluciones innovadoras y seguras.',
    imageUrl: '/images/team/ruben-cuadros.jpg',
    specializations: ['Arquitectura de Software', 'Microservicios', 'Cloud Computing', 'Seguridad'],
    linkedinUrl: 'https://www.linkedin.com/in/ruben-cuadros/',
  },
  {
    id: 5,
    name: 'Jessica Parra',
    role: 'Desarrolladora Frontend',
    bio: 'Desarrolladora Frontend comprometida con la creación de experiencias web visualmente atractivas y accesibles.',
    imageUrl: '/images/team/jessica-parra.png',
    specializations: ['Diseño Web Responsivo', 'JavaScript', 'Tailwind CSS', 'Accesibilidad'],
    linkedinUrl: 'https://www.linkedin.com/in/jessica-parra24/',
  },
  {
    id: 6,
    name: 'Jahmil',
    role: 'Desarrollador Frontend',
    bio: 'Desarrollador Frontend apasionado por las nuevas tecnologías.',
    imageUrl: '/images/team/placeholder-user1.png',
    specializations: ['Frontend', 'React', 'Vue'],
  },
  {
    id: 7,
    name: 'Antoni Cano',
    role: 'Cotización y Negociación',
    bio: 'Encargado de la cotización de proyectos y la negociación con clientes para asegurar el éxito mutuo.',
    imageUrl: '/images/team/placeholder-user2.png',
    specializations: ['Cotizaciones', 'Negociación de Proyectos', 'Relación con Clientes'],
  },
  {
    id: 8,
    name: 'Roberto',
    role: 'Arquitecto de Software',
    bio: 'Arquitecto de Software encargado de la estructura y visión técnica de los proyectos.',
    imageUrl: '/images/team/placeholder-user3.png',
    specializations: ['Arquitectura de Software', 'Liderazgo Técnico', 'Diagramas de Sistema'],
  },
];
