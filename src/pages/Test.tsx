import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ScaleQuestion from "@/components/ScaleQuestion";
import { Award, Brain, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Test = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const baseQuestions = [
    "Prefiro resolver probelmas matemáticos, quebra-cabeças e analisar padões lógicos.",
    "Gosto de ler escrever e me comunico verbalmente com facilidade, expressando ideias com clareza.",
    "Tenho facilidade para criar objetos 3D, desenhar, pintar ou interpretar mapas e imagens.",
    "Sinto satisfação e facilidade para tocar instrumentos, perceber ritmos, melodias e criar músicas.",
    "Prefiro atividades que envolvam movimento corporal, esportes,danças ou trabalhos manuais.",
    "Me sinto confortavel em trabalhar com pessoas, entender emoções e colaborar em equipe.",
    "Tenho facilidade em refletir sobre mim mesmo. Conheço meus sentimentos, motivações e objetivos.",
    "Gosto de estar em contato com a naturaza, estudar plantas, animais e ajudar me causas ambientais.",
    "Reflito sobre questões filosóficas existenciais, e tenho interesse em temas como vida, morte e sentido das coisas.",

  ];
  /*
  const expecificQuestions = [
    "Prefiro trabalhar com cálculos, dados, estatísticas e softwares de análise ou programação.",
    "Me interessaria por carreiras em engenharia, tecnologia, finanças ou pesquisa científica.",
    "Gostaria de atuar na escrita, edição, jornalismo, ensino ou áreas vinculadas à comunicação.",
    "Prefere trabalhar com línguas, traduções ou criação de conteúdo literário.",
    "Tenho interesse por arquitetura, design gráfico, animação, fotografia ou artes visuais.",
    "Gostaria de trabalhar com planejamento urbano, jogos digitais ou cinema.",
    "Sinto vontade de se profissionalizar em composição, performance, produção musical ou terapia sonora.",
    "Prefiro atuar em esportes, dança, fisioterapia, enfermagem ou profissões que envolvam ação física.",
    "Me imagino trabalhando em áreas como psicologia, coaching, trabalho social, vendas ou liderança?",
    "Gostaria de focar em desenvolvimento pessoal, filosofia, terapias alternativas ou espiritualidade",
    "Tenho interesse por biologia, agronomia, veterinária, conservação ambiental ou ecoturismo.",
    "Quero trabalhar com filosofia, teologia, ética, antropologia ou áreas que discutam o sentido da vida."
  ];
  */ 

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
    
    setTimeout(() => {
      if (currentQuestion < baseQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // Navigate to results page with answers
        navigate("/resultados", { state: { answers: newAnswers } });
      }
    }, 500);
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers([]);
  };
  const questionsRotes = () => {

  }
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

            {/* Back Link */}
            <Link 
              to="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Link>
          </div>
        </div>
      </nav>

      {/* Test Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Teste Vocacional</h2>
            <p className="text-muted-foreground">
              Responda as perguntas de acordo com o quanto você se identifica com cada afirmação
            </p>
          </div>

          <div className="space-y-8">
            {/* Progress Bar */}
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentQuestion + 1) / baseQuestions.length) * 100}%` }}
              ></div>
            </div>
            
            <div className="text-center text-sm text-muted-foreground">
              Pergunta {currentQuestion + 1} de {baseQuestions.length}
            </div>

            <ScaleQuestion
              question={baseQuestions[currentQuestion]}
              onAnswer={handleAnswer}
              key={currentQuestion}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Test;
