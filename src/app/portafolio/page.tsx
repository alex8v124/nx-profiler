import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { projects } from '@/lib/data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function PortfolioPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 border-b border-primary/30 shadow-xl bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex items-center h-16 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span>Volver al Inicio</span>
          </Link>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-text-gradient">
            Nuestro Portafolio
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explora los casos de éxito donde la tecnología y el análisis de datos transformaron la operativa de nuestros clientes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project) => (
            <Card key={project.id} className="group overflow-hidden bg-card border-border/50 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 flex flex-col transform hover:-translate-y-2">
              <CardHeader className="p-0">
                <div className="aspect-video relative w-full overflow-hidden">
                  {project.imageUrl && project.imageUrl.startsWith('/') ? (
                    <Image src={project.imageUrl} alt={project.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground transition-transform duration-500 group-hover:scale-105">
                      {project.title}
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <div className="font-semibold tracking-tight text-2xl mb-2 font-headline group-hover:text-primary transition-colors">
                  {project.title}
                </div>
                <p className="text-sm text-muted-foreground mb-2">Cliente: {project.client}</p>
                <CardDescription className="text-base text-card-foreground/80 line-clamp-3">
                  {project.description}
                </CardDescription>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech, idx) => (
                    <Badge key={idx} variant="secondary" className="bg-secondary/50 hover:bg-secondary">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge variant="outline">+{project.technologies.length - 3}</Badge>
                  )}
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Link
                  href={`/portafolio/${project.id}`}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 rounded-md px-3 w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Ver Proyecto Detalles
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

      <footer className="py-8 border-t border-border/20 text-center">
        <p className="text-sm text-muted-foreground">© 2026 Nodux. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
