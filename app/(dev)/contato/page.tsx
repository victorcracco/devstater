import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com a DevStarter. Orçamento rápido via WhatsApp ou E-mail.",
};

export default function Contato() {
  return (
    <section className="py-24 bg-white relative overflow-hidden min-h-[85vh] flex items-center">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl pointer-events-none opacity-60"></div>
      
      <div className="max-w-4xl mx-auto px-4 relative z-10 w-full">
        <div className="text-center mb-16">
           <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Vamos tirar sua ideia <br/>
            <span className="text-blue-600">do papel?</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Sem burocracia. Escolha o canal abaixo e fale diretamente com nosso time técnico.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* WhatsApp - ATUALIZADO */}
          <a href="https://wa.me/5514998469800" target="_blank" rel="noopener noreferrer"
            className="group flex flex-col items-center p-10 bg-white border border-slate-200 rounded-3xl hover:border-green-400 transition-all duration-300 hover:shadow-xl hover:shadow-green-100/50 text-center">
            <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform text-green-600">💬</div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">WhatsApp</h2>
            <p className="text-slate-600 mb-6">Resposta rápida para orçamentos.</p>
            <span className="py-2 px-6 bg-green-50 text-green-700 font-bold rounded-full group-hover:bg-green-500 group-hover:text-white transition-all">
              (14) 99846-9800
            </span>
          </a>

          {/* E-mail */}
          <a href="mailto:contato@devstarter.com.br" 
            className="group flex flex-col items-center p-10 bg-white border border-slate-200 rounded-3xl hover:border-blue-400 transition-all duration-300 hover:shadow-xl hover:shadow-blue-100/50 text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform text-blue-600">✉️</div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">E-mail</h2>
            <p className="text-slate-600 mb-6">Envie os detalhes do projeto.</p>
             <span className="text-lg font-bold text-blue-600 border-b-2 border-blue-100 group-hover:border-blue-500 transition-all">contato@devstarter.com.br</span>
          </a>
        </div>
      </div>
    </section>
  );
}