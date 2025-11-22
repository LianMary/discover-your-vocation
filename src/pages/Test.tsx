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

  const questions = [
    "Gosto de trabalhar com números e cálculos matemáticos complexos",
    "Prefiro atividades que envolvem criatividade e expressão artística",
    "Me sinto confortável liderando grupos e tomando decisões importantes",
    "Tenho interesse em compreender como as coisas funcionam tecnicamente",
    "Gosto de ajudar outras pessoas a resolver seus problemas",
    "Me interesso por questões relacionadas à saúde e bem-estar",
    "Prefiro trabalhos que me permitam estar em contato com a natureza",
    "Tenho facilidade para me comunicar e persuadir outras pessoas",
    "Me sinto motivado por desafios que envolvem análise e pesquisa",
    "Gosto de atividades que exigem precisão e atenção aos detalhes"
  ];

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
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
              <span className="font-bold text-lg">TestVocacional</span>
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
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
            
            <div className="text-center text-sm text-muted-foreground">
              Pergunta {currentQuestion + 1} de {questions.length}
            </div>

            <ScaleQuestion
              question={questions[currentQuestion]}
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
