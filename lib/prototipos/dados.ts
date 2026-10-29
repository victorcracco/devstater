import { readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";

// Dados de um protótipo gerado pelo pipeline de captação (pipeline/devstarter_leads/prototipos.py)
export type DadosPrototipo = {
  slug: string;
  nicho: string;
  nome: string;
  cidade: string;
  uf: string;
  endereco?: string;
  cep?: string;
  telefone?: string;
  whatsapp?: string;
  email?: string;
  cnpj?: string;
  desde?: number;
  cnae: string;
  expiraEm: string;
};

const SLUG_VALIDO = /^[a-z0-9-]{3,80}$/;

// Chave publicável: feita para ficar exposta. A tabela não é legível por ela; só a função
// buscar_prototipo, que devolve um protótipo para quem já tem o slug.
const SUPABASE_URL = process.env.SUPABASE_URL ?? "https://ckxgzlkzvdwbopauerco.supabase.co";
const SUPABASE_CHAVE = process.env.SUPABASE_PUBLISHABLE_KEY ?? "sb_publishable_uPbvpNYCsGp48BK8W5tAIg_QlSP0p7N";

export const buscarPrototipo = cache(async (slug: string): Promise<DadosPrototipo | null> => {
  if (!SLUG_VALIDO.test(slug)) return null;

  // Opcional em desenvolvimento: ler de arquivos JSON locais (fora do Git, o repositório é público)
  const pasta = process.env.PROTOTIPOS_DIR;
  if (pasta) {
    try {
      return JSON.parse(await readFile(path.join(process.cwd(), pasta, `${slug}.json`), "utf8"));
    } catch {
      return null;
    }
  }

  const resposta = await fetch(`${SUPABASE_URL}/rest/v1/rpc/buscar_prototipo`, {
    method: "POST",
    headers: { apikey: SUPABASE_CHAVE, "Content-Type": "application/json" },
    body: JSON.stringify({ p_slug: slug }),
    next: { revalidate: 3600 },
  });
  if (!resposta.ok) return null;
  return (await resposta.json()) as DadosPrototipo | null;
});

export function expirado(dados: DadosPrototipo): boolean {
  return new Date(dados.expiraEm).getTime() < Date.now();
}
