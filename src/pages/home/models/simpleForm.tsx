"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
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
import { FormData } from "..";

interface SimpleFormProps {
  onSubmit: (arg: FormData) => void;
}

const FormSchema = z.object({
  initialAmount: z.coerce.number().default(0),
  monthAmount: z.coerce.number().default(0),
  fee: z.coerce.number().default(0),
  feePeriod: z.union([z.literal("month"), z.literal("year")]),
  period: z.coerce.number().default(0),
  periodType: z.union([z.literal("month"), z.literal("year")]),
});

type FormValues = z.infer<typeof FormSchema>;

export const SimpleForm: React.FC<SimpleFormProps> = (props) => {
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
        className="mt-5 grid grid-cols-2 gap-4 gap-x-12"
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
              <FormMessage>
                {form.formState.errors.initialAmount?.message}
              </FormMessage>
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
                  <SelectTrigger className="w-[120px]">
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
                  <SelectTrigger className="w-[120px]">
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
          <Button type="submit">Calcular</Button>
          <Button variant="secondary" type="button" onClick={handleClear}>
            <Trash2Icon />
          </Button>
        </div>
      </form>
    </Form>
  );
};
