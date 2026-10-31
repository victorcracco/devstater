// Conteúdo do template de transportadora. O demo da NovaVia (/transportes) e os
// protótipos gerados para prospects (/p/[slug]) usam esta mesma estrutura.

export type Icone =
  | "caminhao" | "setas" | "armazem" | "rota" | "floco" | "chama" | "caixa" | "peso"
  | "pessoas" | "premio" | "grafico" | "escudo" | "pino" | "relogio" | "atendimento"
  | "calendario" | "predio" | "caixas" | "sofa" | "selo";

type Item = { icone: Icone; titulo: string; descricao: string };

export type SiteTransportadora = {
  inicio: string;
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
  };
  rodape: { descricao: string; links: { nome: string; href: string }[]; newsletter?: boolean };
};

/** Link de contato: WhatsApp quando há celular, senão ligação. */
export function linkContato(contato: SiteTransportadora["contato"], mensagem?: string): string | undefined {
  if (contato.whatsapp) {
    return `https://wa.me/${contato.whatsapp}${mensagem ? `?text=${encodeURIComponent(mensagem)}` : ""}`;
  }
  if (contato.telefone) return `tel:+55${contato.telefone.replace(/\D/g, "")}`;
  return undefined;
}

export const novaVia: SiteTransportadora = {
  inicio: "/transportes",
  marca: { texto: "Nova", destaque: "Via" },
  nomeCompleto: "NovaVia Logística",
  menu: [
    { nome: "Serviços", href: "#servicos" },
    { nome: "Diferenciais", href: "#diferenciais" },
    { nome: "Cobertura", href: "#cobertura" },
    { nome: "Contato", href: "#cotacao" },
  ],
  ctaMenu: { rotulo: "Cotação Expressa", href: "#cotacao" },
  hero: {
    selo: "Logística de Alta Performance",
    antes: "Sua carga no",
    destaque: "destino certo,",
    depois: "no tempo exato.",
    subtitulo:
      "Especialistas em transporte rodoviário e logística integrada. Mais de 10 mil entregas realizadas com segurança, tecnologia e rastreamento em tempo real.",
    // Foto de Josiah Farrow, licença gratuita do Unsplash (unsplash.com/photos/ucuOscdCaO4)
    imagem: "https://images.unsplash.com/photo-1592805144716-feeccccef5ac?fm=jpg&q=70&w=1600&fit=crop",
    ctaPrincipal: "Solicitar Orçamento",
    ctaSecundario: "Nossas Soluções",
  },
  sobre: {
    rotulo: "Sobre a NovaVia",
    titulo: ["Mais de uma década", "movendo o Brasil"],
    paragrafos: [
      "Nascemos em 2009 com uma frota de 12 caminhões e um propósito simples: entregar mais do que mercadorias — entregar confiança. Hoje operamos em todos os estados brasileiros com uma das frotas mais modernas e rastreadas do setor.",
      "Nosso modelo de operação integra tecnologia de ponta com atendimento humanizado. Cada cliente tem um executivo de contas dedicado, e cada carga é monitorada em tempo real pela nossa Torre de Controle 24/7.",
    ],
    selos: ["ISO 9001 Certificada", "ANTT Habilitada", "Frota Rastreada"],
    numeros: [
      { icone: "caminhao", valor: "280+", rotulo: "Veículos na frota", cor: "text-orange-500" },
      { icone: "pessoas", valor: "1.200+", rotulo: "Clientes ativos", cor: "text-blue-500" },
      { icone: "premio", valor: "15+", rotulo: "Anos de mercado", cor: "text-emerald-500" },
      { icone: "grafico", valor: "98,5%", rotulo: "Entregas no prazo", cor: "text-violet-500" },
    ],
  },
  servicos: {
    rotulo: "Nossa Expertise",
    titulo: "Soluções Logísticas",
    subtitulo: "Desenhamos operações sob medida para reduzir seus custos e acelerar o tempo de entrega.",
    itens: [
      { icone: "caminhao", titulo: "Transporte Rodoviário", descricao: "Cobertura nacional com frota rastreada e adequada para cada rota, garantindo o melhor SLA do mercado." },
      { icone: "setas", titulo: "Logística Integrada", descricao: "Gestão 360º da sua cadeia de suprimentos, da coleta no fabricante até a entrega B2B ou B2C." },
      { icone: "armazem", titulo: "Armazenagem Premium", descricao: "Centros de distribuição estratégicos com controle de temperatura, segurança 24h e gestão de estoque WMS." },
      { icone: "rota", titulo: "Cargas Fracionadas", descricao: "Otimização de custos para volumes menores, compartilhando rotas sem perder a pontualidade e segurança." },
    ],
    tiposCarga: {
      titulo: "Homologados para transportar:",
      itens: [
        { icone: "caixa", nome: "Carga Seca", cor: "text-emerald-600", fundo: "bg-emerald-50" },
        { icone: "floco", nome: "Refrigerada", cor: "text-blue-600", fundo: "bg-blue-50" },
        { icone: "chama", nome: "Perigosa (MOPP)", cor: "text-orange-600", fundo: "bg-orange-50" },
        { icone: "peso", nome: "Carga Pesada", cor: "text-slate-600", fundo: "bg-slate-100" },
      ],
    },
  },
  cobertura: {
    rotulo: "Área de Atuação",
    titulo: "Cobertura nacional",
    subtitulo: "Operamos em todos os 26 estados e no Distrito Federal, com hubs estratégicos no Sudeste e Sul do país.",
    regioes: [
      { nome: "Sudeste", itens: ["São Paulo", "Rio de Janeiro", "Minas Gerais", "Espírito Santo"], selo: "Hub Principal", corSelo: "bg-orange-100 text-orange-700", destaque: true },
      { nome: "Sul", itens: ["Paraná", "Santa Catarina", "Rio Grande do Sul"], selo: "Cobertura Total", corSelo: "bg-emerald-100 text-emerald-700", destaque: false },
      { nome: "Centro-Oeste", itens: ["Mato Grosso", "Mato Grosso do Sul", "Goiás", "Distrito Federal"], selo: "Rota Agro", corSelo: "bg-yellow-100 text-yellow-700", destaque: false },
      { nome: "Nordeste", itens: ["Bahia", "Pernambuco", "Ceará", "Maranhão", "+5 estados"], selo: "Expansão 2024", corSelo: "bg-blue-100 text-blue-700", destaque: false },
      { nome: "Norte", itens: ["Pará", "Amazonas", "Rondônia", "Tocantins"], selo: "Parceiros locais", corSelo: "bg-violet-100 text-violet-700", destaque: false },
    ],
    consulta: {
      titulo: "Sua rota não está aqui?",
      texto: "Consulte nossa equipe. Operamos rotas especiais com parceiros homologados.",
      rotulo: "Consultar rota",
      mensagem: "Olá, gostaria de consultar uma rota específica.",
    },
    destaques: [
      { rotulo: "Tempo médio de coleta", valor: "Até 24h após confirmação do pedido" },
      { rotulo: "Rastreamento", valor: "Tempo real via portal ou app" },
    ],
    ctaDestaques: "Solicitar coleta",
  },
  diferenciais: {
    rotulo: "Diferenciais",
    titulo: "Não movimentamos caixas.",
    destaque: "Entregamos confiança.",
    texto:
      "Nossa infraestrutura foi desenhada para eliminar gargalos. Investimos pesado em tecnologia e renovação de frota para que você foque apenas em vender, enquanto nós garantimos a entrega.",
    numeros: [
      { valor: "15+", rotulo: "Anos de Mercado" },
      { valor: "98%", rotulo: "Entregas no Prazo" },
    ],
    itens: [
      { icone: "pino", titulo: "Torre de Controle 24/7", descricao: "Monitoramento de frota em tempo real via satélite, com rotas geocercadas." },
      { icone: "escudo", titulo: "Gerenciamento de Risco", descricao: "Apólices robustas de seguro (RCTR-C e RCF-DC) cobrindo 100% do sinistro." },
      { icone: "relogio", titulo: "Pontualidade Extrema", descricao: "Índice de On-Time Delivery (OTD) superior a 98,5% no último ano." },
      { icone: "atendimento", titulo: "Atendimento Exclusivo", descricao: "Um executivo de contas dedicado para a sua operação, sem robôs no caminho." },
    ],
  },
  depoimentos: {
    titulo: "Quem confia na NovaVia",
    itens: [
      { nome: "Ricardo Fonseca", cargo: "Diretor de Operações", empresa: "Grupo Fonseca Alimentos", texto: "Parceria de 4 anos e nunca nos decepcionaram. A torre de controle 24h faz toda diferença — qualquer problema na rota, já sabemos antes do nosso cliente." },
      { nome: "Juliana Marques", cargo: "Gerente de Supply Chain", empresa: "TechParts Indústria", texto: "Migramos toda nossa operação de distribuição para a NovaVia e o índice de atrasos caiu de 12% para menos de 2%. Os números falam por si." },
      { nome: "Carlos Henrique Souza", cargo: "CEO", empresa: "Distribuidora Sul Atacado", texto: "O executivo de contas dedicado é o maior diferencial. Tenho uma pessoa real que conhece minha operação, não fico esperando em fila de SAC." },
    ],
  },
  contato: {
    titulo: "Pronto para otimizar sua logística?",
    texto: "Fale com nossos especialistas agora mesmo. Dimensionamos a melhor solução de transporte para o seu negócio em poucos minutos.",
    rotuloBotao: "Falar com Comercial",
    whatsapp: "5514998469800",
    telefone: "(11) 4000-0000",
    email: "comercial@novavia.com.br",
    endereco: ["Av. Paulista, 1000", "São Paulo, SP - 01310-100"],
  },
  rodape: {
    descricao: "Elevando o padrão da logística nacional com tecnologia, segurança e pontualidade. Sua parceira estratégica em transportes.",
    links: [
      { nome: "Sobre a Empresa", href: "#sobre" },
      { nome: "Nossos Serviços", href: "#servicos" },
      { nome: "Área de Atuação", href: "#cobertura" },
      { nome: "Solicitar Cotação", href: "#cotacao" },
    ],
    newsletter: true,
  },
};
