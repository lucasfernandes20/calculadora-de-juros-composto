import React from "react";
import { Card } from "@/components/ui/card";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { currencyFormatter } from "@/utils/currencyFormatter";
import { FeeData } from "@/utils/calcCompoundFee";
import { BarChart3Icon } from "lucide-react";

interface ChartCardProps {
  data?: FeeData[];
}

interface TooltipPayload {
  value: number;
  payload?: {
    date: string;
  };
}

const CustomTooltip: React.FC<{
  payload?: TooltipPayload[];
  label?: string;
  active?: boolean;
}> = ({ payload, active }) => {
  if (!active || !payload) return null;
  return (
    <div className="custom-tooltip bg-background border border-border p-4 rounded-md shadow-md">
      <p className="text-base font-medium mb-2">Período: {payload[0]?.payload?.date}</p>
      <div className="flex flex-col gap-1.5">
        <p className="text-sm flex items-center gap-2">
          <span className="bg-chart-3 h-3 w-3 rounded-full inline-block"></span>
          <span>Total investido: </span>
          <span className="font-semibold">
            {currencyFormatter({
              value: payload[0]?.value,
              style: "decimal",
              compact: false,
            })}
          </span>
        </p>
        <p className="text-sm flex items-center gap-2">
          <span className="bg-chart-1 h-3 w-3 rounded-full inline-block"></span>
          <span>Total com juros: </span>
          <span className="font-semibold">
            {currencyFormatter({
              value: payload[1]?.value,
              style: "decimal",
              compact: false,
            })}
          </span>
        </p>
      </div>
    </div>
  );
};

const ChartCard: React.FC<ChartCardProps> = (props) => {
  if (!props.data?.length) return null;
  return (
    <Card className="p-6 overflow-hidden">
      <div className="flex flex-col items-start gap-2 mb-6">
        <div className="flex items-center gap-2 text-primary">
          <BarChart3Icon className="h-5 w-5" />
          <h2 className="text-lg font-medium">Evolução do Investimento</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Visualize o crescimento do seu investimento ao longo do tempo
        </p>
      </div>
      
      <div className="flex flex-wrap items-center justify-center gap-4 mb-4 text-sm">
        <div className="flex items-center gap-2 bg-chart-1/10 px-3 py-1.5 rounded-full">
          <div className="bg-chart-1 h-3 w-3 rounded-full"></div>
          <span>Total acumulado</span>
        </div>
        <div className="flex items-center gap-2 bg-chart-3/10 px-3 py-1.5 rounded-full">
          <div className="bg-chart-3 h-3 w-3 rounded-full"></div>
          <span>Total investido</span>
        </div>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={props.data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
            <XAxis 
              dataKey="date"
              tickLine={false}
              axisLine={{ stroke: 'hsl(var(--border))' }}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => value}
            />
            <YAxis
              tickLine={false}
              axisLine={{ stroke: 'hsl(var(--border))' }}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) =>
                currencyFormatter({
                  value,
                  style: "decimal",
                  compact: true,
                })
              }
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="totalContributed"
              stroke="hsl(var(--chart-3))"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
            <Line
              type="monotone"
              dataKey="totalWithInterest"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default ChartCard;
