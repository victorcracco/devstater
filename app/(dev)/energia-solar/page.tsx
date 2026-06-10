import { Metadata } from "next";
import NicheLanding from "../components/NicheLanding";

export const metadata: Metadata = {
  title: "Site para Energia Solar — Capte e Qualifique Orçamentos",
  description:
    "Landing page para integradoras de energia solar: apareça no Google quando alguém buscar 'energia solar' na sua cidade e capte orçamentos qualificados pelo WhatsApp.",
  openGraph: {
    title: "Site para Energia Solar — Capte e Qualifique Orçamentos",
    description:
      "Landing page para integradoras de energia solar: apareça no Google na sua região e capte orçamentos qualificados pelo WhatsApp.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function EnergiaSolar() {
  return (
    <NicheLanding
      segment="energia solar"
      badge="☀️ Para integradoras de energia solar"
      heroTitle="Sua integradora de energia solar"
      heroHighlight="também merece aparecer no Google."
      heroSubtitle="Landing page feita para captar e qualificar pedidos de orçamento de energia solar na sua região, com WhatsApp e formulário curto de orçamento."
      heroCtaMessage="Olá! Vim pela página de energia solar e quero saber mais sobre a landing page."
      painsTitle="Você reconhece essa situação?"
      painsSubtitle="Problemas comuns de quem vende energia solar e ainda não tem uma página própria."
      pains={[
        {
          icon: "🤝",
          title: "Depende só de indicação",
          description:
            "Quando as indicações diminuem, os pedidos de orçamento também diminuem — e não há para onde direcionar quem chega até você.",
        },
        {
          icon: "📉",
          title: "Anúncio sem página de captura",
          description:
            "O clique do anúncio custa caro e termina numa rede social, sem formulário e sem botão de WhatsApp para fechar contato.",
        },
        {
          icon: "🔍",
          title: "Não aparece no Google",
          description:
            "Quando alguém busca \"energia solar\" + sua cidade, sua empresa não aparece — e o cliente fecha com quem aparece.",
        },
      ]}
      offerTitle="Uma página feita para captar orçamentos"
      offerDescription="Site/landing focado em transformar visitantes em pedidos de orçamento qualificados."
      benefits={[
        {
          icon: "📋",
          title: "Formulário curto de orçamento",
          description:
            "Poucos campos, direto ao ponto, com envio automático para o seu WhatsApp.",
        },
        {
          icon: "📣",
          title: "Pronta para anúncios",
          description:
            "Direcione tráfego pago para uma página feita para converter, em vez de uma rede social genérica.",
        },
        {
          icon: "📍",
          title: "Otimizada para buscas locais",
          description:
            "SEO básico com foco em \"energia solar\" + nome da sua cidade e região.",
        },
      ]}
      formTitle="Peça um orçamento para sua landing page"
      formSubtitle="Preencha os dados abaixo e fale direto com a gente pelo WhatsApp."
      necessidadeLabel="O que você precisa"
      necessidadePlaceholder="Ex: Quero uma página para captar orçamentos de instalação residencial na minha região."
      ctaFinalMessage="Olá! Vim pela página de energia solar e quero falar sobre uma landing page para minha integradora."
    />
  );
}
