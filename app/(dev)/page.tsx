import Link from "next/link";
import { whatsappLink } from "@/lib/whatsapp";
import SignatureElement from "./components/SignatureElement";

export default function Home() {
  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="bg-paper py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16 items-center">
            <div className="order-1">
              <span className="inline-block mb-6 text-sm font-semibold py-1.5 px-3 rounded-full bg-brand/10 text-brand border border-brand/20">
                🇧🇷 Atendemos empresas em todo o Brasil
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-ink mb-6 tracking-tight leading-tight">
                Seu site novo no ar em 7 dias —{" "}
                <span className="font-display text-brand">
                  feito para trazer cliente no seu WhatsApp
                </span>.
              </h1>
              <p className="text-lg md:text-xl text-ink/70 mb-10 max-w-2xl leading-relaxed">
                Site profissional, rápido e com seu Google Business Profile otimizado, para quem busca seu serviço no celular encontrar você primeiro — e chamar no WhatsApp.
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <a
                  href={whatsappLink("Olá! Quero receber uma prévia grátis do meu site.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-accent text-brand-dark font-bold rounded-lg hover:opacity-90 transition-opacity text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  Receber prévia grátis no WhatsApp
                </a>
                <Link
                  href="#precos"
                  className="px-4 py-2 text-ink font-semibold underline underline-offset-4 decoration-line hover:text-brand hover:decoration-brand transition-colors text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand rounded"
                >
                  Ver planos e preços
                </Link>
              </div>
            </div>

            <div className="order-2">
              <SignatureElement />
            </div>
          </div>
        </div>
      </section>

      {/* 2. OFERTA PRINCIPAL: Pacote Presença que Vende */}
      <section className="py-24 bg-paper">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-brand-dark text-paper rounded-xl p-8 md:p-14">
            <span className="inline-block mb-4 text-sm font-semibold py-1 px-3 rounded-full bg-paper/10 text-accent border border-paper/20">
              Nossa oferta principal
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 tracking-tight">Pacote Presença que Vende</h2>
            <p className="text-paper/70 text-lg mb-10 max-w-2xl leading-relaxed">
              Um site pensado para conversão, com seu perfil do Google Business otimizado, no ar em poucos dias — e com uma garantia simples.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <div className="flex flex-col gap-2">
                <span className="w-10 h-10 rounded-lg bg-accent text-brand-dark flex items-center justify-center text-lg font-bold font-display">1</span>
                <h3 className="font-bold">Site focado em conversão</h3>
                <p className="text-sm text-paper/60">Estrutura e textos pensados para levar o visitante até o WhatsApp.</p>
              </div>
              <div className="flex flex-col gap-2">
                <span className="w-10 h-10 rounded-lg bg-accent text-brand-dark flex items-center justify-center text-lg font-bold font-display">2</span>
                <h3 className="font-bold">Google Business otimizado</h3>
                <p className="text-sm text-paper/60">Seu perfil configurado para aparecer melhor nas buscas locais.</p>
              </div>
              <div className="flex flex-col gap-2">
                <span className="w-10 h-10 rounded-lg bg-accent text-brand-dark flex items-center justify-center text-lg font-bold font-display">3</span>
                <h3 className="font-bold">Entrega em 7 dias</h3>
                <p className="text-sm text-paper/60">Do início do projeto até o site no ar, em até uma semana.</p>
              </div>
              <div className="flex flex-col gap-2">
                <span className="w-10 h-10 rounded-lg bg-accent text-brand-dark flex items-center justify-center text-lg font-bold font-display">✓</span>
                <h3 className="font-bold">Garantia de satisfação</h3>
                <p className="text-sm text-paper/60">Não gostou da prévia final? Você não paga a segunda parcela.</p>
              </div>
            </div>

            <a
              href={whatsappLink("Olá! Quero saber mais sobre o Pacote Presença que Vende.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-accent text-brand-dark font-bold rounded-lg hover:opacity-90 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
            >
              Quero esse pacote
            </a>
          </div>
        </div>
      </section>

      {/* 3. SERVIÇOS: O que fazemos */}
      <section id="servicos" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4 tracking-tight">Soluções sob medida</h2>
            <p className="text-lg text-ink/70 max-w-2xl mx-auto">
              Do primeiro contato até o agendamento, cada plano resolve uma etapa do caminho até o seu cliente.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group p-8 bg-white rounded-xl border border-line hover:border-brand/30 transition-all duration-300 hover:shadow-lg">
              <div className="w-14 h-14 bg-brand/10 group-hover:bg-accent/20 rounded-lg flex items-center justify-center text-brand mb-6 text-3xl transition-colors">
                🎯
              </div>
              <h3 className="text-xl font-bold text-ink mb-3">Landing de Conversão</h3>
              <p className="text-ink/70 leading-relaxed">
                Uma página direta ao ponto, com seus serviços, diferenciais e botão de WhatsApp em destaque.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group p-8 bg-white rounded-xl border border-line hover:border-brand/30 transition-all duration-300 hover:shadow-lg">
              <div className="w-14 h-14 bg-brand/10 group-hover:bg-accent/20 rounded-lg flex items-center justify-center text-brand mb-6 text-3xl transition-colors">
                🌐
              </div>
              <h3 className="text-xl font-bold text-ink mb-3">Site Profissional + Google Business</h3>
              <p className="text-ink/70 leading-relaxed">
                Site completo de 4 a 6 páginas com seu perfil do Google Business Profile otimizado para buscas locais.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group p-8 bg-white rounded-xl border border-line hover:border-brand/30 transition-all duration-300 hover:shadow-lg">
              <div className="w-14 h-14 bg-brand/10 group-hover:bg-accent/20 rounded-lg flex items-center justify-center text-brand mb-6 text-3xl transition-colors">
                🤖
              </div>
              <h3 className="text-xl font-bold text-ink mb-3">Premium com Agente de IA</h3>
              <p className="text-ink/70 leading-relaxed">
                Site completo com um agente de IA no seu WhatsApp, que responde, qualifica e agenda por você.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. COMO FUNCIONA */}
      <section id="como-funciona" className="py-24 bg-paper">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4 tracking-tight">Como funciona</h2>
            <p className="text-lg text-ink/70 max-w-2xl mx-auto">
              Do primeiro contato ao site no ar.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                title: "Conversa inicial",
                text: "Você manda uma mensagem no WhatsApp contando o que precisa.",
              },
              {
                title: "Briefing rápido",
                text: "Alinhamos textos, imagens e referências visuais com você.",
              },
              {
                title: "Produção em até 7 dias",
                text: "Criamos seu site e configuramos seu Google Business Profile.",
              },
              {
                title: "Revisão e entrega",
                text: "Você revisa a prévia, ajustamos o que for preciso e o site vai ao ar.",
              },
            ].map((step, i) => (
              <div key={step.title} className="flex flex-col gap-4">
                <span className="font-display w-12 h-12 rounded-lg bg-brand text-paper flex items-center justify-center text-xl font-bold">
                  {i + 1}
                </span>
                <h3 className="text-lg font-bold text-ink">{step.title}</h3>
                <p className="text-ink/70 leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PORTFÓLIO: Nichos atendidos */}
      <section id="portfolio" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block mb-3 text-sm font-semibold py-1 px-3 rounded-full bg-brand/10 text-brand border border-brand/20">
              Nossos Projetos
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4 tracking-tight">Sites que já entregamos</h2>
            <p className="text-lg text-ink/70 max-w-2xl mx-auto">
              Desenvolvemos soluções sob medida para cada segmento. Veja alguns exemplos do que podemos fazer pelo seu negócio.
            </p>
          </div>

          {/* Sites Institucionais */}
          <div className="mb-4">
            <span className="inline-flex items-center gap-2 text-sm font-bold text-brand mb-6">
              <span className="w-2 h-2 rounded-full bg-brand inline-block"></span>
              Sites Profissionais
            </span>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Card 1 - Transportes */}
            <div className="group rounded-xl overflow-hidden border border-line hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white">
              <div className="h-48 bg-brand-dark flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&q=80')] bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity"></div>
                <span className="relative text-5xl">🚛</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold px-2 py-1 bg-line/40 text-ink/70 rounded-md">Logística</span>
                  <span className="text-xs text-ink/60">Site Profissional</span>
                </div>
                <h3 className="text-lg font-bold text-ink mb-2">NovaVia Logística</h3>
                <p className="text-sm text-ink/70 leading-relaxed mb-4">
                  Site completo para transportadora com seções de serviços, diferenciais e CTA integrado ao WhatsApp.
                </p>
                <a href="/transportes" target="_blank" className="text-sm font-semibold text-brand hover:text-brand-dark flex items-center gap-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand rounded">
                  Ver demonstração
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                </a>
              </div>
            </div>

            {/* Card 2 - Odontologia */}
            <div className="group rounded-xl overflow-hidden border border-line hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white">
              <div className="h-48 bg-brand-dark flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&q=80')] bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity"></div>
                <span className="relative text-5xl">🦷</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold px-2 py-1 bg-line/40 text-ink/70 rounded-md">Saúde</span>
                  <span className="text-xs text-ink/60">Site Profissional</span>
                </div>
                <h3 className="text-lg font-bold text-ink mb-2">Sorriso Pleno Odontologia</h3>
                <p className="text-sm text-ink/70 leading-relaxed mb-4">
                  Site para clínica odontológica com serviços, depoimentos de pacientes e agendamento via WhatsApp.
                </p>
                <a href="/clinica-odonto" target="_blank" className="text-sm font-semibold text-brand hover:text-brand-dark flex items-center gap-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand rounded">
                  Ver demonstração
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                </a>
              </div>
            </div>

            {/* Card 3 - Advocacia */}
            <div className="group rounded-xl overflow-hidden border border-line hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white">
              <div className="h-48 bg-brand-dark flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80')] bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity"></div>
                <span className="relative text-5xl">⚖️</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold px-2 py-1 bg-line/40 text-ink/70 rounded-md">Jurídico</span>
                  <span className="text-xs text-ink/60">Site Profissional</span>
                </div>
                <h3 className="text-lg font-bold text-ink mb-2">Ferreira & Associados</h3>
                <p className="text-sm text-ink/70 leading-relaxed mb-4">
                  Site institucional para escritório de advocacia com áreas de atuação, equipe e consulta via WhatsApp.
                </p>
                <a href="/advocacia" target="_blank" className="text-sm font-semibold text-brand hover:text-brand-dark flex items-center gap-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand rounded">
                  Ver demonstração
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Landing de Conversão */}
          <div className="mb-4">
            <span className="inline-flex items-center gap-2 text-sm font-bold text-brand mb-6">
              <span className="w-2 h-2 rounded-full bg-brand inline-block"></span>
              Landing de Conversão
            </span>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 4 - Barbearia */}
            <div className="group rounded-xl overflow-hidden border border-line hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white">
              <div className="h-48 bg-brand-dark flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #FF8A3D 0, #FF8A3D 1px, transparent 0, transparent 50%)', backgroundSize: '18px 18px' }}></div>
                <span className="relative text-5xl">✂️</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold px-2 py-1 bg-line/40 text-ink/70 rounded-md">Beleza</span>
                  <span className="text-xs text-ink/60">Landing de Conversão</span>
                </div>
                <h3 className="text-lg font-bold text-ink mb-2">Barbearia Dom</h3>
                <p className="text-sm text-ink/70 leading-relaxed mb-4">
                  Página simples e direta com serviços, preços, horários, endereço e agendamento via WhatsApp.
                </p>
                <a href="/barbearia" target="_blank" className="text-sm font-semibold text-brand hover:text-brand-dark flex items-center gap-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand rounded">
                  Ver demonstração
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                </a>
              </div>
            </div>

            {/* Card 5 - Estética */}
            <div className="group rounded-xl overflow-hidden border border-line hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white">
              <div className="h-48 bg-brand-dark flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600&q=80')] bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity"></div>
                <span className="relative text-5xl">✿</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold px-2 py-1 bg-line/40 text-ink/70 rounded-md">Estética</span>
                  <span className="text-xs text-ink/60">Landing de Conversão</span>
                </div>
                <h3 className="text-lg font-bold text-ink mb-2">Studio Luma Estética</h3>
                <p className="text-sm text-ink/70 leading-relaxed mb-4">
                  Página elegante com serviços, preços, horários de atendimento e contato via WhatsApp.
                </p>
                <a href="/estetica" target="_blank" className="text-sm font-semibold text-brand hover:text-brand-dark flex items-center gap-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand rounded">
                  Ver demonstração
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                </a>
              </div>
            </div>

            {/* Card 6 - Personal */}
            <div className="group rounded-xl overflow-hidden border border-line hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white">
              <div className="h-48 bg-brand-dark flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80')] bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity"></div>
                <span className="relative text-5xl">⚡</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold px-2 py-1 bg-line/40 text-ink/70 rounded-md">Fitness</span>
                  <span className="text-xs text-ink/60">Landing de Conversão</span>
                </div>
                <h3 className="text-lg font-bold text-ink mb-2">Move Personal Training</h3>
                <p className="text-sm text-ink/70 leading-relaxed mb-4">
                  Página para personal trainer com modalidades, disponibilidade e agendamento de avaliação gratuita.
                </p>
                <a href="/personal" target="_blank" className="text-sm font-semibold text-brand hover:text-brand-dark flex items-center gap-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand rounded">
                  Ver demonstração
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PREÇOS */}
      <section id="precos" className="py-24 bg-paper">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block mb-3 text-sm font-semibold py-1 px-3 rounded-full bg-brand/10 text-brand border border-brand/20">
              Planos e Preços
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4 tracking-tight">Investimento transparente</h2>
            <p className="text-lg text-ink/70 max-w-2xl mx-auto">
              Sem surpresas. Escolha o plano ideal para o momento do seu negócio.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-stretch mb-10">

            {/* Landing de Conversão */}
            <div className="bg-white rounded-xl border border-line p-7 flex flex-col hover:shadow-lg transition-shadow">
              <div className="mb-5">
                <span className="inline-block text-xs font-bold px-2 py-1 bg-brand/10 text-brand rounded-full mb-3">Landing de Conversão</span>
                <h3 className="text-base font-bold text-ink mb-1">Landing de Conversão</h3>
                <p className="text-xs text-ink/60">Uma página direta, focada em levar o visitante ao WhatsApp</p>
              </div>
              <div className="mb-1">
                <span className="font-display text-3xl font-bold text-ink">R$ 797</span>
              </div>
              <p className="text-xs text-ink/60 mb-6">Implementação única + mensalidade</p>
              <ul className="space-y-2.5 mb-6 flex-grow">
                {[
                  "1 página completa e responsiva",
                  "Botão de WhatsApp em destaque",
                  "Serviços, preços e diferenciais",
                  "Endereço e horários de atendimento",
                  "SEO básico",
                  "Entrega em até 7 dias",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-ink/70">
                    <span className="w-4 h-4 rounded-full bg-brand/10 text-brand flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={whatsappLink("Olá! Quero saber mais sobre a Landing de Conversão.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-3 border-2 border-ink text-ink font-bold rounded-lg hover:bg-ink hover:text-paper transition-colors text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                Quero essa landing
              </a>
            </div>

            {/* Site Profissional + GBP — Destaque */}
            <div className="bg-brand text-paper rounded-xl p-7 flex flex-col shadow-xl relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-brand-dark text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap">
                MAIS ESCOLHIDO
              </div>
              <div className="mb-5">
                <span className="inline-block text-xs font-bold px-2 py-1 bg-paper/15 text-paper rounded-full mb-3">Site Profissional</span>
                <h3 className="text-base font-bold text-paper mb-1">Site Profissional + Google Business</h3>
                <p className="text-xs text-paper/70">Site completo (4 a 6 páginas) com seu Google Business otimizado</p>
              </div>
              <div className="mb-1">
                <span className="font-display text-3xl font-bold text-paper">R$ 1.497</span>
              </div>
              <p className="text-xs text-paper/70 mb-6">Implementação única + mensalidade</p>
              <ul className="space-y-2.5 mb-6 flex-grow">
                {[
                  "De 4 a 6 páginas completas",
                  "Google Business Profile otimizado",
                  "Design premium responsivo",
                  "WhatsApp + formulário de contato",
                  "SEO on-page completo",
                  "Google Analytics",
                  "Entrega em até 7 dias",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-paper">
                    <span className="w-4 h-4 rounded-full bg-paper/15 text-paper flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={whatsappLink("Olá! Quero saber mais sobre o Site Profissional + Google Business.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-3 bg-accent text-brand-dark font-bold rounded-lg hover:opacity-90 transition-opacity text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
              >
                Quero esse plano
              </a>
            </div>

            {/* Premium com Agente de IA */}
            <div className="bg-white rounded-xl border border-line p-7 flex flex-col hover:shadow-lg transition-shadow">
              <div className="mb-5">
                <span className="inline-block text-xs font-bold px-2 py-1 bg-brand/10 text-brand rounded-full mb-3">Premium</span>
                <h3 className="text-base font-bold text-ink mb-1">Premium + Agente de IA</h3>
                <p className="text-xs text-ink/60">Site completo + agente de IA no seu WhatsApp</p>
              </div>
              <div className="mb-1">
                <span className="font-display text-3xl font-bold text-ink">R$ 2.497</span>
              </div>
              <p className="text-xs text-ink/60 mb-6">Implementação única + mensalidade</p>
              <ul className="space-y-2.5 mb-6 flex-grow">
                {[
                  "Tudo do Site Profissional",
                  "Agente de IA no WhatsApp do cliente",
                  "Responde dúvidas automaticamente",
                  "Qualifica e agenda atendimentos",
                  "Google Business Profile otimizado",
                  "Entrega em até 7 dias",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-ink/70">
                    <span className="w-4 h-4 rounded-full bg-brand/10 text-brand flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={whatsappLink("Olá! Quero saber mais sobre o plano Premium com Agente de IA.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-3 border-2 border-ink text-ink font-bold rounded-lg hover:bg-ink hover:text-paper transition-colors text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                Quero o Premium
              </a>
            </div>
          </div>

          {/* Mensalidade */}
          <div className="bg-white border border-line rounded-xl p-8 mb-6">
            <h3 className="text-lg font-bold text-ink mb-2">Mensalidade incluída em todos os planos</h3>
            <p className="text-sm text-ink/60 mb-6">Escolha o nível de acompanhamento que faz sentido para o seu negócio.</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-line rounded-lg p-5">
                <span className="font-display text-2xl font-bold text-ink">R$ 97<span className="font-sans text-sm font-medium text-ink/60">/mês</span></span>
                <p className="text-sm text-ink/70 mt-2">Hospedagem, suporte e pequenas alterações no site.</p>
              </div>
              <div className="border border-line rounded-lg p-5">
                <span className="font-display text-2xl font-bold text-ink">R$ 197<span className="font-sans text-sm font-medium text-ink/60">/mês</span></span>
                <p className="text-sm text-ink/70 mt-2">Tudo do plano anterior, com ajustes mensais e relatório simples de desempenho.</p>
              </div>
            </div>
          </div>

          {/* Pagamento e Garantia */}
          <div className="bg-brand-dark text-paper rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="text-4xl">🛡️</span>
              <div>
                <h4 className="text-lg font-bold mb-1">Garantia de satisfação</h4>
                <p className="text-paper/60 text-sm">Não gostou da prévia final? Você não paga a segunda parcela.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-4xl">💳</span>
              <div>
                <h4 className="text-lg font-bold mb-1">Formas de pagamento</h4>
                <p className="text-paper/60 text-sm">Pix (50% para iniciar e 50% na entrega) ou cartão parcelado.</p>
              </div>
            </div>
            <a
              href={whatsappLink("Olá! Quero falar com a DevStarter sobre os planos.")}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-accent text-brand-dark font-bold rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap flex-shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
            >
              Falar com especialista
            </a>
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section id="faq" className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4 tracking-tight">Perguntas frequentes</h2>
          </div>

          <div className="divide-y divide-line border-t border-b border-line">
            {[
              {
                q: "Preciso ter domínio e hospedagem?",
                a: "Não. Ajudamos a configurar tudo, ou você já pode usar os seus se preferir.",
              },
              {
                q: "Como funciona o pagamento?",
                a: "Pix com 50% para iniciar e 50% na entrega, ou cartão parcelado.",
              },
              {
                q: "O que está incluso na mensalidade?",
                a: "No plano de R$ 97/mês: hospedagem, suporte e pequenas alterações. No plano de R$ 197/mês: tudo isso, mais ajustes mensais e relatório simples de desempenho.",
              },
              {
                q: "Posso pedir alterações depois da entrega?",
                a: "Sim, dentro do que está incluso na mensalidade escolhida.",
              },
              {
                q: "O agente de IA funciona em qualquer WhatsApp?",
                a: "Sim, ele é configurado no número de WhatsApp do seu negócio (disponível no plano Premium).",
              },
              {
                q: "Quanto tempo leva para o site ficar pronto?",
                a: "Até 7 dias após o briefing, dependendo da disponibilidade do conteúdo.",
              },
            ].map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-semibold text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand rounded">
                  <span>{item.q}</span>
                  <span className="flex-shrink-0 text-brand text-xl leading-none transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="text-ink/70 mt-3 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CTA FINAL: Chamada para ação */}
      <section className="py-20 bg-brand-dark text-paper">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">Pronto para começar?</h2>
          <p className="text-lg text-paper/70 mb-8">
            Vamos conversar sobre o seu projeto. Sem compromisso e sem tecniquês.
          </p>
          <a
            href={whatsappLink("Olá! Quero conversar sobre o meu projeto com a DevStarter.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-accent text-brand-dark font-bold rounded-lg hover:opacity-90 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
          >
            Falar com um desenvolvedor
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>
          </a>
        </div>
      </section>
    </>
  );
}
