// Procura no conteúdo de um nicho os textos que mais costumam quebrar as regras do AGENTS.md.
// Um sinal não é um veredito, e nenhum sinal não aprova o nicho: leia o texto do mesmo jeito.
// Uso, na raiz do repositório: node .agents/skills/devstarter-revisar-nicho/scripts/sinais.mjs <nicho> [arquivo]
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const GERAIS = [
  ["superlativo ou comparação", /\b(o|a|os|as)\s+melhor(es)?\s+(da|do|de|em|na|no|preço|empresa|clínica|oficina|profissional|atendimento|serviço)|\bn[úu]mero\s*1\b|\bn[º°]\s*1\b|\blíder\b|\breferência\s+em\b|\bmais\s+barat|\bmenor\s+preço\b|\bexcelência\b|\bincomparáve|\bo\s+único\b/i],
  ["promessa de resultado", /\bgarant|\b100\s*%|\bresultado|\bsem\s+riscos?\b|\bsem\s+dor\b|\bcura\b|antes e depois/i],
  ["fato que não temos", /\+\s*\d|\b\d[\d.]*\s*(anos|clientes|pacientes|atendimentos|veículos|caminh|imóve|cidades|profissionais|funcionários|mil)\b|\b24\s*(h|horas)\b|\bcertificad|\bpremiad|\bprêmio|\bISO\s*\d|\bautorizad|\bcredenciad|\bconvênio/i],
  ["preço ou promoção", /R\$\s*\d|\bgrát|\bgratuit|\bdesconto|\bpromoç/i],
  ["depoimento", /\bdepoimentos\s*:/],
  ["foto proibida", /plus\.unsplash\.com/],
  ["dado sensível em formulário", /\b(sintomas?|queixa|diagnóstico|doenças?|medicament\w*|CPF|RG)\b|motivo d[ao]/i],
  ["registro com número", /\b(CRM|CRO|CRP|CRECI)[-/\s]*[A-Z]{0,2}[-/\s]*\d{2,}/],
  ["texto de IA", /soluções\s+(sob medida|integradas|completas)|transforme\s+(seu|sua)|seu parceiro|muito mais que|não é só/i],
];

const TRATAMENTO = /\bDra?\.\s|\b(a|o)\s+(psicólog|médic|dentista|doutor)/i;

const POR_NICHO = {
  psicologia: [
    ["abordagem, público ou transtorno", /\bTCC\b|psicanáli|cognitiv|infantil|casal|casais|adolescent|ansiedade|depressão|transtorno|síndrome|pânico/i],
    ["atendimento online", /\bon-?line\b|teleatend/i],
    ["tratamento que indica gênero", TRATAMENTO],
  ],
  clinicas_medicas: [
    ["especialidade, órgão ou doença", /cardiolog|dermatolog|pediatr|ginecolog|ortoped|neurolog|psiquiatr|oftalmolog|urolog|endocrin|oncolog|diabetes|coração|pacientes atendidos/i],
    ["tratamento que indica gênero", TRATAMENTO],
  ],
  odontologia: [
    ["tratamento que não sabemos", /ortodont|implante|harmoniza|aparelho|clareamento/i],
    ["tratamento que indica gênero", TRATAMENTO],
  ],
  estetica: [
    ["procedimento invasivo", /toxina|botox|botulínica|preenchimento|harmoniza|\bfios\b|enzima|peeling|micropigmenta/i],
    ["afirmação proibida", /\bsegur[oa]\b|rejuvenesc|emagrec|\bkg\b|transformação/i],
  ],
  oficinas: [
    ["fato que não temos", /especialista em|guincho|garantia de/i],
    ["marca", /toyota|honda|volkswagen|\bvw\b|chevrolet|\bfiat\b|\bford\b|hyundai|renault|bosch|porto seguro/i],
  ],
  imobiliarias: [
    ["promessa ou imóvel inventado", /rentabilidade|valorização|\bR\$|\b\d+\s+imóve/i],
  ],
};

