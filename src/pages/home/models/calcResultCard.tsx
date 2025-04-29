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
        return <Wallet2Icon className="text-emerald-500" size="1.5rem" />;
      case "trending":
        return <TrendingUpIcon className="text-blue-500" size="1.5rem" />;
      case "dolar":
        return <DollarSignIcon className="text-violet-500" size="1.5rem" />;
      case "percent":
        return <PercentIcon className="text-amber-500" size="1.5rem" />;
      case "calendar":
        return <Calendar1Icon className="text-red-500" size="1.5rem" />;
      default:
        return <Wallet2Icon className="text-emerald-500" size="1.5rem" />;
    }
  };

  const getBgColor = (
    icon: "wallet" | "trending" | "dolar" | "percent" | "calendar"
  ) => {
    switch (icon) {
      case "wallet":
        return "bg-emerald-500/10";
      case "trending":
        return "bg-blue-500/10";
      case "dolar":
        return "bg-violet-500/10";
      case "percent":
        return "bg-amber-500/10";
      case "calendar":
        return "bg-red-500/10";
      default:
        return "bg-emerald-500/10";
    }
  };

  return (
    <Card className="p-5 flex-grow flex flex-col group hover:shadow-md transition-all duration-300 overflow-hidden relative border-primary/10">
      <div className="absolute top-0 right-0 w-24 h-24 opacity-5 -mr-6 -mt-6 rounded-full group-hover:opacity-10 transition-opacity duration-300">
        {getIcon(props.icon)}
      </div>
      
      <div className="flex items-start gap-3 mb-2">
        <div className={`p-2 rounded-full ${getBgColor(props.icon)}`}>
          {getIcon(props.icon)}
        </div>
        <div className="flex flex-col">
          <h4 className="font-medium text-sm md:text-base text-foreground/80">{props.label}</h4>
          {props.subtitle && (
            <span className="text-xs text-muted-foreground mt-0.5">{props.subtitle}</span>
          )}
        </div>
      </div>
      
      <span className="font-bold text-foreground text-xl md:text-3xl mt-2">
        {props.value}
      </span>
    </Card>
  );
};

const areEqual = (
  prevProps: CalcResultCardProps,
  nextProps: CalcResultCardProps
) => {
  return (
    prevProps.icon === nextProps.icon &&
    prevProps.value === nextProps.value &&
    prevProps.subtitle === nextProps.subtitle &&
    prevProps.label === nextProps.label
  );
};

export default React.memo(CalcResultCard, areEqual);

