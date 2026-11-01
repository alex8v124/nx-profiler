import {
  competitions,
  scheduleEvents,
  todayInLima,
  addDays,
  formatRange,
  formatTime12,
  parseDate,
  type Competition,
  type CompetitionId,
  type ScheduleEvent,
} from '@/lib/schedule';
import nodemailer from 'nodemailer';
import { Resend } from 'resend';

export const DEFAULT_RECIPIENTS = [
  'alex.04.antay@gmail.com',
  'lopeznicolaswork@gmail.com',
];

export interface ReminderActivities {
  targetDate: string;
  tomorrowDate: string;
  todayEvents: ScheduleEvent[];
  tomorrowEvents: ScheduleEvent[];
}

const compMap = Object.fromEntries(
  competitions.map((c) => [c.id, c])
) as Record<CompetitionId, Competition>;

/**
 * Encuentra las actividades del día exacto (hoy) y con 1 día de anticipación (mañana)
 */
export function getRemindersForDate(dateStr?: string): ReminderActivities {
  const targetDate = dateStr || todayInLima();
  const tomorrowDate = addDays(targetDate, 1);

  // Actividades de HOY: las que arrancan hoy o están en curso con hito hoy
  const todayEvents = scheduleEvents.filter((e) => {
    // Si arranca hoy
    if (e.start === targetDate) return true;
    // Si es un rango de fechas que incluye hoy y tiene horario/pitch/entrega específica
    if (e.end && targetDate >= e.start && targetDate <= e.end) return true;
    return false;
  });

  // Actividades de MAÑANA: las que arrancan exactamente mañana (recordatorio 24h antes)
  const tomorrowEvents = scheduleEvents.filter((e) => e.start === tomorrowDate);

  return {
    targetDate,
    tomorrowDate,
    todayEvents,
    tomorrowEvents,
  };
}

function renderEventHtml(event: ScheduleEvent, labelBadge: string, badgeBg: string, badgeColor: string): string {
  const comp = compMap[event.competition];
  const dateFormatted = formatRange(event.start, event.end);
  const timeFormatted =
    event.time ||
    (event.startTime
      ? `${formatTime12(event.startTime)}${event.endTime ? ` – ${formatTime12(event.endTime)}` : ''}`
      : 'Todo el día');

  return `
    <div style="background-color: #1E293B; border-left: 4px solid ${comp.color}; border-radius: 8px; padding: 18px 20px; margin-bottom: 16px;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
        <span style="background-color: ${badgeBg}; color: ${badgeColor}; font-size: 11px; font-weight: 700; text-transform: uppercase; padding: 3px 8px; border-radius: 4px; letter-spacing: 0.5px;">
          ${labelBadge}
        </span>
        <span style="color: ${comp.color}; font-size: 12px; font-weight: 700; text-transform: uppercase;">
          ${comp.shortName} ${comp.edition ? `(${comp.edition})` : ''}
        </span>
      </div>

      <h3 style="color: #F8FAFC; margin: 0 0 8px 0; font-size: 18px; font-weight: 700; line-height: 1.3;">
        ${event.title}
      </h3>

      <p style="color: #94A3B8; margin: 0 0 14px 0; font-size: 14px; line-height: 1.5;">
        ${event.description}
      </p>

      <div style="background-color: #0F172A; border-radius: 6px; padding: 10px 14px; display: grid; gap: 8px; font-size: 13px;">
        <div style="color: #CBD5E1;">
          <strong style="color: #38BDF8;">📅 Fechas:</strong> ${dateFormatted}
        </div>
        <div style="color: #CBD5E1;">
          <strong style="color: #38BDF8;">⏰ Horario:</strong> ${timeFormatted}
        </div>
        <div style="color: #CBD5E1;">
          <strong style="color: #38BDF8;">📍 Modalidad / Sede:</strong> ${event.mode} ${event.place ? `• ${event.place}` : ''}
        </div>
        <div style="color: #CBD5E1;">
          <strong style="color: #38BDF8;">🎯 Enfoque:</strong> ${comp.focus}
        </div>
        ${comp.prize ? `<div style="color: #FBBF24;"><strong style="color: #F59E0B;">🏆 Premio:</strong> ${comp.prize}</div>` : ''}
      </div>
    </div>
  `;
}

