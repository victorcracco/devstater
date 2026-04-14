import { CheckCircle } from "lucide-react";

const valores = [
  "Ética e transparência em cada etapa do processo",
  "Estratégia jurídica personalizada para cada cliente",
  "Comunicação clara, sem juridiquês",
  "Atualização constante sobre a legislação vigente",
  "Sigilo absoluto e confidencialidade garantida",
  "Resultados mensuráveis e prestação de contas",
];

export default function About() {
  return (
    <section id="sobre" className="py-24 px-6 md:px-12 lg:px-24 bg-slate-950">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Texto */}
        <div>
          <span className="text-amber-400 font-bold tracking-widest uppercase text-sm mb-2 block">O Escritório</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6 leading-tight">
            Tradição, ética<br />e resultados
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-6">
            Fundado em 2006, o escritório Ferreira & Associados construiu sua reputação na defesa intransigente dos direitos de nossos clientes. Atuamos em todo o território nacional com uma equipe de advogados especialistas em suas respectivas áreas.
          </p>
          <p className="text-slate-400 leading-relaxed mb-8">
            Acreditamos que cada caso é único. Por isso, dedicamos atenção individual a cada cliente, elaborando estratégias jurídicas sob medida para maximizar as chances de êxito.
          </p>

          <ul className="space-y-3">
            {valores.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-300">
                <CheckCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Imagem + stats */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1469&auto=format&fit=crop"
            alt="Ferreira e Associados"
            className="rounded-sm w-full object-cover h-[480px] brightness-75"
          />
          <div className="absolute inset-0 border border-amber-400/20 rounded-sm pointer-events-none"></div>

          <div className="absolute bottom-0 left-0 right-0 bg-slate-950/90 backdrop-blur p-6 grid grid-cols-3 gap-4">
            {[
              { value: "18+", label: "Anos" },
              { value: "1.4k+", label: "Casos" },
              { value: "8", label: "Especialistas" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl font-extrabold text-amber-400">{s.value}</p>
                <p className="text-xs text-slate-500 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
