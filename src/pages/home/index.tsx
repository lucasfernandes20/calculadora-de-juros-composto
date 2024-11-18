"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SimpleForm } from "./models/simpleForm";
import { useState } from "react";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  DollarSignIcon,
  PercentIcon,
  TrendingUpIcon,
  Wallet2Icon,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { currencyFormatter } from "@/utils/currencyFormatter";

export interface FormData {
  initialAmount: number;
  monthAmount: number;
  fee: number;
  feePeriod: "year" | "month";
  period: number;
  periodType: "year" | "month";
}

interface FeeData {
  totalContributed: number;
  totalWithInterest: number;
  date: number;
}

const chartConfig = {
  totalContributed: {
    label: "Total aportado",
    color: "#ffc852",
  },
  totalWithInterest: {
    label: "Total com juros",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

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

    for (let month = 1; month <= totalMonths; month++) {
      // Aplicar juros ao total acumulado
      if (month > 1) {
        totalWithInterest *= 1 + monthlyFee;
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
      <header className="border-b-[1px] border-muted mb-4 py-2 ">
        <div className="container mx-auto flex items-center justify-between">
          <nav>
            <ul>
              <li>
                <Button variant="link">Cálculadora</Button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div className="container m-auto flex flex-col gap-4 mb-6">
        <h1 className="text-4xl font-bold">Cálculadora de juros composto</h1>
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
          <section className="grid grid-cols-4 gap-4">
            <Card className="p-6 flex-grow flex flex-col gap-1 justify-start">
              <div className="flex items-center justify-between w-full">
                <h4 className="font-semibold text-sm">Total investido</h4>
                <Wallet2Icon size="1rem" />
              </div>
              <span className="text-2xl font-bold text-foreground">
                {totals.totalContributed}
              </span>
            </Card>
            <Card className="p-6 flex-grow flex flex-col gap-1 justify-start">
              <div className="flex items-center justify-between w-full">
                <h4 className="font-semibold text-sm">Total em juros</h4>
                <TrendingUpIcon size="1rem" />
              </div>
              <span className="text-2xl font-bold text-foreground overflow-hidden text-ellipsis whitespace-nowrap">
                + {totals.totalInterest}
              </span>
              <span className="text-xs">Valor originado de juros</span>
            </Card>
            <Card className="p-6 flex-grow flex flex-col gap-1 justify-start">
              <div className="flex items-center justify-between w-full">
                <h4 className="font-semibold text-sm">Total final</h4>
                <DollarSignIcon size="1rem" />
              </div>
              <span className="text-2xl font-bold text-foreground overflow-hidden text-ellipsis whitespace-nowrap">
                {totals.totalFinal}
              </span>
            </Card>
            <Card className="p-6 flex-grow flex flex-col gap-1 justify-start">
              <div className="flex items-center justify-between w-full">
                <h4 className="font-semibold text-sm">Performance</h4>
                <PercentIcon size="1rem" />
              </div>
              <span className="text-2xl font-bold text-foreground overflow-hidden text-ellipsis whitespace-nowrap">
                {totals.performancePercentage}
              </span>
              <span className="text-xs">Em relação com o que você aportou</span>
            </Card>
          </section>
        ) : null}
        <section className="grid grid-cols-2 gap-4">
          <Card className="p-6">
            {feeData && (
              <ChartContainer config={chartConfig} className="w-full">
                <LineChart accessibilityLayer data={feeData}>
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    tickMargin={5}
                    axisLine={false}
                    tickFormatter={(value) => value}
                  />
                  <CartesianGrid stroke="#dadada" strokeDasharray="5 5" />
                  <YAxis
                    dataKey="totalWithInterest"
                    tickLine={false}
                    tickMargin={5}
                    axisLine={false}
                    tickFormatter={(value) =>
                      currencyFormatter({
                        value,
                        style: "decimal",
                        compact: true,
                      })
                    }
                  />
                  <Line
                    dataKey="totalContributed"
                    fill="var(--color-totalContributed)"
                    stroke="var(--color-totalContributed)"
                    radius={4}
                  />
                  <Tooltip />
                  <Line
                    dataKey="totalWithInterest"
                    fill="var(--color-totalWithInterest)"
                    stroke="var(--color-totalWithInterest)"
                    radius={4}
                  />
                </LineChart>
              </ChartContainer>
            )}
          </Card>
          <Card className="p-6 overflow-y-auto h-[400px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mês</TableHead>
                  <TableHead>Juros</TableHead>
                  <TableHead>Total investido</TableHead>
                  <TableHead>Total Juros</TableHead>
                  <TableHead className="text-right">Total acumulado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {feeData.map((data) => (
                  <TableRow key={data.date}>
                    <TableCell className="font-medium">{data.date}</TableCell>
                    <TableCell>
                      {currencyFormatter({
                        value: data.totalWithInterest - data.totalContributed,
                        style: "currency",
                        compact: true,
                      })}
                    </TableCell>
                    <TableCell>
                      {currencyFormatter({
                        value: data.totalContributed,
                        style: "currency",
                        compact: true,
                      })}
                    </TableCell>
                    <TableCell>
                      {currencyFormatter({
                        value: data.totalWithInterest,
                        style: "currency",
                        compact: true,
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      {currencyFormatter({
                        value: data.totalWithInterest,
                        style: "currency",
                        compact: true,
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </section>
      </div>
    </div>
  );
};
