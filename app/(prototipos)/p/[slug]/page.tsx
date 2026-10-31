import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buscarPrototipo, expirado } from "@/lib/prototipos/dados";
import { modeloValido } from "@/lib/prototipos/modelos";
import { montarSiteTransportadora } from "@/lib/prototipos/transportadora";
import FaixaPrototipo from "./FaixaPrototipo";
import PrototipoExpirado from "./PrototipoExpirado";
import ModeloCartao from "./modelos/ModeloCartao";
import ModeloCompleto from "./modelos/ModeloCompleto";
import ModeloOrcamento from "./modelos/ModeloOrcamento";
import ModeloSimples from "./modelos/ModeloSimples";

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
  if (!dados || dados.nicho !== "transportadoras") notFound();
  if (expirado(dados)) return <PrototipoExpirado nome={dados.nome} />;

  // O pipeline indica o modelo pelo porte da empresa; o seletor da faixa permite comparar os outros
  const modelo = modeloValido((await searchParams).modelo) ?? modeloValido(dados.modelo) ?? "completo";
  const site = montarSiteTransportadora(dados);
  return (
    // O recuo compensa a faixa fixa do topo, que tem duas linhas no celular
    <div className="font-sans pt-[72px] sm:pt-10">
      <FaixaPrototipo nome={dados.nome} slug={slug} expiraEm={dados.expiraEm} modelo={modelo} />
      {modelo === "cartao" && <ModeloCartao site={site} dados={dados} />}
      {modelo === "simples" && <ModeloSimples site={site} dados={dados} />}
      {modelo === "orcamento" && <ModeloOrcamento site={site} dados={dados} />}
      {modelo === "completo" && <ModeloCompleto site={site} />}
    </div>
  );
}
