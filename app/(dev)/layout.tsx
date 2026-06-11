import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "../globals.css";
import Link from "next/link";
import WhatsAppFloatButton from "./components/WhatsAppFloatButton";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-fraunces",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: {
    default: "DevStarter | Desenvolvimento de Sites e Sistemas",
    template: "%s | DevStarter",
  },
  description: "DevStarter — Desenvolvimento de sites e sistemas sob medida para impulsionar negócios.",
  keywords: ["desenvolvimento de sites", "sistemas web", "software sob medida", "DevStarter"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${fraunces.variable} ${manrope.variable} soft-text bg-paper text-ink antialiased flex flex-col min-h-screen`}>

        {/* Header Fixo */}
        <header className="w-full fixed top-0 z-50 bg-paper/90 backdrop-blur-md border-b border-line">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="text-2xl font-extrabold tracking-tighter hover:opacity-80 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand rounded">
              <span className="text-ink">Dev</span>
              <span className="text-brand">Starter</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-ink/70">
              <Link href="/#servicos" className="hover:text-brand transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand rounded">Serviços</Link>
              <Link href="/#portfolio" className="hover:text-brand transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand rounded">Portfólio</Link>
              <Link href="/#precos" className="hover:text-brand transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand rounded">Preços</Link>
              <Link href="/contato" className="px-4 py-2 bg-brand text-paper rounded-lg hover:bg-brand-dark transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark">Orçamento Grátis</Link>
            </nav>
          </div>
        </header>

        <main className="flex-grow pt-16">
          {children}
        </main>

        {/* Footer com Instagram */}
        <footer className="bg-white border-t border-line py-12 mt-auto">
          <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">

            {/* Esquerda: Logo e Copyright */}
            <div className="text-center md:text-left">
              <span className="font-bold text-ink block mb-2">DevStarter.</span>
              <p className="text-sm text-ink/60 mb-1">
                DevStarter — Atendemos empresas em todo o Brasil. 100% online, do briefing à entrega.
              </p>
              <p className="text-sm text-ink/60">
                &copy; {new Date().getFullYear()} Todos os direitos reservados.
              </p>
            </div>

            {/* Direita: Links Legais + Social */}
            <div className="flex flex-col md:flex-row items-center gap-6 text-sm font-medium text-ink/60">
              <div className="flex gap-6">
                <Link href="/privacidade" className="hover:text-brand transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand rounded">Privacidade</Link>
                <Link href="/termos" className="hover:text-brand transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand rounded">Termos de Uso</Link>
              </div>

              {/* Divisória visual apenas no desktop */}
              <div className="hidden md:block w-px h-4 bg-line"></div>

              {/* Ícone do Instagram */}
              <a
                href="https://www.instagram.com/devstarterbr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Siga-nos no Instagram"
                className="text-ink/40 hover:text-brand transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand rounded"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
            </div>

          </div>
        </footer>

        <WhatsAppFloatButton />
      </body>
    </html>
  );
}