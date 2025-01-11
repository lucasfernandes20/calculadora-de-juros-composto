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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GrahamValues } from "@/utils/calcGrahamPrice";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface SimpleFormProps {
  onSubmit: (arg: GrahamValues) => void;
}

const FormSchema = z.object({
  lpa: z.coerce
    .string()
    .max(10, "O valor máximo é de 10 dígitos")
    .default("0,0")
    .transform((v) => parseFloat(v.replace(/\./g, "").replace(",", "."))),
  vpa: z.coerce
    .string()
    .max(10, "O valor máximo é de 10 dígitos")
    .default("0,0")
    .transform((v) => parseFloat(v.replace(/\./g, "").replace(",", "."))),
});

type FormValues = z.infer<typeof FormSchema>;

const SimpleForm: React.FC<SimpleFormProps> = (props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      lpa: 0,
      vpa: 0,
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    props.onSubmit({
      lpa: data.lpa,
      vpa: data.vpa,
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
          name="lpa"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LPA (Lucro por Ação)</FormLabel>
              <FormControl>
                <Input {...field} mask="currency" />
              </FormControl>
              <FormMessage>{form.formState.errors.lpa?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="vpa"
          render={({ field }) => (
            <FormItem>
              <FormLabel>VPA (Valor Patrimonial por Ação)</FormLabel>
              <FormControl>
                <Input {...field} mask="currency" />
              </FormControl>
              <FormMessage>{form.formState.errors.vpa?.message}</FormMessage>
            </FormItem>
          )}
        />

        <div className="flex items-center gap-2 mt-2">
          <Button type="submit" className="font-bold max-w-60 flex-1">
            Calcular
          </Button>
          <TooltipProvider>
            <Tooltip delayDuration={100}>
              <TooltipTrigger asChild>
                <Button variant="outline" type="button" onClick={handleClear}>
                  <Trash2Icon className="text-primary" />
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
