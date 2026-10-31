import { ArrowRight, ShieldCheck, Clock } from "lucide-react";
import type { SiteTransportadora } from "../site";

export default function Hero({ site }: { site: SiteTransportadora }) {
  const { hero } = site;
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-slate-950">
      {/* Imagem de Fundo Premium escurecida */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent z-10" />
        <img
          src={hero.imagem}
          alt={hero.imagemAlt}
          className="w-full h-full object-cover opacity-60"
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-orange-400 text-sm font-medium mb-6">
            <ShieldCheck className="w-4 h-4" /> {hero.selo}
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
            {hero.antes} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              {hero.destaque}
            </span> {hero.depois}
          </h1>

          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed">
            {hero.subtitulo}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#cotacao" className="group flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-lg transition-all">
              {hero.ctaPrincipal}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#servicos" className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold py-4 px-8 rounded-lg transition-all">
              <Clock className="w-5 h-5 text-orange-400" /> {hero.ctaSecundario}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
