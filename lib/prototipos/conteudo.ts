// Estrutura do conteúdo de um site. Os modelos visuais só leem daqui, sem nenhum texto fixo de
// nicho: cada nicho (lib/prototipos/nichos) preenche esta estrutura com os dados da empresa.

export type Icone =
  | "caminhao" | "setas" | "armazem" | "rota" | "floco" | "chama" | "caixa" | "peso"
  | "pessoas" | "premio" | "grafico" | "escudo" | "pino" | "relogio" | "atendimento"
  | "calendario" | "predio" | "caixas" | "sofa" | "selo"
  | "estetoscopio" | "coracao" | "cerebro" | "ferramenta" | "carro" | "casa" | "chave"
  | "brilho" | "sorriso" | "agenda" | "prancheta" | "folha" | "tesoura" | "cuidado"
  | "hospital" | "seringa" | "pulso" | "velocimetro" | "pintura" | "engrenagem" | "mapa";

type Item = { icone: Icone; titulo: string; descricao: string };

export type ConteudoSite = {
  inicio: string;
  icone: Icone; // aparece ao lado do nome, no lugar do logo que ainda não temos
  marca: { texto: string; destaque: string };
  nomeCompleto: string;
  menu: { nome: string; href: string }[];
  ctaMenu: { rotulo: string; href: string };
  hero: {
    selo: string;
    antes: string;
    destaque: string;
    depois: string;
    subtitulo: string;
    imagem: string;
    imagemAlt: string;
    ctaPrincipal: string;
    ctaSecundario: string;
  };
  sobre: {
    rotulo: string;
    titulo: string[];
    paragrafos: string[];
    selos: string[];
    numeros: { icone: Icone; valor: string; rotulo: string; cor: string }[];
  };
  servicos: {
    rotulo: string;
    titulo: string;
    subtitulo: string;
    itens: Item[];
    tiposCarga?: { titulo: string; itens: { icone: Icone; nome: string; cor: string; fundo: string }[] };
  };
  cobertura: {
    rotulo: string;
    titulo: string;
    subtitulo: string;
    regioes: { nome: string; itens: string[]; selo: string; corSelo: string; destaque: boolean }[];
    consulta: { titulo: string; texto: string; rotulo: string; mensagem: string };
    destaques: { rotulo: string; valor: string }[];
    ctaDestaques: string;
  };
  diferenciais: {
    rotulo: string;
    titulo: string;
    destaque: string;
    texto: string;
    numeros: { valor: string; rotulo: string }[];
    itens: Item[];
  };
  depoimentos?: { titulo: string; itens: { nome: string; cargo: string; empresa: string; texto: string }[] };
  contato: {
    titulo: string;
    texto: string;
    rotuloBotao: string;
    whatsapp?: string; // só dígitos, com DDI
    telefone?: string;
    email?: string;
    endereco?: string[];
    cnpj?: string;
    registro?: string; // registro profissional exigido no nicho: "CRM/SP a informar", "CRECI a informar"
  };
  rodape: { descricao: string; links: { nome: string; href: string }[]; newsletter?: boolean };
};

// Como o visitante vira contato: o que os modelos Cartão, Simples e Orçamento pedem para ele fazer
export type Conversao = {
  acao: string; // "Pedir orçamento", "Agendar consulta"
  mensagem: string; // primeira mensagem que abre no WhatsApp da empresa
  formulario: {
    titulo: string;
    texto: string;
    campos: { id: string; rotulo: string; placeholder: string; naMensagem: string }[];
  };
  tituloPassos: string;
  passos: { titulo: string; texto: string }[];
};

export type ConteudoPrototipo = ConteudoSite & { conversao: Conversao };

/** Link de contato: WhatsApp quando há celular, senão ligação. */
export function linkContato(contato: ConteudoSite["contato"], mensagem?: string): string | undefined {
  if (contato.whatsapp) {
    return `https://wa.me/${contato.whatsapp}${mensagem ? `?text=${encodeURIComponent(mensagem)}` : ""}`;
  }
  if (contato.telefone) return `tel:+55${contato.telefone.replace(/\D/g, "")}`;
  return undefined;
}
