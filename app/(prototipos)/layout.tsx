import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "@/app/globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-fraunces",
});

// Protótipos são enviados só para o próprio prospect: nunca devem aparecer no Google
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function PrototiposLayout({ children }: { children: React.ReactNode }) {
  return (
    // As variáveis das fontes ficam no <html> porque o tema do Tailwind as lê na raiz da página
    <html lang="pt-BR" className={`scroll-smooth ${manrope.variable} ${fraunces.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
