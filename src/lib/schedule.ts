export type CompetitionId = 'utp' | 'interbank' | 'cajathon';

export type EventKind =
  | 'inicio'
  | 'desarrollo'
  | 'entrega'
  | 'pitch'
  | 'workshop'
  | 'evaluacion'
  | 'fase'
  | 'final';

export type EventMode = 'Virtual' | 'Presencial' | 'Híbrido';

export interface Competition {
  id: CompetitionId;
  name: string;
  shortName: string;
  edition?: string;
  mode: EventMode;
  focus: string;
  description: string;
  prize?: string;
  location?: string;
  color: string;
  start: string; // YYYY-MM-DD
  end: string; // YYYY-MM-DD
}

export interface ScheduleEvent {
  id: string;
  competition: CompetitionId;
  title: string;
  description: string;
  start: string; // YYYY-MM-DD
  end?: string; // YYYY-MM-DD (rangos)
  time?: string; // texto libre para mostrar
  startTime?: string; // HH:MM (24 h, hora de Lima). Sin esto = todo el día
  endTime?: string; // HH:MM
  mode: EventMode;
  kind: EventKind;
  place?: string;
}

export const competitions: Competition[] = [
  {
    id: 'utp',
    name: 'Hackathon UTP x El Comercio',
    shortName: 'UTP x El Comercio',
    edition: '8.ª Edición',
    mode: 'Virtual',
    focus: 'Software & Producto',
    description:
      'Sprint de desarrollo continuo para construir un MVP funcional, con sustentaciones eliminatorias y gran final por Zoom.',
    color: '#3B82F6',
    start: '2026-11-03',
    end: '2026-11-17',
  },
  {
    id: 'interbank',
    name: 'Interbank Challenge 2026',
    shortName: 'Interbank Challenge',
    edition: 'x CIFUL',
    mode: 'Híbrido',
    focus: 'Finanzas Corporativas & Liquidez',
    description:
      'Workshops con el banco, liberación de un caso de negocio real y sprint de squad para un deck de 6 láminas.',
    location: 'Torre Interbank',
    color: '#22D3EE',
    start: '2026-11-03',
    end: '2026-11-20',
  },
  {
    id: 'cajathon',
    name: 'Cajathon 2026',
    shortName: 'Cajathon',
    edition: 'Caja Trujillo',
    mode: 'Híbrido',
    focus: 'Innovación Abierta & Microfinanzas',
    description:
      'Convocatoria abierta, fase Discover & Design con 18 equipos y final presencial con Demo Day para el Top 12.',
    prize: 'S/ 8,000 en premios',
    location: 'Trujillo',
    color: '#818CF8',
    start: '2026-11-03',
    end: '2026-12-04',
  },
];

