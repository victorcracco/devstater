// Modelos de site do protótipo, do menor para o maior. O pipeline escolhe um pelo porte da
// empresa (pipeline/devstarter_leads/prototipos.py) e o prospect pode comparar os outros.
// A descrição explica o modelo para quem é leigo, no seletor do topo da página.
export const MODELOS = [
  { id: "cartao", nome: "Cartão", descricao: "uma tela" },
  { id: "simples", nome: "Simples", descricao: "uma página" },
  { id: "orcamento", nome: "Orçamento", descricao: "com formulário" },
  { id: "completo", nome: "Completo", descricao: "várias seções" },
] as const;

export type ModeloSite = (typeof MODELOS)[number]["id"];

export function modeloValido(valor?: string): ModeloSite | undefined {
  return MODELOS.find((modelo) => modelo.id === valor)?.id;
}
