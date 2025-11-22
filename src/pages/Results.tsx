import { useLocation, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Award, Brain, ArrowLeft } from "lucide-react";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const answers = location.state?.answers as number[] | undefined;

  const [professions, setProfessions] = useState("");

  useEffect(() => {
    if (!answers || answers.length === 0) {
      navigate("/teste");
    }
  }, [answers, navigate]);

  if (!answers) {
    return null;
  }

  // Categorize questions into vocational areas
  const categories = [
    { name: "Exatas", questions: [0, 9] },
    { name: "Artes", questions: [1] },
    { name: "Liderança", questions: [2] },
    { name: "Tecnologia", questions: [3] },
    { name: "Humanas", questions: [4] },
    { name: "Saúde", questions: [5] },
    { name: "Natureza", questions: [6] },
    { name: "Comunicação", questions: [7] },
    { name: "Pesquisa", questions: [8] },
  ];

  // Calculate scores for each category
  const chartData = categories.map((category) => {
    const total = category.questions.reduce((sum, qIndex) => sum + (answers[qIndex] || 0), 0);
    const average = total / category.questions.length;
    return {
      name: category.name,
      score: Math.round(average * 20), // Convert to 0-100 scale
    };
  });

  // Sort by score to find top 3
  const sortedCategories = [...chartData].sort((a, b) => b.score - a.score);
  const topCategories = sortedCategories.slice(0, 3);

  // Profession recommendations based on categories
  const professionMap: Record<string, string[]> = {
    Exatas: ["Engenheiro de Dados", "Matemático", "Estatístico"],
    Artes: ["Designer Gráfico", "Arquiteto", "Diretor de Arte"],
    Liderança: ["Gestor de Projetos", "Diretor Executivo", "Empreendedor"],
    Tecnologia: ["Desenvolvedor de Software", "Engenheiro de Sistemas", "Analista de TI"],
    Humanas: ["Psicólogo", "Assistente Social", "Professor"],
    Saúde: ["Médico", "Enfermeiro", "Nutricionista"],
    Natureza: ["Engenheiro Ambiental", "Biólogo", "Agrônomo"],
    Comunicação: ["Jornalista", "Publicitário", "Relações Públicas"],
    Pesquisa: ["Cientista", "Pesquisador Acadêmico", "Analista de Dados"],
  };

  // Generate profession recommendations
  useEffect(() => {
    const recommendations = topCategories
      .map((cat, index) => {
        const profList = professionMap[cat.name] || [];
        return `${index + 1}. ${cat.name} (${cat.score}% de compatibilidade):\n   - ${profList.join("\n   - ")}`;
      })
      .join("\n\n");

    setProfessions(recommendations);
  }, []);

  // Custom colors for bars
  const barColors = [
    "hsl(var(--primary))",
    "hsl(var(--secondary))",
    "hsl(var(--accent))",
  ];

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
              <span className="font-bold text-lg">TestVocacional</span>
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
          <Card className="mb-8">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
                <Award className="w-8 h-8 text-secondary-foreground" />
              </div>
              <CardTitle className="text-3xl">Resultados do Teste Vocacional</CardTitle>
              <CardDescription>
                Veja suas pontuações por área e as profissões recomendadas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Chart Section */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Pontuação por Área</h3>
                <div className="w-full h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="name" 
                        stroke="hsl(var(--foreground))"
                        tick={{ fill: "hsl(var(--foreground))" }}
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
                      />
                      <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                        {chartData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={index < 3 ? barColors[index] : "hsl(var(--muted))"}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Professions Section */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Profissões Recomendadas</h3>
                <Textarea
                  value={professions}
                  readOnly
                  className="min-h-[300px] font-mono text-sm"
                />
              </div>

              <div className="flex gap-4">
                <Button onClick={() => navigate("/teste")} variant="outline" className="flex-1">
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
