import React from "react";
import { Card } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { currencyFormatter } from "@/utils/currencyFormatter";
import { FeeData } from "@/utils/calcCompoundFee";

interface ChartCardProps {
  data?: FeeData[];
}

const chartConfig = {
  totalContributed: {
    label: "Total aportado",
    color: "hsl(var(--chart-3))",
  },
  totalWithInterest: {
    label: "Total com juros",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const CustomTooltip: React.FC<{
  payload?: { value: number }[];
  label?: string;
  active?: boolean;
}> = ({ payload, active }) => {
  if (!active || !payload) return null;
  return (
    <div className="custom-tooltip bg-primary p-4 rounded-md">
      <p className="label text-primary-foreground text-base">{`Total investido : ${currencyFormatter(
        {
          value: payload[0]?.value,
          style: "decimal",
          compact: true,
        }
      )}`}</p>
      <p className="label text-primary-foreground text-base">{`Total com juros : ${currencyFormatter(
        {
          value: payload[1]?.value,
          style: "decimal",
          compact: true,
        }
      )}`}</p>
    </div>
  );
};

const ChartCard: React.FC<ChartCardProps> = (props) => {
  if (!props.data?.length) return null;
  return (
    <Card className="p-6">
      <div className="flex flex-col items-center justify-between mb-4 md:flex-row">
        <h1 className="text-lg">Gráfico visão geral</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="bg-chart-1 h-4 w-4 rounded-full"></div>
            <span className="text-sm">Total acúmulado</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="bg-chart-3 h-4 w-4 rounded-full"></div>
            <span className="text-sm">Total investido</span>
          </div>
        </div>
      </div>
      <ChartContainer config={chartConfig} className="w-full -ml-4">
        <LineChart accessibilityLayer data={props.data}>
          <XAxis
            dataKey="date"
            tickLine={false}
            tickMargin={5}
            axisLine={false}
            tickFormatter={(value) => value}
          />
          <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="5 5" />
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
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            dataKey="totalWithInterest"
            fill="var(--color-totalWithInterest)"
            stroke="var(--color-totalWithInterest)"
          />
        </LineChart>
      </ChartContainer>
    </Card>
  );
};

export default ChartCard;
