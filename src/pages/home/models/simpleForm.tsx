"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CompoundFee } from "@/utils/calcCompoundFee";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2Icon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface SimpleFormProps {
  onSubmit: (arg: CompoundFee) => void;
}

const FormSchema = z.object({
  initialAmount: z.coerce
    .string()
    .default("0,0")
    .transform((v) => parseFloat(v.replace(/\./g, "").replace(",", "."))),
  monthAmount: z.coerce
    .string()
    .default("0,0")
    .transform((v) => parseFloat(v.replace(/\./g, "").replace(",", "."))),
  fee: z.coerce
    .number()
    .positive({ message: "A taxa de juros deve ser um número positivo." })
    .max(1000, { message: "A taxa de juros não pode ser maior que 1000." })
    .default(0),
  feePeriod: z.union([z.literal("month"), z.literal("year")]),
  period: z.coerce.number().min(1).default(0),
  periodType: z.union([z.literal("month"), z.literal("year")]),
});

type FormValues = z.infer<typeof FormSchema>;

const SimpleForm: React.FC<SimpleFormProps> = (props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      initialAmount: 0.0,
      monthAmount: 0,
      fee: 10,
      feePeriod: "year",
      period: 0,
      periodType: "year",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    props.onSubmit({
      initialAmount: data.initialAmount,
      monthAmount: data.monthAmount,
      fee: data.fee,
      feePeriod: data.feePeriod,
      period: data.period,
      periodType: data.periodType,
    });
  };

  const handleClear = () => {
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-y-6 gap-x-8 md:grid-cols-2"
      >
        <div className="space-y-6">
          <div className="bg-muted/30 p-4 rounded-lg space-y-4">
            <h3 className="text-sm font-medium text-foreground/80">Valores de investimento</h3>
            <FormField
              control={form.control}
              name="initialAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/70">Valor inicial</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o valor que já possui"
                      prefix="$"
                      {...field}
                      mask="currency"
                      className="bg-background"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="monthAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/70">Valor mensal</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o valor que irá investir mensalmente"
                      prefix="$"
                      {...field}
                      mask="currency"
                      className="bg-background"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-muted/30 p-4 rounded-lg space-y-4">
            <h3 className="text-sm font-medium text-foreground/80">Parâmetros de rentabilidade</h3>
            <div className="flex items-end gap-2">
              <FormField
                control={form.control}
                name="fee"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormLabel className="text-foreground/70">Taxa de juros</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite a taxa de juros"
                        prefix="%"
                        max={1000}
                        type="number"
                        {...field}
                        className="bg-background"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="feePeriod"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[100px] md:w-[120px] bg-background">
                        <SelectValue />
                      </SelectTrigger>
                      <FormControl>
                        <SelectContent>
                          <SelectItem value="month">Mensal</SelectItem>
                          <SelectItem value="year">Anual</SelectItem>
                        </SelectContent>
                      </FormControl>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-end gap-2">
              <FormField
                control={form.control}
                name="period"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormLabel className="text-foreground/70">Período</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite o período"
                        className="flex-grow bg-background"
                        type="number"
                        min={0}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="periodType"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[100px] md:w-[120px] bg-background">
                        <SelectValue />
                      </SelectTrigger>
                      <FormControl>
                        <SelectContent>
                          <SelectItem value="month">Meses</SelectItem>
                          <SelectItem value="year">Anos</SelectItem>
                        </SelectContent>
                      </FormControl>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 md:col-span-2">
          <Button 
            type="submit" 
            className="font-medium max-w-60 flex-1 shadow-sm gap-2"
            size="lg"
          >
            Calcular
          </Button>
          <TooltipProvider>
            <Tooltip delayDuration={100}>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  type="button"
                  onClick={handleClear}
                  className="h-10 w-10"
                >
                  <Trash2Icon className="text-primary h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Limpar dados</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </form>
    </Form>
  );
};

export default SimpleForm;
