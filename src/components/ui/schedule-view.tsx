'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Code2,
  Flag,
  GraduationCap,
  Hourglass,
  Layers,
  MapPin,
  Mic,
  Presentation,
  Rocket,
  CalendarRange,
  Rows3,
  Trophy,
  Users,
  Video,
  FileText,
  Timer,
  type LucideIcon,
} from 'lucide-react';
import {
  competitions,
  addDays,
  daysBetween,
  formatRange,
  formatShort,
  getStatus,
  parseDate,
  scheduleEvents,
  startOfWeek,
  todayInLima,
  type Competition,
  type CompetitionId,
  type EventKind,
  type ScheduleEvent,
} from '@/lib/schedule';
import WeekCalendar from '@/components/ui/week-calendar';

const KIND_META: Record<EventKind, { label: string; icon: LucideIcon }> = {
  inicio: { label: 'Inicio', icon: Rocket },
  desarrollo: { label: 'Desarrollo', icon: Code2 },
  entrega: { label: 'Entregable', icon: FileText },
  pitch: { label: 'Pitch', icon: Mic },
  workshop: { label: 'Workshop', icon: GraduationCap },
  evaluacion: { label: 'Evaluación', icon: Hourglass },
  fase: { label: 'Fase', icon: Layers },
  final: { label: 'Final', icon: Trophy },
};

const MODE_ICON = { Virtual: Video, Presencial: MapPin, Híbrido: Users } as const;

type Filter = 'all' | CompetitionId;
type View = 'timeline' | 'week';

const compById = Object.fromEntries(competitions.map((c) => [c.id, c])) as Record<CompetitionId, Competition>;

function hexAlpha(hex: string, alpha: number) {
  return `${hex}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`;
}

function countdownLabel(days: number) {
  if (days <= 0) return 'Hoy';
  if (days === 1) return 'Mañana';
  return `En ${days} días`;
}

