"use client";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SimpleForm from "./models/simpleForm";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import CalcResultCard from "./models/calcResultCard";
import ChartCard from "./models/chartCard";
import TableCard from "./models/tableCard";
import Header from "@/models/header";
import calcCompoundFee, { CompoundFee, FeeData } from "@/utils/calcCompoundFee";
import getTotals, { Totals } from "@/utils/getTotals";
import AdvanceForm from "./models/advanceForm";
import calcAdvanceCompoundFee, {
  AdvanceCompundFee,
} from "@/utils/calcAdvanceCompoundFee";
import { TextSearchIcon } from "lucide-react";

const HomePage = () => {
  const { toast } = useToast();

  const [feeData, setFeeData] = useState<FeeData[]>([]);
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
    <div>
      <Header />
      <div className="container m-auto flex flex-col gap-4 mb-6">
        <h1 className="text-xl font-bold md:text-2xl">
          Calculadora de juros composto
        </h1>
        <Tabs defaultValue="simple">
          <TabsList className="mb-4">
            <TabsTrigger value="simple" className="select-none">
              Simplificado
            </TabsTrigger>
            <TabsTrigger value="advanced" className="select-none">
              Avançado
            </TabsTrigger>
          </TabsList>
          <Card className="p-6">
            <TabsContent value="simple">
              <SimpleForm onSubmit={handleSubmit} />
            </TabsContent>
            <TabsContent value="advanced">
              <AdvanceForm onSubmit={handleAdvanceSubmit} />
            </TabsContent>
          </Card>
        </Tabs>
        {feeData.length ? (
          <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
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
                subtitle="Em relação com o que você aportou"
              />
            )}
          </section>
        ) : (
          <div className="flex flex-col gap-4 items-center mt-6">
            <p className="text-center">
              Preencha com seus números para mostrar os resultados.
            </p>
            <TextSearchIcon size="3rem" className="text-muted-foreground" />
          </div>
        )}
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ChartCard data={feeData} />
          <TableCard data={feeData} />
        </section>
      </div>
    </div>
  );
};

export default HomePage;
