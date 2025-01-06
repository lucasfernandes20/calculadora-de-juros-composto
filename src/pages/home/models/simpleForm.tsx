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
        className="mt-5 grid grid-cols-1 gap-4 gap-x-12 md:grid-cols-2"
      >
        <FormField
          control={form.control}
          name="initialAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor inicial</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite o valor que já possui"
                  prefix="$"
                  {...field}
                  mask="currency"
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
              <FormLabel>Valor mensal</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite o valor que irá investir mensalmente"
                  prefix="$"
                  {...field}
                  mask="currency"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex items-end gap-1">
          <FormField
            control={form.control}
            name="fee"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormLabel>Taxa de juros</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite a taxa de juros"
                    prefix="%"
                    max={1000}
                    type="number"
                    {...field}
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
                  <SelectTrigger className="w-[85px] md:w-[120px]">
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

        <div className="flex items-end gap-1">
          <FormField
            control={form.control}
            name="period"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormLabel>Período</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite o período"
                    className="flex-grow"
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
                  <SelectTrigger className="w-[85px] md:w-[120px]">
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

        <div className="flex items-center gap-2 mt-2">
          <Button type="submit" className="font-bold max-w-60 flex-1">
            Calcular
          </Button>
          <TooltipProvider>
            <Tooltip delayDuration={100}>
              <TooltipTrigger asChild>
                <Button variant="secondary" type="button" onClick={handleClear}>
                  <Trash2Icon />
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
