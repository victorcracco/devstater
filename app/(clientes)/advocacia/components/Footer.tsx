import { Scale, Mail, Phone, MapPin, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 px-6 md:px-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Scale className="w-6 h-6 text-amber-400" />
            <span className="text-lg font-bold text-white tracking-tight">Ferreira <span className="text-amber-400">&</span> Associados</span>
          </div>
          <p className="text-sm text-slate-500 leading-relaxed">
            Escritório de advocacia com 18 anos de tradição, ética e resultados comprovados.
          </p>
          <div className="flex gap-3 pt-2">
            <a href="#" className="w-9 h-9 border border-slate-700 hover:border-amber-400 hover:text-amber-400 flex items-center justify-center transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6 tracking-wide">Áreas de Atuação</h4>
          <ul className="space-y-3 text-sm">
            {["Direito Civil", "Direito Trabalhista", "Direito Empresarial", "Direito de Família", "Direito Imobiliário", "Direito do Consumidor"].map(a => (
              <li key={a}><a href="#servicos" className="hover:text-amber-400 transition-colors">{a}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6 tracking-wide">Contato</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-amber-400/60" /> (11) 3000-0000</li>
            <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-amber-400/60" /> contato@ferreiraeassociados.adv.br</li>
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-amber-400/60 shrink-0 mt-0.5" />
              <span>Av. Paulista, 1000 — 12º andar<br />São Paulo, SP — 01310-100</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6 tracking-wide">Horário</h4>
          <ul className="space-y-2 text-sm">
            <li className="text-slate-500">Segunda a Sexta</li>
            <li className="text-white font-medium">09h00 – 18h00</li>
            <li className="mt-3 text-slate-500">Atendimentos</li>
            <li className="text-white font-medium">Presencial e Online</li>
          </ul>
          <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer"
            className="mt-6 inline-block border border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-slate-900 px-5 py-2.5 text-sm font-semibold transition-all">
            Consulta gratuita
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
        <span>© {new Date().getFullYear()} Ferreira & Associados Advocacia. OAB/SP 123.456.</span>
        <span>Todos os direitos reservados.</span>
      </div>
    </footer>
  );
}
