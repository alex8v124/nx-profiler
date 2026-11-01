import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { projects } from '@/lib/data';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ThemeToggle from '@/components/ui/theme-toggle';

export default function PortfolioPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 border-b border-primary/30 shadow-xl bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors font-medium">
            <ArrowLeft className="h-5 w-5" />
            <span>Volver al Inicio</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 text-slate-950 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-primary dark:via-accent dark:to-primary">
            Nuestro Portafolio
          </h1>
          <p className="text-xl text-slate-700 dark:text-slate-300 max-w-2xl mx-auto">
            Explora los casos de éxito donde la tecnología y el análisis de datos transformaron la operativa de nuestros clientes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {projects.map((project) => (
            <Card key={project.id} className="group overflow-hidden bg-card/90 border-border/60 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 flex flex-col transform hover:-translate-y-2">
              <CardHeader className="p-0">
                <Link href={`/portafolio/${project.id}`} className="block aspect-video relative w-full overflow-hidden bg-muted cursor-pointer" title={`Ver detalles de ${project.title}`}>
                  {project.imageUrl && project.imageUrl.startsWith('/') ? (
                    <Image src={project.imageUrl} alt={project.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground transition-transform duration-500 group-hover:scale-105">
                      {project.title}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-xs font-semibold px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center gap-1.5 shadow-md">
                      Ver proyecto <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <Link href={`/portafolio/${project.id}`}>
                  <div className="font-bold tracking-tight text-2xl mb-2 font-headline text-slate-950 dark:text-slate-100 group-hover:text-primary transition-colors">
                    {project.title}
                  </div>
                </Link>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-2">
                  <span className="text-slate-500 dark:text-slate-400 font-normal">Cliente:</span> {project.client}
                </p>
                <p className="text-base text-slate-700 dark:text-slate-300 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech, idx) => (
                    <Badge key={idx} variant="secondary" className="bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200 dark:bg-secondary/50 dark:text-secondary-foreground font-medium">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge variant="outline" className="border-slate-300 text-slate-800 dark:border-border dark:text-foreground font-medium">
                      +{project.technologies.length - 3}
                    </Badge>
                  )}
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0 flex gap-2">
                <Link
                  href={`/portafolio/${project.id}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 rounded-md px-3 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
                >
                  Ver Proyecto Detalles
                </Link>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 rounded-md px-3 bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300 dark:bg-secondary/80 dark:hover:bg-secondary dark:text-secondary-foreground dark:border-border/50 hover:text-primary transition-colors"
                    title="Visitar sitio web en vivo"
                  >
                    <span>En vivo</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

      <footer className="py-8 border-t border-border/20 text-center">
        <p className="text-sm text-slate-600 dark:text-slate-400">© 2026 Nodux. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
