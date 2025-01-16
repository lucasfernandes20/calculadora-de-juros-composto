"use client";

import calcGrahamPrice, { GrahamValues } from "@/utils/calcGrahamPrice";
import SimpleForm from "./models/simpleForm";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { currencyFormatter } from "@/utils/currencyFormatter";
import { CalculatorIcon } from "lucide-react";
import Image from "next/image";
import books from "@/data/books.json";

const GrahamPage: React.FC = () => {
  const [result, setResult] = useState<number | null>(null);

  const grahamBooks = books["graham"];

  const onSubmit = (data: GrahamValues) => {
    const { lpa, vpa } = data;
    const result = calcGrahamPrice({ lpa, vpa });
    setResult(result);
    console.log(result);
  };

  return (
    <div className="container m-auto flex flex-col gap-4 mb-6">
      <h1 className="text-2xl font-bold md:text-3xl text-center">
        Calculadora de Benjamin Graham
      </h1>
      <p className="text-center text-muted-foreground text-sm md:text-base mb-4">
        Calcule o valor intrínseco de uma ação de acordo com a fórmula de
        Graham.
      </p>
      <Card className="p-6">
        <SimpleForm onSubmit={onSubmit} />
      </Card>
      {result ? (
        <div className="flex flex-col gap-4 items-center mt-4">
          <h2 className="text-primary text-xl font-bold md:text-2xl">
            O Preço justo pela ação é:
          </h2>
          <div className="mt-4">
            <span className="text-2xl font-bold">
              {currencyFormatter({
                value: result,
                style: "currency",
              })}
            </span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-2 items-center justify-center mt-6 text-muted-foreground text-sm md:text-base">
          <CalculatorIcon size="1rem" className="text-muted-foreground" />
          <p className="text-center">
            Preencha com os números da ação para calcular o valor intrínseco.
          </p>
        </div>
      )}
      <Card className="p-6 mt-4">
        <h2 className="text-primary text-xl font-bold md:text-2xl mb-4">
          Sobre Benjamin Graham e o Cálculo
        </h2>
        <p className="text-base text-foreground mb-4">
          Benjamin Graham foi um economista, professor e investidor
          profissional. Ele é amplamente reconhecido como o{" "}
          <strong>&quot;pai do investimento em valor&quot;</strong>. Graham
          escreveu dois livros clássicos sobre investimento:{" "}
          <i>
            <a
              href="https://amzn.to/429NZi3"
              target="_blank"
              className="text-primary hover:underline"
            >
              &quot;Security Analysis&quot;
            </a>
          </i>{" "}
          (1934) e{" "}
          <i>
            <a
              href="https://amzn.to/42bnrNr"
              target="_blank"
              className="text-primary hover:underline"
            >
              &quot;The Intelligent Investor&quot;
            </a>
          </i>{" "}
          (1949).
        </p>
        <aside className="float-right w-full ml-4 md:mb-4 md:w-72">
          <Image
            src="/images/benjamin-graham.png"
            alt="Benjamin Graham"
            width={300}
            height={300}
            quality={75}
            placeholder="empty"
            className="rounded-md w-full"
          />
          <span className="text-xs text-muted-foreground/80 font-semibold">
            Benjamin Graham
          </span>
        </aside>
        <p className="text-base text-foreground mb-4">
          O cálculo de Graham é uma fórmula simples para estimar o valor
          intrínseco de uma ação. A fórmula leva em consideração os lucros da
          empresa e a taxa de crescimento esperada. É uma ferramenta útil para
          investidores que desejam identificar ações subvalorizadas.
        </p>
        <h3 className="text-lg font-semibold text-primary mb-2">
          Para que serve?
        </h3>
        <p className="text-base text-foreground mb-4">
          A fórmula de Graham serve para ajudar os investidores a determinar se
          uma ação está subvalorizada ou supervalorizada. Ao comparar o preço de
          mercado atual de uma ação com seu valor intrínseco calculado, os
          investidores podem tomar decisões mais informadas sobre comprar ou
          vender ações.
        </p>
        <h3 className="text-lg font-semibold text-primary mb-2">
          Ineficiências do Cálculo
        </h3>
        <p className="text-base text-foreground mb-4">
          Embora a fórmula de Graham seja uma ferramenta útil, ela tem algumas
          ineficiências. A fórmula assume que o crescimento dos lucros será
          constante, o que nem sempre é o caso. Além disso, a fórmula não leva
          em consideração fatores qualitativos, como a qualidade da gestão da
          empresa ou as condições do mercado.
        </p>
        <h3 className="text-lg font-semibold text-primary mb-2">
          Livros de Graham para comprar
        </h3>
        <div className="grid grid-cols-2 gap-2 md:flex md:flex-wrap md:gap-4">
          {grahamBooks.map((book) => (
            <a
              href={book.link}
              key={book.title}
              target="_blank"
              className="text-primary hover:underline"
            >
              <div className="flex flex-col items-center gap-2 bg-primary/10 p-2 rounded">
                <Image
                  src={book.image}
                  alt={book.title}
                  width={100}
                  height={150}
                  className="rounded"
                />
                <span className="text-primary hover:underline">
                  {book.title}
                </span>
                <span className="text-sm text-muted-foreground">
                  {book.author}
                </span>
              </div>
            </a>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default GrahamPage;
