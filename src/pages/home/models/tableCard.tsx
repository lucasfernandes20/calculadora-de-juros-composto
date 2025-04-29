import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { currencyFormatter } from "@/utils/currencyFormatter";
import React, { memo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDownWideNarrow, ArrowUpNarrowWide, TableIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FeeData } from "@/utils/calcCompoundFee";

interface TableCardProps {
  data?: FeeData[];
}

const TableCard: React.FC<TableCardProps> = memo((props) => {
  const [sort, setSort] = React.useState<"asc" | "desc">("desc");

  const getReversedData = useCallback(() => {
    if (!props.data) return [];
    if (sort === "asc") return props.data;
    return props.data.slice().reverse();
  }, [props.data, sort]);

  if (!props.data?.length) return null;
  return (
    <Card className="overflow-hidden">
      <div className="px-6 pt-6 pb-4 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary">
            <TableIcon className="h-5 w-5" />
            <h2 className="text-lg font-medium">Detalhamento Mensal</h2>
          </div>
          <TooltipProvider>
            <Tooltip delayDuration={200}>
              <TooltipTrigger asChild>
                <Button
                  onClick={() =>
                    setSort((prev) => (prev === "asc" ? "desc" : "asc"))
                  }
                  variant="outline"
                  size="sm"
                  className="h-9 w-9 p-0 relative"
                >
                  <ArrowDownWideNarrow
                    className={cn(
                      "absolute transition-all scale-0 rotate-90",
                      sort === "asc" && "scale-100 rotate-0"
                    )}
                    size={16}
                  />
                  <ArrowUpNarrowWide
                    className={cn(
                      "transition-all scale-100 rotate-0",
                      sort === "asc" && "scale-0 rotate-90"
                    )}
                    size={16}
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>
                  {sort === "asc" ? "Ordenar decrescente" : "Ordenar crescente"}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-sm text-muted-foreground">
          Acompanhe a evolução mês a mês do seu investimento
        </p>
      </div>
      
      <div className="max-h-[350px] overflow-y-auto border-t">
        <Table>
          <TableHeader className="bg-muted/50 sticky top-0">
            <TableRow>
              <TableHead className="text-xs font-semibold text-foreground/80 w-1/5">Mês</TableHead>
              <TableHead className="text-xs font-semibold text-foreground/80">Juros</TableHead>
              <TableHead className="text-xs font-semibold text-foreground/80">Total investido</TableHead>
              <TableHead className="text-xs font-semibold text-foreground/80">Total Juros</TableHead>
              <TableHead className="text-right text-xs font-semibold text-foreground/80">
                Total acumulado
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {getReversedData().map((data) => (
              <TableRow 
                key={data.date} 
                className="hover:bg-muted/30 transition-colors"
              >
                <TableCell className="text-xs font-medium">{data.date}</TableCell>
                <TableCell className="text-xs">
                  {currencyFormatter({
                    value: data.feeOfTheMonth,
                    style: "currency",
                  })}
                </TableCell>
                <TableCell className="text-xs">
                  {currencyFormatter({
                    value: data.totalContributed,
                    style: "currency",
                    compact: true,
                  })}
                </TableCell>
                <TableCell className="text-xs">
                  {currencyFormatter({
                    value: data.totalFeeUntilNow,
                    style: "currency",
                    compact: true,
                  })}
                </TableCell>
                <TableCell className="text-right text-xs font-semibold">
                  {currencyFormatter({
                    value: data.totalWithInterest,
                    style: "currency",
                    compact: false,
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
});

TableCard.displayName = "TableCard";
export default TableCard;
