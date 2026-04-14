import { Users, Briefcase, Home, Heart, Building, FileText } from "lucide-react";

const areas = [
  {
    icon: Users,
    title: "Direito Civil",
    desc: "Contratos, responsabilidade civil, indenizações, cobranças e demais questões entre pessoas físicas e jurídicas.",
    tag: "Mais procurado",
  },
  {
    icon: Briefcase,
    title: "Direito Trabalhista",
    desc: "Defesa de empregadores e empregados. Rescisões, horas extras, assédio, reconhecimento de vínculo e muito mais.",
    tag: null,
  },
  {
    icon: Building,
    title: "Direito Empresarial",
    desc: "Abertura e encerramento de empresas, contratos societários, fusões, aquisições e proteção do seu negócio.",
    tag: null,
  },
  {
    icon: Heart,
    title: "Direito de Família",
    desc: "Divórcios, pensão alimentícia, guarda de filhos, inventários e partilha de bens com sensibilidade e eficiência.",
    tag: null,
  },
  {
    icon: Home,
    title: "Direito Imobiliário",
    desc: "Compra, venda e locação de imóveis. Usucapião, regularização de propriedade e resolução de conflitos condominiais.",
    tag: null,
  },
  {
    icon: FileText,
    title: "Direito do Consumidor",
    desc: "Defesa dos seus direitos contra bancos, operadoras, construtoras e demais fornecedores de produtos e serviços.",
    tag: null,
  },
];

export default function Services() {
  return (
    <section id="servicos" className="py-24 px-6 md:px-12 lg:px-24 bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-amber-400 font-bold tracking-widest uppercase text-sm mb-2 block">Áreas de Atuação</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Expertise jurídica<br />em cada área
            </h2>
          </div>
          <p className="text-slate-400 max-w-md text-lg">
            Atendemos pessoas físicas e jurídicas em todas as esferas do Direito, com estratégia e comprometimento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {areas.map((area, idx) => {
            const Icon = area.icon;
            return (
              <div key={idx} className="group bg-slate-800/50 border border-slate-700/50 p-8 rounded-sm hover:bg-slate-800 hover:border-amber-400/40 transition-all duration-300">
                <div className="flex items-start justify-between mb-6">
                  <Icon className="w-8 h-8 text-amber-400" />
                  {area.tag && (
                    <span className="text-xs font-bold px-3 py-1 bg-amber-400/20 text-amber-400 border border-amber-400/30">
                      {area.tag}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{area.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{area.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
