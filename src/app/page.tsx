import Image from 'next/image';
import Link from 'next/link';
import { Menu, ArrowDown, Zap, ExternalLink, ArrowRight, Target, Eye, Lightbulb, Handshake, Award, Users, Shuffle, ShieldCheck, Briefcase, Linkedin, MessageCircle, Phone, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { projects, teamMembers } from '@/lib/data';
import ClientBackground from '@/components/ui/client-background';
import ScrollAnimations from '@/components/ui/scroll-animations';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollAnimations />
      <header className="sticky top-0 z-50 border-b border-primary/20 shadow-lg bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex items-center justify-between relative z-10 py-4 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative overflow-hidden rounded-md group-hover:ring-2 group-hover:ring-primary/50 transition-all duration-300">
              <Image
                src="/images/logo.jpg"
                alt="Nodux Logo"
                width={48}
                height={48}
                className="object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <h1 className="text-2xl font-bold font-headline text-foreground group-hover:text-primary transition-colors duration-300">
              Nodux
            </h1>
          </Link>
          <nav className="hidden md:flex gap-8">
            <Link href="#portfolio" className="font-medium text-muted-foreground hover:text-primary transition-colors">Portafolio</Link>
            <Link href="#about" className="font-medium text-muted-foreground hover:text-primary transition-colors">Nosotros</Link>
            <Link href="#team" className="font-medium text-muted-foreground hover:text-primary transition-colors">Equipo</Link>
          </nav>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground hover:text-primary hover:bg-primary/10 h-10 w-10">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-card/95 backdrop-blur-xl border-l-primary/20">
                <nav className="flex flex-col gap-6 mt-12">
                  <Link href="#portfolio" className="text-xl font-medium text-foreground hover:text-primary transition-colors">Portafolio</Link>
                  <Link href="#about" className="text-xl font-medium text-foreground hover:text-primary transition-colors">Nosotros</Link>
                  <Link href="#team" className="text-xl font-medium text-foreground hover:text-primary transition-colors">Equipo</Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <section className="relative h-screen flex items-center justify-center text-foreground overflow-hidden">
          <ClientBackground />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20 mt-10">
            <div className="inline-block p-3 mb-8 bg-primary/10 rounded-full shadow-[0_0_30px_rgba(37,99,235,0.3)] border border-primary/30 backdrop-blur-sm animate-on-scroll-scale visible">
              <Image
                src="/images/logo.jpg"
                alt="Nodux Logo"
                width={72}
                height={72}
                className="rounded-full object-cover"
              />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 font-headline tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-accent animate-on-scroll visible stagger-1">
              Soluciones que se adaptan a ti, <br className="hidden md:block" />tecnología que transforma.
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl mb-12 max-w-4xl mx-auto font-body text-muted-foreground leading-relaxed animate-on-scroll visible stagger-2">
              Nodux combina consultoría de operaciones, ingeniería de datos y automatización para transformar la gestión de inventarios y procesos en pequeñas y medianas empresas.
            </p>
            <div className="space-y-4 sm:space-y-0 sm:flex sm:justify-center sm:gap-6 animate-on-scroll visible stagger-3">
              <Link
                href="#portfolio"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-12 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] transition-all duration-300 transform hover:-translate-y-1 bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-base md:text-lg"
              >
                Ver Nuestro Trabajo <ArrowDown className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        <section id="portfolio" className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16 animate-on-scroll">
              <Badge variant="outline" className="mb-4 border-primary/30 text-primary bg-primary/5 px-4 py-1 text-sm rounded-full">Proyectos Destacados</Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-headline text-foreground">
                Nuestro Portafolio
              </h2>
              <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
                Descubre algunos de los proyectos innovadores que hemos entregado, demostrando nuestra experticia y compromiso con la calidad.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <Card key={project.id} className={`group flex flex-col h-full bg-card/60 backdrop-blur-sm border-border/50 hover:border-primary/50 shadow-lg hover:shadow-[0_10px_40px_-10px_var(--shadow-primary-glow)] transform hover:-translate-y-2 transition-all duration-500 overflow-hidden animate-on-scroll stagger-${(index % 3) + 1}`}>
                  <CardHeader className="p-0">
                    <div className="aspect-[16/10] relative w-full overflow-hidden bg-muted">
                      {project.imageUrl ? (
                        <Image src={project.imageUrl} alt={project.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground bg-secondary/30">
                          <Image className="w-12 h-12 mb-2 opacity-50" src="/images/logo.jpg" alt="Placeholder" width={48} height={48} />
                          <span className="text-sm font-medium">Sube imagen en /images/portfolio</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-8 flex-grow flex flex-col relative z-10 bg-gradient-to-b from-card/40 to-transparent">
                    <div className="font-bold tracking-tight text-2xl mb-3 font-headline text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </div>
                    <p className="text-sm text-accent font-medium mb-4 flex items-center"><Target className="w-4 h-4 mr-2"/> Cliente: {project.client}</p>
                    
                    <div className="mb-6">
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="mt-auto space-y-6">
                      <div>
                        <h4 className="text-xs font-semibold mb-2 text-foreground uppercase tracking-wider">Tecnologías</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <Badge key={tech} variant="secondary" className="bg-secondary text-secondary-foreground border border-border/50">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Link
                          href={`/portafolio/${project.id}`}
                          className="flex-1 inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 rounded-md bg-primary hover:bg-primary/90 text-primary-foreground shadow-md"
                        >
                          Ver Detalles <ArrowRight className="h-4 w-4" />
                        </Link>
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 rounded-md px-3 bg-secondary/80 hover:bg-secondary text-secondary-foreground border border-border/50 shadow-sm hover:text-primary transition-colors"
                            title="Visitar sitio web en vivo"
                          >
                            <span>En vivo</span>
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <Separator className="container max-w-6xl mx-auto bg-primary/10" />

        <section id="about" className="py-24 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20 animate-on-scroll">
              <Badge variant="outline" className="mb-4 border-primary/30 text-primary bg-primary/5 px-4 py-1 text-sm rounded-full">ADN Nodux</Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-headline text-foreground">
                Sobre Nosotros
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 lg:gap-16 mb-24">
              <div className="animate-on-scroll-left relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-20" />
                <Card className="relative bg-card/80 backdrop-blur-md border-primary/20 shadow-xl h-full p-2">
                  <CardHeader>
                    <CardTitle className="flex items-center text-3xl text-foreground font-headline">
                      <div className="p-3 bg-primary/10 rounded-xl mr-4 border border-primary/20">
                        <Target className="h-8 w-8 text-primary" />
                      </div>
                      Nuestra Misión
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      Conectamos la realidad física del negocio con la ingeniería de datos y la automatización. Entramos a la operación para ordenar inventarios, estandarizar flujos y reemplazar registros manuales o dispersos por herramientas digitales ligeras y tableros de control. Nuestro propósito es simple: ayudar a los dueños y gerentes a eliminar fugas de dinero por mermas o quiebres de stock, permitiéndoles tomar decisiones basadas en números y no en intuición.
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="animate-on-scroll-right relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-accent to-primary rounded-2xl blur opacity-20" />
                <Card className="relative bg-card/80 backdrop-blur-md border-accent/20 shadow-xl h-full p-2">
                  <CardHeader>
                    <CardTitle className="flex items-center text-3xl text-foreground font-headline">
                      <div className="p-3 bg-accent/10 rounded-xl mr-4 border border-accent/20">
                        <Eye className="h-8 w-8 text-accent" />
                      </div>
                      Nuestra Visión
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      Ser el laboratorio de eficiencia operativa para negocios que crecen. Actuamos como el puente tecnológico entre el comercio tradicional y los estándares de la industria moderna, diseñando soluciones modulares de higiene de datos, automatización de pedidos y visibilidad de inventarios hechas a la medida de la trinchera comercial.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="text-center mb-16 animate-on-scroll">
              <h3 className="text-3xl font-bold font-headline text-foreground">
                Nuestros Valores
              </h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[
                { icon: Lightbulb, title: 'Innovación continua', desc: 'Apostamos por ideas frescas, tecnologías emergentes y mejoras constantes.' },
                { icon: Handshake, title: 'Compromiso', desc: 'Asumimos con responsabilidad cada reto, superando expectativas.' },
                { icon: Award, title: 'Calidad', desc: 'Entregamos soluciones robustas, seguras y eficientes.' },
                { icon: Users, title: 'Trabajo en equipo', desc: 'Creemos en la colaboración como pilar para lograr resultados.' },
                { icon: Shuffle, title: 'Adaptabilidad', desc: 'Nos ajustamos con agilidad a los cambios del mercado.' },
                { icon: ShieldCheck, title: 'Ética profesional', desc: 'Actuamos con integridad y transparencia en cada interacción.' },
              ].map((value, idx) => (
                <Card key={idx} className={`bg-card/40 backdrop-blur-sm border-border/50 hover:bg-card/80 hover:border-primary/40 shadow-lg transform hover:-translate-y-2 transition-all duration-300 p-8 flex flex-col animate-on-scroll stagger-${(idx % 6) + 1}`}>
                  <div className="mb-6 inline-flex p-4 bg-primary/10 rounded-2xl border border-primary/20 w-fit">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h4 className="text-xl font-bold font-headline text-foreground mb-3">{value.title}</h4>
                  <p className="text-muted-foreground leading-relaxed flex-grow">{value.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <Separator className="container max-w-6xl mx-auto bg-primary/10" />

        <section id="team" className="py-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20 animate-on-scroll">
              <Badge variant="outline" className="mb-4 border-primary/30 text-primary bg-primary/5 px-4 py-1 text-sm rounded-full">Talento Especializado</Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-headline text-foreground">
                Conoce a Nuestro Equipo
              </h2>
              <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
                Expertos en ingeniería de datos, operaciones industriales y desarrollo de software unidos por una misma visión.
              </p>
            </div>
            
            <div className="relative w-full max-w-7xl mx-auto animate-on-scroll-scale">
              <Carousel opts={{ align: "start", loop: true }} className="w-full">
                <CarouselContent className="-ml-4 md:-ml-8">
                  {teamMembers.map((member) => (
                    <CarouselItem key={member.id} className="pl-4 md:pl-8 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                      <div className="h-full py-2">
                        <Card className="group text-center bg-card/60 backdrop-blur-md border-border/50 hover:border-primary/40 hover:shadow-[0_10px_40px_-10px_var(--shadow-primary-glow)] transition-all duration-500 h-full flex flex-col relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <CardHeader className="p-8 pb-4 relative z-10">
                            <div className="relative w-36 h-36 mx-auto rounded-full overflow-hidden border-4 border-card shadow-xl group-hover:border-primary transition-colors duration-500">
                               {member.imageUrl ? (
                                 <Image src={member.imageUrl} alt={member.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                               ) : (
                                 <div className="w-full h-full bg-secondary flex items-center justify-center text-xs text-muted-foreground">
                                   Foto
                                 </div>
                               )}
                            </div>
                          </CardHeader>
                          <CardContent className="px-6 pb-8 pt-2 flex flex-col flex-grow relative z-10">
                            <div className="font-bold text-xl font-headline mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-1">
                              {member.name}
                            </div>
                            <div className="text-sm font-semibold text-accent mb-4 flex items-center justify-center h-10">
                              <span className="line-clamp-2">{member.role}</span>
                            </div>
                            
                            <p className="text-sm text-muted-foreground mb-6 line-clamp-3 h-16">{member.bio}</p>
                            
                            <div className="mt-auto space-y-4">
                              <div className="flex flex-wrap gap-2 justify-center">
                                {member.specializations.slice(0,2).map((spec) => (
                                  <Badge key={spec} variant="secondary" className="bg-secondary/50 text-xs py-0.5">
                                    {spec}
                                  </Badge>
                                ))}
                                {member.specializations.length > 2 && (
                                  <Badge variant="secondary" className="bg-secondary/50 text-xs py-0.5">...</Badge>
                                )}
                              </div>
                              
                              {member.linkedinUrl && (
                                <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-secondary/50 text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 mt-2">
                                  <Linkedin className="h-5 w-5" />
                                </a>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="hidden sm:block">
                  <CarouselPrevious className="left-[-20px] lg:left-[-60px] bg-card border-border hover:bg-primary hover:text-primary-foreground" />
                  <CarouselNext className="right-[-20px] lg:right-[-60px] bg-card border-border hover:bg-primary hover:text-primary-foreground" />
                </div>
              </Carousel>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 mt-16 border-t border-border/20 bg-card/30">
        <div className="container mx-auto text-center text-muted-foreground">
          <p className="font-headline text-xl md:text-2xl text-primary mb-6">
            “Soluciones que se adaptan a ti, tecnología que transforma.”
          </p>
          <div className="my-8">
            <h3 className="text-md font-semibold text-foreground mb-4">Conéctate con Nosotros</h3>
            <div className="flex justify-center items-center gap-6">
              <a href="https://wa.me/51919620888" target="_blank" rel="noopener noreferrer" aria-label="Contactar por WhatsApp" className="text-muted-foreground hover:text-accent transition-colors duration-300">
                <MessageCircle className="h-7 w-7" />
              </a>
              <a href="https://www.linkedin.com/company/nodux-b2b" target="_blank" rel="noopener noreferrer" aria-label="Visitar perfil de LinkedIn de Nodux" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                <Linkedin className="h-7 w-7" />
              </a>
            </div>
          </div>
          <p className="text-sm">© 2026 Nodux. Todos los derechos reservados.</p>
        </div>
      </footer>

      <a
        href="https://wa.me/51919620888"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 rounded-full shadow-lg z-50 flex items-center justify-center bg-[#10B981] hover:bg-[#059669] text-white transform hover:scale-110 transition-all duration-300 ease-in-out px-6 py-3 h-11 font-medium text-sm"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="mr-2 h-5 w-5" /> WhatsApp
      </a>
    </div>
  );
}
