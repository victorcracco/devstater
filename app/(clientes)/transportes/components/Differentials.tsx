import { ICONES } from "./icones";
import type { SiteTransportadora } from "../site";

export default function Differentials({ site }: { site: SiteTransportadora }) {
  const { diferenciais } = site;
  return (
    <section id="diferenciais" className="py-24 px-6 md:px-12 lg:px-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Elemento de design no fundo */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">

        {/* Texto de Impacto */}
        <div className="lg:col-span-5">
          <span className="text-orange-500 font-bold tracking-wider uppercase text-sm mb-2 block">{diferenciais.rotulo}</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {diferenciais.titulo}<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
              {diferenciais.destaque}
            </span>
          </h2>
          <p className="text-slate-400 text-lg mb-8 leading-relaxed">
            {diferenciais.texto}
          </p>

          <div className="flex gap-8 border-t border-slate-800 pt-8">
            {diferenciais.numeros.map((numero, i) => (
              <div key={numero.rotulo}>
                <p className={`text-3xl font-bold mb-1 ${i === 0 ? "text-white" : "text-orange-500"}`}>{numero.valor}</p>
                <p className="text-sm text-slate-500 font-medium">{numero.rotulo}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Grid de Ícones */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {diferenciais.itens.map((diff, idx) => {
            const Icon = ICONES[diff.icone];
            return (
              <div key={idx} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-8 rounded-2xl hover:bg-slate-800 transition-colors">
                <Icon className="w-8 h-8 text-orange-500 mb-5" />
                <h4 className="text-xl font-bold text-white mb-3">{diff.titulo}</h4>
                <p className="text-slate-400 leading-relaxed">{diff.descricao}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
