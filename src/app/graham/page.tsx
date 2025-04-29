import GrahamPage from "@/pages/graham/page";
import Script from "next/script";

export default function Graham() {
  return (
    <>
      <Script
        id="graham-calculator-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Calculadora de Graham: Online e Grátis",
            "description": "Calculadora de Benjamin Graham para avaliar o valor intrínseco de ações. Simule o preço justo de uma ação com base nos lucros e patrimônio líquido da empresa.",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "BRL"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.7",
              "ratingCount": "98"
            }
          })
        }}
      />
      <GrahamPage />
    </>
  );
}
