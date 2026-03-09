import { ShieldCheck, MapPin, Clock4, Headset } from "lucide-react";

const differentials = [
  { icon: MapPin, title: 'Torre de Controle 24/7', desc: 'Monitoramento de frota em tempo real via satélite, com rotas geocercadas.' },
  { icon: ShieldCheck, title: 'Gerenciamento de Risco', desc: 'Apólices robustas de seguro (RCTR-C e RCF-DC) cobrindo 100% do sinistro.' },
  { icon: Clock4, title: 'Pontualidade Extrema', desc: 'Índice de On-Time Delivery (OTD) superior a 98,5% no último ano.' },
  { icon: Headset, title: 'Atendimento Exclusivo', desc: 'Um executivo de contas dedicado para a sua operação, sem robôs no caminho.' },
];

export default function Differentials() {
  return (
    <section id="diferenciais" className="py-24 px-6 md:px-12 lg:px-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Elemento de design no fundo */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        
        {/* Texto de Impacto */}
        <div className="lg:col-span-5">
          <span className="text-orange-500 font-bold tracking-wider uppercase text-sm mb-2 block">Diferenciais</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Não movimentamos caixas.<br/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
              Entregamos confiança.
            </span>
          </h2>
          <p className="text-slate-400 text-lg mb-8 leading-relaxed">
            Nossa infraestrutura foi desenhada para eliminar gargalos. Investimos pesado em tecnologia e renovação de frota para que você foque apenas em vender, enquanto nós garantimos a entrega.
          </p>
          
          <div className="flex gap-8 border-t border-slate-800 pt-8">
            <div>
              <p className="text-3xl font-bold text-white mb-1">15+</p>
              <p className="text-sm text-slate-500 font-medium">Anos de Mercado</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-orange-500 mb-1">98%</p>
              <p className="text-sm text-slate-500 font-medium">Entregas no Prazo</p>
            </div>
          </div>
        </div>

        {/* Grid de Ícones */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {differentials.map((diff, idx) => {
            const Icon = diff.icon;
            return (
              <div key={idx} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-8 rounded-2xl hover:bg-slate-800 transition-colors">
                <Icon className="w-8 h-8 text-orange-500 mb-5" />
                <h4 className="text-xl font-bold text-white mb-3">{diff.title}</h4>
                <p className="text-slate-400 leading-relaxed">{diff.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}