import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buscarPrototipo, expirado } from "@/lib/prototipos/dados";
import { modeloValido } from "@/lib/prototipos/modelos";
import { buscarNicho } from "@/lib/prototipos/nichos";
import FaixaPrototipo from "./FaixaPrototipo";
import PrototipoExpirado from "./PrototipoExpirado";
import { COMPONENTES } from "./modelos";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ modelo?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const dados = await buscarPrototipo(slug);
  return {
    title: dados ? `${dados.nome} | Protótipo` : "Protótipo não encontrado",
    robots: { index: false, follow: false },
  };
}

export default async function PrototipoPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const dados = await buscarPrototipo(slug);
  const nicho = dados && buscarNicho(dados.nicho);
  if (!dados || !nicho) notFound();
  if (expirado(dados)) return <PrototipoExpirado nome={dados.nome} />;

  // O pipeline indica o modelo pelo porte da empresa; o seletor da faixa permite comparar os outros
  const modelo = modeloValido((await searchParams).modelo) ?? modeloValido(dados.modelo) ?? "completo";
  const Modelo = COMPONENTES[modelo];
  const validade = new Date(dados.expiraEm).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", timeZone: "UTC" });
  return (
    // O recuo compensa a faixa fixa do topo
    <div className="font-sans pt-[112px] md:pt-[72px]">
      <FaixaPrototipo nome={dados.nome} slug={slug} modelo={modelo} nomes={nicho.nomesModelos} />
      <Modelo site={nicho.montarSite(dados)} dados={dados} />
      <p className="bg-brand-dark px-4 py-3 text-center text-xs text-white/80">
        Protótipo criado pela DevStarter para {dados.nome}. Textos e fotos ilustrativos. Disponível até {validade}.
      </p>
    </div>
  );
}
