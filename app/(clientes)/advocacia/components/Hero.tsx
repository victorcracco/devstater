import { ArrowRight, Shield, Award } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-slate-950">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/50 z-10" />
        <img
          src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1470&auto=format&fit=crop"
          alt="Escritório de advocacia"
          className="w-full h-full object-cover opacity-40"
        />
      </div>

      {/* Linha dourada decorativa */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-amber-400 to-transparent z-20"></div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-amber-400/40 text-amber-400 text-sm font-medium mb-8 tracking-widest uppercase">
            <Award className="w-4 h-4" /> OAB/SP 123.456
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.15]">
            Seu direito,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">
              defendido com
            </span><br />
            excelência.
          </h1>

          <p className="text-lg text-slate-400 mb-10 max-w-xl leading-relaxed">
            Mais de 18 anos de atuação. Especialistas em direito civil, trabalhista, empresarial e de família. Consulta inicial gratuita e atendimento personalizado.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a href="#contato"
              className="group flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold py-4 px-8 transition-all">
              Consulta Gratuita
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#servicos"
              className="flex items-center justify-center gap-2 border border-slate-600 hover:border-amber-400 text-white hover:text-amber-400 font-semibold py-4 px-8 transition-all">
              Áreas de Atuação
            </a>
          </div>

          <div className="flex flex-wrap gap-8 border-t border-slate-800 pt-8">
            {[
              { value: "18+", label: "Anos de experiência" },
              { value: "1.400+", label: "Casos resolvidos" },
              { value: "98%", label: "Clientes satisfeitos" },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-2xl font-bold text-amber-400">{stat.value}</p>
                <p className="text-sm text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
