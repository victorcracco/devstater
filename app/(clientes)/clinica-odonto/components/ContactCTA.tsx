import { PhoneCall, Mail, MapPin, Clock } from "lucide-react";

export default function ContactCTA() {
  return (
    <section id="contato" className="py-24 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-5xl mx-auto bg-gradient-to-br from-sky-600 to-blue-700 rounded-3xl p-10 md:p-16 text-center shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Agende sua consulta gratuita
          </h2>
          <p className="text-sky-100 text-lg mb-10 max-w-2xl mx-auto">
            Sem compromisso. Venha conhecer a clínica, conversar com nossos especialistas e descobrir o tratamento ideal para o seu sorriso.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-10">
            <a href="https://wa.me/5514998469800?text=Olá!%20Gostaria%20de%20agendar%20uma%20consulta."
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white text-sky-600 text-lg font-bold py-4 px-8 rounded-full hover:bg-sky-50 transition-all w-full sm:w-auto justify-center shadow-lg">
              <PhoneCall className="w-6 h-6" />
              Agendar pelo WhatsApp
            </a>
            <a href="mailto:contato@sorrisopleno.com.br"
              className="flex items-center gap-3 bg-transparent border border-white/30 hover:bg-white/10 text-white text-lg font-medium py-4 px-8 rounded-full transition-all w-full sm:w-auto justify-center">
              <Mail className="w-6 h-6" />
              contato@sorrisopleno.com.br
            </a>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-6 text-sky-200 text-sm">
            <div className="flex items-center gap-2 justify-center">
              <MapPin className="w-4 h-4" />
              <span>Rua das Flores, 245 — Centro</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <Clock className="w-4 h-4" />
              <span>Seg–Sex 8h–19h · Sáb 8h–13h</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
