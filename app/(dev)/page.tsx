import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* 1. HERO SECTION: Impacto Visual */}
      <section className="relative bg-gradient-to-b from-blue-50 via-white to-white overflow-hidden py-24 md:py-36">
        {/* Decoração de fundo */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/4 w-[500px] h-[500px] bg-blue-100/60 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-1/4 w-[500px] h-[500px] bg-indigo-50/60 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-4xl mx-auto px-4 text-center z-10">
          <span className="inline-block mb-6 text-sm font-semibold py-1 px-3 rounded-full bg-blue-100 text-blue-700 border border-blue-200">
            🚀 Desenvolvimento Web Moderno
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
            Transformamos sua ideia em <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">
              negócio digital
            </span>.
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Criação de sites de alta performance, landing pages que convertem e sistemas sob medida. A tecnologia certa para sua empresa crescer.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/contato" 
              className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 hover:shadow-blue-300 transform hover:-translate-y-1"
            >
              Fazer Orçamento Gratuito
            </Link>
          </div>
        </div>
      </section>

      {/* 2. SERVIÇOS: O que fazemos */}
      <section id="servicos" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">Soluções Sob Medida</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Não entregamos apenas código. Entregamos ferramentas que ajudam seu negócio a vender mais e operar melhor.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-white transition-all duration-300 hover:shadow-xl hover:shadow-blue-100/50">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6 text-3xl group-hover:scale-110 transition-transform">
                🌐
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Sites Institucionais</h3>
              <p className="text-slate-600 leading-relaxed">
                Apresente sua marca com profissionalismo. Sites rápidos, otimizados para SEO e que funcionam perfeitamente em celulares.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:bg-white transition-all duration-300 hover:shadow-xl hover:shadow-indigo-100/50">
              <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mb-6 text-3xl group-hover:scale-110 transition-transform">
                🚀
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Landing Pages</h3>
              <p className="text-slate-600 leading-relaxed">
                Páginas focadas em conversão. Design estratégico para transformar visitantes em leads e clientes.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:border-violet-200 hover:bg-white transition-all duration-300 hover:shadow-xl hover:shadow-violet-100/50">
              <div className="w-14 h-14 bg-violet-100 rounded-xl flex items-center justify-center text-violet-600 mb-6 text-3xl group-hover:scale-110 transition-transform">
                ⚙️
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Sistemas Web</h3>
              <p className="text-slate-600 leading-relaxed">
                Painéis administrativos, áreas de membros e integrações via API desenvolvidas especificamente para sua necessidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DIFERENCIAIS: Por que nós? (Substitui a área de projetos visualmente) */}
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
                  "Entrega no prazo combinado",
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

      {/* 4. PORTFÓLIO: Nichos atendidos */}
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

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 - Transportes */}
            <div className="group rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
              <div className="h-48 bg-gradient-to-br from-slate-800 via-slate-900 to-orange-900 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&q=80')] bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity"></div>
                <span className="relative text-5xl">🚛</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold px-2 py-1 bg-orange-100 text-orange-700 rounded-full">Logística</span>
                  <span className="text-xs text-slate-500">Landing Page</span>
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
                  <span className="text-xs text-slate-500">Landing Page</span>
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
                  <span className="text-xs text-slate-500">Landing Page</span>
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
        </div>
      </section>

      {/* 5. PREÇOS */}
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

          {/* Aviso tudo incluso */}
          <div className="flex items-center justify-center gap-3 mb-12 px-6 py-4 bg-blue-50 border border-blue-200 rounded-2xl max-w-2xl mx-auto">
            <span className="text-blue-600 text-xl">✦</span>
            <p className="text-sm text-blue-700 font-medium text-center">
              Todos os planos incluem <strong>hospedagem, SSL, manutenção e suporte</strong> — sem cobranças extras. Domínio separado: <strong>R$ 40/ano</strong>.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {/* Plano Starter */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 flex flex-col hover:shadow-lg transition-shadow">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-900 mb-1">Starter</h3>
                <p className="text-sm text-slate-500">Ideal para quem precisa marcar presença online</p>
              </div>
              <div className="mb-2">
                <span className="text-4xl font-extrabold text-slate-900">R$ 99</span>
                <span className="text-slate-500 text-sm ml-1">/mês</span>
              </div>
              <p className="text-xs text-slate-400 mb-8">Equivale a R$ 1.188/ano · Cancele quando quiser</p>
              <ul className="space-y-3 mb-8 flex-grow">
                {[
                  "Landing page (1 página)",
                  "Design responsivo (mobile-first)",
                  "WhatsApp integrado",
                  "SEO básico configurado",
                  "Hospedagem inclusa",
                  "SSL gratuito",
                  "Suporte por WhatsApp",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/contato" className="w-full text-center py-3 border-2 border-slate-900 text-slate-900 font-bold rounded-lg hover:bg-slate-900 hover:text-white transition-colors">
                Começar agora
              </Link>
            </div>

            {/* Plano Pro — Destaque */}
            <div className="bg-blue-600 rounded-2xl p-8 flex flex-col shadow-xl shadow-blue-200 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-4 py-1.5 rounded-full border-2 border-white">
                MAIS POPULAR
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-1">Pro</h3>
                <p className="text-sm text-blue-200">Para negócios que querem gerar leads de verdade</p>
              </div>
              <div className="mb-2">
                <span className="text-4xl font-extrabold text-white">R$ 197</span>
                <span className="text-blue-200 text-sm ml-1">/mês</span>
              </div>
              <p className="text-xs text-blue-300 mb-8">Equivale a R$ 2.364/ano · Cancele quando quiser</p>
              <ul className="space-y-3 mb-8 flex-grow">
                {[
                  "Site completo (até 5 páginas)",
                  "Blog integrado",
                  "Design premium responsivo",
                  "WhatsApp + formulário de leads",
                  "SEO on-page completo",
                  "Google Analytics configurado",
                  "Hospedagem inclusa",
                  "Suporte prioritário",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white">
                    <span className="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/contato" className="w-full text-center py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors">
                Quero o Pro
              </Link>
            </div>

            {/* Plano Enterprise */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 flex flex-col hover:shadow-lg transition-shadow">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-900 mb-1">Enterprise</h3>
                <p className="text-sm text-slate-500">Para empresas que precisam de sistema completo</p>
              </div>
              <div className="mb-2">
                <span className="text-4xl font-extrabold text-slate-900">R$ 397</span>
                <span className="text-slate-500 text-sm ml-1">/mês</span>
              </div>
              <p className="text-xs text-slate-400 mb-8">Equivale a R$ 4.764/ano · Cancele quando quiser</p>
              <ul className="space-y-3 mb-8 flex-grow">
                {[
                  "Sistema web completo com CMS",
                  "Blog + área de membros",
                  "Painel administrativo",
                  "Integrações via API",
                  "Relatório mensal de resultados",
                  "Hospedagem inclusa",
                  "Suporte dedicado (WhatsApp + Email)",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                    <span className="w-5 h-5 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/contato" className="w-full text-center py-3 border-2 border-slate-900 text-slate-900 font-bold rounded-lg hover:bg-slate-900 hover:text-white transition-colors">
                Solicitar proposta
              </Link>
            </div>
          </div>

          {/* Garantia */}
          <div className="mt-10 bg-slate-900 text-white rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="text-4xl">🛡️</span>
              <div>
                <h4 className="text-lg font-bold mb-1">Garantia de 30 dias</h4>
                <p className="text-slate-400 text-sm">Não gostou? Devolvemos seu dinheiro sem burocracia nos primeiros 30 dias.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-4xl">🔓</span>
              <div>
                <h4 className="text-lg font-bold mb-1">Sem fidelidade</h4>
                <p className="text-slate-400 text-sm">Cancele quando quiser, sem multa e sem perder seu site.</p>
              </div>
            </div>
            <Link href="/contato" className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors whitespace-nowrap flex-shrink-0">
              Falar com especialista
            </Link>
          </div>
        </div>
      </section>

      {/* 6. CTA FINAL: Chamada para ação */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Pronto para começar?</h2>
          <p className="text-lg text-slate-600 mb-8">
            Vamos conversar sobre o seu projeto. Sem compromisso e sem tecniquês.
          </p>
          <Link 
            href="/contato" 
            className="inline-flex items-center px-8 py-4 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-all hover:-translate-y-1 shadow-xl shadow-slate-200"
          >
            Falar com um desenvolvedor
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}