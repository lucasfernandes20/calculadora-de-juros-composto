import { FeeData } from "./calcCompoundFee";
import { currencyFormatter } from "./currencyFormatter";

export interface Totals {
  totalContributed: string;
  totalInterest: string;
  totalFinal: string;
  performancePercentage: string;
}

const getTotals = (data: FeeData[]) => {
  const latestMonth = data[data.length - 1];
  if (!latestMonth) return {} as Totals;

  return {
    totalContributed: currencyFormatter({
      value: latestMonth.totalContributed,
      style: "currency",
    }),
    totalInterest: currencyFormatter({
      value: latestMonth.totalWithInterest - latestMonth.totalContributed,
      style: "currency",
    }),
    totalFinal: currencyFormatter({
      value: latestMonth.totalWithInterest,
      style: "currency",
    }),
    performancePercentage:
      (
        (latestMonth.totalWithInterest / latestMonth.totalContributed) *
        100
      ).toFixed(2) + "%",
  };
};

export default getTotals;
