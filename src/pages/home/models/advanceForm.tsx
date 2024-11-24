"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2Icon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import "./advanceForm.css";
import { AdvanceCompundFee } from "@/utils/calcAdvanceCompoundFee";

interface AdvanceFormProps {
  onSubmit: (arg: AdvanceCompundFee) => void;
}

const FormSchema = z.object({
  initialAmount: z.coerce.number().default(0),
  contributions: z.coerce.number().default(0),
  contributionPeriod: z.union([
    z.literal("month"),
    z.literal("year"),
    z.literal("quarterly"),
    z.literal("semiannual"),
  ]),
  fee: z.coerce
    .number()
    .max(1000, { message: "A taxa de juros não pode ser maior que 1000." })
    .default(0),
  feePeriod: z.union([z.literal("month"), z.literal("year")]),
  period: z.coerce.number().min(1).default(0),
  periodType: z.union([z.literal("month"), z.literal("year")]),
  calcUntilGoal: z.boolean().default(false),
  goal: z.coerce.number().default(0),
  inflationAdjustment: z.boolean().default(false),
  inflationRate: z.coerce.number().default(0),
  reinvestDividends: z.boolean().default(false),
  reinvestDividendsRate: z.coerce.number().default(0),
});

type FormValues = z.infer<typeof FormSchema>;

const AdvanceForm: React.FC<AdvanceFormProps> = (props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      initialAmount: 0.0,
      contributions: 0,
      contributionPeriod: "month",
      fee: 10,
      feePeriod: "year",
      period: 0,
      periodType: "year",
      calcUntilGoal: false,
      goal: 0,
      reinvestDividends: true,
      reinvestDividendsRate: 100,
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    props.onSubmit({
      initialAmount: data.initialAmount,
      contributions: data.contributions,
      contributionPeriod: data.contributionPeriod,
      fee: data.fee,
      feePeriod: data.feePeriod,
      period: data.period,
      periodType: data.periodType,
      calcUntilGoal: data.calcUntilGoal,
      goal: data.goal,
      inflationAdjustment: data.inflationAdjustment,
      inflationRate: data.inflationRate,
      reinvestDividends: data.reinvestDividends,
      reinvestDividendsRate: data.reinvestDividendsRate,
    });
  };

  const handleClear = () => {
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="advanceForm">
        <div className=" flex flex-col gap-2">
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

          <div className="flex items-end gap-1">
            <FormField
              control={form.control}
              name="contributions"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel>Aportes</FormLabel>
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
            <FormField
              control={form.control}
              name="contributionPeriod"
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
                        <SelectItem value="quarterly">Trimestral</SelectItem>
                        <SelectItem value="semiannual">Semestral</SelectItem>
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
              name="fee"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel>Taxa de juros</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite a taxa de juros"
                      prefix="%"
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
        </div>
        <div className=" flex flex-col gap-3">
          <div className="flex flex-col gap-4 rounded-lg border p-4 [grid-area:right1]">
            <FormField
              control={form.control}
              name="inflationAdjustment"
              render={({ field }) => (
                <FormItem className="flex items-end gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="cursor-pointer">
                    Ajustar aportes pela inflação
                  </FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="inflationRate"
              disabled={!form.watch("inflationAdjustment")}
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormControl>
                    <Input
                      placeholder="Digite a inflação no período"
                      type="number"
                      min={0}
                      prefix="%"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-4 rounded-lg border p-4 [grid-area:right2]">
            <FormField
              control={form.control}
              name="reinvestDividends"
              render={({ field }) => (
                <FormItem className="flex items-end gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="cursor-pointer">
                    Reinvestimento dos dividendos
                  </FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reinvestDividendsRate"
              disabled={!form.watch("reinvestDividends")}
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormControl>
                    <Input
                      placeholder="Digite a inflação no período"
                      type="number"
                      min={0}
                      prefix="%"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-lg border p-4 [grid-area:bottom]">
          <FormField
            control={form.control}
            name="calcUntilGoal"
            render={({ field }) => (
              <FormItem className="flex items-end gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="cursor-pointer">
                  Calcular até a meta
                </FormLabel>
              </FormItem>
            )}
          />
          {form.watch("calcUntilGoal") ? (
            <FormField
              control={form.control}
              name="period"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel>Meta</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite a meta"
                      className="flex-grow"
                      prefix="$"
                      mask="currency"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          ) : (
            <div className="flex items-end gap-1 ">
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
          )}
        </div>

        <div className="flex items-center gap-2 mt-2 [grid-area:button]">
          <Button type="submit">Calcular</Button>
          <Button variant="secondary" type="button" onClick={handleClear}>
            <Trash2Icon />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AdvanceForm;
