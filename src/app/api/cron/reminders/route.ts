import { NextRequest, NextResponse } from 'next/server';
import {
  sendScheduleReminders,
  getRemindersForDate,
  buildEmailTemplate,
  DEFAULT_RECIPIENTS,
} from '@/lib/email-reminders';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // 1. Verificación opcional de seguridad con CRON_SECRET si está configurado
    const cronSecret = process.env.CRON_SECRET?.trim();
    const authHeader = req.headers.get('authorization');
    const secretParam = searchParams.get('secret');

    if (cronSecret) {
      const isAuthorized =
        authHeader === `Bearer ${cronSecret}` || secretParam === cronSecret;

      if (!isAuthorized && process.env.NODE_ENV === 'production') {
        return NextResponse.json(
          { error: 'No autorizado para ejecutar el cron job' },
          { status: 401 }
        );
      }
    }

    // Parámetros opcionales para pruebas
    const dateParam = searchParams.get('date') || undefined;
    const isPreview = searchParams.get('preview') === 'true' || searchParams.get('format') === 'html';
    const forceSend = searchParams.get('force') === 'true';
    const customTo = searchParams.get('to');
    const recipients = customTo
      ? customTo.split(',').map((e) => e.trim())
      : DEFAULT_RECIPIENTS;

    // Si pide vista previa en HTML directamente en el navegador
    if (isPreview) {
      const activities = getRemindersForDate(dateParam);
      const { html } = buildEmailTemplate(activities);
      return new NextResponse(html, {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
        },
      });
    }

    // Envío del recordatorio
    const result = await sendScheduleReminders({
      dateStr: dateParam,
      recipients,
      forceSendEvenIfEmpty: forceSend,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error('Error en /api/cron/reminders:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Error interno al procesar los recordatorios',
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  return GET(req);
}
