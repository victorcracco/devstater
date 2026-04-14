import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Roberto Almeida",
    context: "Processo Trabalhista",
    text: "Fui demitido sem justa causa e recebi menos do que tinha direito. O escritório entrou com a ação e recuperei tudo que me deviam, mais danos morais. Profissionais excepcionais.",
    initials: "RA",
  },
  {
    name: "Construtora Horizonte",
    context: "Direito Empresarial",
    text: "Terceirizamos todo o nosso jurídico para o escritório. Contratos, disputas com fornecedores, questões tributárias — tudo resolvido com agilidade e total segurança.",
    initials: "CH",
  },
  {
    name: "Fernanda Dias",
    context: "Divórcio e Guarda",
    text: "Um momento muito difícil da minha vida foi conduzido com toda a sensibilidade e competência. Saí do processo com a guarda dos meus filhos e pensão justa. Gratidão eterna.",
    initials: "FD",
  },
];

export default function Testimonials() {
  return (
    <section id="depoimentos" className="py-24 px-6 md:px-12 lg:px-24 bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-amber-400 font-bold tracking-widest uppercase text-sm mb-2 block">Depoimentos</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            O que nossos<br />clientes dizem
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-slate-800/50 border border-slate-700/50 p-8 rounded-sm hover:border-amber-400/30 transition-all flex flex-col gap-6">
              <Quote className="w-8 h-8 text-amber-400/40" />
              <p className="text-slate-300 leading-relaxed flex-grow">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3 border-t border-slate-700 pt-6">
                <div className="w-10 h-10 bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400 font-bold text-sm flex-shrink-0">
                  {t.initials}
                </div>
                <div>
                  <p className="font-bold text-white text-sm">{t.name}</p>
                  <p className="text-xs text-amber-400/70">{t.context}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
