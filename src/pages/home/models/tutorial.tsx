import React from "react";
import { Card } from "@/components/ui/card";
import { InfoIcon } from "lucide-react";

const Tutorial: React.FC = () => {
  return (
    <Card className="p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <InfoIcon className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-bold text-primary">
          Como usar a Calculadora de Juros Compostos
        </h2>
      </div>
      <div className="space-y-4">
        <p className="text-base text-foreground">
          A calculadora de juros compostos é uma ferramenta poderosa para
          ajudá-lo a entender como seus investimentos podem crescer ao longo do
          tempo. Aqui está um guia rápido sobre como usá-la e qual é a sua
          finalidade.
        </p>
        <h3 className="text-lg font-semibold text-primary">Passo a Passo:</h3>
        <ol className="list-decimal list-inside space-y-2 text-base text-foreground">
          <li>
            <strong>Valor Inicial:</strong> Insira o valor que você já possui
            investido.
          </li>
          <li>
            <strong>Aportes:</strong> Digite o valor que você planeja investir
            regularmente (mensalmente, trimestralmente, etc.).
          </li>
          <li>
            <strong>Período de Aporte:</strong> Selecione a frequência dos seus
            aportes (mensal, anual, trimestral, semestral).
          </li>
          <li>
            <strong>Taxa de Juros:</strong> Insira a taxa de juros esperada para
            o seu investimento.
          </li>
          <li>
            <strong>Período:</strong> Defina o período total do investimento (em
            meses ou anos).
          </li>
          <li>
            <strong>Calcular até a Meta:</strong> Se você tem uma meta
            específica, insira o valor da meta e marque esta opção.
          </li>
          <li>
            <strong>Ajuste pela Inflação:</strong> Se desejar ajustar seus
            aportes pela inflação, marque esta opção e insira a taxa de inflação
            esperada.
          </li>
          <li>
            <strong>Reinvestimento de Dividendos:</strong> Se você planeja
            reinvestir os dividendos, mantenha esta opção marcada e insira a
            taxa de reinvestimento.
          </li>
          <li>
            Clique no botão <strong>Calcular</strong> para ver os resultados.
          </li>
        </ol>
        <h3 className="text-lg font-semibold text-primary">Finalidade:</h3>
        <p className="text-base text-foreground">
          A finalidade da calculadora de juros compostos é ajudá-lo a visualizar
          o crescimento potencial dos seus investimentos ao longo do tempo. Com
          ela, você pode planejar melhor suas finanças e tomar decisões mais
          informadas sobre onde e como investir seu dinheiro.
        </p>
      </div>
      <div className="mt-6">
        <iframe
          className="w-1/2 aspect-video m-auto rounded-md shadow-md"
          src="https://www.youtube.com/embed/KnHGvReXzV0"
          title="Vídeo Tutorial"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="mt-6 text-center">
        <p className="text-base text-foreground">
          👉 Se você quiser{" "}
          <span className="bg-primary text-primary-foreground font-semibold p-1">
            aprender mais sobre investimentos
          </span>{" "}
          e fazer parte de uma comunidade sobre o assunto,{" "}
          <span className="bg-primary text-primary-foreground font-semibold p-1">
            inscreva-se no nosso canal do YouTube! ✅
          </span>
        </p>
        <a
          href="https://www.youtube.com/@capitalrico"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 text-primary font-semibold underline"
        >
          Inscreva-se no Canal
        </a>
      </div>
    </Card>
  );
};

export default Tutorial;
