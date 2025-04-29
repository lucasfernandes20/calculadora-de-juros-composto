import React from "react";
import { Card } from "@/components/ui/card";
import { BookOpenIcon, LightbulbIcon } from "lucide-react";

const Tutorial: React.FC = () => {
  return (
    <Card className="border-primary/10 mt-6 overflow-hidden">
      <div className="bg-primary/5 px-6 py-4 border-b flex items-center gap-3">
        <LightbulbIcon className="text-primary h-5 w-5" />
        <h2 className="text-lg font-medium text-primary">
          Como usar a Calculadora de Juros Compostos
        </h2>
      </div>
      
      <div className="p-6">
        <p className="text-muted-foreground mb-6">
          A calculadora de juros compostos é uma ferramenta essencial para visualizar o crescimento potencial dos seus investimentos. 
          Entenda como utilizá-la para planejar melhor seu futuro financeiro.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BookOpenIcon className="h-5 w-5 text-primary" />
              <h3 className="text-base font-medium">Passo a Passo</h3>
            </div>
            
            <ol className="space-y-3 text-sm text-foreground/90 list-none ml-1">
              <li className="flex gap-2">
                <span className="flex items-center justify-center rounded-full bg-primary/10 text-primary font-medium h-6 w-6 flex-shrink-0">1</span>
                <div>
                  <strong className="text-foreground">Valor Inicial:</strong> Insira o montante que você já possui investido.
                </div>
              </li>
              <li className="flex gap-2">
                <span className="flex items-center justify-center rounded-full bg-primary/10 text-primary font-medium h-6 w-6 flex-shrink-0">2</span>
                <div>
                  <strong className="text-foreground">Aportes:</strong> Digite o valor que planeja investir regularmente.
                </div>
              </li>
              <li className="flex gap-2">
                <span className="flex items-center justify-center rounded-full bg-primary/10 text-primary font-medium h-6 w-6 flex-shrink-0">3</span>
                <div>
                  <strong className="text-foreground">Período de Aporte:</strong> Selecione a frequência dos seus aportes.
                </div>
              </li>
              <li className="flex gap-2">
                <span className="flex items-center justify-center rounded-full bg-primary/10 text-primary font-medium h-6 w-6 flex-shrink-0">4</span>
                <div>
                  <strong className="text-foreground">Taxa de Juros:</strong> Insira a taxa de rendimento esperada para o investimento.
                </div>
              </li>
              <li className="flex gap-2">
                <span className="flex items-center justify-center rounded-full bg-primary/10 text-primary font-medium h-6 w-6 flex-shrink-0">5</span>
                <div>
                  <strong className="text-foreground">Período:</strong> Defina por quanto tempo planeja investir.
                </div>
              </li>
              <li className="flex gap-2">
                <span className="flex items-center justify-center rounded-full bg-primary/10 text-primary font-medium h-6 w-6 flex-shrink-0">6</span>
                <div>
                  <strong className="text-foreground">Opções Avançadas:</strong> Explore ajustes por inflação, reinvestimento de dividendos e cálculo por meta.
                </div>
              </li>
            </ol>
          </div>
          
          <div className="space-y-5">
            <div className="rounded-lg overflow-hidden border">
              <iframe
                className="w-full aspect-video"
                src="https://www.youtube.com/embed/KnHGvReXzV0"
                title="Vídeo Tutorial"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            
            {/* <div className="bg-primary/5 p-4 rounded-lg">
              <div className="flex flex-col items-center text-center space-y-3">
                <InfoIcon className="h-5 w-5 text-primary" />
                <p className="text-sm">
                  Quer aprender mais sobre investimentos e fazer parte da nossa comunidade?
                </p>
                
                <Button 
                  asChild
                  className="gap-2 text-sm"
                  variant="default"
                >
                  <a
                    href="https://www.youtube.com/@capitalrico"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <YoutubeIcon className="h-4 w-4" />
                    Inscreva-se no Canal
                  </a>
                </Button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Tutorial;
