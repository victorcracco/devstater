const services = [
  { name: "Corte Masculino", price: "R$ 45", desc: "Tesoura ou máquina, com acabamento impecável.", icon: "✂️" },
  { name: "Degradê", price: "R$ 50", desc: "Fade perfeito do zero ao comprimento desejado.", icon: "💈" },
  { name: "Barba Completa", price: "R$ 35", desc: "Aparar, modelar e finalizar com produtos premium.", icon: "🪒" },
  { name: "Corte + Barba", price: "R$ 70", desc: "Combo completo — saia renovado de cabeça aos pés.", icon: "⭐" },
  { name: "Sobrancelha", price: "R$ 20", desc: "Design e acabamento para um visual alinhado.", icon: "✨" },
  { name: "Progressiva Masculina", price: "R$ 80", desc: "Alisar e volumizar com resultado de até 4 meses.", icon: "💆" },
];

export default function Services() {
  return (
    <section id="servicos" className="py-20 bg-zinc-900">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">Serviços & Preços</h2>
          <p className="text-zinc-400 max-w-md mx-auto">Qualidade em cada detalhe, preço justo em cada serviço.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s) => (
            <div
              key={s.name}
              className="group p-6 bg-zinc-800/60 rounded-xl border border-zinc-700/60 hover:border-amber-500/40 hover:bg-zinc-800 transition-all duration-200"
            >
              <div className="text-2xl mb-3">{s.icon}</div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-bold text-white text-base leading-tight">{s.name}</h3>
                <span className="text-amber-400 font-black text-sm whitespace-nowrap">{s.price}</span>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="https://wa.me/5511987654321"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-amber-500 text-zinc-900 font-black text-base rounded-xl hover:bg-amber-400 transition-all transform hover:-translate-y-1"
          >
            Agendar pelo WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