export function buildEmailTemplate(data: ReminderActivities, appUrl: string = 'https://nx-profiler-nine.vercel.app'): {
  subject: string;
  html: string;
  text: string;
} {
  const { targetDate, tomorrowDate, todayEvents, tomorrowEvents } = data;
  const pToday = parseDate(targetDate);
  const pTomorrow = parseDate(tomorrowDate);

  const hasToday = todayEvents.length > 0;
  const hasTomorrow = tomorrowEvents.length > 0;

  // Build subject line
  let subject = `[Nodux Cronograma] `;
  if (hasToday && hasTomorrow) {
    subject += `🚨 Hoy: ${todayEvents[0].title} + Recordatorio Mañana`;
  } else if (hasToday) {
    subject += `🚨 Hoy (${pToday.day} ${pToday.month}): ${todayEvents[0].title}`;
  } else if (hasTomorrow) {
    subject += `⏳ Mañana (${pTomorrow.day} ${pTomorrow.month}): ${tomorrowEvents[0].title} (Anticipación 24h)`;
  } else {
    subject += `Estado del Cronograma Maestro (${pToday.day} ${pToday.month})`;
  }

  const todayBlocks = hasToday
    ? todayEvents
        .map((e) => renderEventHtml(e, '🚨 HOY', 'rgba(239, 68, 68, 0.2)', '#F87171'))
        .join('')
    : `<p style="color: #64748B; font-size: 14px; font-style: italic; margin: 0 0 16px 0;">No hay actividades críticas programadas para el día de hoy.</p>`;

  const tomorrowBlocks = hasTomorrow
    ? tomorrowEvents
        .map((e) => renderEventHtml(e, '⏳ MAÑANA (24H ANTES)', 'rgba(245, 158, 11, 0.2)', '#FBBF24'))
        .join('')
    : `<p style="color: #64748B; font-size: 14px; font-style: italic; margin: 0 0 16px 0;">No hay nuevas actividades programadas para iniciar el día de mañana.</p>`;

  const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #0B0F19; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #E2E8F0;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0B0F19; padding: 24px 12px;">
        <tr>
          <td align="center">
            <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #0F172A; border-radius: 12px; border: 1px solid #334155; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5);">
              
              <!-- Header -->
              <tr>
                <td style="padding: 24px; background: linear-gradient(135deg, #1E3A8A 0%, #1E1B4B 100%); border-bottom: 1px solid #3B82F6;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td>
                        <span style="color: #60A5FA; font-size: 12px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;">
                          NODUX • SISTEMA OPERATIVO
                        </span>
                        <h1 style="color: #FFFFFF; font-size: 22px; margin: 6px 0 0 0; font-weight: 800;">
                          Recordatorio de Cronograma Maestro
                        </h1>
                        <p style="color: #93C5FD; margin: 4px 0 0 0; font-size: 13px;">
                          Sincronización y seguimiento en tiempo real de competencias y entregables.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Content Body -->
              <tr>
                <td style="padding: 24px;">
                  
                  <!-- HOY SECTION -->
                  <div style="margin-bottom: 28px;">
                    <h2 style="color: #EF4444; font-size: 16px; margin: 0 0 14px 0; text-transform: uppercase; letter-spacing: 1px; display: flex; align-items: center;">
                      🚨 Actividades de HOY (${pToday.weekday}, ${pToday.day} de ${pToday.month})
                    </h2>
                    ${todayBlocks}
                  </div>

                  <!-- MAÑANA SECTION -->
                  <div style="margin-bottom: 28px;">
                    <h2 style="color: #F59E0B; font-size: 16px; margin: 0 0 14px 0; text-transform: uppercase; letter-spacing: 1px;">
                      ⏳ Actividades de MAÑANA (${pTomorrow.weekday}, ${pTomorrow.day} de ${pTomorrow.month}) — Preparación 24h
                    </h2>
                    ${tomorrowBlocks}
                  </div>

                  <!-- CTA BUTTON -->
                  <div style="text-align: center; margin: 32px 0 20px 0;">
                    <a href="${appUrl}/cronograma" target="_blank" style="display: inline-block; background-color: #2563EB; color: #FFFFFF; padding: 14px 28px; font-size: 15px; font-weight: 700; text-decoration: none; border-radius: 8px; box-shadow: 0 4px 14px 0 rgba(37,99,235,0.4);">
                      Ver Cronograma Completo en Vivo →
                    </a>
                  </div>

                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding: 20px; background-color: #090D16; border-top: 1px solid #1E293B; text-align: center; font-size: 12px; color: #64748B;">
                  <p style="margin: 0 0 6px 0;">
                    Este es un recordatorio automatizado enviado a <strong>alex.04.antay@gmail.com</strong> y <strong>lopeznicolaswork@gmail.com</strong>.
                  </p>
                  <p style="margin: 0;">
                    © 2026 Nodux • Soluciones que se adaptan a ti, tecnología que transforma.
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  // Text version for text-only clients
  const text = `
RECORDATORIO DE CRONOGRAMA MAESTRO - NODUX
==================================================

[HOY] ${pToday.weekday}, ${pToday.day} de ${pToday.month}:
${
  hasToday
    ? todayEvents
        .map(
          (e) =>
            `- ${e.title} (${compMap[e.competition].shortName})\n  Horario: ${
              e.time || e.startTime || 'Todo el día'
            }\n  Modalidad: ${e.mode}${e.place ? ` (${e.place})` : ''}\n  Detalle: ${e.description}\n`
        )
        .join('\n')
    : 'Sin actividades críticas hoy.'
}

[MAÑANA - 24H ANTES] ${pTomorrow.weekday}, ${pTomorrow.day} de ${pTomorrow.month}:
${
  hasTomorrow
    ? tomorrowEvents
        .map(
          (e) =>
            `- ${e.title} (${compMap[e.competition].shortName})\n  Horario: ${
              e.time || e.startTime || 'Todo el día'
            }\n  Modalidad: ${e.mode}${e.place ? ` (${e.place})` : ''}\n  Detalle: ${e.description}\n`
        )
        .join('\n')
    : 'Sin actividades programadas para iniciar mañana.'
}

Ver calendario completo en vivo: ${appUrl}/cronograma
==================================================
Nodux 2026
`;

  return { subject, html, text };
}

