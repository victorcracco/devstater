import type { ConteudoPrototipo } from "../conteudo";
import type { DadosPrototipo } from "../dados";
import type { ModeloSite } from "../modelos";
import { transportadoras } from "./transportadoras";

// Um nicho transforma os dados de uma empresa no conteúdo do site. Para criar um novo: um arquivo
// nesta pasta, registrado abaixo, com o mesmo id usado em pipeline/devstarter_leads/config.py.
export type Nicho = {
  id: string;
  montarSite: (dados: DadosPrototipo) => ConteudoPrototipo;
  nomesModelos?: Partial<Record<ModeloSite, string>>; // ex.: "Orçamento" vira "Agendamento" na clínica
};

const NICHOS: Record<string, Nicho> = { transportadoras };

export function buscarNicho(id: string): Nicho | undefined {
  return NICHOS[id];
}
