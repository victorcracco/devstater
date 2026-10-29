import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "@/app/globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});

// Protótipos são enviados só para o próprio prospect: nunca devem aparecer no Google
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function PrototiposLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${manrope.variable} antialiased`}>{children}</body>
    </html>
  );
}
