import { PhoneCall, Mail } from "lucide-react";

export default function ContactCTA() {
  return (
    <section id="cotacao" className="py-24 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-5xl mx-auto bg-gradient-to-br from-blue-900 to-slate-900 rounded-3xl p-10 md:p-16 text-center shadow-2xl relative overflow-hidden">
        
        {/* Efeito visual no fundo do banner */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        
        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Pronto para otimizar sua logística?
          </h2>
          <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Fale com nossos especialistas agora mesmo. Dimensionamos a melhor solução de transporte para o seu negócio em poucos minutos.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            {/* Botão que chama o WhatsApp ou Telefone */}
            <a 
              href="https://wa.me/5511999999999" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white text-lg font-bold py-4 px-8 rounded-full transition-transform hover:scale-105 shadow-lg shadow-orange-500/30 w-full sm:w-auto justify-center"
            >
              <PhoneCall className="w-6 h-6" />
              Falar com Comercial
            </a>
            
            <a 
              href="mailto:comercial@novavia.com.br"
              className="flex items-center gap-3 bg-transparent border border-blue-400/30 hover:bg-white/10 text-white text-lg font-medium py-4 px-8 rounded-full transition-colors w-full sm:w-auto justify-center"
            >
              <Mail className="w-6 h-6" />
              comercial@novavia.com.br
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}