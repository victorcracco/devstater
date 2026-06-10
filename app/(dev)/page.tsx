import Link from "next/link";
import { whatsappLink } from "@/lib/whatsapp";

export default function Home() {
  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-b from-blue-50 via-white to-white overflow-hidden py-24 md:py-36">
        {/* Decoração de fundo */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/4 w-[500px] h-[500px] bg-blue-100/60 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-1/4 w-[500px] h-[500px] bg-indigo-50/60 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-4xl mx-auto px-4 text-center z-10">
          <span className="inline-block mb-6 text-sm font-semibold py-1 px-3 rounded-full bg-blue-100 text-blue-700 border border-blue-200">
            📍 DevStarter — Lins/SP, atendendo todo o Brasil
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
            Seu site novo no ar em 7 dias —{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">
              feito para trazer cliente no seu WhatsApp
            </span>.
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Site profissional, rápido e com seu Google Business Profile otimizado, para quem busca seu serviço no celular encontrar você primeiro — e chamar no WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={whatsappLink("Olá! Quero receber uma prévia grátis do meu site.")}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 hover:shadow-blue-300 transform hover:-translate-y-1"
            >
              Receba uma prévia grátis do seu site
            </a>
            <Link
              href="#precos"
              className="px-8 py-4 bg-white text-slate-900 font-bold rounded-lg border-2 border-slate-200 hover:border-slate-300 transition-all"
            >
              Ver planos e preços
            </Link>
          </div>
        </div>
      </section>

      {/* 2. OFERTA PRINCIPAL: Pacote Presença que Vende */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-14 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
            <div className="relative z-10">
              <span className="inline-block mb-4 text-sm font-semibold py-1 px-3 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                Nossa oferta principal
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Pacote Presença que Vende</h2>
              <p className="text-slate-300 text-lg mb-10 max-w-2xl leading-relaxed">
                Um site pensado para conversão, com seu perfil do Google Business otimizado, no ar em poucos dias — e com uma garantia simples.
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <div className="flex flex-col gap-2">
                  <span className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-lg font-bold">1</span>
                  <h3 className="font-bold">Site focado em conversão</h3>
                  <p className="text-sm text-slate-400">Estrutura e textos pensados para levar o visitante até o WhatsApp.</p>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-lg font-bold">2</span>
                  <h3 className="font-bold">Google Business otimizado</h3>
                  <p className="text-sm text-slate-400">Seu perfil configurado para aparecer melhor nas buscas locais.</p>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-lg font-bold">3</span>
                  <h3 className="font-bold">Entrega em 7 dias</h3>
                  <p className="text-sm text-slate-400">Do início do projeto até o site no ar, em até uma semana.</p>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-lg font-bold">✓</span>
                  <h3 className="font-bold">Garantia de satisfação</h3>
                  <p className="text-sm text-slate-400">Não gostou da prévia final? Você não paga a segunda parcela.</p>
                </div>
              </div>

              <a
                href={whatsappLink("Olá! Quero saber mais sobre o Pacote Presença que Vende.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-white text-slate-900 font-bold rounded-lg hover:bg-blue-50 transition-all"
              >
                Quero esse pacote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVIÇOS: O que fazemos */}
      <section id="servicos" className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">Soluções sob medida</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Do primeiro contato até o agendamento, cada plano resolve uma etapa do caminho até o seu cliente.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group p-8 bg-white rounded-2xl border border-slate-100 hover:border-blue-200 transition-all duration-300 hover:shadow-xl hover:shadow-blue-100/50">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6 text-3xl group-hover:scale-110 transition-transform">
                🎯
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Landing de Conversão</h3>
              <p className="text-slate-600 leading-relaxed">
                Uma página direta ao ponto, com seus serviços, diferenciais e botão de WhatsApp em destaque.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group p-8 bg-white rounded-2xl border border-slate-100 hover:border-indigo-200 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-100/50">
              <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mb-6 text-3xl group-hover:scale-110 transition-transform">
                🌐
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Site Profissional + Google Business</h3>
              <p className="text-slate-600 leading-relaxed">
                Site completo de 4 a 6 páginas com seu perfil do Google Business Profile otimizado para buscas locais.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group p-8 bg-white rounded-2xl border border-slate-100 hover:border-violet-200 transition-all duration-300 hover:shadow-xl hover:shadow-violet-100/50">
              <div className="w-14 h-14 bg-violet-100 rounded-xl flex items-center justify-center text-violet-600 mb-6 text-3xl group-hover:scale-110 transition-transform">
                🤖
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Premium com Agente de IA</h3>
              <p className="text-slate-600 leading-relaxed">
                Site completo com um agente de IA no seu WhatsApp, que responde, qualifica e agenda por você.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DIFERENCIAIS: Por que nós? */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Efeito de fundo */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Desenvolvimento sem dor de cabeça.</h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Sabemos que contratar tecnologia pode ser complicado. Nosso processo é transparente, ágil e focado na entrega final.
              </p>

              <ul className="space-y-4">
                {[
                  "Site no ar em até 7 dias",
                  "Código limpo e otimizado para o Google",
                  "Suporte direto pelo WhatsApp",
                  "Tecnologias modernas (Next.js & React)"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold">✓</span>
                    <span className="text-slate-200 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bloco visual decorativo */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl blur-2xl opacity-30 transform rotate-3"></div>
              <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl relative">
                <div className="flex gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="space-y-3 font-mono text-sm text-slate-300">
                  <p><span className="text-violet-400">const</span> <span className="text-blue-400">DevStarter</span> = <span className="text-yellow-400">{"{"}</span></p>
                  <p className="pl-4">qualidade: <span className="text-green-400">true</span>,</p>
                  <p className="pl-4">performance: <span className="text-green-400">"100%"</span>,</p>
                  <p className="pl-4">foco: <span className="text-orange-400">"Resultado"</span></p>
                  <p className="text-yellow-400">{"}"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PORTFÓLIO: Nichos atendidos */}
      <section id="portfolio" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block mb-3 text-sm font-semibold py-1 px-3 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200">
              Nossos Projetos
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">Sites que já entregamos</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Desenvolvemos soluções sob medida para cada segmento. Veja alguns exemplos do que podemos fazer pelo seu negócio.
            </p>
          </div>

          {/* Sites Institucionais */}
          <div className="mb-4">
            <span className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-600 inline-block"></span>
              Sites Profissionais
            </span>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Card 1 - Transportes */}
            <div className="group rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
              <div className="h-48 bg-gradient-to-br from-slate-800 via-slate-900 to-orange-900 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&q=80')] bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity"></div>
                <span className="relative text-5xl">🚛</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold px-2 py-1 bg-orange-100 text-orange-700 rounded-full">Logística</span>
                  <span className="text-xs text-slate-500">Site Profissional</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">NovaVia Logística</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Site completo para transportadora com seções de serviços, diferenciais e CTA integrado ao WhatsApp.
                </p>
                <a href="/transportes" target="_blank" className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                  Ver demonstração
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                </a>
              </div>
            </div>

            {/* Card 2 - Odontologia */}
            <div className="group rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
              <div className="h-48 bg-gradient-to-br from-sky-700 via-blue-800 to-cyan-900 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&q=80')] bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity"></div>
                <span className="relative text-5xl">🦷</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold px-2 py-1 bg-sky-100 text-sky-700 rounded-full">Saúde</span>
                  <span className="text-xs text-slate-500">Site Profissional</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Sorriso Pleno Odontologia</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Site para clínica odontológica com serviços, depoimentos de pacientes e agendamento via WhatsApp.
                </p>
                <a href="/clinica-odonto" target="_blank" className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                  Ver demonstração
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                </a>
              </div>
            </div>

            {/* Card 3 - Advocacia */}
            <div className="group rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
              <div className="h-48 bg-gradient-to-br from-slate-700 via-slate-800 to-amber-900 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80')] bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity"></div>
                <span className="relative text-5xl">⚖️</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold px-2 py-1 bg-amber-100 text-amber-700 rounded-full">Jurídico</span>
                  <span className="text-xs text-slate-500">Site Profissional</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Ferreira & Associados</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Site institucional para escritório de advocacia com áreas de atuação, equipe e consulta via WhatsApp.
                </p>
                <a href="/advocacia" target="_blank" className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                  Ver demonstração
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Landing de Conversão */}
          <div className="mb-4">
            <span className="inline-flex items-center gap-2 text-sm font-bold text-rose-600 mb-6">
              <span className="w-2 h-2 rounded-full bg-rose-500 inline-block"></span>
              Landing de Conversão
            </span>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 4 - Barbearia */}
            <div className="group rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
              <div className="h-48 bg-gradient-to-br from-zinc-800 via-zinc-900 to-amber-950 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #f59e0b 0, #f59e0b 1px, transparent 0, transparent 50%)', backgroundSize: '18px 18px' }}></div>
                <span className="relative text-5xl">✂️</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold px-2 py-1 bg-amber-100 text-amber-700 rounded-full">Beleza</span>
                  <span className="text-xs text-slate-500">Landing de Conversão</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Barbearia Dom</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Página simples e direta com serviços, preços, horários, endereço e agendamento via WhatsApp.
                </p>
                <a href="/barbearia" target="_blank" className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                  Ver demonstração
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                </a>
              </div>
            </div>

            {/* Card 5 - Estética */}
            <div className="group rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
              <div className="h-48 bg-gradient-to-br from-rose-400 via-pink-500 to-rose-600 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600&q=80')] bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <span className="relative text-5xl">✿</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold px-2 py-1 bg-rose-100 text-rose-700 rounded-full">Estética</span>
                  <span className="text-xs text-slate-500">Landing de Conversão</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Studio Luma Estética</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Página elegante com serviços, preços, horários de atendimento e contato via WhatsApp.
                </p>
                <a href="/estetica" target="_blank" className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                  Ver demonstração
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                </a>
              </div>
            </div>

            {/* Card 6 - Personal */}
            <div className="group rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
              <div className="h-48 bg-gradient-to-br from-slate-800 via-slate-900 to-lime-950 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80')] bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <span className="relative text-5xl">⚡</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold px-2 py-1 bg-lime-100 text-lime-700 rounded-full">Fitness</span>
                  <span className="text-xs text-slate-500">Landing de Conversão</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Move Personal Training</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Página para personal trainer com modalidades, disponibilidade e agendamento de avaliação gratuita.
                </p>
                <a href="/personal" target="_blank" className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                  Ver demonstração
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PREÇOS */}
      <section id="precos" className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block mb-3 text-sm font-semibold py-1 px-3 rounded-full bg-blue-100 text-blue-700 border border-blue-200">
              Planos e Preços
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">Investimento transparente</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Sem surpresas. Escolha o plano ideal para o momento do seu negócio.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-stretch mb-10">

            {/* Landing de Conversão */}
            <div className="bg-white rounded-2xl border border-slate-200 p-7 flex flex-col hover:shadow-lg transition-shadow">
              <div className="mb-5">
                <span className="inline-block text-xs font-bold px-2 py-1 bg-rose-100 text-rose-600 rounded-full mb-3">Landing de Conversão</span>
                <h3 className="text-base font-bold text-slate-900 mb-1">Landing de Conversão</h3>
                <p className="text-xs text-slate-500">Uma página direta, focada em levar o visitante ao WhatsApp</p>
              </div>
              <div className="mb-1">
                <span className="text-3xl font-extrabold text-slate-900">R$ 797</span>
              </div>
              <p className="text-xs text-slate-400 mb-6">Implementação única + mensalidade</p>
              <ul className="space-y-2.5 mb-6 flex-grow">
                {[
                  "1 página completa e responsiva",
                  "Botão de WhatsApp em destaque",
                  "Serviços, preços e diferenciais",
                  "Endereço e horários de atendimento",
                  "SEO básico",
                  "Entrega em até 7 dias",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <span className="w-4 h-4 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={whatsappLink("Olá! Quero saber mais sobre a Landing de Conversão.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-3 border-2 border-slate-900 text-slate-900 font-bold rounded-lg hover:bg-slate-900 hover:text-white transition-colors text-sm"
              >
                Quero essa landing
              </a>
            </div>

            {/* Site Profissional + GBP — Destaque */}
            <div className="bg-blue-600 rounded-2xl p-7 flex flex-col shadow-xl shadow-blue-200 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-4 py-1.5 rounded-full border-2 border-white whitespace-nowrap">
                MAIS ESCOLHIDO
              </div>
              <div className="mb-5">
                <span className="inline-block text-xs font-bold px-2 py-1 bg-white/20 text-white rounded-full mb-3">Site Profissional</span>
                <h3 className="text-base font-bold text-white mb-1">Site Profissional + Google Business</h3>
                <p className="text-xs text-blue-200">Site completo (4 a 6 páginas) com seu Google Business otimizado</p>
              </div>
              <div className="mb-1">
                <span className="text-3xl font-extrabold text-white">R$ 1.497</span>
              </div>
              <p className="text-xs text-blue-300 mb-6">Implementação única + mensalidade</p>
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
                  <li key={i} className="flex items-start gap-2.5 text-sm text-white">
                    <span className="w-4 h-4 rounded-full bg-white/20 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={whatsappLink("Olá! Quero saber mais sobre o Site Profissional + Google Business.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors text-sm"
              >
                Quero esse plano
              </a>
            </div>

            {/* Premium com Agente de IA */}
            <div className="bg-white rounded-2xl border border-slate-200 p-7 flex flex-col hover:shadow-lg transition-shadow">
              <div className="mb-5">
                <span className="inline-block text-xs font-bold px-2 py-1 bg-violet-100 text-violet-700 rounded-full mb-3">Premium</span>
                <h3 className="text-base font-bold text-slate-900 mb-1">Premium + Agente de IA</h3>
                <p className="text-xs text-slate-500">Site completo + agente de IA no seu WhatsApp</p>
              </div>
              <div className="mb-1">
                <span className="text-3xl font-extrabold text-slate-900">R$ 2.497</span>
              </div>
              <p className="text-xs text-slate-400 mb-6">Implementação única + mensalidade</p>
              <ul className="space-y-2.5 mb-6 flex-grow">
                {[
                  "Tudo do Site Profissional",
                  "Agente de IA no WhatsApp do cliente",
                  "Responde dúvidas automaticamente",
                  "Qualifica e agenda atendimentos",
                  "Google Business Profile otimizado",
                  "Entrega em até 7 dias",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <span className="w-4 h-4 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={whatsappLink("Olá! Quero saber mais sobre o plano Premium com Agente de IA.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-3 border-2 border-slate-900 text-slate-900 font-bold rounded-lg hover:bg-slate-900 hover:text-white transition-colors text-sm"
              >
                Quero o Premium
              </a>
            </div>
          </div>

          {/* Mensalidade */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 mb-6">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Mensalidade incluída em todos os planos</h3>
            <p className="text-sm text-slate-500 mb-6">Escolha o nível de acompanhamento que faz sentido para o seu negócio.</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-slate-200 rounded-xl p-5">
                <span className="text-2xl font-extrabold text-slate-900">R$ 97<span className="text-sm font-medium text-slate-500">/mês</span></span>
                <p className="text-sm text-slate-600 mt-2">Hospedagem, suporte e pequenas alterações no site.</p>
              </div>
              <div className="border border-slate-200 rounded-xl p-5">
                <span className="text-2xl font-extrabold text-slate-900">R$ 197<span className="text-sm font-medium text-slate-500">/mês</span></span>
                <p className="text-sm text-slate-600 mt-2">Tudo do plano anterior, com ajustes mensais e relatório simples de desempenho.</p>
              </div>
            </div>
          </div>

          {/* Pagamento e Garantia */}
          <div className="bg-slate-900 text-white rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="text-4xl">🛡️</span>
              <div>
                <h4 className="text-lg font-bold mb-1">Garantia de satisfação</h4>
                <p className="text-slate-400 text-sm">Não gostou da prévia final? Você não paga a segunda parcela.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-4xl">💳</span>
              <div>
                <h4 className="text-lg font-bold mb-1">Formas de pagamento</h4>
                <p className="text-slate-400 text-sm">Pix (50% para iniciar e 50% na entrega) ou cartão parcelado.</p>
              </div>
            </div>
            <a
              href={whatsappLink("Olá! Quero falar com a DevStarter sobre os planos.")}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors whitespace-nowrap flex-shrink-0"
            >
              Falar com especialista
            </a>
          </div>
        </div>
      </section>

      {/* 7. CTA FINAL: Chamada para ação */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Pronto para começar?</h2>
          <p className="text-lg text-slate-600 mb-8">
            Vamos conversar sobre o seu projeto. Sem compromisso e sem tecniquês.
          </p>
          <a
            href={whatsappLink("Olá! Quero conversar sobre o meu projeto com a DevStarter.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-all hover:-translate-y-1 shadow-xl shadow-slate-200"
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
