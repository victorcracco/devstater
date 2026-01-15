import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800']
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
      <body className={`${inter.className} soft-text bg-slate-50 text-slate-900 antialiased flex flex-col min-h-screen`}>
        
        {/* Header Fixo */}
        <header className="w-full fixed top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="text-2xl font-extrabold tracking-tighter hover:opacity-80 transition-opacity">
              <span className="text-slate-900">Dev</span>
              <span className="text-blue-600">Starter</span>
            </Link>
            
            <nav className="flex gap-6 text-sm font-medium text-slate-600">
              <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
              <Link href="/contato" className="hover:text-blue-600 transition-colors">Contato</Link>
            </nav>
          </div>
        </header>

        <main className="flex-grow pt-16">
          {children}
        </main>

        {/* Footer com Instagram */}
        <footer className="bg-white border-t border-slate-100 py-12 mt-auto">
          <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
            
            {/* Esquerda: Logo e Copyright */}
            <div className="text-center md:text-left">
              <span className="font-bold text-slate-900 block mb-2">DevStarter.</span>
              <p className="text-sm text-slate-500">
                &copy; {new Date().getFullYear()} Todos os direitos reservados.
              </p>
            </div>

            {/* Direita: Links Legais + Social */}
            <div className="flex flex-col md:flex-row items-center gap-6 text-sm font-medium text-slate-500">
              <div className="flex gap-6">
                <Link href="/privacidade" className="hover:text-blue-600 transition-colors">Privacidade</Link>
                <Link href="/termos" className="hover:text-blue-600 transition-colors">Termos de Uso</Link>
              </div>

              {/* Divisória visual apenas no desktop */}
              <div className="hidden md:block w-px h-4 bg-slate-300"></div>

              {/* Ícone do Instagram */}
              <a 
                href="https://www.instagram.com/devstarterbr" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Siga-nos no Instagram"
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
            </div>

          </div>
        </footer>
      </body>
    </html>
  );
}