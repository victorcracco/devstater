const services = [
  { name: "Limpeza de Pele", price: "R$ 120", desc: "Limpeza profunda com extração e hidratação.", icon: "🌿" },
  { name: "Design de Sobrancelha", price: "R$ 55", desc: "Modelagem personalizada para seu rosto.", icon: "✨" },
  { name: "Extensão de Cílios", price: "R$ 150", desc: "Fio a fio ou volume russo com fixação duradoura.", icon: "👁️" },
  { name: "Depilação", price: "A partir de R$ 35", desc: "Cera quente ou morna para cada região.", icon: "🌸" },
  { name: "Massagem Relaxante", price: "R$ 100", desc: "50 min de relaxamento para corpo e mente.", icon: "💆" },
  { name: "Micropigmentação", price: "R$ 250", desc: "Sobrancelha e lábios com resultado natural.", icon: "🎨" },
];

export default function Services() {
  return (
    <section id="servicos" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">Nossos Serviços</h2>
          <p className="text-slate-500 max-w-md mx-auto">Cada atendimento é personalizado para você se sentir incrível.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s) => (
            <div
              key={s.name}
              className="group p-6 bg-rose-50/50 rounded-xl border border-rose-100 hover:border-rose-300 hover:bg-rose-50 transition-all duration-200"
            >
              <div className="text-2xl mb-3">{s.icon}</div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-bold text-slate-900 text-base leading-tight">{s.name}</h3>
                <span className="text-rose-500 font-bold text-xs whitespace-nowrap">{s.price}</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="https://wa.me/5511912345678"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-rose-500 text-white font-black text-base rounded-xl hover:bg-rose-600 transition-all transform hover:-translate-y-1 shadow-lg shadow-rose-200"
          >
            Agendar pelo WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
