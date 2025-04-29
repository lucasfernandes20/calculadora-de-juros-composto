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
import { Trash2Icon, InfoIcon } from "lucide-react";
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
        className="grid grid-cols-1 gap-y-6 gap-x-8 md:grid-cols-2"
      >
        <div className="space-y-6 md:col-span-2">
          <div className="bg-muted/30 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-foreground/80 mb-4">Dados financeiros da ação</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="lpa"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-foreground/70 flex items-center gap-1">
                        LPA (Lucro por Ação)
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <InfoIcon className="h-3.5 w-3.5 text-muted-foreground/70 cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent side="top" className="max-w-xs">
                              <p className="text-xs">O Lucro por Ação (LPA) é calculado dividindo o lucro líquido da empresa pelo número total de ações em circulação.</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </FormLabel>
                    </div>
                    <FormControl>
                      <Input 
                        {...field} 
                        mask="currency" 
                        placeholder="Digite o LPA da empresa"
                        prefix="$"
                        className="bg-background"
                      />
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
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-foreground/70 flex items-center gap-1">
                        VPA (Valor Patrimonial por Ação)
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <InfoIcon className="h-3.5 w-3.5 text-muted-foreground/70 cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent side="top" className="max-w-xs">
                              <p className="text-xs">O Valor Patrimonial por Ação (VPA) é o valor do patrimônio líquido da empresa dividido pelo número total de ações.</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </FormLabel>
                    </div>
                    <FormControl>
                      <Input 
                        {...field} 
                        mask="currency" 
                        placeholder="Digite o VPA da empresa"
                        prefix="$"
                        className="bg-background"
                      />
                    </FormControl>
                    <FormMessage>{form.formState.errors.vpa?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </div>
            
            <div className="pt-6 flex flex-col space-y-2">
              <p className="text-xs text-muted-foreground">
                A fórmula de Graham é calculada como: √(22.5 × LPA × VPA)
              </p>
              <p className="text-xs text-muted-foreground">
                Essa fórmula estima o valor intrínseco, assumindo um PE razoável de 15 e um PBV de 1.5
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 md:col-span-2">
          <Button 
            type="submit" 
            className="font-medium max-w-60 flex-1 shadow-sm gap-2"
            size="lg"
          >
            Calcular Valor Intrínseco
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
