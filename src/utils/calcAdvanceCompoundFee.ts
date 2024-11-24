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
  console.log({
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
  });
  const totalMonths = periodType === "year" ? period * 12 : period;
  const monthlyFee = feePeriod === "year" ? fee / 12 / 100 : fee / 100;
  const contributionMultiplier =
    contributionPeriod === "month"
      ? 1
      : contributionPeriod === "quarterly"
      ? 3
      : contributionPeriod === "semiannual"
      ? 6
      : 12;

  const results: FeeData[] = [];

  let currentAmount = initialAmount;
  let totalContributed = initialAmount;
  let totalFeeAccumulated = 0;

  for (let month = 1; month <= totalMonths; month++) {
    if (month % contributionMultiplier === 0) {
      currentAmount += contributions;
      totalContributed += contributions;
    }

    const feeOfTheMonth = currentAmount * monthlyFee;
    currentAmount += feeOfTheMonth;
    totalFeeAccumulated += feeOfTheMonth;

    if (reinvestDividends) {
      const reinvestment = (reinvestDividendsRate / 100) * feeOfTheMonth;
      currentAmount += reinvestment;
    }

    if (inflationAdjustment) {
      currentAmount -= currentAmount * (inflationRate / 100 / 12);
    }

    results.push({
      totalContributed,
      date: month,
      totalWithInterest: currentAmount,
      feeOfTheMonth,
      totalFeeUntilNow: totalFeeAccumulated,
    });

    if (calcUntilGoal && currentAmount >= goal) {
      break;
    }
  }

  return results;
};

export default calcAdvanceCompoundFee;
