import { ArrowRight, Star, ShieldCheck } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-slate-900">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/85 to-slate-900/40 z-10" />
        <img
          src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=1374&auto=format&fit=crop"
          alt="Clínica odontológica moderna"
          className="w-full h-full object-cover opacity-50"
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 text-sm font-medium mb-6">
            <ShieldCheck className="w-4 h-4" /> Clínica certificada pelo CFO
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
            O sorriso que você<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
              sempre quis
            </span>{" "}está aqui.
          </h1>

          <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed">
            Tratamentos modernos, ambiente acolhedor e profissionais especializados. Do clareamento ao implante, cuidamos do seu sorriso com tecnologia e carinho.
          </p>

          <div className="flex items-center gap-4 mb-10">
            <div className="flex -space-x-2">
              {["bg-sky-400", "bg-cyan-400", "bg-blue-400", "bg-indigo-400"].map((c, i) => (
                <div key={i} className={`w-9 h-9 rounded-full ${c} border-2 border-slate-900 flex items-center justify-center text-white text-xs font-bold`}>
                  {["A","M","C","P"][i]}
                </div>
              ))}
            </div>
            <div>
              <div className="flex gap-0.5 mb-0.5">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
              </div>
              <p className="text-xs text-slate-400">+480 pacientes satisfeitos</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#contato"
              className="group flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold py-4 px-8 rounded-full transition-all">
              Agendar Consulta Gratuita
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#servicos"
              className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-semibold py-4 px-8 rounded-full transition-all">
              Ver Tratamentos
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
