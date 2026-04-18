export default function ContactInfo() {
  return (
    <section id="contato" className="py-20 bg-rose-50/40">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">Venha nos visitar</h2>
          <p className="text-slate-500">Estamos esperando por você. Agende com antecedência!</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5 mb-10">
          <div className="p-6 bg-white rounded-xl border border-rose-100 text-center shadow-sm">
            <div className="text-3xl mb-3">📍</div>
            <h3 className="font-bold text-slate-900 mb-2">Endereço</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Av. das Flores, 310<br />Jardins — São Paulo, SP</p>
          </div>
          <div className="p-6 bg-white rounded-xl border border-rose-100 text-center shadow-sm">
            <div className="text-3xl mb-3">🕐</div>
            <h3 className="font-bold text-slate-900 mb-2">Horários</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Ter a Sáb: 9h às 19h<br />Dom e Seg: Fechado</p>
          </div>
          <div className="p-6 bg-white rounded-xl border border-rose-100 text-center shadow-sm">
            <div className="text-3xl mb-3">📱</div>
            <h3 className="font-bold text-slate-900 mb-2">Contato</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-3">(11) 91234-5678<br />@studioluma</p>
            <a
              href="https://wa.me/5511912345678"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-rose-500 text-white font-bold text-xs rounded-lg hover:bg-rose-600 transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>

        <div className="text-center">
          <a
            href="https://wa.me/5511912345678"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 bg-rose-500 text-white font-black text-lg rounded-2xl hover:bg-rose-600 transition-all transform hover:-translate-y-1 shadow-xl shadow-rose-300/30"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.555 4.116 1.523 5.84L.057 23.881a.5.5 0 0 0 .615.601l6.098-1.598A11.948 11.948 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.88 0-3.651-.517-5.167-1.416l-.371-.22-3.843 1.007 1.026-3.754-.241-.386A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            Agendar agora
          </a>
        </div>
      </div>
    </section>
  );
}
