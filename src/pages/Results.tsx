import { useLocation, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Award, Brain, ArrowLeft } from "lucide-react";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as {
    answers: number[];
    questions: { id: number; text: string; category: string }[];
  } | undefined;

  if (!state) {
    // Se alguém acessar /resultados direto, sem passar pelo teste
    navigate("/");
    return null;
  }

   const { answers, questions } = state;

  // Exemplo simples: somar pontuação por categoria
  const categoryScores: Record<string, number> = {};

  questions.forEach((q, index) => {
    const value = answers[index] ?? 0;
    if (!categoryScores[q.category]) categoryScores[q.category] = 0;
    categoryScores[q.category] += value;
  });

  // Categorize questions into vocational areas
 const categoryMeta: Record<string, { id: string; label: string }> = {
  logicoMatematica: { id: "LogicoMatematica", label: "Lógico Matemática" },
  linguistica: { id: "Linguistica", label: "Linguística" },
  espacial: { id: "Espacial", label: "Espacial" },
  musical: { id: "Musical", label: "Musical" },
  corporalCinestesica: { id: "CorporalCinestesica", label: "Corporal Cinestésica" },
  interpessoal: { id: "Interpessoal", label: "Interpessoal" },
  intrapessoal: { id: "Intrapessoal", label: "Intrapessoal" },
  naturalista: { id: "Naturalista", label: "Naturalista" },
  existencial: { id: "Existencial", label: "Existencial" },
};

  const chartData = Object.entries(categoryScores).map(([categoryKey, totalScore]) => {
  const meta = categoryMeta[categoryKey] || { id: categoryKey, label: categoryKey };
  // só normaliza grosseiramente para 0–100 multiplicando por um fator
  const scorePercent = Math.min(100, totalScore * 10);

  return {
    id: meta.id,
    label: meta.label,
    score: scorePercent,
  };
});

  // Sort by score to find top 3
  const sortedCategories = [...chartData].sort((a, b) => b.score - a.score);
  const topCategories = sortedCategories.slice(0, 3);

  // Profession recommendations based on categories
  const professionMap: Record<string, string[]> = {
    LogicoMatematica: ["Cientista de Dados", "Engenheiro", "Analista de Dados"],
    Linguistica: ["Jornalista", "Redator Publicitário", "Tradutor/Intérprete"],
    Espacial: ["Arquiterto", "Designer Gráfico", "Engenheiro Cívil"],
    Musical: ["Produtor Musical", "Músico/Instrumentista", "Compositor"],
    CorporalCinestesica: ["Fisioterapia", "Ator/ Dançarino", "Educador Físico"],
    Interpessoal: ["Psicologo", "Gestor de Recursos Humanos", "Professor"],
    Intrapessoal: ["Terapeuta Holístico", "Filósofo", "Escritor"],
    Naturalista: ["Biológo", "Engenheito Ambiental", "Agrônomo"],
    Existencial: ["Filósofo", "Teólogo", "Pesquisador de Ciências Humanas"],
  };

  const [professions, setProfessions] = useState("");
  // Generate profession recommendations
  useEffect(() => {
    const recommendations = topCategories
      .map((cat, index) => {
        const profList = professionMap[cat.id] || [];
        return `${index + 1}. ${cat.label} (${
          cat.score
        }% de compatibilidade):\n   - ${profList.join("\n   - ")}`;
      })
      .join("\n\n");

    setProfessions(recommendations);
  }, [topCategories]);

  // Specific colors for each category
  const categoryColors: Record<string, string> = {
    LogicoMatematica: "hsl(220, 90%, 56%)",
    Linguistica: "hsl(280, 65%, 60%)",
    Espacial: "hsl(25, 95%, 53%)",
    Musical: "hsl(160, 84%, 39%)",
    CorporalCinestesica: "hsl(340, 75%, 50%)",
    Interpessoal: "hsl(142, 71%, 45%)",
    Intrapessoal: "hsl(84, 65%, 50%)",
    Naturalista: "hsl(200, 92%, 48%)",
    Existencial: "hsl(262, 52%, 47%)",
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">Teste Vocacional</span>
            </div>

            <Link
              to="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Início
            </Link>
          </div>
        </div>
      </nav>

      {/* Results Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <Card className="mb-8 animate-scale-in">
            <CardHeader className="text-center">
              <div
                className="mx-auto mb-4 w-16 h-16 bg-secondary rounded-full flex items-center justify-center animate-fade-in"
                style={{ animationDelay: "100ms" }}
              >
                <Award className="w-8 h-8 text-secondary-foreground" />
              </div>
              <CardTitle
                className="text-3xl animate-fade-in"
                style={{
                  animationDelay: "200ms",
                  animationFillMode: "backwards",
                }}
              >
                Resultados do Teste Vocacional
              </CardTitle>
              <CardDescription
                className="animate-fade-in"
                style={{
                  animationDelay: "300ms",
                  animationFillMode: "backwards",
                }}
              >
                Veja suas pontuações por área e as profissões recomendadas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Chart Section */}
              <div className="animate-fade-in">
                <h3 className="text-xl font-semibold mb-4">
                  Pontuação por Área
                </h3>
                <div className="w-full h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={sortedCategories}
                      margin={{ top: 20, right: 20, left: 20, bottom: 50 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="hsl(var(--border))"
                        opacity={0.3}
                      />
                      <XAxis
                        dataKey="label"
                        stroke="hsl(var(--foreground))"
                        tick={{
                          fill: "hsl(var(--foreground))",
                          angle: -30,
                          dy: 10,
                        }}
                        interval={0}
                        height={60}
                      />
                      <YAxis
                        stroke="hsl(var(--foreground))"
                        tick={{ fill: "hsl(var(--foreground))" }}
                        domain={[0, 100]}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--background))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "6px",
                        }}
                        labelStyle={{ color: "hsl(var(--foreground))" }}
                        animationDuration={300}
                        animationEasing="ease-out"
                      />
                      <Bar
                        dataKey="score"
                        radius={[8, 8, 0, 0]}
                        animationBegin={200}
                        animationDuration={1000}
                        animationEasing="ease-out"
                      >
                        {sortedCategories.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              categoryColors[entry.id] || "hsl(var(--muted))"
                            }
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Professions Section */}
              <div
                className="animate-fade-in"
                style={{
                  animationDelay: "400ms",
                  animationFillMode: "backwards",
                }}
              >
                <h3 className="text-xl font-semibold mb-4">
                  Profissões Recomendadas
                </h3>
                <Textarea
                  value={professions}
                  readOnly
                  className="min-h-[300px] font-mono text-sm"
                />
              </div>

              <div
                className="flex gap-4 animate-fade-in"
                style={{
                  animationDelay: "600ms",
                  animationFillMode: "backwards",
                }}
              >
                <Button
                  onClick={() => navigate("/teste")}
                  variant="outline"
                  className="flex-1"
                >
                  Refazer Teste
                </Button>
                <Button onClick={() => navigate("/")} className="flex-1">
                  Voltar ao Início
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Results;
