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
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2Icon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface SimpleFormProps {
  onSubmit: (arg: unknown) => void;
}

const FormSchema = z.object({
  initialAmount: z.coerce.number().min(0.01).optional(),
  monthAmount: z.coerce.number().min(0.01).optional(),
  fee: z.coerce.number().min(0.01),
  feePeriod: z.union([z.literal("month"), z.literal("year")]),
  period: z.coerce.number().min(0),
  periodType: z.union([z.literal("month"), z.literal("year")]),
});

type FormValues = z.infer<typeof FormSchema>;

export const SimpleForm: React.FC<SimpleFormProps> = (props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      initialAmount: undefined,
      monthAmount: undefined,
      fee: undefined,
      feePeriod: "year",
      period: undefined,
      periodType: "year",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
    props.onSubmit(data);
  };

  const handleClear = () => {
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-5 grid grid-cols-2 gap-8"
      >
        <FormField
          control={form.control}
          name="initialAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor inicial</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Digite o valor que já possui"
                  prefix="$"
                  {...field}
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
                  type="number"
                  placeholder="Digite o valor que irá investir mensalmente"
                  prefix="$"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex items-end">
          <FormField
            control={form.control}
            name="fee"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormLabel>Taxa de juros</FormLabel>
                <FormControl>
                  <Input
                    type="number"
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

        <div className="flex items-end">
          <FormField
            control={form.control}
            name="period"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormLabel>Período</FormLabel>
                <FormControl>
                  <Input
                    type="number"
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

        <div className="flex items-center gap-2">
          <Button type="submit">Calcular</Button>
          <Button variant="ghost" type="button" onClick={handleClear}>
            <Trash2Icon />
          </Button>
        </div>
      </form>
    </Form>
  );
};
