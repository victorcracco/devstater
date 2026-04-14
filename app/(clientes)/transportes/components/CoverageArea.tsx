const regions = [
  {
    name: 'Sudeste',
    states: ['São Paulo', 'Rio de Janeiro', 'Minas Gerais', 'Espírito Santo'],
    badge: 'Hub Principal',
    badgeColor: 'bg-orange-100 text-orange-700',
    highlight: true,
  },
  {
    name: 'Sul',
    states: ['Paraná', 'Santa Catarina', 'Rio Grande do Sul'],
    badge: 'Cobertura Total',
    badgeColor: 'bg-emerald-100 text-emerald-700',
    highlight: false,
  },
  {
    name: 'Centro-Oeste',
    states: ['Mato Grosso', 'Mato Grosso do Sul', 'Goiás', 'Distrito Federal'],
    badge: 'Rota Agro',
    badgeColor: 'bg-yellow-100 text-yellow-700',
    highlight: false,
  },
  {
    name: 'Nordeste',
    states: ['Bahia', 'Pernambuco', 'Ceará', 'Maranhão', '+5 estados'],
    badge: 'Expansão 2024',
    badgeColor: 'bg-blue-100 text-blue-700',
    highlight: false,
  },
  {
    name: 'Norte',
    states: ['Pará', 'Amazonas', 'Rondônia', 'Tocantins'],
    badge: 'Parceiros locais',
    badgeColor: 'bg-violet-100 text-violet-700',
    highlight: false,
  },
];

export default function CoverageArea() {
  return (
    <section id="cobertura" className="py-24 px-6 md:px-12 lg:px-24 bg-slate-50">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-orange-500 font-bold tracking-wider uppercase text-sm mb-2 block">Área de Atuação</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
              Cobertura nacional
            </h2>
          </div>
          <p className="text-slate-600 max-w-md text-lg">
            Operamos em todos os 26 estados e no Distrito Federal, com hubs estratégicos no Sudeste e Sul do país.
          </p>
        </div>

        {/* Grid de regiões */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {regions.map((region, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-2xl border transition-all hover:shadow-lg ${
                region.highlight
                  ? 'bg-slate-900 border-slate-700 text-white'
                  : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className={`text-xl font-bold ${region.highlight ? 'text-white' : 'text-slate-900'}`}>
                  {region.name}
                </h3>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${region.badgeColor}`}>
                  {region.badge}
                </span>
              </div>
              <ul className="space-y-2">
                {region.states.map((state, i) => (
                  <li key={i} className={`flex items-center gap-2 text-sm ${region.highlight ? 'text-slate-300' : 'text-slate-600'}`}>
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
              <h3 className="text-lg font-bold text-slate-900 mb-1">Sua rota não está aqui?</h3>
              <p className="text-sm text-slate-600">Consulte nossa equipe. Operamos rotas especiais com parceiros homologados.</p>
            </div>
            <a
              href="https://wa.me/5514998469800?text=Olá,%20gostaria%20de%20consultar%20uma%20rota%20específica."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors text-sm"
            >
              Consultar rota
            </a>
          </div>
        </div>

        {/* Banner de destaque */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-sm text-slate-400 mb-1 font-medium uppercase tracking-wide">Tempo médio de coleta</p>
            <p className="text-2xl font-bold">Até 24h após confirmação do pedido</p>
          </div>
          <div className="h-px md:h-12 w-full md:w-px bg-slate-700 flex-shrink-0"></div>
          <div>
            <p className="text-sm text-slate-400 mb-1 font-medium uppercase tracking-wide">Rastreamento</p>
            <p className="text-2xl font-bold">Tempo real via portal ou app</p>
          </div>
          <div className="h-px md:h-12 w-full md:w-px bg-slate-700 flex-shrink-0"></div>
          <a
            href="https://wa.me/5514998469800"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors whitespace-nowrap flex-shrink-0"
          >
            Solicitar coleta
          </a>
        </div>

      </div>
    </section>
  );
}