export const scheduleEvents: ScheduleEvent[] = [
  // ───────────── UTP x El Comercio ─────────────
  {
    id: 'utp-induccion',
    competition: 'utp',
    title: 'Charla de inducción y revelación del reto',
    description: 'Presentación oficial del reto vía Zoom (duración aprox. 1 hora).',
    start: '2026-11-03',
    time: '6:00 p. m.',
    startTime: '18:00',
    endTime: '19:00',
    mode: 'Virtual',
    kind: 'inicio',
    place: 'Zoom',
  },
  {
    id: 'utp-arranque',
    competition: 'utp',
    title: 'Arranque oficial del sprint',
    description: 'Inicia el sprint de desarrollo continuo.',
    start: '2026-11-06',
    time: '7:00 p. m.',
    startTime: '19:00',
    endTime: '20:00',
    mode: 'Virtual',
    kind: 'inicio',
  },
  {
    id: 'utp-sprint',
    competition: 'utp',
    title: 'Sprint de construcción del MVP',
    description: 'Desarrollo y construcción del Producto Mínimo Viable.',
    start: '2026-11-07',
    end: '2026-11-08',
    mode: 'Virtual',
    kind: 'desarrollo',
  },
  {
    id: 'utp-entrega',
    competition: 'utp',
    title: 'Entrega: congelamiento de código + video demo',
    description: 'Cierre del sprint, código congelado en GitHub y video demo del MVP.',
    start: '2026-11-08',
    time: '7:00 p. m.',
    startTime: '19:00',
    endTime: '20:00',
    mode: 'Virtual',
    kind: 'entrega',
    place: 'GitHub',
  },
  {
    id: 'utp-slots',
    competition: 'utp',
    title: 'Espera de slots de pitch',
    description: 'La organización asigna los turnos de sustentación.',
    start: '2026-11-09',
    mode: 'Virtual',
    kind: 'evaluacion',
  },
  {
    id: 'utp-pitch',
    competition: 'utp',
    title: 'Sustentaciones eliminatorias (pitch)',
    description: 'Turnos de 5 a 10 min por Zoom desde las 7:00 p. m.',
    start: '2026-11-10',
    end: '2026-11-12',
    time: 'desde 7:00 p. m.',
    startTime: '19:00',
    endTime: '22:00',
    mode: 'Virtual',
    kind: 'pitch',
    place: 'Zoom',
  },
  {
    id: 'utp-deliberacion',
    competition: 'utp',
    title: 'Deliberación del jurado',
    description: 'Sin actividades requeridas para los participantes.',
    start: '2026-11-13',
    end: '2026-11-16',
    mode: 'Virtual',
    kind: 'evaluacion',
  },
  {
    id: 'utp-final',
    competition: 'utp',
    title: 'Gran Final y premiación',
    description: 'Gran final y premiación por Zoom.',
    start: '2026-11-17',
    time: '6:00 p. m.',
    startTime: '18:00',
    endTime: '20:00',
    mode: 'Virtual',
    kind: 'final',
    place: 'Zoom',
  },

  // ───────────── Interbank Challenge ─────────────
  {
    id: 'ib-convocatoria',
    competition: 'interbank',
    title: 'Convocatoria abierta',
    description: 'Postulación abierta; preparar el video de presentación.',
    start: '2026-11-03',
    mode: 'Virtual',
    kind: 'inicio',
  },
  {
    id: 'ib-cierre',
    competition: 'interbank',
    title: 'Cierre de postulaciones y video de presentación',
    description: 'Cierre definitivo y envío del video de presentación.',
    start: '2026-11-04',
    time: 'hasta 11:59 p. m.',
    startTime: '23:00',
    endTime: '23:59',
    mode: 'Virtual',
    kind: 'entrega',
  },
  {
    id: 'ib-seleccionados',
    competition: 'interbank',
    title: 'Publicación de equipos seleccionados',
    description: 'Se publica la lista oficial de equipos seleccionados.',
    start: '2026-11-06',
    mode: 'Virtual',
    kind: 'evaluacion',
  },
  {
    id: 'ib-inauguracion',
    competition: 'interbank',
    title: 'Inauguración oficial',
    description: 'Evento de inauguración presencial.',
    start: '2026-11-09',
    mode: 'Presencial',
    kind: 'inicio',
    place: 'Torre Interbank',
  },
  {
    id: 'ib-ws1',
    competition: 'interbank',
    title: 'Workshop 1: Diagnóstico y Proyecto',
    description: '60 a 90 min; grabado según disponibilidad.',
    start: '2026-11-10',
    mode: 'Virtual',
    kind: 'workshop',
  },
  {
    id: 'ib-ws2',
    competition: 'interbank',
    title: 'Workshop 2: Liquidez y Riesgo',
    description: '60 a 90 min.',
    start: '2026-11-11',
    mode: 'Virtual',
    kind: 'workshop',
  },
  {
    id: 'ib-ws3',
    competition: 'interbank',
    title: 'Workshop 3 y liberación del caso de negocio',
    description: 'Se libera oficialmente el caso de negocio.',
    start: '2026-11-12',
    mode: 'Virtual',
    kind: 'workshop',
  },
  {
    id: 'ib-analisis',
    competition: 'interbank',
    title: 'Análisis y estructuración del caso',
    description: 'Hipótesis y viabilidad del modelo.',
    start: '2026-11-13',
    mode: 'Virtual',
    kind: 'desarrollo',
  },
  {
    id: 'ib-sprint',
    competition: 'interbank',
    title: 'Sprint del squad: deck de 6 láminas',
    description: 'Sprint principal para armar el deck. Cierre el domingo.',
    start: '2026-11-14',
    end: '2026-11-15',
    time: 'cierre dom. 11:59 p. m.',
    mode: 'Virtual',
    kind: 'entrega',
  },
  {
    id: 'ib-evaluacion',
    competition: 'interbank',
    title: 'Evaluación interna del comité bancario',
    description: 'Los casos son evaluados por el comité del banco.',
    start: '2026-11-16',
    end: '2026-11-19',
    mode: 'Virtual',
    kind: 'evaluacion',
  },
  {
    id: 'ib-final',
    competition: 'interbank',
    title: 'Gran Final: Top 5 (pitch y premiación)',
    description: 'Final presencial del Top 5.',
    start: '2026-11-20',
    mode: 'Presencial',
    kind: 'final',
    place: 'Torre Interbank',
  },

  // ───────────── Cajathon ─────────────
  {
    id: 'cj-convocatoria',
    competition: 'cajathon',
    title: 'Convocatoria abierta y registro de postulantes',
    description: 'Postulación 100% virtual. Cierre el domingo 8 de noviembre.',
    start: '2026-11-03',
    end: '2026-11-08',
    mode: 'Virtual',
    kind: 'inicio',
  },
  {
    id: 'cj-seleccion',
    competition: 'cajathon',
    title: 'Selección y conformación de equipos',
    description: 'La organización selecciona y conforma los equipos.',
    start: '2026-11-09',
    end: '2026-11-15',
    mode: 'Virtual',
    kind: 'evaluacion',
  },
  {
    id: 'cj-discover',
    competition: 'cajathon',
    title: 'Fase Discover & Design',
    description: '18 equipos, virtual. Entrega del documento Concept Solution.',
    start: '2026-11-16',
    end: '2026-12-01',
    mode: 'Virtual',
    kind: 'fase',
  },
  {
    id: 'cj-gate',
    competition: 'cajathon',
    title: 'Selection Gate: filtro al Top 12',
    description: 'Filtro clasificatorio hacia el Top 12 de finalistas.',
    start: '2026-12-02',
    mode: 'Virtual',
    kind: 'evaluacion',
  },
  {
    id: 'cj-final',
    competition: 'cajathon',
    title: 'Build & Validate y Demo Day final',
    description: 'Fase presencial en Trujillo.',
    start: '2026-12-03',
    end: '2026-12-04',
    time: '9:00 a. m. – 6:00 p. m.',
    startTime: '09:00',
    endTime: '18:00',
    mode: 'Presencial',
    kind: 'final',
    place: 'Trujillo',
  },
];

