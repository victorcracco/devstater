export default function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[500px] h-[500px] bg-rose-100/60 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[400px] h-[400px] bg-pink-100/60 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-rose-100 border border-rose-200 rounded-full">
          <span className="text-rose-500 text-sm">✿</span>
          <span className="text-rose-600 text-sm font-semibold">Studio de estética profissional</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 leading-tight tracking-tight">
          Beleza que<br />
          <span className="text-rose-500">transforma.</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-lg mx-auto leading-relaxed">
          Studio Luma — cuidados estéticos com carinho e resultado. Agende seu horário agora.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/5511912345678"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-rose-500 text-white font-black text-lg rounded-xl hover:bg-rose-600 transition-all transform hover:-translate-y-1 shadow-xl shadow-rose-300/40"
          >
            Agendar pelo WhatsApp
          </a>
          <a
            href="#servicos"
            className="px-8 py-4 border border-slate-200 text-slate-600 font-semibold text-lg rounded-xl hover:border-rose-300 hover:text-rose-500 transition-all"
          >
            Ver serviços
          </a>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-6 max-w-sm mx-auto">
          {[["+1.500", "clientes atendidas"], ["5★", "avaliação média"], ["4 anos", "de experiência"]].map(([val, label]) => (
            <div key={label} className="text-center">
              <div className="text-rose-500 font-black text-xl">{val}</div>
              <div className="text-slate-400 text-xs mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
