import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  mask?: "currency";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, prefix, mask, ...props }, ref) => {
    const formatCurrency = (value: string) => {
      // Remove todos os caracteres que não são números
      const numericValue = value.replace(/\D/g, "");

      // Formata o valor como moeda
      const formattedValue = new Intl.NumberFormat("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(parseFloat(numericValue) / 100);

      return formattedValue;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (mask === "currency" && e.target.value !== "") {
        e.target.value = formatCurrency(e.target.value);
      }
      if (props.onChange) {
        props.onChange(e);
      }
    };

    return (
      <div className={cn("flex items-stretch", className)}>
        {prefix && (
          <p
            className={cn(
              "bg-input rounded-tl-lg rounded-bl-lg flex justify-center items-center text-input-foreground select-none w-10",
              props.disabled ? "bg-input/40 text-muted-foreground/60" : ""
            )}
          >
            {prefix}
          </p>
        )}
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className,
            prefix ? "rounded-tl-none rounded-bl-none" : "rounded-md"
          )}
          ref={ref}
          {...props}
          onChange={handleChange}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };

