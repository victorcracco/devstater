import { Truck, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 py-16 px-6 md:px-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-6">
            <Truck className="w-8 h-8 text-orange-500" />
            <span className="text-2xl font-bold tracking-tighter text-white">
              Nova<span className="text-orange-500">Via</span>
            </span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Elevando o padrão da logística nacional com tecnologia, segurança e pontualidade. Sua parceira estratégica em transportes.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">Links Rápidos</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#sobre" className="hover:text-orange-400 transition-colors">Sobre a Empresa</a></li>
            <li><a href="#servicos" className="hover:text-orange-400 transition-colors">Nossos Serviços</a></li>
            <li><a href="#frota" className="hover:text-orange-400 transition-colors">Nossa Frota</a></li>
            <li><a href="#rastreio" className="hover:text-orange-400 transition-colors">Rastreamento</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">Contato</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-orange-500" /> (11) 4000-0000
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-orange-500" /> comercial@novavia.com.br
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-1" /> 
              <span>Av. Paulista, 1000<br/>São Paulo, SP - 01310-100</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">Newsletter</h4>
          <p className="text-sm text-slate-400 mb-4">Receba novidades e cotações especiais no seu email.</p>
          <div className="flex">
            <input type="email" placeholder="Seu email" className="bg-slate-900 border border-slate-800 text-white px-4 py-2 w-full rounded-l-md outline-none focus:border-orange-500" />
            <button className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-r-md transition-colors text-white font-medium">
              Assinar
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} NovaVia Logística. Todos os direitos reservados.
      </div>
    </footer>
  );
}