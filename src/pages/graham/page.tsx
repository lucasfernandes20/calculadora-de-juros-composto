"use client";

import calcGrahamPrice, { GrahamValues } from "@/utils/calcGrahamPrice";
import SimpleForm from "./models/simpleForm";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { currencyFormatter } from "@/utils/currencyFormatter";
import { CalculatorIcon, BookOpenIcon, TrendingUpIcon, PiggyBankIcon, InfoIcon, ArrowRightIcon, ShieldAlertIcon, BookIcon } from "lucide-react";
import Image from "next/image";
import books from "@/data/books.json";
import { Button } from "@/components/ui/button";

const GrahamPage: React.FC = () => {
  const [result, setResult] = useState<number | null>(null);
  const [showInfo, setShowInfo] = useState<boolean>(false);

  const grahamBooks = books["graham"];

  const onSubmit = (data: GrahamValues) => {
    const { lpa, vpa } = data;
    const result = calcGrahamPrice({ lpa, vpa });
    setResult(result);
  };

  return (
    <div className="bg-gradient-to-b from-background to-background/80 min-h-screen pb-12">
      <div className="container m-auto flex flex-col gap-6 mb-10 pt-6">
        <div className="text-center space-y-3 mb-2">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm px-3 py-1 rounded-full mb-1">
            <TrendingUpIcon size={16} />
            <span>Investimentos inteligentes</span>
          </div>
          <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">
            Calculadora de Benjamin Graham
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            Descubra o valor intrínseco de uma ação utilizando a fórmula de Graham para tomar decisões de investimento mais fundamentadas.
          </p>
        </div>

        <Card className="overflow-hidden shadow-lg border-primary/10 bg-gradient-to-br from-card to-card/95">
          <div className="px-6 pt-6 pb-6">
            <div className="flex items-center gap-2 px-1 mb-6">
              <PiggyBankIcon size={18} className="text-primary" />
              <h2 className="text-xl font-medium">Calcule o valor intrínseco</h2>
            </div>
            <SimpleForm onSubmit={onSubmit} />
          </div>

          {result !== null && (
            <div className="p-6 bg-gradient-to-br from-card/80 to-card border-t">
              <div className="flex flex-col items-center justify-center text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingUpIcon className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-xl font-medium text-primary">
                  Valor intrínseco da ação
                </h2>
                <div className="text-3xl md:text-4xl font-bold">
                  {currencyFormatter({
                    value: result,
                    style: "currency",
                  })}
                </div>
                <p className="text-sm text-muted-foreground max-w-md">
                  Este é o preço justo estimado com base na fórmula de Graham. Compare com o preço de mercado atual para avaliar se a ação está sub ou supervalorizada.
                </p>
              </div>
            </div>
          )}
        </Card>

        {result === null && (
          <div className="flex flex-col items-center justify-center gap-4 py-8 px-6 mt-4 bg-muted/30 rounded-lg border border-dashed border-muted-foreground/20">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <CalculatorIcon className="h-8 w-8 text-primary" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-medium text-lg">Faça sua primeira análise</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                Insira o LPA (Lucro por Ação) e VPA (Valor Patrimonial por Ação) da empresa para
                calcular o valor intrínseco segundo a fórmula de Graham.
              </p>
            </div>
          </div>
        )}

        <div className="mt-4">
          <Button 
            variant="ghost" 
            className="w-full flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground"
            onClick={() => setShowInfo(!showInfo)}
          >
            {showInfo ? "Ocultar informações" : "Saiba mais sobre Benjamin Graham"}
            <InfoIcon size={16} className={showInfo ? "rotate-180 transition-transform" : "transition-transform"} />
          </Button>
          
          {showInfo && (
            <Card className="mt-4 overflow-hidden border-primary/10 bg-gradient-to-br from-card to-card/95">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-2 p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpenIcon className="h-5 w-5 text-primary" />
                      <h2 className="text-xl font-medium text-primary">
                        O pai do investimento em valor
                      </h2>
                    </div>
                    
                    <p className="text-muted-foreground">
                      Benjamin Graham foi um economista, professor e investidor profissional.
                      É amplamente reconhecido como o <strong>&quot;pai do investimento em valor&quot;</strong>. 
                      Graham escreveu dois livros clássicos sobre investimento que revolucionaram
                      a forma como entendemos o mercado financeiro.
                    </p>
                    
                    <div className="bg-primary/5 p-4 rounded-lg space-y-2 my-4">
                      <h3 className="text-lg font-medium flex items-center gap-2">
                        <ArrowRightIcon size={18} className="text-primary" />
                        Para que serve a fórmula?
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        A fórmula de Graham ajuda investidores a determinar se uma ação está subvalorizada 
                        ou supervalorizada. Ao comparar o preço de mercado atual com o valor intrínseco 
                        calculado, os investidores podem tomar decisões mais informadas sobre comprar ou 
                        vender ações.
                      </p>
                    </div>

                    <div className="bg-amber-500/10 p-4 rounded-lg space-y-2">
                      <h3 className="text-lg font-medium flex items-center gap-2 text-amber-600">
                        <ShieldAlertIcon size={18} />
                        Limitações do Cálculo
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        A fórmula assume que o crescimento dos lucros será constante, o que nem sempre ocorre.
                        Não considera fatores qualitativos, como qualidade da gestão ou condições de mercado.
                        Use-a como um ponto de partida para análises mais profundas.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-1 bg-muted/20 p-6 flex flex-col items-center justify-center">
                  <div className="mb-4">
                    <Image
                      src="/images/benjamin-graham.png"
                      alt="Benjamin Graham"
                      width={240}
                      height={240}
                      quality={85}
                      placeholder="empty"
                      className="rounded-lg shadow-md"
                    />
                    <p className="text-xs text-center text-muted-foreground mt-2 font-medium">
                      Benjamin Graham (1894-1976)
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="border-t p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BookIcon className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-medium">Livros recomendados</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {grahamBooks.map((book) => (
                    <a
                      href={book.link}
                      key={book.title}
                      target="_blank"
                      className="transition-transform hover:scale-105"
                    >
                      <div className="flex flex-col h-full items-center gap-3 bg-primary/5 p-3 rounded-lg hover:bg-primary/10 transition-colors">
                        <div className="relative h-[140px] w-full">
                          <Image
                            src={book.image}
                            alt={book.title}
                            fill
                            style={{objectFit: "contain"}}
                            className="rounded"
                          />
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium">
                            {book.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {book.author}
                          </p>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default GrahamPage;
