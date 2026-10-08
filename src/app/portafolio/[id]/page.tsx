import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, Calendar, User, Tag, CheckCircle2 } from 'lucide-react';
import { projects } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default async function ProjectPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const project = projects.find((p) => p.id.toString() === params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 border-b border-primary/30 shadow-xl bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex items-center h-16 px-4 sm:px-6 lg:px-8">
          <Link href="/portafolio" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span>Volver al Portafolio</span>
          </Link>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-text-gradient">
                {project.title}
              </h1>
              <p className="text-xl text-muted-foreground">
                {project.description}
              </p>
            </div>

            <Separator className="bg-border/50" />

            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium">Cliente</span>
                </div>
                <p className="font-semibold text-foreground">{project.client}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Tag className="h-4 w-4" />
                  <span className="text-sm font-medium">Categoría</span>
                </div>
                <p className="font-semibold text-foreground">{project.imageHint}</p>
              </div>
            </div>

            <Separator className="bg-border/50" />

            <div>
              <h3 className="text-2xl font-bold font-headline mb-4 flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-accent" />
                Problema Resuelto
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {project.problemSolved}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-3">Tecnologías Utilizadas</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, idx) => (
                  <Badge key={idx} variant="secondary" className="px-3 py-1 text-sm bg-secondary/30 hover:bg-secondary/50">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {project.liveUrl && (
              <div className="pt-4">
                <Button asChild size="lg" className="w-full sm:w-auto font-semibold">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    Visitar Sitio en Vivo
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            )}
          </div>

          <div className="lg:mt-4">
            <div className="sticky top-24 aspect-[4/3] w-full rounded-xl overflow-hidden border border-border shadow-2xl shadow-primary/10 group">
              {project.imageUrl && project.imageUrl.startsWith('/') ? (
                <Image 
                  src={project.imageUrl} 
                  alt={project.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105" 
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-xl">
                  Imagen del Proyecto
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </main>

      <footer className="py-8 border-t border-border/20 text-center">
        <p className="text-sm text-muted-foreground">© 2025 Nodux. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
