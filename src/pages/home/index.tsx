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

    setTotals(getTotals(result));

    setFeeData(result);
  };

  const handleAdvanceSubmit = (data: AdvanceCompundFee) => {
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
    if (!data.initialAmount && !data.contributions) {
      toast({
        title: "Nada para calcular",
        description: "Preencha pelo menos um dos campos de investimento.",
        variant: "destructive",
        duration: 5_000,
      });
      return;
    }

    const result = calcAdvanceCompoundFee(data);

    setTotals(getTotals(result));

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
            <TabsTrigger value="simple">Simplificado</TabsTrigger>
            <TabsTrigger value="advanced">Avançado</TabsTrigger>
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

export default HomePage;