export default function ScheduleView() {
  const [today, setToday] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>('all');
  const [view, setView] = useState<View>('timeline');
  const [weekStart, setWeekStart] = useState<string | null>(null);
  const [jumped, setJumped] = useState(false);

  useEffect(() => {
    setToday(todayInLima());
    const id = setInterval(() => setToday(todayInLima()), 60 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

  const sorted = useMemo(
    () => [...scheduleEvents].sort((a, b) => a.start.localeCompare(b.start) || (a.end ?? a.start).localeCompare(b.end ?? b.start)),
    []
  );

  useEffect(() => {
    if (!today || weekStart) return;
    let ws = startOfWeek(today);
    const hasEvents = scheduleEvents.some((e) => e.start <= addDays(ws, 6) && (e.end ?? e.start) >= ws);
    if (!hasEvents) {
      const upcoming = [...scheduleEvents]
        .sort((a, b) => a.start.localeCompare(b.start))
        .find((e) => getStatus(e, today) !== 'done');
      if (upcoming) {
        ws = startOfWeek(upcoming.start);
        setJumped(true);
      }
    }
    setWeekStart(ws);
  }, [today, weekStart]);

  const visible = useMemo(
    () => (filter === 'all' ? sorted : sorted.filter((e) => e.competition === filter)),
    [sorted, filter]
  );

  const groups = useMemo(() => {
    const map = new Map<string, ScheduleEvent[]>();
    visible.forEach((e) => {
      map.set(e.start, [...(map.get(e.start) ?? []), e]);
    });
    return Array.from(map.entries());
  }, [visible]);

  // Próxima actividad (global): primera que no ha terminado
  const next = useMemo(() => {
    if (!today) return null;
    return sorted.find((e) => getStatus(e, today) !== 'done') ?? null;
  }, [sorted, today]);

  const stats = useMemo(() => {
    const total = scheduleEvents.length;
    if (!today) return { total, week: 0, done: 0 };
    const week = scheduleEvents.filter((e) => {
      const d = daysBetween(today, e.start);
      return d >= 0 && d <= 7;
    }).length;
    const done = scheduleEvents.filter((e) => getStatus(e, today) === 'done').length;
    return { total, week, done };
  }, [today]);

  return (
    <div className="space-y-14">
      {/* ───────── Resumen ───────── */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 relative overflow-hidden rounded-2xl border border-primary/30 bg-card/60 backdrop-blur-md p-6 sm:p-8 fade-up">
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
          <div className="relative">
            <div className="flex items-center gap-2 text-primary text-sm font-semibold uppercase tracking-wider mb-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
              </span>
              Próxima actividad
            </div>
            {next && today ? (
              <>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span
                    className="px-2.5 py-0.5 rounded-full text-xs font-semibold border"
                    style={{
                      color: compById[next.competition].color,
                      background: hexAlpha(compById[next.competition].color, 0.12),
                      borderColor: hexAlpha(compById[next.competition].color, 0.35),
                    }}
                  >
                    {compById[next.competition].shortName}
                  </span>
                  <span className="text-xs text-muted-foreground">{formatRange(next.start, next.end)}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold font-headline text-foreground leading-tight">{next.title}</h3>
                <p className="mt-2 text-muted-foreground max-w-xl">{next.description}</p>
                <div className="mt-5 flex flex-wrap items-center gap-4 text-sm">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/15 text-primary font-semibold border border-primary/30">
                    <Timer className="h-4 w-4" />
                    {getStatus(next, today) === 'ongoing' ? 'En curso' : countdownLabel(daysBetween(today, next.start))}
                  </span>
                  {next.time && (
                    <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                      <Clock className="h-4 w-4" /> {next.time}
                    </span>
                  )}
                  {next.place && (
                    <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                      <MapPin className="h-4 w-4" /> {next.place}
                    </span>
                  )}
                </div>
              </>
            ) : (
              <p className="text-muted-foreground">
                {today ? 'Todas las actividades programadas han finalizado.' : 'Cargando agenda…'}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 lg:grid-cols-1 gap-3 fade-up" style={{ animationDelay: '0.1s' }}>
          {[
            { label: 'Competencias', value: competitions.length, icon: Trophy },
            { label: 'Hitos programados', value: stats.total, icon: Flag },
            { label: 'Próximos 7 días', value: stats.week, icon: CalendarDays },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-border/60 bg-card/50 backdrop-blur-md p-4 flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4"
            >
              <div className="h-10 w-10 shrink-0 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary">
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-bold font-headline text-foreground leading-none">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ───────── Competencias ───────── */}
      <section>
        <div className="flex items-end justify-between mb-5">
          <h2 className="text-2xl font-bold font-headline text-foreground">Competencias</h2>
          <span className="text-xs text-muted-foreground hidden sm:block">Haz clic en una tarjeta para filtrar</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {competitions.map((c, i) => {
            const total = Math.max(daysBetween(c.start, c.end), 1);
            const elapsed = today ? Math.min(Math.max(daysBetween(c.start, today), 0), total) : 0;
            const pct = Math.round((elapsed / total) * 100);
            const status = today ? getStatus(c, today) : 'upcoming';
            const active = filter === c.id;
            const ModeIcon = MODE_ICON[c.mode];
            return (
              <button
                key={c.id}
                onClick={() => setFilter(active ? 'all' : c.id)}
                className="group text-left relative overflow-hidden rounded-2xl border bg-card/60 backdrop-blur-md p-6 transition-all duration-300 hover:-translate-y-1 fade-up"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  borderColor: active ? c.color : hexAlpha(c.color, 0.25),
                  boxShadow: active ? `0 10px 40px -12px ${hexAlpha(c.color, 0.55)}` : undefined,
                }}
                aria-pressed={active}
              >
                <div
                  className="absolute -top-16 -right-16 w-44 h-44 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"
                  style={{ background: c.color }}
                />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border"
                      style={{ color: c.color, background: hexAlpha(c.color, 0.12), borderColor: hexAlpha(c.color, 0.35) }}
                    >
                      <ModeIcon className="h-3 w-3" /> {c.mode}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {status === 'done' ? 'Finalizada' : status === 'ongoing' ? 'En curso' : 'Próxima'}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold font-headline text-foreground leading-snug">{c.name}</h3>
                  <p className="text-xs mt-1" style={{ color: c.color }}>
                    {[c.edition, c.focus].filter(Boolean).join(' • ')}
                  </p>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{c.description}</p>

                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="h-3.5 w-3.5" /> {formatShort(c.start)} – {formatShort(c.end)}
                    </span>
                    {c.location && (
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" /> {c.location}
                      </span>
                    )}
                    {c.prize && (
                      <span className="inline-flex items-center gap-1 font-semibold" style={{ color: c.color }}>
                        <Trophy className="h-3.5 w-3.5" /> {c.prize}
                      </span>
                    )}
                  </div>

                  <div className="mt-5">
                    <div className="flex justify-between text-[11px] text-muted-foreground mb-1.5">
                      <span>Avance del calendario</span>
                      <span>{today ? `${pct}%` : '—'}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${hexAlpha(c.color, 0.6)}, ${c.color})` }}
                      />
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ───────── Controles ───────── */}
      <section>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h2 className="text-2xl font-bold font-headline text-foreground">Agenda detallada</h2>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3.5 py-1.5 rounded-full text-sm border transition-colors ${
                  filter === 'all'
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-card/50 text-muted-foreground border-border hover:text-foreground hover:border-primary/40'
                }`}
              >
                Todas
              </button>
              {competitions.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setFilter(c.id)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm border transition-colors font-medium"
                  style={
                    filter === c.id
                      ? { background: c.color, color: c.id === 'interbank' ? '#0F172A' : '#FFFFFF', borderColor: c.color, fontWeight: 600 }
                      : { background: hexAlpha(c.color, 0.08), borderColor: hexAlpha(c.color, 0.35) }
                  }
                >
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                  <span className={filter === c.id ? '' : 'text-slate-800 dark:text-slate-200'}>{c.shortName}</span>
                </button>
              ))}
            </div>
            <div className="inline-flex rounded-xl border border-border bg-card/50 p-1">
              {(
                [
                  { id: 'timeline', label: 'Cronología', icon: Rows3 },
                  { id: 'week', label: 'Calendario semanal', icon: CalendarRange },
                ] as const
              ).map((v) => (
                <button
                  key={v.id}
                  onClick={() => setView(v.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    view === v.id ? 'bg-primary/20 text-primary font-semibold' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <v.icon className="h-4 w-4" /> {v.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {view === 'timeline' ? (
          <Timeline groups={groups} today={today} />
        ) : weekStart ? (
          <WeekCalendar
            today={today}
            events={visible}
            weekStart={weekStart}
            onWeekChange={(w) => {
              setJumped(false);
              setWeekStart(w);
            }}
            jumped={jumped}
          />
        ) : (
          <div className="py-16 text-center text-sm text-muted-foreground">Cargando calendario…</div>
        )}
      </section>
    </div>
  );
}

/* ───────────────────────── Cronología ───────────────────────── */

function Timeline({ groups, today }: { groups: [string, ScheduleEvent[]][]; today: string | null }) {
  return (
    <ol className="relative">
      <span className="absolute left-[27px] sm:left-[91px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-border to-transparent" aria-hidden />
      {groups.map(([date, events], gi) => {
        const { day, month, weekday } = parseDate(date);
        const isToday = today === date;
        const allDone = !!today && events.every((e) => getStatus(e, today) === 'done');
        return (
          <li
            key={date}
            className="relative flex gap-4 sm:gap-6 pb-8 fade-up"
            style={{ animationDelay: `${Math.min(gi, 8) * 0.05}s` }}
          >
            <div className="hidden sm:block w-[64px] shrink-0 text-right pt-1">
              <div className={`text-3xl font-bold font-headline leading-none ${allDone ? 'text-muted-foreground' : 'text-foreground'}`}>
                {day}
              </div>
              <div className="text-xs uppercase tracking-wider text-primary mt-1">{month}</div>
              <div className="text-[11px] text-muted-foreground">{weekday.slice(0, 3)}</div>
            </div>

            <div className="relative shrink-0 w-[14px] pt-2.5">
              <span
                className={`block h-3.5 w-3.5 rounded-full border-2 ${
                  isToday
                    ? 'bg-primary border-primary shadow-[0_0_0_6px_rgba(37,99,235,0.25)]'
                    : allDone
                    ? 'bg-muted border-border'
                    : 'bg-background border-primary'
                }`}
              />
            </div>

            <div className="flex-1 min-w-0 space-y-3">
              <div className="sm:hidden text-sm font-semibold text-foreground">
                {weekday}, {day} {month}
              </div>
              {events.map((e) => (
                <EventCard key={e.id} event={e} today={today} />
              ))}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function EventCard({ event, today }: { event: ScheduleEvent; today: string | null }) {
  const c = compById[event.competition];
  const kind = KIND_META[event.kind];
  const KindIcon = kind.icon;
  const ModeIcon = MODE_ICON[event.mode];
  const status = today ? getStatus(event, today) : 'upcoming';
  const days = today ? daysBetween(today, event.start) : null;

  return (
    <article
      className={`relative overflow-hidden rounded-xl border bg-card/60 backdrop-blur-sm p-4 sm:p-5 transition-all duration-300 hover:bg-card/90 hover:-translate-y-0.5 ${
        status === 'done' ? 'opacity-60' : ''
      }`}
      style={{
        borderColor: status === 'ongoing' ? c.color : hexAlpha(c.color, 0.22),
        boxShadow: status === 'ongoing' ? `0 8px 30px -14px ${hexAlpha(c.color, 0.7)}` : undefined,
      }}
    >
      <span className="absolute left-0 top-0 bottom-0 w-1" style={{ background: c.color }} />
      <div className="flex items-start gap-3 pl-1.5">
        <div
          className="h-10 w-10 shrink-0 rounded-lg flex items-center justify-center border"
          style={{ color: c.color, background: hexAlpha(c.color, 0.12), borderColor: hexAlpha(c.color, 0.3) }}
        >
          <KindIcon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: c.color }}>
              {c.shortName}
            </span>
            <span className="text-[11px] text-muted-foreground">• {kind.label}</span>
            <StatusBadge status={status} days={days} color={c.color} />
          </div>
          <h4 className="font-semibold text-foreground leading-snug">{event.title}</h4>
          <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
            {event.end && event.end !== event.start && (
              <span className="inline-flex items-center gap-1">
                <CalendarDays className="h-3.5 w-3.5" /> {formatRange(event.start, event.end)}
              </span>
            )}
            {event.time && (
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> {event.time}
              </span>
            )}
            <span className="inline-flex items-center gap-1">
              <ModeIcon className="h-3.5 w-3.5" /> {event.mode}
              {event.place ? ` · ${event.place}` : ''}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

function StatusBadge({ status, days, color }: { status: 'upcoming' | 'ongoing' | 'done'; days: number | null; color: string }) {
  if (status === 'done') {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
        <CheckCircle2 className="h-3 w-3" /> Finalizado
      </span>
    );
  }
  if (status === 'ongoing') {
    return (
      <span
        className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-full"
        style={{ color, background: hexAlpha(color, 0.15) }}
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style={{ background: color }} />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: color }} />
        </span>
        En curso
      </span>
    );
  }
  if (days === null) return null;
  return <span className="text-[11px] text-muted-foreground">• {countdownLabel(days)}</span>;
}