const OBRIGATORIOS = {
  psicologia: ["CRP a informar", /CRP a informar/],
  clinicas_medicas: ["CRM e diretor técnico a informar", /CRM\/.*a informar.*Diretor técnico: a informar/],
  odontologia: ["CRO e responsável técnico a informar", /CRO-.*a informar.*Responsável técnico: a informar/],
  imobiliarias: ["CRECI a informar", /CRECI a informar/],
};

// Nichos em que o nome é sempre de empresa: `artigo=True` em pipeline/devstarter_leads/config.py
const COM_ARTIGO = new Set(["transportadoras"]);

const [nicho, arquivoInformado] = process.argv.slice(2);
if (!nicho) {
  console.error("Uso: node sinais.mjs <nicho> [arquivo]");
  process.exit(2);
}

const arquivo = arquivoInformado ?? join("lib", "prototipos", "nichos", `${nicho}.ts`);
if (!existsSync(arquivo)) {
  console.error(`Arquivo não encontrado: ${arquivo}`);
  process.exit(2);
}

const sinais = [];
const anotar = (onde, regra, trecho = "") => sinais.push(`${onde}  [${regra}]  ${trecho.trim().slice(0, 110)}`);

const texto = readFileSync(arquivo, "utf8");
const regras = [...GERAIS, ...(POR_NICHO[nicho] ?? [])];
const linhas = texto.split("\n");
linhas.forEach((linha, indice) => {
  if (/^\s*(\/\/|\/?\*)/.test(linha)) return;
  const onde = `${arquivo}:${indice + 1}`;
  for (const [regra, padrao] of regras) {
    if (padrao.test(linha)) anotar(onde, regra, linha);
  }
  if (!COM_ARTIGO.has(nicho) && /\b(da|do|a|o)\s+\$\{\w+\.nome\}/i.test(linha)) anotar(onde, "artigo antes do nome", linha);
  const comentado = /\s\/\/\s/.test(linha) || linhas.slice(Math.max(0, indice - 3), indice).some((l) => /^\s*\/\//.test(l));
  if (linha.includes("images.unsplash.com") && !comentado) anotar(onde, "foto sem autor em comentário", linha);
});

if (OBRIGATORIOS[nicho] && !OBRIGATORIOS[nicho][1].test(texto)) anotar(arquivo, "falta no texto", OBRIGATORIOS[nicho][0]);

const registro = join("lib", "prototipos", "nichos", "index.ts");
if (existsSync(registro) && !readFileSync(registro, "utf8").includes(nicho)) anotar(registro, "nicho não registrado", nicho);

const pasta = join("exemplos", "prototipos");
const exemplos = readdirSync(pasta)
  .filter((nome) => nome.endsWith(".json"))
  .map((nome) => ({ caminho: join(pasta, nome), dados: JSON.parse(readFileSync(join(pasta, nome), "utf8")) }))
  .filter(({ dados }) => dados.nicho === nicho);

if (exemplos.length < 2) anotar(pasta, "exemplos", `o nicho tem ${exemplos.length}; precisa de um completo e um mínimo`);
if (exemplos.length > 0 && !exemplos.some(({ dados }) => !dados.whatsapp && !dados.endereco)) anotar(pasta, "exemplos", "nenhum exemplo sem WhatsApp e sem endereço");
for (const { caminho, dados } of exemplos) {
  if (dados.email && !dados.email.endsWith("@exemplo.com.br")) anotar(caminho, "dado que pode ser real", dados.email);
  if (dados.telefone && !dados.telefone.includes("3000-0000")) anotar(caminho, "dado que pode ser real", dados.telefone);
  if (dados.whatsapp && !/^55\d\d900000000$/.test(dados.whatsapp)) anotar(caminho, "dado que pode ser real", dados.whatsapp);
  if (dados.cnpj && dados.cnpj !== "00.000.000/0001-00") anotar(caminho, "dado que pode ser real", dados.cnpj);
}

console.log(sinais.length ? sinais.join("\n") : "Nenhum sinal encontrado.");
console.log(`\n${sinais.length} sinais. Leia cada um e, depois, o texto inteiro: o script não julga se a frase é verdadeira.`);
