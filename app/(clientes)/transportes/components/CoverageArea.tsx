import { Fragment } from "react";
import { linkContato, type SiteTransportadora } from "../site";

export default function CoverageArea({ site }: { site: SiteTransportadora }) {
  const { cobertura } = site;
  const linkConsulta = linkContato(site.contato, cobertura.consulta.mensagem);
  const linkColeta = linkContato(site.contato);
  return (
    <section id="cobertura" className="py-24 px-6 md:px-12 lg:px-24 bg-slate-50">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-orange-500 font-bold tracking-wider uppercase text-sm mb-2 block">{cobertura.rotulo}</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
              {cobertura.titulo}
            </h2>
          </div>
          <p className="text-slate-600 max-w-md text-lg">
            {cobertura.subtitulo}
          </p>
        </div>

        {/* Grid de regiões */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {cobertura.regioes.map((region, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-2xl border transition-all hover:shadow-lg ${
                region.destaque
                  ? 'bg-slate-900 border-slate-700 text-white'
                  : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className={`text-xl font-bold ${region.destaque ? 'text-white' : 'text-slate-900'}`}>
                  {region.nome}
                </h3>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${region.corSelo}`}>
                  {region.selo}
                </span>
              </div>
              <ul className="space-y-2">
                {region.itens.map((state, i) => (
                  <li key={i} className={`flex items-center gap-2 text-sm ${region.destaque ? 'text-slate-300' : 'text-slate-600'}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0"></span>
                    {state}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Card de contato */}
          <div className="p-8 rounded-2xl border-2 border-dashed border-orange-300 bg-orange-50 flex flex-col items-center justify-center text-center gap-4">
            <span className="text-4xl">📍</span>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">{cobertura.consulta.titulo}</h3>
              <p className="text-sm text-slate-600">{cobertura.consulta.texto}</p>
            </div>
            {linkConsulta && (
              <a
                href={linkConsulta}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors text-sm"
              >
                {cobertura.consulta.rotulo}
              </a>
            )}
          </div>
        </div>

        {/* Banner de destaque */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {cobertura.destaques.map((destaque, i) => (
            <Fragment key={destaque.rotulo}>
              {i > 0 && <div className="h-px md:h-12 w-full md:w-px bg-slate-700 flex-shrink-0"></div>}
              <div>
                <p className="text-sm text-slate-400 mb-1 font-medium uppercase tracking-wide">{destaque.rotulo}</p>
                <p className="text-2xl font-bold">{destaque.valor}</p>
              </div>
            </Fragment>
          ))}
          {linkColeta && (
            <>
              <div className="h-px md:h-12 w-full md:w-px bg-slate-700 flex-shrink-0"></div>
              <a
                href={linkColeta}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors whitespace-nowrap flex-shrink-0"
              >
                {cobertura.ctaDestaques}
              </a>
            </>
          )}
        </div>

      </div>
    </section>
  );
}
