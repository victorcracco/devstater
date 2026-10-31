import type { ComponentType } from "react";
import type { ConteudoPrototipo } from "@/lib/prototipos/conteudo";
import type { DadosPrototipo } from "@/lib/prototipos/dados";
import type { ModeloSite } from "@/lib/prototipos/modelos";
import ModeloCartao from "./ModeloCartao";
import ModeloCompleto from "./ModeloCompleto";
import ModeloOrcamento from "./ModeloOrcamento";
import ModeloSimples from "./ModeloSimples";

export type PropsModelo = { site: ConteudoPrototipo; dados: DadosPrototipo };

// Para criar um modelo novo: o componente nesta pasta, registrado aqui e em lib/prototipos/modelos.ts
export const COMPONENTES: Record<ModeloSite, ComponentType<PropsModelo>> = {
  cartao: ModeloCartao,
  simples: ModeloSimples,
  orcamento: ModeloOrcamento,
  completo: ModeloCompleto,
};
