import { Truck, Users, Award, TrendingUp } from "lucide-react";

const stats = [
  { icon: Truck, value: '280+', label: 'Veículos na frota', color: 'text-orange-500' },
  { icon: Users, value: '1.200+', label: 'Clientes ativos', color: 'text-blue-500' },
  { icon: Award, value: '15+', label: 'Anos de mercado', color: 'text-emerald-500' },
  { icon: TrendingUp, value: '98,5%', label: 'Entregas no prazo', color: 'text-violet-500' },
];

export default function About() {
  return (
    <section id="sobre" className="py-24 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Texto */}
          <div>
            <span className="text-orange-500 font-bold tracking-wider uppercase text-sm mb-2 block">Sobre a NovaVia</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6 leading-tight">
              Mais de uma década<br />movendo o Brasil
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              Nascemos em 2009 com uma frota de 12 caminhões e um propósito simples: entregar mais do que mercadorias — entregar confiança. Hoje operamos em todos os estados brasileiros com uma das frotas mais modernas e rastreadas do setor.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              Nosso modelo de operação integra tecnologia de ponta com atendimento humanizado. Cada cliente tem um executivo de contas dedicado, e cada carga é monitorada em tempo real pela nossa Torre de Controle 24/7.
            </p>

            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-orange-50 border border-orange-200 text-orange-700 rounded-full text-sm font-semibold">ISO 9001 Certificada</span>
              <span className="px-4 py-2 bg-slate-100 border border-slate-200 text-slate-700 rounded-full text-sm font-semibold">ANTT Habilitada</span>
              <span className="px-4 py-2 bg-slate-100 border border-slate-200 text-slate-700 rounded-full text-sm font-semibold">Frota Rastreada</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center hover:shadow-md transition-shadow">
                  <Icon className={`w-8 h-8 ${stat.color} mx-auto mb-4`} />
                  <p className="text-4xl font-extrabold text-slate-900 mb-1">{stat.value}</p>
                  <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
