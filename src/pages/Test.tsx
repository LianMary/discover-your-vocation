import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ScaleQuestion from "@/components/ScaleQuestion";
import { Award, Brain, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

type IntelligenceType =
  | 'logicoMatematica'
  | 'linguistica'
  | 'espacial'
  | 'musical'
  | 'corporalCinestesica'
  | 'interpessoal'
  | 'intrapessoal'
  | 'naturalista'
  | 'existencial';

interface Question {
  id: number;
  text: string;
  category: IntelligenceType;
}

// FASE 1 — perguntas iniciais (equivalentes ao seu baseQuestions)
const initialQuestions: Question[] = [
  { id: 1, text: "Prefiro resolver problemas matemáticos, quebra-cabeças e analisar padrões lógicos.", category: 'logicoMatematica' },
  { id: 2, text: "Gosto de ler, escrever e me comunico verbalmente com facilidade, expressando ideias com clareza.", category: 'linguistica' },
  { id: 3, text: "Tenho facilidade para criar objetos 3D, desenhar, pintar ou interpretar mapas e imagens.", category: 'espacial' },
  { id: 4, text: "Sinto satisfação e facilidade para tocar instrumentos, perceber ritmos, melodias e criar músicas.", category: 'musical' },
  { id: 5, text: "Prefiro atividades que envolvam movimento corporal, esportes, danças ou trabalhos manuais.", category: 'corporalCinestesica' },
  { id: 6, text: "Me sinto confortável em trabalhar com pessoas, entender emoções e colaborar em equipe.", category: 'interpessoal' },
  { id: 7, text: "Tenho facilidade em refletir sobre mim mesmo. Conheço meus sentimentos, motivações e objetivos.", category: 'intrapessoal' },
  { id: 8, text: "Gosto de estar em contato com a natureza, estudar plantas, animais e ajudar em causas ambientais.", category: 'naturalista' },
  { id: 9, text: "Reflito sobre questões filosóficas existenciais, e tenho interesse em temas como vida, morte e sentido das coisas.", category: 'existencial' },
];

// FASE 2 — perguntas específicas (como no seu segundo código)
const specificQuestions: Record<IntelligenceType, string[]> = {
  logicoMatematica: [
    "Você prefere carreiras que envolvam cálculos, análise de dados ou raciocínio estratégico?",
    "Gostaria de trabalhar em áreas como engenharia, tecnologia, ciência ou finanças?",
    "Você se sente confortável lidando com orçamentos e projeções financeiras?",
    "Tem interesse em aprender linguagens de programação ou desenvolvimento de algoritmos?",
    "Gosta de investigar a causa raiz de problemas complexos e sistematizar soluções?",
    "Se vê trabalhando em laboratórios de pesquisa ou centros de análise estatística?"
  ],
  linguistica: [
    "Você se vê bem em profissões ligadas a comunicação, escrita, jornalismo ou direito?",
    "Pretende se especializar em ensino, tradução ou produção de conteúdo?",
    "Gosta da ideia de revisar textos, editar livros ou roteirizar vídeos?",
    "Tem facilidade para aprender novos idiomas e culturas?",
    "Se sente à vontade falando em público ou apresentando ideias para grupos?",
    "Gostaria de atuar na defesa de causas através de argumentos verbais ou escritos?"
  ],
  espacial: [
    "Tem interesse em design, arquitetura, engenharia civil ou artes visuais?",
    "Gostaria de atuar com planejamento urbano, animação digital ou fotografia?",
    "Você gosta de desenhar, pintar ou criar modelos tridimensionais?",
    "Tem facilidade para imaginar como ficaria a decoração de um ambiente vazio?",
    "Se interessa por pilotagem, navegação ou cartografia?",
    "Gostaria de trabalhar com criação de interfaces visuais para aplicativos ou sites?"
  ],
  musical: [
    "Você gostaria de trabalhar com composição, produção musical ou engenharia de som?",
    "Tem interesse em ensinar música ou teoria musical para outras pessoas?",
    "Se vê atuando em musicoterapia ou psicologia ligada à arte?",
    "Gostaria de trabalhar com curadoria musical ou crítica de arte?",
    "Tem interesse pela parte técnica de shows, como acústica e sonorização?",
    "Imagina-se gerenciando carreiras de artistas ou eventos musicais?"
  ],
  corporalCinestesica: [
    "Gostaria de trabalhar com educação física, fisioterapia ou esportes de alto rendimento?",
    "Tem interesse em artes cênicas, dança ou performance corporal?",
    "Prefere trabalhos manuais que exijam precisão, como cirurgia, odontologia ou artesanato?",
    "Gosta da ideia de construir ou consertar objetos e máquinas?",
    "Se vê trabalhando ao ar livre e em movimento constante, em vez de um escritório?",
    "Tem interesse em ergonomia e em como o corpo humano interage com objetos?"
  ],
  interpessoal: [
    "Gostaria de atuar em psicologia, recursos humanos ou assistência social?",
    "Tem interesse em vendas, negociação ou liderança de equipes?",
    "Se vê trabalhando com diplomacia, relações públicas ou política?",
    "Gosta da ideia de organizar eventos e gerenciar comunidades?",
    "Tem facilidade para mediar conflitos e encontrar soluções em grupo?",
    "Gostaria de ser professor ou mentor, guiando o desenvolvimento de outras pessoas?"
  ],
  intrapessoal: [
    "Gostaria de atuar como pesquisador, escritor ou filósofo?",
    "Tem interesse em psicologia clínica ou terapia focada no indivíduo?",
    "Prefere atuar como consultor autônomo, definindo seus próprios horários e metas?",
    "Gosta de planejar estratégias de longo prazo e trabalhar com metas pessoais?",
    "Se interessa por teologia ou estudos sobre espiritualidade?",
    "Gostaria de criar seu próprio negócio e empreender de forma independente?"
  ],
  naturalista: [
    "Gostaria de trabalhar com biologia, veterinária, agronomia ou zootecnia?",
    "Tem interesse em preservação ambiental, ecologia ou geologia?",
    "Se vê atuando em parques nacionais, reservas florestais ou oceanografia?",
    "Gosta da ideia de trabalhar com paisagismo ou jardinagem?",
    "Tem interesse em meteorologia ou estudo de fenômenos climáticos?",
    "Gostaria de pesquisar novas fontes de energia sustentável ou biotecnologia?"
  ],
  existencial: [
    "Gostaria de atuar em filosofia, teologia ou sociologia?",
    "Tem interesse em trabalhar com ONGs e causas humanitárias globais?",
    "Se vê atuando como conselheiro ético ou em comitês de bioética?",
    "Gosta de estudar história das religiões ou antropologia?",
    "Tem interesse em literatura clássica e análise de obras profundas?",
    "Gostaria de trabalhar com meditação, yoga ou práticas de bem-estar integral?"
  ]
};

const Test = () => {
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [isPhase2Built, setIsPhase2Built] = useState(false);

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);

    setTimeout(() => {
      // Se ainda há próximas perguntas no array atual:
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        return;
      }

      // Se chegamos ao fim das perguntas atuais:
      if (!isPhase2Built) {
        // Construir fase 2 com base nas respostas da fase 1
        const phase2Questions = buildPhase2Questions(initialQuestions, newAnswers);
        if (phase2Questions.length > 0) {
          setQuestions([...initialQuestions, ...phase2Questions]);
          setIsPhase2Built(true);
          setCurrentQuestion(currentQuestion + 1); // vai para a primeira específica
        } else {
          // Caso extremo: nenhuma categoria escolhida? Vai direto para resultados
          navigate("/resultados", { state: { answers: newAnswers, questions: questions } });
        }
      } else {
        // Fim da fase 2: navegar para resultados
        navigate("/resultados", { state: { answers: newAnswers, questions: questions } });
      }
    }, 500);
  };

  // Monta as perguntas da fase 2 com base nas categorias mais fortes da fase 1
  const buildPhase2Questions = (initialQs: Question[], allAnswers: number[]): Question[] => {
    // Considerar apenas respostas das perguntas iniciais
    const categoryScores: Record<IntelligenceType, number> = {
      logicoMatematica: 0,
      linguistica: 0,
      espacial: 0,
      musical: 0,
      corporalCinestesica: 0,
      interpessoal: 0,
      intrapessoal: 0,
      naturalista: 0,
      existencial: 0
    };

    initialQs.forEach((q, index) => {
      const value = allAnswers[index] || 0;
      categoryScores[q.category] += value;
    });

    // Descobrir quais categorias serão aprofundadas
    // Exemplo: pegar as 2 maiores
    const sortedCategories = Object.entries(categoryScores)
      .sort((a, b) => b[1] - a[1])
      .map(([cat]) => cat as IntelligenceType);

    const topCategories = sortedCategories.slice(0, 2); // aqui você pode mudar a quantidade

    // Criar lista de perguntas específicas para essas categorias
    let newQuestions: Question[] = [];
    let nextId = initialQs.length + 1;

    topCategories.forEach((cat) => {
      const texts = specificQuestions[cat];
      texts.forEach((text) => {
        newQuestions.push({
          id: nextId++,
          text,
          category: cat
        });
      });
    });

    return newQuestions;
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setQuestions(initialQuestions);
    setIsPhase2Built(false);
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
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
            
            <div className="text-center text-sm text-muted-foreground">
              Pergunta {currentQuestion + 1} de {questions.length}
            </div>

            <ScaleQuestion
              question={questions[currentQuestion].text}
              onAnswer={handleAnswer}
              key={questions[currentQuestion].id}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Test;
