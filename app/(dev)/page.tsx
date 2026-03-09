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
      <section className="py-24 bg-white">
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

      {/* 4. CTA FINAL: Chamada para ação */}
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