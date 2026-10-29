import { ICONES } from "./icones";
import type { SiteTransportadora } from "../site";

export default function About({ site }: { site: SiteTransportadora }) {
  const { sobre } = site;
  return (
    <section id="sobre" className="py-24 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Texto */}
          <div>
            <span className="text-orange-500 font-bold tracking-wider uppercase text-sm mb-2 block">{sobre.rotulo}</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6 leading-tight">
              {sobre.titulo.map((linha, i) => (
                <span key={i}>{i > 0 && <br />}{linha}</span>
              ))}
            </h2>
            {sobre.paragrafos.map((paragrafo, i) => (
              <p key={i} className={`text-slate-600 text-lg leading-relaxed ${i === sobre.paragrafos.length - 1 ? "mb-8" : "mb-6"}`}>
                {paragrafo}
              </p>
            ))}

            <div className="flex flex-wrap gap-3">
              {sobre.selos.map((selo, i) => (
                <span
                  key={selo}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border ${i === 0 ? "bg-orange-50 border-orange-200 text-orange-700" : "bg-slate-100 border-slate-200 text-slate-700"}`}
                >
                  {selo}
                </span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            {sobre.numeros.map((stat, idx) => {
              const Icon = ICONES[stat.icone];
              return (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center hover:shadow-md transition-shadow">
                  <Icon className={`w-8 h-8 ${stat.cor} mx-auto mb-4`} />
                  <p className="text-4xl font-extrabold text-slate-900 mb-1">{stat.valor}</p>
                  <p className="text-sm text-slate-500 font-medium">{stat.rotulo}</p>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
