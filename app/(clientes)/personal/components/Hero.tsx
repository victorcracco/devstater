export default function Hero() {
  return (
    <section className="relative min-h-screen bg-slate-950 flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&q=80')] bg-cover bg-center opacity-10"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-lime-400/6 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-lime-400/10 border border-lime-400/20 rounded-full">
          <span className="text-lime-400 text-sm">⚡</span>
          <span className="text-lime-400 text-sm font-semibold">Personal trainer certificado • São Paulo</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
          Seu corpo.<br />
          <span className="text-lime-400">Seus resultados.</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-lg mx-auto leading-relaxed">
          Treino personalizado, acompanhamento real e evolução garantida. Do emagrecimento à performance.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/5511999887766"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-lime-400 text-slate-900 font-black text-lg rounded-xl hover:bg-lime-300 transition-all transform hover:-translate-y-1 shadow-xl shadow-lime-400/20"
          >
            Avaliação gratuita pelo WhatsApp
          </a>
          <a
            href="#servicos"
            className="px-8 py-4 border border-slate-700 text-slate-300 font-semibold text-lg rounded-xl hover:border-lime-400/50 hover:text-lime-400 transition-all"
          >
            Ver modalidades
          </a>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-6 max-w-sm mx-auto">
          {[["+300", "alunos transformados"], ["8 anos", "de experiência"], ["CREF", "certificado"]].map(([val, label]) => (
            <div key={label} className="text-center">
              <div className="text-lime-400 font-black text-xl">{val}</div>
              <div className="text-slate-500 text-xs mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
