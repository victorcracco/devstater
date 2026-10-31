import type { ConteudoSite } from "./conteudo";
import type { DadosPrototipo } from "./dados";

export function linkLigar(telefone?: string): string | undefined {
  return telefone ? `tel:+55${telefone.replace(/\D/g, "")}` : undefined;
}

export function linkMapa(d: DadosPrototipo): string {
  const destino = [d.endereco, d.cidade, d.uf].filter(Boolean).join(", ");
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destino)}`;
}

/** Até duas letras do nome, no lugar do logo que ainda não temos. */
export function iniciais(nome: string): string {
  const palavras = nome.split(" ").filter((p) => p.length > 2 || p === p.toUpperCase());
  return (palavras.length ? palavras : [nome]).slice(0, 2).map((p) => p[0].toUpperCase()).join("");
}

/** Nome separado para o logo em texto: a última palavra aparece em destaque. */
export function dividirMarca(nome: string): ConteudoSite["marca"] {
  const palavras = nome.split(" ");
  if (palavras.length < 2) return { texto: nome, destaque: "" };
  return { texto: `${palavras.slice(0, -1).join(" ")} `, destaque: palavras[palavras.length - 1] };
}