/**
 * Envía el recordatorio por correo utilizando Resend o SMTP de Nodemailer
 */
export async function sendScheduleReminders(options?: {
  dateStr?: string;
  recipients?: string[];
  forceSendEvenIfEmpty?: boolean;
}): Promise<{
  success: boolean;
  message: string;
  activities: ReminderActivities;
  provider?: string;
  deliveredTo?: string[];
  error?: string;
}> {
  const activities = getRemindersForDate(options?.dateStr);
  const recipients = options?.recipients || DEFAULT_RECIPIENTS;

  const totalEvents = activities.todayEvents.length + activities.tomorrowEvents.length;
  if (totalEvents === 0 && !options?.forceSendEvenIfEmpty) {
    return {
      success: true,
      message: `No hay actividades programadas para hoy (${activities.targetDate}) ni para mañana (${activities.tomorrowDate}). No fue necesario enviar correo.`,
      activities,
    };
  }

  const { subject, html, text } = buildEmailTemplate(activities);

  const smtpUser = process.env.SMTP_USER?.trim();
  const smtpPass = process.env.SMTP_PASS?.trim();
  const resendApiKey = process.env.RESEND_API_KEY?.trim();

  // Opción A: Si tienen configurado Gmail SMTP (ideal cuando no se tiene dominio propio)
  if (smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"Nodux Cronograma" <${smtpUser}>`,
        to: recipients.join(', '),
        subject,
        html,
        text,
      });

      return {
        success: true,
        message: `Correo enviado exitosamente a todos los destinatarios (${recipients.join(', ')}) vía Gmail SMTP.`,
        provider: 'gmail-smtp',
        deliveredTo: recipients,
        activities,
      };
    } catch (smtpErr: any) {
      console.error('Error enviando con Gmail SMTP:', smtpErr);
      if (!resendApiKey) {
        return {
          success: false,
          message: 'Error al enviar mediante Gmail SMTP',
          error: smtpErr.message,
          activities,
        };
      }
    }
  }

  // Opción B: Resend (vía variable de entorno RESEND_API_KEY)
  const activeResendKey = resendApiKey;
  if (activeResendKey) {
    try {
      const resend = new Resend(activeResendKey);
      const fromEmail = process.env.REMINDER_FROM_EMAIL || 'onboarding@resend.dev';

      const deliveredTo: string[] = [];
      const failures: { email: string; error: string }[] = [];

      for (const recipient of recipients) {
        try {
          const res = await resend.emails.send({
            from: fromEmail,
            to: recipient,
            subject,
            html,
            text,
          });

          if (res.error) {
            failures.push({ email: recipient, error: res.error.message });
          } else {
            deliveredTo.push(recipient);
          }
        } catch (singleErr: any) {
          failures.push({ email: recipient, error: singleErr.message });
        }
      }

      if (deliveredTo.length > 0) {
        return {
          success: true,
          message:
            failures.length > 0
              ? `Correo enviado a: ${deliveredTo.join(', ')}. (Para enviar a ${failures.map((f) => f.email).join(', ')} sin dominio propio, puedes activar Gmail SMTP con SMTP_USER y SMTP_PASS).`
              : `Correo enviado exitosamente a todos los destinatarios (${deliveredTo.join(', ')}) vía Resend.`,
          provider: 'resend',
          deliveredTo,
          activities,
          ...(failures.length > 0 ? { warning: failures } : {}),
        };
      } else {
        throw new Error(
          failures.map((f) => `${f.email}: ${f.error}`).join(' | ') || 'Fallo general de entrega en Resend'
        );
      }
    } catch (err: any) {
      console.error('Error enviando con Resend:', err);
      return {
        success: false,
        message: 'Error al enviar mediante Resend',
        error: err.message,
        activities,
      };
    }
  }

  // Modo Simulación / Vista Previa si aún no se configuraron credenciales
  return {
    success: true,
    message:
      'Recordatorio procesado con éxito (Modo Simulación: configure RESEND_API_KEY o SMTP_USER/SMTP_PASS en .env.local para el envío real a las bandejas de entrada).',
    provider: 'simulated-preview',
    deliveredTo: recipients,
    activities,
  };
}
