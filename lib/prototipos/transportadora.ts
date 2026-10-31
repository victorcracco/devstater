import { novaVia, type Icone, type SiteTransportadora } from "@/app/(clientes)/transportes/site";
import type { DadosPrototipo } from "./dados";

// Conteúdo do protótipo de uma transportadora real. Só usa fatos do cadastro (nome, cidade,
// ano de abertura, atividade pelo CNAE) e textos genéricos: nada de números, certificações
// ou depoimentos inventados no nome da empresa.

type Perfil = {
  atividade: string;
  selo: string;
  heroAntes: string;
  heroDestaque: string;
  heroDepois: string;
  seloSobre: string;
  servicos: { icone: Icone; titulo: string; descricao: string }[];
  regiao: { nome: string; itens: string[]; selo: string };
  objeto: string; // sempre feminino ("sua carga", "sua mudança"), para concordar com "da" e "para a"
};

const ATENDIMENTO_EMPRESAS = {
  icone: "predio" as const,
  titulo: "Atendimento a empresas",
  descricao: "Condições sob medida para indústrias, comércios e distribuidores da região.",
};

const CARGA_FECHADA = {
  icone: "caminhao" as const,
  titulo: "Carga fechada",
  descricao: "Veículo dedicado para a sua mercadoria, do ponto de coleta direto ao destino.",
};

function perfil(cnae: string, cidade: string): Perfil {
  switch (cnae) {
    case "4930201":
      return {
        atividade: "transporte de cargas",
        selo: `Transporte de cargas em ${cidade}`,
        heroAntes: "Sua carga entregue",
        heroDestaque: "com agilidade",
        heroDepois: `em ${cidade} e região.`,
        seloSobre: "Entregas locais",
        servicos: [
          { icone: "caminhao", titulo: "Coleta e entrega", descricao: "Retiramos a mercadoria no fornecedor ou na sua empresa e entregamos no destino combinado." },
          { icone: "relogio", titulo: "Entregas programadas", descricao: "Rotas planejadas para entregar no dia e no horário que o seu cliente precisa." },
          { icone: "caixa", titulo: "Carga seca", descricao: "Mercadorias embaladas ou paletizadas, com cuidado no manuseio da coleta à entrega." },
          ATENDIMENTO_EMPRESAS,
        ],
        regiao: { nome: "Região", itens: [`${cidade} e cidades vizinhas`, "Outras rotas sob consulta"], selo: "Entregas locais" },
        objeto: "sua carga",
      };
    case "4930203":
      return {
        atividade: "transporte de produtos perigosos",
        selo: "Transporte de produtos perigosos",
        heroAntes: "Produtos perigosos",
        heroDestaque: "com segurança,",
        heroDepois: `saindo de ${cidade}.`,
        seloSobre: "Produtos perigosos",
        servicos: [
          { icone: "chama", titulo: "Produtos perigosos", descricao: "Cargas classificadas transportadas com a documentação e a sinalização exigidas pela ANTT." },
          { icone: "escudo", titulo: "Motoristas habilitados", descricao: "Condutores com curso MOPP para o transporte de produtos perigosos." },
          CARGA_FECHADA,
          ATENDIMENTO_EMPRESAS,
        ],
        regiao: { nome: "Rotas", itens: ["Cidades de todo o estado", "Outros estados sob consulta"], selo: "Sob consulta" },
        objeto: "sua carga",
      };
    case "4930204":
      return {
        atividade: "mudanças residenciais e comerciais",
        selo: `Mudanças em ${cidade} e região`,
        heroAntes: "Sua mudança",
        heroDestaque: "sem dor de cabeça,",
        heroDepois: "do começo ao fim.",
        seloSobre: "Mudanças",
        servicos: [
          { icone: "sofa", titulo: "Mudança residencial", descricao: "Móveis e pertences transportados com cuidado, da casa antiga até a nova." },
          { icone: "predio", titulo: "Mudança comercial", descricao: "Mudança de escritórios e lojas planejada para não parar o seu negócio." },
          { icone: "caixas", titulo: "Embalagem", descricao: "Proteção de móveis e objetos frágeis para chegarem inteiros ao destino." },
          { icone: "rota", titulo: "Outras cidades", descricao: "Mudanças intermunicipais e interestaduais, com orçamento sem compromisso." },
        ],
        regiao: { nome: "Região", itens: [`${cidade} e cidades vizinhas`, "Outras cidades sob consulta"], selo: "Atendimento" },
        objeto: "sua mudança",
      };
    default: // 4930202: intermunicipal, interestadual e internacional
      return {
        atividade: "transporte rodoviário de cargas",
        selo: "Transporte rodoviário de cargas",
        heroAntes: "Sua carga no",
        heroDestaque: "destino certo,",
        heroDepois: `saindo de ${cidade}.`,
        seloSobre: "Intermunicipal e interestadual",
        servicos: [
          CARGA_FECHADA,
          { icone: "rota", titulo: "Rotas entre cidades", descricao: "Transporte para outras cidades e estados, com prazo combinado antes da coleta." },
          { icone: "caixa", titulo: "Carga seca", descricao: "Mercadorias embaladas ou paletizadas, com cuidado no manuseio da coleta à entrega." },
          ATENDIMENTO_EMPRESAS,
        ],
        regiao: { nome: "Rotas", itens: ["Cidades de todo o estado", "Outros estados sob consulta"], selo: "Sob consulta" },
        objeto: "sua carga",
      };
  }
}

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

