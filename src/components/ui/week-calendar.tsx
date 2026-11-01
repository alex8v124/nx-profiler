'use client';

import { useEffect, useMemo, useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight, Clock, MapPin, X } from 'lucide-react';
import {
  addDays,
  competitions,
  formatRange,
  formatTime12,
  getStatus,
  nowMinutesInLima,
  occursOn,
  parseDate,
  startOfWeek,
  timeToMinutes,
  type CompetitionId,
  type ScheduleEvent,
} from '@/lib/schedule';

const HOUR_H = 52; // px por hora
const START_H = 7;
const END_H = 24;
const HOURS = Array.from({ length: END_H - START_H }, (_, i) => START_H + i);
const TOTAL_H = (END_H - START_H) * HOUR_H;

const compColor = Object.fromEntries(competitions.map((c) => [c.id, c.color])) as Record<CompetitionId, string>;
const compName = Object.fromEntries(competitions.map((c) => [c.id, c.shortName])) as Record<CompetitionId, string>;

// Tonos oscuros para textos de competencia en modo claro (para que nunca se vean blancos/pálidos)
const compDarkTextColor: Record<CompetitionId, string> = {
  utp: '#1D4ED8',       // Azul oscuro
  interbank: '#0E7490', // Cyan/Teal oscuro de alto contraste
  cajathon: '#4338CA',  // Índigo oscuro
};

const alpha = (hex: string, a: number) => `${hex}${Math.round(a * 255).toString(16).padStart(2, '0')}`;

function hourLabel(h: number) {
  if (h === 12) return '12 p. m.';
  return h > 12 ? `${h - 12} p. m.` : `${h} a. m.`;
}

interface Placed {
  event: ScheduleEvent;
  top: number;
  height: number;
  col: number;
  cols: number;
}

/** Posiciona los eventos con hora de un día; los que se solapan se reparten en columnas. */
function layoutDay(events: ScheduleEvent[]): Placed[] {
  const timed = events
    .filter((e) => e.startTime)
    .map((e) => {
      const s = timeToMinutes(e.startTime!);
      const en = e.endTime ? timeToMinutes(e.endTime) : s + 60;
      return { event: e, s, e: Math.max(en, s + 30) };
    })
    .sort((a, b) => a.s - b.s);

  const colEnds: number[] = [];
  const placed = timed.map((t) => {
    let col = colEnds.findIndex((end) => end <= t.s);
    if (col === -1) col = colEnds.length;
    colEnds[col] = t.e;
    return { t, col };
  });
  const cols = Math.max(colEnds.length, 1);

  return placed.map(({ t, col }) => ({
    event: t.event,
    col,
    cols,
    top: ((t.s - START_H * 60) / 60) * HOUR_H,
    height: ((t.e - t.s) / 60) * HOUR_H,
  }));
}

interface Props {
  today: string | null;
  events: ScheduleEvent[];
  weekStart: string;
  onWeekChange: (weekStart: string) => void;
  jumped: boolean;
}