// ───────────── Utilidades de fecha (zona horaria Lima) ─────────────

export function todayInLima(now: Date = new Date()): string {
  return now.toLocaleDateString('en-CA', { timeZone: 'America/Lima' });
}

function toUTC(date: string): number {
  const [y, m, d] = date.split('-').map(Number);
  return Date.UTC(y, m - 1, d);
}

export function daysBetween(from: string, to: string): number {
  return Math.round((toUTC(to) - toUTC(from)) / 86400000);
}

export type EventStatus = 'upcoming' | 'ongoing' | 'done';

export function getStatus(event: { start: string; end?: string }, today: string): EventStatus {
  const end = event.end ?? event.start;
  if (today < event.start) return 'upcoming';
  if (today > end) return 'done';
  return 'ongoing';
}

const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const WEEKDAYS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

export function parseDate(date: string) {
  const [y, m, d] = date.split('-').map(Number);
  const weekday = WEEKDAYS[new Date(Date.UTC(y, m - 1, d)).getUTCDay()];
  return { day: String(d).padStart(2, '0'), month: MONTHS[m - 1], year: y, weekday };
}

export function formatShort(date: string): string {
  const { day, month } = parseDate(date);
  return `${day} ${month}`;
}

export function formatRange(start: string, end?: string): string {
  if (!end || end === start) return formatShort(start);
  return `${formatShort(start)} – ${formatShort(end)}`;
}

export function addDays(date: string, n: number): string {
  return new Date(toUTC(date) + n * 86400000).toISOString().slice(0, 10);
}

/** Lunes de la semana a la que pertenece `date`. */
export function startOfWeek(date: string): string {
  const dow = new Date(toUTC(date)).getUTCDay(); // 0 = domingo
  return addDays(date, -((dow + 6) % 7));
}

export function occursOn(event: { start: string; end?: string }, date: string): boolean {
  return date >= event.start && date <= (event.end ?? event.start);
}

export function timeToMinutes(t: string): number {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

export function formatTime12(t: string): string {
  const [h, m] = t.split(':').map(Number);
  const suffix = h >= 12 ? 'p. m.' : 'a. m.';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, '0')} ${suffix}`;
}

export function nowMinutesInLima(now: Date = new Date()): number {
  const t = now.toLocaleTimeString('en-GB', { timeZone: 'America/Lima', hour: '2-digit', minute: '2-digit', hour12: false });
  return timeToMinutes(t);
}
