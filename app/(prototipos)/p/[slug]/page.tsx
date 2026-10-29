import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buscarPrototipo, expirado } from "@/lib/prototipos/dados";
import { montarSiteTransportadora } from "@/lib/prototipos/transportadora";
import Navbar from "@/app/(clientes)/transportes/components/Navbar";
import Hero from "@/app/(clientes)/transportes/components/Hero";
import About from "@/app/(clientes)/transportes/components/About";
import Services from "@/app/(clientes)/transportes/components/Services";
import CoverageArea from "@/app/(clientes)/transportes/components/CoverageArea";
import Differentials from "@/app/(clientes)/transportes/components/Differentials";
import ContactCTA from "@/app/(clientes)/transportes/components/ContactCTA";
import Footer from "@/app/(clientes)/transportes/components/Footer";
import WhatsAppButton from "@/app/(clientes)/transportes/components/WhatsAppButton";
import FaixaPrototipo from "./FaixaPrototipo";
import PrototipoExpirado from "./PrototipoExpirado";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const dados = await buscarPrototipo(slug);
  return {
    title: dados ? `${dados.nome} | Protótipo` : "Protótipo não encontrado",
    robots: { index: false, follow: false },
  };
}

export default async function PrototipoPage({ params }: Props) {
  const { slug } = await params;
  const dados = await buscarPrototipo(slug);
  if (!dados || dados.nicho !== "transportadoras") notFound();
  if (expirado(dados)) return <PrototipoExpirado nome={dados.nome} />;

  const site = montarSiteTransportadora(dados);
  return (
    // pt-10 compensa a faixa fixa do topo, mantendo o menu sobre o hero como no template
    <div className="flex flex-col min-h-screen font-sans bg-slate-50 pt-10">
      <FaixaPrototipo nome={dados.nome} slug={slug} expiraEm={dados.expiraEm} />
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
