import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, TrendingUp, Brain, Target, Award, Menu, X, Home, Info, LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const loginSchema = z.object({
  name: z.string().trim().min(2, "Nome deve ter pelo menos 2 caracteres").max(100, "Nome muito longo"),
  email: z.string().trim().email("Email inválido").max(255, "Email muito longo"),
  phone: z.string().trim().min(11, "Telefone deve ter pelo menos 11 dígitos").max(15, "Telefone muito longo"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      toast({
        title: "Login realizado!",
        description: `Bem-vindo, ${data.name}!`,
      });
      
      setIsDrawerOpen(false);
      reset();
      navigate("/teste");
    } catch (error) {
      toast({
        title: "Erro ao fazer login",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  };

  const popularCourses = [
    { name: "Medicina", icon: "🏥"},
    { name: "Engenharia", icon: "⚙️"},
    { name: "Direito", icon: "⚖️"},
    { name: "Psicologia", icon: "🧠"},
    { name: "Administração", icon: "💼"}
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">Teste Vocacional</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <DrawerTrigger asChild>
                  <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                    <LogIn className="w-4 h-4" />
                    Login
                  </button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Faça seu Login</DrawerTitle>
                    <DrawerDescription>Preencha seus dados para começar o teste vocacional</DrawerDescription>
                  </DrawerHeader>
                  
                  <form onSubmit={handleSubmit(onSubmit)} className="px-4 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="drawer-name">Nome</Label>
                      <Input
                        id="drawer-name"
                        type="text"
                        placeholder="Seu nome completo"
                        {...register("name")}
                        className={errors.name ? "border-destructive" : ""}
                      />
                      {errors.name && (
                        <p className="text-sm text-destructive">{errors.name.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="drawer-email">Email</Label>
                      <Input
                        id="drawer-email"
                        type="email"
                        placeholder="seu@email.com"
                        {...register("email")}
                        className={errors.email ? "border-destructive" : ""}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive">{errors.email.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="drawer-phone">Telefone</Label>
                      <Input
                        id="drawer-phone"
                        type="tel"
                        placeholder="(00) 00000-0000"
                        {...register("phone")}
                        className={errors.phone ? "border-destructive" : ""}
                      />
                      {errors.phone && (
                        <p className="text-sm text-destructive">{errors.phone.message}</p>
                      )}
                    </div>

                    <DrawerFooter className="px-0">
                      <Button type="submit" size="lg">Começar Teste</Button>
                      <DrawerClose asChild>
                        <Button variant="outline">Cancelar</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </form>
                </DrawerContent>
              </Drawer>
            </div>
          

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col gap-4">
                <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                  <DrawerTrigger asChild>
                    <button 
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors p-2"
                    >
                      <LogIn className="w-4 h-4" />
                      Login
                    </button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>Faça seu Login</DrawerTitle>
                      <DrawerDescription>Preencha seus dados para começar o teste vocacional</DrawerDescription>
                    </DrawerHeader>
                    
                    <form onSubmit={handleSubmit(onSubmit)} className="px-4 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="mobile-name">Nome</Label>
                        <Input
                          id="mobile-name"
                          type="text"
                          placeholder="Seu nome completo"
                          {...register("name")}
                          className={errors.name ? "border-destructive" : ""}
                        />
                        {errors.name && (
                          <p className="text-sm text-destructive">{errors.name.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="mobile-email">Email</Label>
                        <Input
                          id="mobile-email"
                          type="email"
                          placeholder="seu@email.com"
                          {...register("email")}
                          className={errors.email ? "border-destructive" : ""}
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive">{errors.email.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="mobile-phone">Telefone</Label>
                        <Input
                          id="mobile-phone"
                          type="tel"
                          placeholder="(00) 00000-0000"
                          {...register("phone")}
                          className={errors.phone ? "border-destructive" : ""}
                        />
                        {errors.phone && (
                          <p className="text-sm text-destructive">{errors.phone.message}</p>
                        )}
                      </div>

                      <DrawerFooter className="px-0">
                        <Button type="submit" size="lg">Começar Teste</Button>
                        <DrawerClose asChild>
                          <Button variant="outline">Cancelar</Button>
                        </DrawerClose>
                      </DrawerFooter>
                    </form>
                  </DrawerContent>
                </Drawer>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Banner */}
      <section className="bg-gradient-hero py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-8">
            <Card className="max-w-lg bg-white/95 backdrop-blur-sm shadow-xl">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <Brain className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                  Teste Vocacional Online
                </CardTitle>
                <CardDescription className="text-lg">
                  Descubra suas aptidões e encontre a carreira ideal para você
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-6">
                  Um teste científico desenvolvido para ajudar você a identificar suas 
                  habilidades naturais e interesses profissionais.
                </p>
                <div className="flex justify-center gap-6 text-sm mb-6">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary" />
                    <span>15 Perguntas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-secondary" />
                    <span>Resultado Imediato</span>
                  </div>
                </div>
                <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                  <DrawerTrigger asChild>
                    <Button className="w-full">
                      Começar Teste
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>Faça seu Login</DrawerTitle>
                      <DrawerDescription>Preencha seus dados para começar o teste vocacional</DrawerDescription>
                    </DrawerHeader>
                    
                    <form onSubmit={handleSubmit(onSubmit)} className="px-4 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="hero-name">Nome</Label>
                        <Input
                          id="hero-name"
                          type="text"
                          placeholder="Seu nome completo"
                          {...register("name")}
                          className={errors.name ? "border-destructive" : ""}
                        />
                        {errors.name && (
                          <p className="text-sm text-destructive">{errors.name.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="hero-email">Email</Label>
                        <Input
                          id="hero-email"
                          type="email"
                          placeholder="seu@email.com"
                          {...register("email")}
                          className={errors.email ? "border-destructive" : ""}
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive">{errors.email.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="hero-phone">Telefone</Label>
                        <Input
                          id="hero-phone"
                          type="tel"
                          placeholder="(00) 00000-0000"
                          {...register("phone")}
                          className={errors.phone ? "border-destructive" : ""}
                        />
                        {errors.phone && (
                          <p className="text-sm text-destructive">{errors.phone.message}</p>
                        )}
                      </div>

                      <DrawerFooter className="px-0">
                        <Button type="submit" size="lg">Começar Teste</Button>
                        <DrawerClose asChild>
                          <Button variant="outline">Cancelar</Button>
                        </DrawerClose>
                      </DrawerFooter>
                    </form>
                  </DrawerContent>
                </Drawer>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Info Cards Section */}
      <section className="py-16 px-4 bg-test-bg">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Importance Card */}
            <Card className="h-full bg-gradient-card border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">Por que fazer um teste vocacional?</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  O teste vocacional é uma ferramenta essencial para quem busca clareza 
                  sobre sua carreira profissional.Ele auxilia na escolha da futura profissão baseado em suas aptdões e interesses pessoais.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Identifica suas habilidades naturais;</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Reduz ansiedade na escolha profissional;</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Orienta decisões acadêmicas importantes;</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Aumenta chances de satisfação profissional; </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Popular Courses Card */}
            <Card className="h-full bg-gradient-card border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <CardTitle className="text-xl">Cursos Mais Pesquisados</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Veja quais cursos estão em alta no mercado de trabalho:
                </p>
                <div className="space-y-3">
                  {popularCourses.map((course, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{course.icon}</span>
                        <span className="font-medium">{course.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;