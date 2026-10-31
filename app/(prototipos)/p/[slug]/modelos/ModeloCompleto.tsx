import Navbar from "@/app/(clientes)/transportes/components/Navbar";
import Hero from "@/app/(clientes)/transportes/components/Hero";
import About from "@/app/(clientes)/transportes/components/About";
import Services from "@/app/(clientes)/transportes/components/Services";
import CoverageArea from "@/app/(clientes)/transportes/components/CoverageArea";
import Differentials from "@/app/(clientes)/transportes/components/Differentials";
import ContactCTA from "@/app/(clientes)/transportes/components/ContactCTA";
import Footer from "@/app/(clientes)/transportes/components/Footer";
import WhatsAppButton from "@/app/(clientes)/transportes/components/WhatsAppButton";
import type { ConteudoSite } from "@/lib/prototipos/conteudo";

// Para empresas maiores: o template completo do demo /transportes, com todas as seções
export default function ModeloCompleto({ site }: { site: ConteudoSite }) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar site={site} comFaixa />
      <main className="flex-grow">
        <Hero site={site} />
        <About site={site} />
        <Services site={site} />
        <CoverageArea site={site} />
        <Differentials site={site} />
        <ContactCTA site={site} />
      </main>
      <Footer site={site} />
      <WhatsAppButton site={site} />
    </div>
  );
}
