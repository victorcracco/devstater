import { Smile, Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16 px-6 md:px-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Smile className="w-7 h-7 text-sky-400" />
            <span className="text-xl font-bold text-white">Sorriso<span className="text-sky-400"> Pleno</span></span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Odontologia de alta qualidade com tecnologia moderna, ética e cuidado humanizado.
          </p>
          <div className="flex gap-3 pt-2">
            <a href="#" className="w-9 h-9 bg-slate-800 hover:bg-sky-600 rounded-full flex items-center justify-center transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 bg-slate-800 hover:bg-sky-600 rounded-full flex items-center justify-center transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">Tratamentos</h4>
          <ul className="space-y-3 text-sm">
            {["Ortodontia", "Clareamento", "Implantes", "Facetas", "Odontopediatria", "Periodontia"].map(t => (
              <li key={t}><a href="#servicos" className="hover:text-sky-400 transition-colors">{t}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">Contato</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-sky-400" /> (14) 99846-9800</li>
            <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-sky-400" /> contato@sorrisopleno.com.br</li>
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <span>Rua das Flores, 245<br />Centro — CEP 12345-000</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">Horário</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>Segunda a Sexta</li>
            <li className="text-white font-medium">08h00 – 19h00</li>
            <li className="mt-3">Sábado</li>
            <li className="text-white font-medium">08h00 – 13h00</li>
          </ul>
          <a href="https://wa.me/5514998469800" target="_blank" rel="noopener noreferrer"
            className="mt-6 inline-block bg-sky-500 hover:bg-sky-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors">
            Agendar agora
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10 text-center text-sm text-slate-600">
        © {new Date().getFullYear()} Sorriso Pleno Odontologia. Todos os direitos reservados.
      </div>
    </footer>
  );
}
