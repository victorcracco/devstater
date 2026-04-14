const testimonials = [
  {
    name: 'Ricardo Fonseca',
    role: 'Diretor de Operações',
    company: 'Grupo Fonseca Alimentos',
    text: 'Parceria de 4 anos e nunca nos decepcionaram. A torre de controle 24h faz toda diferença — qualquer problema na rota, já sabemos antes do nosso cliente.',
    rating: 5,
  },
  {
    name: 'Juliana Marques',
    role: 'Gerente de Supply Chain',
    company: 'TechParts Indústria',
    text: 'Migramos toda nossa operação de distribuição para a NovaVia e o índice de atrasos caiu de 12% para menos de 2%. Os números falam por si.',
    rating: 5,
  },
  {
    name: 'Carlos Henrique Souza',
    role: 'CEO',
    company: 'Distribuidora Sul Atacado',
    text: 'O executivo de contas dedicado é o maior diferencial. Tenho uma pessoa real que conhece minha operação, não fico esperando em fila de SAC.',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="depoimentos" className="py-24 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-orange-500 font-bold tracking-wider uppercase text-sm mb-2 block">Depoimentos</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            Quem confia na NovaVia
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-8 flex flex-col gap-6 hover:shadow-lg transition-shadow">
              {/* Estrelas */}
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Texto */}
              <p className="text-slate-600 leading-relaxed flex-grow">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Autor */}
              <div className="flex items-center gap-4 border-t border-slate-200 pt-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role} · {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
