import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, TrendingUp, Brain, Target, Award, Menu, X, Home, Info, LogIn } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
              <Link 
                to="/login"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <LogIn className="w-4 h-4" />
                Login
              </Link>
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
                <Link 
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors p-2"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>
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
                <Link to="/login" className="block w-full">
                  <Button className="w-full">
                    Começar Teste
                  </Button>
                </Link>
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