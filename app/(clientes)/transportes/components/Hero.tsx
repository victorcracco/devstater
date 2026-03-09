import { ArrowRight, ShieldCheck, Clock } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-slate-950">
      {/* Imagem de Fundo Premium escurecida */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent z-10" />
        <img 
          src="https://plus.unsplash.com/premium_photo-1661963219843-f1a50a6cfcd3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="Frota de caminhões" 
          className="w-full h-full object-cover opacity-60"
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-orange-400 text-sm font-medium mb-6">
            <ShieldCheck className="w-4 h-4" /> Logística de Alta Performance
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
            Sua carga no <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              destino certo,
            </span> no tempo exato.
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed">
            Especialistas em transporte rodoviário e logística integrada. 
            Mais de 10 mil entregas realizadas com segurança, tecnologia e rastreamento em tempo real.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#cotacao" className="group flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-lg transition-all">
              Solicitar Orçamento
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#servicos" className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold py-4 px-8 rounded-lg transition-all">
              <Clock className="w-5 h-5 text-orange-400" /> Nossas Soluções
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}