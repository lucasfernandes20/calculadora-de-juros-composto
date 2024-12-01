import { FeeData } from "./calcCompoundFee";
import { currencyFormatter } from "./currencyFormatter";

export interface Totals {
  totalContributed: string;
  totalInterest: string;
  totalFinal: string;
  performancePercentage: string;
  timeToGoal?: string;
}

const formatTimeToGoal = (date: number) => {
  if (date < 12) return date > 1 ? `${date} meses` : `${date} mês`;
  const years = Math.floor(date / 12);
  const months = date % 12;

  const yearString = years > 1 ? "anos" : "ano";
  const monthString = !!months
    ? months > 1
      ? `e ${months} meses`
      : `e ${months} mês`
    : "";

  return `${years} ${yearString} ${monthString}`;
};

const getTotals = ({
  data,
  showTimeToGoal = false,
}: {
  data: FeeData[];
  showTimeToGoal?: boolean;
}) => {
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
    timeToGoal: showTimeToGoal ? formatTimeToGoal(latestMonth.date) : undefined,
  };
};

export default getTotals;
