import { Card } from "@/components/ui/card";
import {
  Calendar1Icon,
  DollarSignIcon,
  PercentIcon,
  TrendingUpIcon,
  Wallet2Icon,
} from "lucide-react";
import React from "react";

interface CalcResultCardProps {
  label: string;
  icon: "wallet" | "trending" | "dolar" | "percent" | "calendar";
  value: string;
  subtitle?: string;
}

const CalcResultCard: React.FC<CalcResultCardProps> = (props) => {
  const getIcon = (
    icon: "wallet" | "trending" | "dolar" | "percent" | "calendar"
  ) => {
    switch (icon) {
      case "wallet":
        return <Wallet2Icon size="1rem" />;
      case "trending":
        return <TrendingUpIcon size="1rem" />;
      case "dolar":
        return <DollarSignIcon size="1rem" />;
      case "percent":
        return <PercentIcon size="1rem" />;
      case "calendar":
        return <Calendar1Icon size="1rem" />;
      default:
        return <Wallet2Icon size="1rem" />;
    }
  };

  return (
    <Card className="p-6 flex-grow flex flex-col gap-1 justify-start">
      <div className="flex items-center justify-between w-full">
        <h4 className="font-semibold text-xs md:text-sm">{props.label}</h4>
        {getIcon(props.icon)}
      </div>
      <span className="font-bold text-foreground text-lg md:text-2xl">
        {props.value}
      </span>
      {props.subtitle && <span className="text-xs">{props.subtitle}</span>}
    </Card>
  );
};

export default CalcResultCard;
