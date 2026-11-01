import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, User, Tag, CheckCircle2 } from 'lucide-react';
import { projects } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import ThemeToggle from '@/components/ui/theme-toggle';

export default async function ProjectPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const project = projects.find((p) => p.id.toString() === params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 border-b border-primary/30 shadow-xl bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          <Link href="/portafolio" className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors font-medium">
            <ArrowLeft className="h-5 w-5" />
            <span>Volver al Portafolio</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 text-slate-950 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-primary dark:via-accent dark:to-primary">
                {project.title}
              </h1>
              <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed">
                {project.description}
              </p>
            </div>

            <Separator className="bg-border/50" />

            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1">
                  <User className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold">Cliente</span>
                </div>
                <p className="font-bold text-slate-950 dark:text-slate-100 text-lg">{project.client}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1">
                  <Tag className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold">Categoría</span>
                </div>
                <p className="font-bold text-slate-950 dark:text-slate-100 text-lg">{project.imageHint}</p>
              </div>
            </div>

            <Separator className="bg-border/50" />

            <div>
              <h3 className="text-2xl font-bold font-headline mb-4 flex items-center gap-2 text-slate-950 dark:text-slate-100">
                <CheckCircle2 className="h-6 w-6 text-primary" />
                Problema Resuelto
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base">
                {project.problemSolved}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-3 text-slate-950 dark:text-slate-100">Tecnologías Utilizadas</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, idx) => (
                  <Badge key={idx} variant="secondary" className="px-3 py-1 text-sm bg-slate-100 text-slate-800 border border-slate-200 hover:bg-slate-200 dark:bg-secondary/50 dark:text-secondary-foreground dark:border-border/50 font-medium">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {project.liveUrl && (
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Button asChild size="lg" className="w-full sm:w-auto font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <span>Visitar Sitio en Vivo</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-colors truncate max-w-xs flex items-center gap-1.5 font-medium"
                >
                  <span className="truncate">{project.liveUrl}</span>
                </a>
              </div>
            )}
          </div>

          <div className="lg:mt-4">
            <div className="sticky top-24 aspect-[4/3] w-full rounded-xl overflow-hidden border border-slate-200 dark:border-border shadow-2xl shadow-primary/10 group bg-muted">
              {project.imageUrl && project.imageUrl.startsWith('/') ? (
                project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full h-full relative cursor-pointer"
                    title="Visitar sitio web en vivo"
                  >
                    <Image 
                      src={project.imageUrl} 
                      alt={project.title} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                    <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md border border-white/20 text-xs font-semibold px-3.5 py-2 rounded-full flex items-center gap-2 text-white shadow-lg group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                      <span>Ver proyecto en vivo</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </div>
                  </a>
                ) : (
                  <>
                    <Image 
                      src={project.imageUrl} 
                      alt={project.title} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  </>
                )
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-xl">
                  Imagen del Proyecto
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="py-8 border-t border-border/20 text-center">
        <p className="text-sm text-slate-600 dark:text-slate-400">© 2026 Nodux. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
