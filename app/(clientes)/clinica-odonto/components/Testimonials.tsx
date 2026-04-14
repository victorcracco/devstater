import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ana Paula R.",
    treatment: "Facetas de Porcelana",
    text: "Fiz as facetas e não me reconheci no espelho de tão bonito que ficou! O Dr. me explicou cada etapa, me deixou super segura. Resultado incrível.",
    rating: 5,
    color: "from-sky-400 to-blue-500",
  },
  {
    name: "Marcos Vinícius S.",
    treatment: "Implante Dentário",
    text: "Tinha medo de implante mas foi totalmente indolor. Hoje nem me lembro que tenho implante — parece dente natural mesmo. Recomendo demais!",
    rating: 5,
    color: "from-cyan-400 to-sky-500",
  },
  {
    name: "Juliana C.",
    treatment: "Ortodontia com Alinhadores",
    text: "Escolhi o alinhador invisível por causa do trabalho. Em 8 meses meu sorriso estava perfeito e ninguém percebeu que estava usando. Melhor investimento.",
    rating: 5,
    color: "from-indigo-400 to-blue-500",
  },
];

export default function Testimonials() {
  return (
    <section id="depoimentos" className="py-24 px-6 md:px-12 lg:px-24 bg-sky-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sky-600 font-bold tracking-wider uppercase text-sm mb-2 block">Depoimentos</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            Sorrisos que falam<br />por si mesmos
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-8 shadow-sm border border-sky-100 hover:shadow-lg transition-shadow flex flex-col gap-5">
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-slate-600 leading-relaxed flex-grow">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3 border-t border-slate-100 pt-5">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{t.name}</p>
                  <p className="text-xs text-sky-600 font-medium">{t.treatment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
