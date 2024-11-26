import { FeeData } from "./calcCompoundFee";

export interface AdvanceCompundFee {
  initialAmount: number;
  contributions: number;
  contributionPeriod: "month" | "year" | "quarterly" | "semiannual";
  inflationAdjustment: boolean;
  inflationRate: number;
  fee: number;
  feePeriod: "month" | "year";
  period: number;
  periodType: "month" | "year";
  calcUntilGoal: boolean;
  goal: number;
  reinvestDividends: boolean;
  reinvestDividendsRate: number;
}

const calcAdvanceCompoundFee = ({
  calcUntilGoal,
  contributionPeriod,
  contributions,
  fee,
  feePeriod,
  goal,
  inflationAdjustment,
  inflationRate,
  initialAmount,
  period,
  periodType,
  reinvestDividends,
  reinvestDividendsRate,
}: AdvanceCompundFee): FeeData[] => {
  const totalMonths = periodType === "year" ? period * 12 : period;
  const monthlyFee =
    feePeriod === "year" ? Math.pow(1 + fee / 100, 1 / 12) - 1 : fee / 100;
  let contributionMultiplier = 1;
  let contributionAdjusted = contributions;

  switch (contributionPeriod) {
    case "quarterly":
      contributionMultiplier = 3;
      break;
    case "semiannual":
      contributionMultiplier = 6;
      break;
    case "year":
      contributionMultiplier = 12;
      break;
    default:
      break;
  }

  const result: FeeData[] = [];
  let totalAccumulated = initialAmount;
  let totalContributed = initialAmount;
  let feeOfTheMonth = 0;

  for (
    let month = 1;
    calcUntilGoal ? totalAccumulated < goal : month <= totalMonths;
    month++
  ) {
    // Aplicar juros ao total acumulado (se aplicável)
    if (!!reinvestDividends) {
      const dividend = totalAccumulated * (1 + monthlyFee) - totalAccumulated;
      totalAccumulated += dividend * (reinvestDividendsRate / 100);
      // totalAccumulated *= 1 + monthlyFee;
    }

    // Ajusta a contribuição pela inflação (se aplicável)
    if (!!inflationAdjustment && month % 12 === 0) {
      contributionAdjusted = contributions * (1 + inflationRate / 100);
    }

    // Aplicar aporte no mês correto
    if (month % contributionMultiplier === 0 && !!contributionAdjusted) {
      totalAccumulated += contributionAdjusted;
      totalContributed += contributionAdjusted;
    }
    // Extrair o juros do mês
    feeOfTheMonth = totalAccumulated * (1 + monthlyFee) - totalAccumulated;

    // Salvar os dados do mês atual
    result.push({
      totalContributed,
      totalWithInterest: totalAccumulated,
      feeOfTheMonth: feeOfTheMonth,
      totalFeeUntilNow: totalAccumulated - totalContributed,
      date: month,
    });
  }

  return result;
};

export default calcAdvanceCompoundFee;
