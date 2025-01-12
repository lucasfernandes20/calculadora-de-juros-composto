import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import Header from "@/models/header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Calculadora de juros compostos: Online e Grátis",
  description:
    "Calculadora de juros compostos online para investimento financeiro. Simulador de investimento financeiro com juros compostos.",
  keywords: [
    "calculadora juros compostos",
    "investimento",
    "simulador de juros",
    "simulador de investimento",
    "simulador de juros compostos",
    "simulador de investimento financeiro",
    "simulador de juros compostos online",
    "simulador de investimento financeiro online",
    "simulador de juros compostos para investimento",
    "simulador de investimento financeiro para investimento",
    "Capital Rico",
  ],
  robots: "index, follow",
  category: "Finance",
  classification: "Finance",
  applicationName: "Calculadora de juros compostos - Capital Rico",
  authors: [{ name: "Capital Rico", url: "https://capitalrico.com" }],
  creator: "Capital Rico",
  publisher: "Capital Rico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Analytics />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

