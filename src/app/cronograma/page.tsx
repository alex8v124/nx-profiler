import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, CalendarDays } from 'lucide-react';
import ScheduleView from '@/components/ui/schedule-view';

export const metadata: Metadata = {
  title: 'Cronograma | Nodux',
  description:
    'Agenda centralizada de las competencias y actividades en las que participa Nodux: Hackathon UTP x El Comercio, Interbank Challenge 2026 y Cajathon.',
};

export default function SchedulePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 border-b border-primary/20 shadow-lg bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span className="hidden sm:inline">Volver al Inicio</span>
            <span className="sm:hidden">Inicio</span>
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/logo.jpg" alt="Nodux" width={32} height={32} className="rounded-md" />
            <span className="font-bold font-headline text-foreground">Nodux</span>
          </Link>
        </div>
      </header>

      <main className="flex-grow relative">
        <div className="absolute inset-x-0 top-0 h-[480px] bg-gradient-to-b from-primary/10 via-primary/5 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm">
              <CalendarDays className="h-4 w-4" /> Planificación y coordinación operativa
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-accent">
              Cronograma Maestro
            </h1>
            <p className="text-lg text-muted-foreground">
              Todas las actividades de Nodux en un solo lugar: Hackathon UTP x El Comercio, Interbank Challenge 2026 y Cajathon.
              Sigue en tiempo real lo que estamos construyendo.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <ScheduleView />
          </div>
        </div>
      </main>

      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border/30">
        © 2026 Nodux. Todos los derechos reservados.
      </footer>
    </div>
  );
}
