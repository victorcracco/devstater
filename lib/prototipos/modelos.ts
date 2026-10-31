// Modelos de site do protótipo, do menor para o maior. O pipeline escolhe um pelo porte da
// empresa (pipeline/devstarter_leads/prototipos.py) e o prospect pode comparar os outros.
export const MODELOS = [
  { id: "cartao", nome: "Cartão" },
  { id: "simples", nome: "Simples" },
  { id: "orcamento", nome: "Orçamento" },
  { id: "completo", nome: "Completo" },
] as const;

export type ModeloSite = (typeof MODELOS)[number]["id"];

export function modeloValido(valor?: string): ModeloSite | undefined {
  return MODELOS.find((modelo) => modelo.id === valor)?.id;
}
