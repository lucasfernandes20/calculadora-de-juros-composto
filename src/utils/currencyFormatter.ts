interface CurrencyFormatterRequest {
  value: number;
  style: "decimal" | "currency";
  compact?: boolean;
}

export const currencyFormatter = (req: CurrencyFormatterRequest) => {
  return new Intl.NumberFormat("pt-BR", {
    style: req.style,
    currency: "BRL",
    compactDisplay: req.compact ? "short" : "long",
    notation: req.compact ? "compact" : "standard",
  }).format(req.value);
};
