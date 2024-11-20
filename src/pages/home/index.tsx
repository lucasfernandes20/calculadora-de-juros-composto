import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SimpleForm } from "./models/simpleForm";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { currencyFormatter } from "@/utils/currencyFormatter";
import { CalcResultCard } from "./models/calcResultCard";
import { ChartCard } from "./models/chartCard";
import { TableCard } from "./models/tableCard";
import { Header } from "@/models/header";

export interface FormData {
  initialAmount: number;
  monthAmount: number;
  fee: number;
  feePeriod: "year" | "month";
  period: number;
  periodType: "year" | "month";
}

export interface FeeData {
  totalContributed: number;
  totalWithInterest: number;
  date: number;
  feeOfTheMonth: number;
  totalFeeUntilNow: number;
}

export const HomePage = () => {
  const { toast } = useToast();

  const [feeData, setFeeData] = useState<FeeData[]>([]);
  const [totals, setTotals] = useState({
    totalContributed: "",
    totalInterest: "",
    totalFinal: "",
    performancePercentage: "",
  });

  const handleSubmit = (data: FormData) => {
    const { initialAmount, monthAmount, fee, feePeriod, period, periodType } =
      data;

    // Converter taxa e período para valores consistentes
    const monthlyFee =
      feePeriod === "year" ? Math.pow(1 + fee / 100, 1 / 12) - 1 : fee / 100;
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

    const result: FeeData[] = [];
    let totalWithInterest = initialAmount + monthAmount;
    let totalContributed = initialAmount + monthAmount;
    let feeOfTheMonth = 0;

    for (let month = 1; month <= totalMonths; month++) {
      // Aplicar juros ao total acumulado
      if (month > 1) {
        totalWithInterest *= 1 + monthlyFee;
      }

      if (month === 1) {
        feeOfTheMonth = initialAmount * (1 + monthlyFee) - initialAmount;
      } else {
        feeOfTheMonth =
          totalWithInterest * (1 + monthlyFee) - totalWithInterest;
      }

      // Adicionar a contribuição mensal (exceto no primeiro mês)
      if (month > 1) {
        totalContributed += monthAmount;
        totalWithInterest += monthAmount;
      }

      // Salvar os dados do mês atual
      result.push({
        totalContributed,
        totalWithInterest,
        feeOfTheMonth: feeOfTheMonth,
        totalFeeUntilNow: totalWithInterest - totalContributed,
        date: month,
      });
    }

    setTotals({
      totalContributed: currencyFormatter({
        value: totalContributed,
        style: "currency",
      }),
      totalInterest: currencyFormatter({
        value: totalWithInterest - totalContributed,
        style: "currency",
      }),
      totalFinal: currencyFormatter({
        value: totalWithInterest,
        style: "currency",
      }),
      performancePercentage:
        ((totalWithInterest / totalContributed) * 100).toFixed(2) + "%",
    });
    setFeeData(result);
  };

  return (
    <div>
      <Header />
      <div className="container m-auto flex flex-col gap-4 mb-6">
        <h1 className="text-xl font-bold md:text-2xl">
          Cálculadora de juros composto
        </h1>
        <Tabs defaultValue="simple">
          <TabsList className="mb-4">
            <TabsTrigger value="simple">Simplificado</TabsTrigger>
            <TabsTrigger value="advanced">Avançado</TabsTrigger>
          </TabsList>
          <Card className="p-6">
            <TabsContent value="simple">
              <SimpleForm onSubmit={handleSubmit} />
            </TabsContent>
            <TabsContent value="advanced">Em breve.</TabsContent>
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
            <CalcResultCard
              icon="percent"
              label="Performance"
              value={totals.performancePercentage}
              subtitle="Em relação com o que você aportou"
            />
          </section>
        ) : (
          <p className="text-center mt-4">
            Preencha com seus números para mostrar os resultados.
          </p>
        )}
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ChartCard data={feeData} />
          <TableCard data={feeData} />
        </section>
      </div>
    </div>
  );
};
