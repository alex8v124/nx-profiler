import Image from 'next/image';
import Link from 'next/link';
import { Menu, ArrowDown, Zap, ExternalLink, ArrowRight, Target, Eye, Lightbulb, Handshake, Award, Users, Shuffle, ShieldCheck, Briefcase, Linkedin, MessageCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { projects, teamMembers } from '@/lib/data';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 border-b border-primary/30 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            alt="Fondo de encabezado ciudad neón"
            src="https://img.freepik.com/vector-gratis/ciudad-moderna-noche-horizonte-neon-dibujos-animados_1441-3160.jpg?semt=ais_hybrid&w=740"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
        </div>
        <div className="container mx-auto flex items-center justify-between relative z-10 py-4 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/images/logo.jpg"
              alt="Nodux Logo"
              width={48}
              height={48}
              className="rounded-md object-cover group-hover:ring-2 group-hover:ring-accent transition-all duration-300"
            />
            <h1 className="text-2xl font-bold font-headline text-white group-hover:text-accent transition-colors duration-300">
              Nodux
            </h1>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/portafolio" className="font-medium text-gray-100 hover:text-primary transition-colors">Portafolio</Link>
            <Link href="/nosotros" className="font-medium text-gray-100 hover:text-primary transition-colors">Nosotros</Link>
            <Link href="/equipo" className="font-medium text-gray-100 hover:text-primary transition-colors">Equipo</Link>
          </nav>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:text-primary hover:bg-accent h-10 w-10">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col gap-4 mt-8">
                  <Link href="/portafolio" className="text-lg font-medium hover:text-primary transition-colors">Portafolio</Link>
                  <Link href="/nosotros" className="text-lg font-medium hover:text-primary transition-colors">Nosotros</Link>
                  <Link href="/equipo" className="text-lg font-medium hover:text-primary transition-colors">Equipo</Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <section className="relative h-screen flex items-center justify-center text-foreground overflow-hidden">
          <Image
            src="https://img.freepik.com/vector-gratis/ciudad-moderna-noche-horizonte-neon-dibujos-animados_1441-3160.jpg?semt=ais_hybrid&w=740"
            alt="Fondo Hero All-in Dev Solutions ciudad neón"
            fill
            className="object-cover z-0"
            priority
          />
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
            <div className="inline-block p-3 mb-6 bg-accent/20 rounded-full shadow-lg border border-accent/50">
              <Image
                src="/images/logo.jpg"
                alt="Nodux Logo"
                width={64}
                height={64}
                className="rounded-full object-cover"
              />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 font-headline tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-text-gradient">
              Soluciones que se adaptan a ti, tecnología que transforma.
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl mb-10 max-w-3xl mx-auto font-body text-muted-foreground/90">
              Nodux combina consultoría de operaciones, ingeniería de datos y automatización para transformar la gestión de inventarios y procesos en pequeñas y medianas empresas. Diagnosticamos cuellos de botella en almacenes y puntos de venta, estructuramos bases de datos maestras y desplegamos soluciones digitales accesibles para que los comercios operen con control total, sin mermas y con respaldo analítico en tiempo real.
            </p>
            <div className="space-y-4 sm:space-y-0 sm:flex sm:justify-center sm:gap-4">
              <Link
                href="#portfolio"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-11 rounded-md shadow-lg hover:shadow-primary/40 transition-all duration-300 transform hover:-translate-y-1 bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-base md:text-lg"
              >
                Ver Nuestro Trabajo <ArrowDown className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        <div className="transition-opacity duration-1000 ease-out opacity-100">
          <div className="animate-fade-in-up opacity-100">
            <section id="portfolio" className="py-16 md:py-24 bg-card/5">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 md:mb-16">
                  <h2 className="transition-opacity duration-700 ease-out opacity-100 text-3xl sm:text-4xl font-bold font-headline text-primary">
                    Nuestro Portafolio
                  </h2>
                  <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                    Descubre algunos de los proyectos innovadores que hemos entregado, demostrando nuestra experticia y compromiso con la calidad y las soluciones a medida para empresas.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.map((project) => (
                    <Card key={project.id} className="group flex flex-col h-full bg-card border-border/30 hover:shadow-[0_10px_30px_-5px_var(--shadow-accent-glow-40)] hover:border-accent/70 transform hover:-translate-y-2 transition-all duration-300 ease-in-out overflow-hidden">
                      <CardHeader className="p-0">
                        <div className="aspect-video relative w-full overflow-hidden">
                           <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground transition-transform duration-500 group-hover:scale-105">
                             {project.title} Imagen
                           </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6 flex-grow">
                        <div className="font-semibold tracking-tight text-2xl mb-2 font-headline group-hover:text-primary transition-colors">
                          {project.title}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">Cliente: {project.client}</p>
                        <div className="mb-3">
                          <h4 className="text-sm font-semibold mb-1 text-primary/80 dark:text-primary">Tecnologías Utilizadas:</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech) => (
                              <Badge key={tech} variant="secondary" className="bg-primary/10 text-primary hover:bg-secondary/80 dark:bg-primary/20 dark:text-primary/90">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold mb-1 text-primary/80 dark:text-primary">Problema Resuelto:</h4>
                          <p className="text-sm text-muted-foreground">{project.problemSolved}</p>
                        </div>
                        <div className="text-muted-foreground text-sm leading-relaxed min-h-[60px] whitespace-pre-line">
                          {project.description}
                        </div>
                      </CardContent>
                      <CardFooter className="p-6 pt-0 flex flex-col sm:flex-row justify-between items-center gap-2">
                        <Button variant="outline" className="w-full sm:w-auto hover:bg-accent/10 hover:text-accent hover:border-accent">
                          <Zap className="mr-2 h-4 w-4 text-accent" />
                          Generar Descripción
                        </Button>
                        <Link
                          href={`/portafolio/${project.id}`}
                          className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 rounded-md px-3 w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
                        >
                          Ver Proyecto <ExternalLink className="ml-2 h-4 w-4" />
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                <div className="text-center mt-12">
                  <Link
                    href="/portafolio"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background h-11 rounded-md px-8 hover:bg-primary/10 hover:text-primary hover:border-primary"
                  >
                    Ver Todos los Proyectos <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>

        <Separator className="my-8 md:my-12 container max-w-5xl mx-auto" />

        <div className="transition-opacity duration-1000 ease-out opacity-100">
          <div className="animate-fade-in-up opacity-100">
            <section id="about" className="py-16 md:py-24 bg-background">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 md:mb-16">
                  <h2 className="transition-opacity duration-700 ease-out opacity-100 text-3xl sm:text-4xl font-bold font-headline text-primary">
                    Sobre Nosotros
                  </h2>
                  <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                    Conoce nuestra dedicación al desarrollo de software y aplicaciones web y de escritorio de vanguardia, enfocadas en potenciar a empresas como la tuya.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-12 md:mb-16">
                  <Card className="bg-card border-border/30 shadow-xl hover:shadow-[0_10px_30px_-5px_var(--shadow-primary-glow)] hover:border-primary/50 transform hover:-translate-y-2 transition-all duration-300 ease-in-out">
                    <CardHeader>
                      <CardTitle className="flex items-center text-2xl text-primary font-headline">
                        <Target className="mr-3 h-7 w-7 text-accent" />
                        Nuestra Misión
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        Conectamos la realidad física del negocio con la ingeniería de datos y la automatización. Entramos a la operación para ordenar inventarios, estandarizar flujos y reemplazar registros manuales o dispersos por herramientas digitales ligeras y tableros de control. Nuestro propósito es simple: ayudar a los dueños y gerentes a eliminar fugas de dinero por mermas o quiebres de stock, permitiéndoles tomar decisiones basadas en números y no en intuición.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-card border-border/30 shadow-xl hover:shadow-[0_10px_30px_-5px_var(--shadow-primary-glow)] hover:border-primary/50 transform hover:-translate-y-2 transition-all duration-300 ease-in-out">
                    <CardHeader>
                      <CardTitle className="flex items-center text-2xl text-primary font-headline">
                        <Eye className="mr-3 h-7 w-7 text-accent" />
                        Nuestra Visión
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        Ser el laboratorio de eficiencia operativa para negocios que crecen. Actuamos como el puente tecnológico entre el comercio tradicional y los estándares de la industria moderna, diseñando soluciones modulares de higiene de datos, automatización de pedidos y visibilidad de inventarios hechas a la medida de la trinchera comercial.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="text-center mb-10 md:mb-12">
                  <h3 className="text-2xl sm:text-3xl font-bold font-headline text-primary flex items-center justify-center">
                    <Lightbulb className="mr-3 h-8 w-8 text-accent" />
                    Nuestros Valores
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {[
                    { icon: Lightbulb, title: 'Innovación continua', desc: 'Apostamos por ideas frescas, tecnologías emergentes y mejoras constantes en cada proyecto.' },
                    { icon: Handshake, title: 'Compromiso', desc: 'Asumimos con responsabilidad cada reto, cumpliendo plazos y superando expectativas.' },
                    { icon: Award, title: 'Calidad', desc: 'Entregamos soluciones robustas, seguras y eficientes, priorizando la experiencia del usuario.' },
                    { icon: Users, title: 'Trabajo en equipo', desc: 'Creemos en la colaboración y el respeto como pilares para lograr grandes resultados.' },
                    { icon: Shuffle, title: 'Adaptabilidad', desc: 'Nos ajustamos con agilidad a los cambios del mercado y las necesidades de nuestros clientes.' },
                    { icon: ShieldCheck, title: 'Ética profesional', desc: 'Actuamos con integridad, transparencia y responsabilidad en cada interacción.' },
                  ].map((value, idx) => (
                    <Card key={idx} className="bg-card border-border/30 shadow-xl hover:shadow-[0_10px_30px_-5px_var(--shadow-accent-glow-30)] hover:border-accent/50 transform hover:-translate-y-2 transition-all duration-300 ease-in-out p-6 text-center flex flex-col items-center">
                      <div className="mb-4 p-3 bg-accent/10 rounded-full">
                        <value.icon className="h-8 w-8 text-accent" />
                      </div>
                      <h4 className="text-xl font-semibold font-headline text-primary mb-2">{value.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{value.desc}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>

        <Separator className="my-8 md:my-12 container max-w-5xl mx-auto" />

        <div className="transition-opacity duration-1000 ease-out opacity-100">
          <div className="animate-fade-in-up opacity-100">
            <section id="team" className="py-16 md:py-24 bg-card">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 md:mb-16">
                  <h2 className="transition-opacity duration-700 ease-out opacity-100 text-3xl sm:text-4xl font-bold font-headline text-primary">
                    Conoce a Nuestro Equipo
                  </h2>
                  <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                    La fuerza impulsora detrás de nuestro éxito. Un grupo de individuos apasionados y talentosos dedicados a la excelencia.
                  </p>
                </div>
                
                <div className="relative w-full max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto">
                  <Carousel opts={{ align: "start" }} className="w-full">
                    <CarouselContent className="-ml-2 md:-ml-4">
                      {teamMembers.map((member) => (
                        <CarouselItem key={member.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                          <div className="p-1 h-full">
                            <Card className="text-center bg-card border-border/30 hover:shadow-[0_10px_30px_-5px_var(--shadow-accent-glow-40)] hover:border-accent/70 transform hover:-translate-y-2 transition-all duration-300 ease-in-out overflow-hidden h-full flex flex-col">
                              <CardHeader className="p-0 pt-6">
                                <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-accent group-hover:border-primary transition-colors duration-300">
                                   {member.imageUrl ? (
                                     <Image src={member.imageUrl} alt={member.name} fill className="object-cover" />
                                   ) : (
                                     <div className="w-full h-full bg-muted flex items-center justify-center text-xs text-muted-foreground text-center p-2">
                                       {member.name}
                                     </div>
                                   )}
                                </div>
                              </CardHeader>
                              <CardContent className="p-6 flex flex-col flex-grow">
                                <div className="font-semibold tracking-tight text-xl font-headline mb-1 group-hover:text-primary transition-colors">
                                  {member.name}
                                </div>
                                <div className="text-sm text-primary/90 dark:text-primary mb-1 flex items-center justify-center gap-1">
                                  <Briefcase className="h-4 w-4" /> {member.role}
                                </div>
                                {member.subtitle && (
                                  <p className="text-sm font-semibold text-accent mb-3">{member.subtitle}</p>
                                )}
                                <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                                <div className="mb-4 mt-auto">
                                  <h4 className="text-sm font-semibold mb-2 text-primary/80 dark:text-primary">Especialización:</h4>
                                  <div className="flex flex-wrap gap-2 justify-center">
                                    {member.specializations.map((spec) => (
                                      <Badge key={spec} variant="secondary" className="bg-primary/10 text-primary hover:bg-secondary/80 dark:bg-primary/20 dark:text-primary/90">
                                        {spec}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                {member.linkedinUrl && (
                                  <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label={`Perfil de LinkedIn de ${member.name}`} className="inline-flex items-center justify-center text-accent hover:text-primary transition-colors mt-auto">
                                    <Linkedin className="h-5 w-5" />
                                  </a>
                                )}
                              </CardContent>
                            </Card>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 mt-16 border-t border-border/20 bg-card/30">
        <div className="container mx-auto text-center text-muted-foreground">
          <p className="font-headline text-xl md:text-2xl text-primary mb-6">
            “Soluciones que se adaptan a ti, tecnología que transforma.”
          </p>
          <div className="my-8">
            <h3 className="text-md font-semibold text-foreground mb-4">Conéctate con Nosotros</h3>
            <div className="flex justify-center items-center gap-6">
              <a href="https://wa.me/51939962161" target="_blank" rel="noopener noreferrer" aria-label="Contactar por WhatsApp" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                <MessageCircle className="h-7 w-7" />
              </a>
              <a href="https://www.linkedin.com/in/omer-runco-b7a261310/" target="_blank" rel="noopener noreferrer" aria-label="Visitar perfil de LinkedIn" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                <Linkedin className="h-7 w-7" />
              </a>
            </div>
          </div>
          <p className="text-sm">© 2025 Nodux. Todos los derechos reservados.</p>
        </div>
      </footer>

      <Button
        className="fixed bottom-6 right-6 rounded-full shadow-lg z-50 flex items-center justify-center bg-accent hover:bg-accent/90 text-accent-foreground transform hover:scale-110 transition-all duration-300 ease-in-out px-6 py-3 h-11"
        aria-label="Contáctanos"
      >
        <Phone className="mr-2 h-5 w-5" /> Contáctanos
      </Button>
    </div>
  );
}
