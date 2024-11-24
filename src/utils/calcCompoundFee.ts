export interface CompoundFee {
  initialAmount: number;
  monthAmount: number;
  fee: number;
  feePeriod: "year" | "month";
  period: number;
  periodType: "year" | "month";
}

export interface FeeData {
  totalContributed: number;
  totalWithInterest: number;
  date: number;
  feeOfTheMonth: number;
  totalFeeUntilNow: number;
}

const calcCompoundFee = ({
  initialAmount,
  monthAmount,
  fee,
  feePeriod,
  period,
  periodType,
}: CompoundFee): FeeData[] => {
  // Converter taxa e período para valores consistentes
  const monthlyFee =
    feePeriod === "year" ? Math.pow(1 + fee / 100, 1 / 12) - 1 : fee / 100;
  const totalMonths = periodType === "year" ? period * 12 : period;

  const result: FeeData[] = [];
  let totalWithInterest = initialAmount + monthAmount;
  let totalContributed = initialAmount + monthAmount;
  let feeOfTheMonth = 0;

  for (let month = 1; month <= totalMonths; month++) {
    // Aplicar juros ao total acumulado
    totalWithInterest *= 1 + monthlyFee;

    if (month === 1) {
      feeOfTheMonth = initialAmount * (1 + monthlyFee) - initialAmount;
    } else {
      feeOfTheMonth = totalWithInterest * (1 + monthlyFee) - totalWithInterest;
    }

    // Adicionar a contribuição mensal (exceto no primeiro mês)
    if (month > 1) {
      totalContributed += monthAmount;
      totalWithInterest += monthAmount;
    }

    // Salvar os dados do mês atual
    result.push({
      totalContributed,
      totalWithInterest,
      feeOfTheMonth: feeOfTheMonth,
      totalFeeUntilNow: totalWithInterest - totalContributed,
      date: month,
    });
  }

  return result;
};

export default calcCompoundFee;
