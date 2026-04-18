export default function Hero() {
  return (
    <section className="relative min-h-screen bg-zinc-950 flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #f59e0b 0, #f59e0b 1px, transparent 0, transparent 50%)', backgroundSize: '24px 24px' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/8 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full">
          <span className="text-amber-400 text-sm">✂</span>
          <span className="text-amber-400 text-sm font-semibold">Barbearia profissional • Est. 2018</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
          Corte, barba<br />
          <span className="text-amber-400">e estilo.</span>
        </h1>

        <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-lg mx-auto leading-relaxed">
          Barbearia Dom — onde cada detalhe importa. Agende seu horário agora pelo WhatsApp.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/5511987654321"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-amber-500 text-zinc-900 font-black text-lg rounded-xl hover:bg-amber-400 transition-all transform hover:-translate-y-1 shadow-xl shadow-amber-500/25"
          >
            Agendar pelo WhatsApp
          </a>
          <a
            href="#servicos"
            className="px-8 py-4 border border-zinc-700 text-zinc-300 font-semibold text-lg rounded-xl hover:border-amber-500/50 hover:text-amber-400 transition-all"
          >
            Ver serviços e preços
          </a>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-6 max-w-sm mx-auto">
          {[["+2.000", "clientes atendidos"], ["5★", "avaliação no Google"], ["6 anos", "de experiência"]].map(([val, label]) => (
            <div key={label} className="text-center">
              <div className="text-amber-400 font-black text-xl">{val}</div>
              <div className="text-zinc-500 text-xs mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
