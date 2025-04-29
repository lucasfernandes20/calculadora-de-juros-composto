"use client";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SimpleForm from "./models/simpleForm";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import CalcResultCard from "./models/calcResultCard";
import ChartCard from "./models/chartCard";
import TableCard from "./models/tableCard";
import calcCompoundFee, { CompoundFee, FeeData } from "@/utils/calcCompoundFee";
import getTotals, { Totals } from "@/utils/getTotals";
import AdvanceForm from "./models/advanceForm";
import calcAdvanceCompoundFee, {
  AdvanceCompundFee,
} from "@/utils/calcAdvanceCompoundFee";
import { ChevronDownIcon, LineChartIcon, PiggyBankIcon, CalculatorIcon } from "lucide-react";
import Tutorial from "./models/tutorial";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const HomePage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("simple");
  const [feeData, setFeeData] = useState<FeeData[]>([]);
  const [showTutorial, setShowTutorial] = useState<boolean>(false);
  const [totals, setTotals] = useState<Totals>({
    totalContributed: "",
    totalInterest: "",
    totalFinal: "",
    performancePercentage: "",
  });

  const handleSubmit = (data: CompoundFee) => {
    const { period, periodType } = data;

    const totalMonths = periodType === "year" ? period * 12 : period;

    if (totalMonths > 1_080) {
      toast({
        title: "É muita coisa!",
        description: "O período máximo é de 90 anos.",
        variant: "destructive",
        duration: 5_000,
      });
      return;
    }
    if (!data.initialAmount && !data.monthAmount) {
      toast({
        title: "Nada para calcular",
        description: "Preencha pelo menos um dos campos de investimento.",
        variant: "destructive",
        duration: 5_000,
      });
      return;
    }

    const result = calcCompoundFee(data);

    setTotals(
      getTotals({
        data: result,
      })
    );

    setFeeData(result);
  };

  const handleAdvanceSubmit = (data: AdvanceCompundFee) => {
    const { period, periodType } = data;

    const totalMonths = periodType === "year" ? period * 12 : period;

    if (totalMonths > 1_080 && !data.calcUntilGoal) {
      toast({
        title: "É muita coisa!",
        description: "O período máximo é de 90 anos.",
        variant: "destructive",
        duration: 5_000,
      });
      return;
    }
    if (!data.initialAmount && !data.contributions) {
      toast({
        title: "Nada para calcular",
        description: "Preencha pelo menos um dos campos de investimento.",
        variant: "destructive",
        duration: 5_000,
      });
      return;
    }
    if (data.calcUntilGoal && data.goal > 10_000_000_000) {
      toast({
        title: "Meta muito alta",
        description: "A meta máxima é de 10 bilhões.",
        variant: "destructive",
        duration: 5_000,
      });
      return;
    }

    const result = calcAdvanceCompoundFee(data);

    setTotals(
      getTotals({
        data: result,
        showTimeToGoal: data.calcUntilGoal,
      })
    );

    setFeeData(result);
  };

  return (
    <div className="bg-gradient-to-b from-background to-background/80 min-h-screen pb-12">
      <div className="container m-auto flex flex-col gap-6 mb-10 pt-6">
        <div className="text-center space-y-3 mb-2">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm px-3 py-1 rounded-full mb-1">
            <PiggyBankIcon size={16} />
            <span>Planeje seu futuro financeiro</span>
          </div>
          <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">
            Calculadora de Juros Compostos
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            Descubra o poder dos juros compostos e projete o crescimento dos seus investimentos ao longo do tempo.
          </p>
        </div>

        <Card className="overflow-hidden shadow-lg border-primary/10 bg-gradient-to-br from-card to-card/95">
          <div className="border-b">
            <Tabs 
              defaultValue="simple" 
              className="w-full" 
              value={activeTab}
              onValueChange={(value) => setActiveTab(value)}
            >
              <div className="px-6 pt-6">
                <TabsList className="grid grid-cols-2 mb-8 bg-muted/50 p-1">
                  <TabsTrigger 
                    value="simple" 
                    className="select-none data-[state=active]:bg-background data-[state=active]:shadow-sm"
                  >
                    Simplificado
                  </TabsTrigger>
                  <TabsTrigger 
                    value="advanced" 
                    className="select-none data-[state=active]:bg-background data-[state=active]:shadow-sm"
                  >
                    Avançado
                  </TabsTrigger>
                </TabsList>
                <div className="pb-6">
                  <TabsContent value="simple" className="space-y-4 mt-0">
                    <div className="flex items-center gap-2 px-1">
                      <LineChartIcon size={18} className="text-primary" />
                      <h2 className="text-xl font-medium">Cálculo simplificado</h2>
                    </div>
                    <SimpleForm onSubmit={handleSubmit} />
                  </TabsContent>
                  <TabsContent value="advanced" className="space-y-4 mt-0">
                    <div className="flex items-center gap-2 px-1">
                      <LineChartIcon size={18} className="text-primary" />
                      <h2 className="text-xl font-medium">Cálculo avançado</h2>
                    </div>
                    <AdvanceForm onSubmit={handleAdvanceSubmit} />
                  </TabsContent>
                </div>
              </div>
            </Tabs>
          </div>

          {feeData.length > 0 && (
            <div className="p-6 bg-gradient-to-br from-card/80 to-card">
              <h3 className="text-lg font-medium mb-4 text-center">Resultado da simulação</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <CalcResultCard
                  icon="wallet"
                  label="Total investido"
                  value={totals.totalContributed}
                />
                <CalcResultCard
                  icon="trending"
                  label="Total em juros"
                  value={totals.totalInterest}
                  subtitle="Valor originado dos juros"
                />
                <CalcResultCard
                  icon="dolar"
                  label="Total final"
                  value={totals.totalFinal}
                />
                {totals.timeToGoal ? (
                  <CalcResultCard
                    icon="calendar"
                    label="Tempo para a meta"
                    value={totals.timeToGoal}
                  />
                ) : (
                  <CalcResultCard
                    icon="percent"
                    label="Performance"
                    value={totals.performancePercentage}
                    subtitle="Em relação ao valor aportado"
                  />
                )}
              </div>
            </div>
          )}
        </Card>

        {feeData.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 py-8 px-6 mt-4 bg-muted/30 rounded-lg border border-dashed border-muted-foreground/20">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <CalculatorIcon className="h-8 w-8 text-primary" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-medium text-lg">Faça sua primeira simulação</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                Preencha o formulário com seus dados de investimento para visualizar os resultados 
                e começar a planejar seu futuro financeiro.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <ChartCard data={feeData} />
              <TableCard data={feeData} />
            </section>
          </div>
        )}

        <div className="mt-4">
          <Button 
            variant="ghost" 
            className="w-full flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground"
            onClick={() => setShowTutorial(!showTutorial)}
          >
            {showTutorial ? "Ocultar tutorial" : "Como funciona esta calculadora"}
            <ChevronDownIcon 
              size={16} 
              className={cn("transition-transform", 
                showTutorial ? "rotate-180" : ""
              )} 
            />
          </Button>
          {showTutorial && <Tutorial />}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
