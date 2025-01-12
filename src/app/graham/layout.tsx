import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de Graham: Online e Grátis",
  description:
    "Calculadora de Graham online e grátis. Simule o preço justo de uma ação com base nos lucros e patrimônio líquido da empresa.",
  keywords: [
    "calculadora de Benjamin Graham",
    "Calculadora de Graham",
    "investimento",
    "ações",
    "bolsa de valores",
    "calculadora de ações",
    "preço justo de ações graham",
    "calcular preço de ações",
    "Capital Rico",
  ],
  robots: "index, follow",
  category: "Finance",
  classification: "Finance",
  applicationName: "Calculadora de Graham - Capital Rico",
  authors: [{ name: "Capital Rico", url: "https://capitalrico.com" }],
  creator: "Capital Rico",
  publisher: "Capital Rico",
};

export default function GrahamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}

