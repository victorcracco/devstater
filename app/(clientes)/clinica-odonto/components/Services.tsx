import { Smile, Sparkles, Zap, Shield, AlignCenter, Microscope } from "lucide-react";

const services = [
  {
    icon: AlignCenter,
    title: "Ortodontia",
    desc: "Aparelhos fixos, móveis e invisíveis (alinhadores). Corrija o alinhamento dos dentes com conforto e eficiência.",
    color: "text-sky-600",
    bg: "bg-sky-50",
    hover: "group-hover:bg-sky-500",
  },
  {
    icon: Sparkles,
    title: "Clareamento Dental",
    desc: "Clareamento a laser e com moldeiras personalizadas. Dentes até 8 tons mais claros em poucos dias.",
    color: "text-cyan-600",
    bg: "bg-cyan-50",
    hover: "group-hover:bg-cyan-500",
  },
  {
    icon: Zap,
    title: "Implantes Dentários",
    desc: "Reponha dentes perdidos de forma natural e definitiva. Tecnologia suíça com garantia de osseointegração.",
    color: "text-blue-600",
    bg: "bg-blue-50",
    hover: "group-hover:bg-blue-500",
  },
  {
    icon: Smile,
    title: "Facetas e Lentes",
    desc: "Transforme seu sorriso em até 2 consultas com facetas de porcelana ultrafinas e naturais.",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    hover: "group-hover:bg-indigo-500",
  },
  {
    icon: Shield,
    title: "Odontopediatria",
    desc: "Atendimento especializado para crianças. Ambiente lúdico e profissionais treinados para cuidar dos pequenos.",
    color: "text-violet-600",
    bg: "bg-violet-50",
    hover: "group-hover:bg-violet-500",
  },
  {
    icon: Microscope,
    title: "Periodontia",
    desc: "Tratamento de gengiva e estruturas de suporte dos dentes. Prevenção e controle da doença periodontal.",
    color: "text-teal-600",
    bg: "bg-teal-50",
    hover: "group-hover:bg-teal-500",
  },
];

export default function Services() {
  return (
    <section id="servicos" className="py-24 px-6 md:px-12 lg:px-24 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sky-600 font-bold tracking-wider uppercase text-sm mb-2 block">Tratamentos</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            Cuidamos de tudo<br />do seu sorriso
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Tecnologia de ponta para cada especialidade. Do primeiro dente da criança ao sorriso dos sonhos do adulto.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="group bg-white p-8 rounded-2xl border border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className={`w-14 h-14 rounded-xl ${s.bg} flex items-center justify-center mb-6 ${s.hover} transition-colors duration-300`}>
                  <Icon className={`w-7 h-7 ${s.color} group-hover:text-white transition-colors duration-300`} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{s.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
