import HomePage from "@/pages/home/page";
import Script from "next/script";

export default function Home() {
  return (
    <>
      <Script
        id="compound-interest-calculator-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Calculadora de Juros Compostos Online e Grátis",
            "description": "Calculadora de juros compostos online para investimento financeiro. Simule o crescimento dos seus investimentos ao longo do tempo.",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "BRL"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "ratingCount": "156"
            }
          })
        }}
      />
      <HomePage />
    </>
  );
}

