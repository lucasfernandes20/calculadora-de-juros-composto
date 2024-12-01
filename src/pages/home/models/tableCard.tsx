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
import { ArrowDownWideNarrow, ArrowUpNarrowWide } from "lucide-react";
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
    <Card className="px-6 overflow-y-auto h-[450px]">
      <div className="mb-4 pt-6 pb-2 flex items-center justify-between sticky top-0 bg-card z-10">
        <h1 className="text-lg">Tabela de dados mensais</h1>
        <TooltipProvider>
          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <Button
                onClick={() =>
                  setSort((prev) => (prev === "asc" ? "desc" : "asc"))
                }
                variant="outline"
                className="p-3 relative"
              >
                <ArrowDownWideNarrow
                  className={cn(
                    "absolute transition-all scale-0 rotate-90",
                    sort === "asc" && "scale-1 rotate-0"
                  )}
                />
                <ArrowUpNarrowWide
                  className={cn(
                    "transition-all scale-1 rotate-0",
                    sort === "asc" && "scale-0 rotate-90"
                  )}
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-primary-foreground">
                {sort === "asc" ? "Ordenar decrescente" : "Ordenar crescente"}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xs font-bold">Mês</TableHead>
            <TableHead className="text-xs font-bold">Juros</TableHead>
            <TableHead className="text-xs font-bold">Total investido</TableHead>
            <TableHead className="text-xs font-bold">Total Juros</TableHead>
            <TableHead className="text-right text-xs font-bold">
              Total acumulado
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {getReversedData().map((data) => (
            <TableRow key={data.date} className="hover:bg-primary/10">
              <TableCell className="text-xs">{data.date}</TableCell>
              <TableCell>
                {currencyFormatter({
                  value: data.feeOfTheMonth,
                  style: "currency",
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
                  value: data.totalFeeUntilNow,
                  style: "currency",
                  compact: true,
                })}
              </TableCell>
              <TableCell className="text-right">
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
    </Card>
  );
});

TableCard.displayName = "TableCard";
export default TableCard;
