import { ICONES } from "./icones";
import type { SiteTransportadora } from "../site";

export default function Services({ site }: { site: SiteTransportadora }) {
  const { servicos } = site;
  return (
    <section id="servicos" className="py-24 px-6 md:px-12 lg:px-24 bg-slate-50">
      <div className="max-w-7xl mx-auto">

        {/* Header da Seção */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-orange-500 font-bold tracking-wider uppercase text-sm mb-2 block">{servicos.rotulo}</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">{servicos.titulo}</h2>
          </div>
          <p className="text-slate-600 max-w-md text-lg">
            {servicos.subtitulo}
          </p>
        </div>

        {/* Grid de Serviços */}
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${servicos.tiposCarga ? "mb-20" : ""}`}>
          {servicos.itens.map((service, idx) => {
            const Icon = ICONES[service.icone];
            return (
              <div key={idx} className="group bg-white p-10 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 rounded-xl bg-orange-50 flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors duration-300">
                  <Icon className="w-7 h-7 text-orange-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.titulo}</h3>
                <p className="text-slate-600 leading-relaxed">{service.descricao}</p>
              </div>
            );
          })}
        </div>

        {/* Tipos de Carga - Design Premium */}
        {servicos.tiposCarga && (
          <div className="bg-white p-10 md:p-14 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">{servicos.tiposCarga.titulo}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {servicos.tiposCarga.itens.map((type, idx) => {
                const TypeIcon = ICONES[type.icone];
                return (
                  <div key={idx} className={`${type.fundo} flex flex-col items-center justify-center p-6 rounded-2xl transition-transform hover:scale-105 cursor-default`}>
                    <TypeIcon className={`w-10 h-10 ${type.cor} mb-3`} />
                    <span className="font-semibold text-slate-800 text-center">{type.nome}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