export default function WeekCalendar({ today, events, weekStart, onWeekChange, jumped }: Props) {
  const [selected, setSelected] = useState<ScheduleEvent | null>(null);
  const [nowMin, setNowMin] = useState<number | null>(null);

  useEffect(() => {
    setNowMin(nowMinutesInLima());
    const id = setInterval(() => setNowMin(nowMinutesInLima()), 60 * 1000);
    return () => clearInterval(id);
  }, []);

  const days = useMemo(() => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)), [weekStart]);
  const weekEvents = useMemo(() => events.filter((e) => days.some((d) => occursOn(e, d))), [events, days]);

  const nextEvent = useMemo(() => {
    if (!today) return null;
    return events.find((e) => getStatus(e, today) !== 'done') ?? null;
  }, [events, today]);

  const first = parseDate(days[0]);
  const last = parseDate(days[6]);
  const weekLabel =
    first.month === last.month
      ? `${first.day} – ${last.day} ${last.month} ${last.year}`
      : `${first.day} ${first.month} – ${last.day} ${last.month} ${last.year}`;
  const isCurrentWeek = !!today && days.includes(today);
  const showNowLine = isCurrentWeek && nowMin !== null && nowMin >= START_H * 60 && nowMin < END_H * 60;

  return (
    <div className="fade-up">
      {/* Barra de navegación */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onWeekChange(addDays(weekStart, -7))}
            className="h-9 w-9 rounded-lg border border-border bg-card/60 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-foreground hover:border-primary/40 transition-colors shadow-sm"
            aria-label="Semana anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => onWeekChange(addDays(weekStart, 7))}
            className="h-9 w-9 rounded-lg border border-border bg-card/60 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-foreground hover:border-primary/40 transition-colors shadow-sm"
            aria-label="Semana siguiente"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <div className="ml-2">
            <div className="font-bold font-headline text-slate-900 dark:text-slate-100 leading-tight">{weekLabel}</div>
            <div className="text-xs text-slate-600 dark:text-slate-400">
              {isCurrentWeek ? 'Semana actual' : 'Hora de Lima (UTC−5)'}
              {weekEvents.length > 0 && ` · ${weekEvents.length} actividad${weekEvents.length === 1 ? '' : 'es'}`}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          {today && !isCurrentWeek && (
            <button
              onClick={() => onWeekChange(startOfWeek(today))}
              className="px-3.5 py-1.5 rounded-lg text-sm border border-border bg-card/60 text-slate-700 dark:text-slate-300 hover:text-foreground hover:border-primary/40 transition-colors shadow-sm"
            >
              Hoy
            </button>
          )}
          {nextEvent && !days.some((d) => occursOn(nextEvent, d)) && (
            <button
              onClick={() => onWeekChange(startOfWeek(nextEvent.start))}
              className="px-3.5 py-1.5 rounded-lg text-sm border border-primary/40 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors font-medium shadow-sm"
            >
              Ir a la próxima actividad
            </button>
          )}
        </div>
      </div>

      {jumped && isCurrentWeek === false && (
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-primary/25 bg-primary/10 px-4 py-2.5 text-sm text-primary font-medium">
          <CalendarDays className="h-4 w-4 shrink-0" />
          La semana actual no tiene actividades; te mostramos la semana de la próxima actividad.
        </div>
      )}

      {/* Calendario */}
      <div className="rounded-2xl border border-border/80 bg-card/70 backdrop-blur-md overflow-hidden shadow-sm">
        <div className="overflow-x-auto no-scrollbar">
          <div className="min-w-[760px]">
            {/* Encabezado de días */}
            <div className="grid grid-cols-[56px_repeat(7,minmax(0,1fr))] border-b border-border/80 bg-secondary/40">
              <div />
              {days.map((d) => {
                const p = parseDate(d);
                const isToday = d === today;
                return (
                  <div key={d} className="py-3 text-center border-l border-border/60">
                    <div className={`text-[11px] uppercase tracking-wider font-semibold ${isToday ? 'text-primary' : 'text-slate-600 dark:text-slate-400'}`}>
                      {p.weekday.slice(0, 3)}
                    </div>
                    <div
                      className={`mx-auto mt-1 h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        isToday ? 'bg-primary text-primary-foreground shadow-[0_0_0_4px_rgba(37,99,235,0.25)]' : 'text-slate-900 dark:text-slate-100'
                      }`}
                    >
                      {p.day}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Fila "todo el día" */}
            <div className="grid grid-cols-[56px_repeat(7,minmax(0,1fr))] border-b border-border/80">
              <div className="px-1 py-2 text-[10px] font-semibold text-slate-600 dark:text-slate-400 text-right pr-2 leading-tight">Todo el día</div>
              {days.map((d) => {
                const allDay = events.filter((e) => !e.startTime && occursOn(e, d));
                return (
                  <div key={d} className="border-l border-border/60 p-1 space-y-1 min-h-[44px]">
                    {allDay.map((e) => {
                      const c = compColor[e.competition];
                      const done = !!today && getStatus(e, today) === 'done';
                      return (
                        <button
                          key={e.id}
                          onClick={() => setSelected(e)}
                          title={`${compName[e.competition]} · ${e.title}`}
                          className={`w-full text-left rounded-md px-1.5 py-1 text-[11px] font-semibold leading-tight border-l-[3px] truncate transition-all hover:brightness-95 dark:hover:brightness-125 text-slate-950 dark:text-slate-100 shadow-xs ${done ? 'opacity-50' : ''}`}
                          style={{
                            background: alpha(c, 0.22),
                            borderLeftColor: c,
                          }}
                        >
                          <span className="text-slate-950 dark:text-slate-100">{e.title}</span>
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            {/* Cuadrícula horaria */}
            <div className="grid grid-cols-[56px_repeat(7,minmax(0,1fr))]">
              <div className="relative" style={{ height: TOTAL_H }}>
                {HOURS.map((h, i) => (
                  <div
                    key={h}
                    className="absolute right-2 -translate-y-1/2 text-[10px] font-semibold text-slate-600 dark:text-slate-400 whitespace-nowrap"
                    style={{ top: i * HOUR_H }}
                  >
                    {i === 0 ? '' : hourLabel(h)}
                  </div>
                ))}
              </div>

              {days.map((d) => {
                const dayEvents = events.filter((e) => occursOn(e, d));
                const placed = layoutDay(dayEvents);
                const isToday = d === today;
                return (
                  <div
                    key={d}
                    className={`relative border-l border-border/60 ${isToday ? 'bg-primary/[0.04]' : ''}`}
                    style={{ height: TOTAL_H }}
                  >
                    {HOURS.map((h, i) => (
                      <div
                        key={h}
                        className="absolute inset-x-0 border-t border-border/40"
                        style={{ top: i * HOUR_H }}
                      />
                    ))}
                    {HOURS.map((h, i) => (
                      <div
                        key={`half-${h}`}
                        className="absolute inset-x-0 border-t border-dashed border-border/20"
                        style={{ top: i * HOUR_H + HOUR_H / 2 }}
                      />
                    ))}

                    {isToday && showNowLine && nowMin !== null && (
                      <div
                        className="absolute inset-x-0 z-20 pointer-events-none"
                        style={{ top: ((nowMin - START_H * 60) / 60) * HOUR_H }}
                      >
                        <div className="relative h-px bg-red-500">
                          <span className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-red-500" />
                        </div>
                      </div>
                    )}

                    {placed.map(({ event: e, top, height, col, cols }) => {
                      const c = compColor[e.competition];
                      const darkCompColor = compDarkTextColor[e.competition];
                      const done = !!today && getStatus(e, today) === 'done';
                      const compact = height < 56;
                      return (
                        <button
                          key={e.id}
                          onClick={() => setSelected(e)}
                          title={`${compName[e.competition]} · ${e.title}`}
                          className={`absolute z-10 overflow-hidden rounded-lg text-left px-2 py-1 border-l-4 transition-all hover:z-30 hover:shadow-md ${done ? 'opacity-50' : ''}`}
                          style={{
                            top: top + 1,
                            height: height - 2,
                            left: `calc(${(col / cols) * 100}% + 2px)`,
                            width: `calc(${100 / cols}% - 4px)`,
                            background: alpha(c, 0.22),
                            borderLeftColor: c,
                            boxShadow: `inset 0 0 0 1px ${alpha(c, 0.35)}`,
                          }}
                        >
                          {/* Nombre de competencia: oscuro en modo claro, brillante en modo oscuro */}
                          <div className="text-[10px] font-bold uppercase tracking-wide truncate flex items-center gap-1">
                            <span className="inline-block w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: c }} />
                            <span
                              className="truncate"
                              style={{
                                color: darkCompColor,
                              }}
                            >
                              <span className="dark:hidden font-bold">{compName[e.competition]}</span>
                              <span className="hidden dark:inline font-bold" style={{ color: c }}>{compName[e.competition]}</span>
                            </span>
                          </div>
                          {/* Título de la actividad: NEGRO sólido en modo claro, blanco/claro en modo oscuro */}
                          <div className={`text-[11px] font-bold leading-tight text-slate-950 dark:text-slate-100 ${compact ? 'line-clamp-1' : 'line-clamp-3'}`}>
                            {e.title}
                          </div>
                          {/* Horario: oscuro legible en modo claro, slate claro en modo oscuro */}
                          {!compact && (
                            <div className="mt-0.5 text-[10px] font-medium text-slate-700 dark:text-slate-300">
                              {formatTime12(e.startTime!)}
                              {e.endTime ? ` – ${formatTime12(e.endTime)}` : ''}
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {weekEvents.length === 0 && (
          <div className="py-10 text-center text-sm font-medium text-slate-600 dark:text-slate-400 border-t border-border/40">
            Sin actividades programadas esta semana.
          </div>
        )}
      </div>

      {/* Leyenda */}
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs font-medium text-slate-700 dark:text-slate-300">
        {competitions.map((c) => (
          <span key={c.id} className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm" style={{ background: c.color }} /> {c.shortName}
          </span>
        ))}
        <span className="inline-flex items-center gap-1.5">
          <span className="h-px w-4 bg-red-500" /> Hora actual
        </span>
      </div>

      {/* Detalle del evento seleccionado */}
      {selected && (
        <div
          className="mt-5 relative rounded-xl border bg-card/95 backdrop-blur-md p-5 fade-up shadow-md"
          style={{ borderColor: alpha(compColor[selected.competition], 0.6) }}
        >
          <button
            onClick={() => setSelected(null)}
            className="absolute top-3 right-3 h-7 w-7 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-foreground hover:bg-secondary/60"
            aria-label="Cerrar detalle"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="text-[11px] font-bold uppercase tracking-wide flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: compColor[selected.competition] }} />
            <span className="dark:hidden font-bold" style={{ color: compDarkTextColor[selected.competition] }}>
              {compName[selected.competition]}
            </span>
            <span className="hidden dark:inline font-bold" style={{ color: compColor[selected.competition] }}>
              {compName[selected.competition]}
            </span>
          </div>
          <h4 className="mt-1 text-lg font-bold font-headline text-slate-950 dark:text-slate-100 pr-8">{selected.title}</h4>
          <p className="mt-1 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{selected.description}</p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-slate-700 dark:text-slate-300">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <CalendarDays className="h-4 w-4 text-primary" /> {formatRange(selected.start, selected.end)}
            </span>
            {(selected.time || selected.startTime) && (
              <span className="inline-flex items-center gap-1.5 font-medium">
                <Clock className="h-4 w-4 text-primary" />
                {selected.time ??
                  `${formatTime12(selected.startTime!)}${selected.endTime ? ` – ${formatTime12(selected.endTime)}` : ''}`}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 font-medium">
              <MapPin className="h-4 w-4 text-primary" /> {selected.mode}
              {selected.place ? ` · ${selected.place}` : ''}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
