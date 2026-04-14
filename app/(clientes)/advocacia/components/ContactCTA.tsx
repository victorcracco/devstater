import { PhoneCall, Mail, MapPin, Clock } from "lucide-react";

export default function ContactCTA() {
  return (
    <section id="contato" className="py-24 px-6 md:px-12 lg:px-24 bg-slate-950">
      <div className="max-w-5xl mx-auto border border-amber-400/30 p-10 md:p-16 relative overflow-hidden">
        {/* Linha dourada superior */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>

        <div className="text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Fale com um<br />
            <span className="text-amber-400">advogado agora</span>
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
            Consulta inicial gratuita e sem compromisso. Exponha seu caso e descubra seus direitos.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-10">
            <a href="https://wa.me/5511999999999?text=Olá,%20gostaria%20de%20uma%20consulta%20jurídica."
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 bg-amber-400 hover:bg-amber-500 text-slate-900 text-lg font-bold py-4 px-8 transition-all w-full sm:w-auto justify-center">
              <PhoneCall className="w-6 h-6" />
              Consulta via WhatsApp
            </a>
            <a href="mailto:contato@ferreiraeassociados.adv.br"
              className="flex items-center gap-3 border border-slate-700 hover:border-amber-400/50 text-slate-300 hover:text-amber-400 text-lg font-medium py-4 px-8 transition-all w-full sm:w-auto justify-center">
              <Mail className="w-6 h-6" />
              contato@ferreiraeassociados.adv.br
            </a>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-6 text-slate-500 text-sm">
            <div className="flex items-center gap-2 justify-center">
              <MapPin className="w-4 h-4 text-amber-400/60" />
              <span>Av. Paulista, 1000 — São Paulo, SP</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <Clock className="w-4 h-4 text-amber-400/60" />
              <span>Seg–Sex 9h–18h · Atendimentos presenciais e online</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
