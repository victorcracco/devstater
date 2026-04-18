const services = [
  { name: "Treino Funcional", price: "Consulte", desc: "Exercícios integrados que melhoram força, equilíbrio e mobilidade.", icon: "🏋️" },
  { name: "Musculação", price: "Consulte", desc: "Periodização inteligente para hipertrofia e definição muscular.", icon: "💪" },
  { name: "Emagrecimento", price: "Consulte", desc: "Protocolo combinado de treino e orientação nutricional.", icon: "🔥" },
  { name: "Treino Online", price: "A partir de R$ 199/mês", desc: "Planilha personalizada com acompanhamento remoto pelo app.", icon: "📱" },
  { name: "Avaliação Física", price: "Gratuita", desc: "Anamnese completa, bioimpedância e definição de metas.", icon: "📋" },
  { name: "Condicionamento", price: "Consulte", desc: "Preparação física para corredores, atletas e esportistas.", icon: "🏃" },
];

export default function Services() {
  return (
    <section id="servicos" className="py-20 bg-slate-900">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">Modalidades</h2>
          <p className="text-slate-400 max-w-md mx-auto">Treinos adaptados ao seu objetivo, ritmo e disponibilidade.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s) => (
            <div
              key={s.name}
              className="group p-6 bg-slate-800/60 rounded-xl border border-slate-700/60 hover:border-lime-400/30 hover:bg-slate-800 transition-all duration-200"
            >
              <div className="text-2xl mb-3">{s.icon}</div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-bold text-white text-base leading-tight">{s.name}</h3>
                <span className="text-lime-400 font-bold text-xs whitespace-nowrap">{s.price}</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="https://wa.me/5511999887766"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-lime-400 text-slate-900 font-black text-base rounded-xl hover:bg-lime-300 transition-all transform hover:-translate-y-1"
          >
            Falar com o personal
          </a>
        </div>
      </div>
    </section>
  );
}