function marca(nome: string): SiteTransportadora["marca"] {
  const palavras = nome.split(" ");
  if (palavras.length < 2) return { texto: nome, destaque: "" };
  return { texto: `${palavras.slice(0, -1).join(" ")} `, destaque: palavras[palavras.length - 1] };
}

export function montarSiteTransportadora(d: DadosPrototipo): SiteTransportadora {
  const p = perfil(d.cnae, d.cidade);
  const anos = d.desde ? new Date().getFullYear() - d.desde : 0;
  const tempo = anos >= 2
    ? { valor: `${anos}`, rotulo: "Anos de estrada" }
    : { valor: d.desde ? `${d.desde}` : "Nova", rotulo: "Ano de fundação" };
  const canal = d.whatsapp ? "pelo WhatsApp" : "por telefone";
  const localSede = `${d.cidade}/${d.uf}`;

  return {
    inicio: "#",
    marca: marca(d.nome),
    nomeCompleto: d.nome,
    menu: [
      { nome: "Sobre", href: "#sobre" },
      { nome: "Serviços", href: "#servicos" },
      { nome: "Atuação", href: "#cobertura" },
      { nome: "Contato", href: "#cotacao" },
    ],
    ctaMenu: { rotulo: "Pedir orçamento", href: "#cotacao" },
    hero: {
      selo: p.selo,
      antes: p.heroAntes,
      destaque: p.heroDestaque,
      depois: p.heroDepois,
      subtitulo: `A ${d.nome} cuida da ${p.objeto} com atendimento direto, do orçamento à entrega.`,
      imagem: novaVia.hero.imagem,
      ctaPrincipal: "Pedir orçamento",
      ctaSecundario: "Nossos serviços",
    },
    sobre: {
      rotulo: `Sobre a ${d.nome}`,
      titulo: anos >= 2 ? [`${anos} anos de estrada`, `a partir de ${d.cidade}`] : ["Transporte com", "atendimento direto"],
      paragrafos: [
        `${d.desde ? `Desde ${d.desde}, a` : "A"} ${d.nome} atende empresas e clientes de ${d.cidade} e região com ${p.atividade}.`,
        `Aqui você fala direto com quem cuida da ${p.objeto}: orçamento rápido, prazo combinado antes da coleta e acompanhamento até a entrega.`,
      ],
      selos: ["CNPJ ativo", `Sede em ${localSede}`, p.seloSobre],
      numeros: [
        { icone: "calendario", ...tempo, cor: "text-orange-500" },
        { icone: "pino", valor: d.uf, rotulo: `Sede em ${d.cidade}`, cor: "text-blue-500" },
        { icone: "selo", valor: "Ativa", rotulo: "Empresa regular na Receita", cor: "text-emerald-500" },
        { icone: "atendimento", valor: "Direto", rotulo: "Atendimento com quem decide", cor: "text-violet-500" },
      ],
    },
    servicos: {
      rotulo: "O que fazemos",
      titulo: "Nossos serviços",
      subtitulo: "Transporte para quem precisa de prazo cumprido e atendimento próximo.",
      itens: p.servicos,
    },
    cobertura: {
      rotulo: "Área de atuação",
      titulo: `A partir de ${d.cidade}`,
      subtitulo: "Consulte a sua rota: respondemos rápido com prazo e valor.",
      regioes: [
        {
          nome: "Sede",
          itens: [localSede, ...(d.endereco ? [d.endereco] : [])],
          selo: "Base",
          corSelo: "bg-orange-100 text-orange-700",
          destaque: true,
        },
        { ...p.regiao, corSelo: "bg-emerald-100 text-emerald-700", destaque: false },
      ],
      consulta: {
        titulo: "Sua rota não está aqui?",
        texto: "Fale com a gente e consultamos a melhor forma de atender você.",
        rotulo: "Consultar rota",
        mensagem: `Olá! Gostaria de consultar uma rota com a ${d.nome}.`,
      },
      destaques: [
        { rotulo: "Orçamento", valor: `Rápido, ${canal}` },
        { rotulo: "Atendimento", valor: "Direto com a nossa equipe" },
      ],
      ctaDestaques: "Pedir orçamento",
    },
    diferenciais: {
      rotulo: "Diferenciais",
      titulo: "Sua carga em boas mãos.",
      destaque: "Do orçamento à entrega.",
      texto: `Somos de ${d.cidade}, conhecemos as estradas da região e tratamos cada cliente pelo nome.`,
      numeros: [tempo, { valor: d.uf, rotulo: `Sede em ${d.cidade}` }],
      itens: [
        { icone: "atendimento", titulo: "Atendimento direto", descricao: "Você fala com quem decide, sem central de atendimento e sem espera." },
        { icone: "escudo", titulo: "Carga segurada", descricao: "Transporte com seguro de responsabilidade civil do transportador (RCTR-C)." },
        { icone: "relogio", titulo: "Prazo combinado", descricao: "Prazo de coleta e de entrega acertado antes de a carga sair." },
        { icone: "pino", titulo: "Conhecemos a região", descricao: `Rotas planejadas por quem roda todos os dias por ${d.cidade} e região.` },
      ],
    },
    contato: {
      titulo: "Precisa de um orçamento?",
      texto: `Fale com a gente e receba prazo e valor para a ${p.objeto}.`,
      rotuloBotao: d.whatsapp ? "Chamar no WhatsApp" : "Ligar agora",
      whatsapp: d.whatsapp,
      telefone: d.telefone,
      email: d.email,
      endereco: [...(d.endereco ? [d.endereco] : []), `${d.cidade}, ${d.uf}${d.cep ? ` - ${d.cep}` : ""}`],
      cnpj: d.cnpj,
    },
    rodape: {
      descricao: `${p.atividade.charAt(0).toUpperCase()}${p.atividade.slice(1)} em ${d.cidade} e região. Atendimento direto, do orçamento à entrega.`,
      links: [
        { nome: "Sobre", href: "#sobre" },
        { nome: "Serviços", href: "#servicos" },
        { nome: "Área de atuação", href: "#cobertura" },
        { nome: "Pedir orçamento", href: "#cotacao" },
      ],
    },
  };
}
