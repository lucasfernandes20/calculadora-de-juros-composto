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
  alternates: {
    canonical: "/graham",
  },
  openGraph: {
    type: "website",
    title: "Calculadora de Graham: Online e Grátis",
    description: "Simule o preço justo de uma ação com base nos lucros e patrimônio líquido da empresa.",
    siteName: "Capital Rico",
    locale: "pt_BR",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Calculadora de Benjamin Graham",
      },
    ],
  },
};

export default function GrahamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}

