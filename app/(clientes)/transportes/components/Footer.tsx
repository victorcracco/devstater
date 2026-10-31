import { Mail, Phone, MapPin } from "lucide-react";
import { ICONES } from "./icones";
import type { SiteTransportadora } from "../site";

export default function Footer({ site }: { site: SiteTransportadora }) {
  const { contato, rodape } = site;
  const Logo = ICONES[site.icone];
  return (
    <footer className="bg-slate-950 text-slate-300 py-16 px-6 md:px-12 border-t border-white/10">
      <div className={`max-w-7xl mx-auto grid grid-cols-1 gap-12 ${rodape.newsletter ? "md:grid-cols-4" : "md:grid-cols-3"}`}>
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-6">
            <Logo className="w-8 h-8 text-orange-500 shrink-0" />
            <span className="text-2xl font-bold tracking-tighter text-white">
              {site.marca.texto}<span className="text-orange-500">{site.marca.destaque}</span>
            </span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            {rodape.descricao}
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">Links Rápidos</h4>
          <ul className="space-y-3 text-sm">
            {rodape.links.map((link) => (
              <li key={link.nome}><a href={link.href} className="hover:text-orange-400 transition-colors">{link.nome}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">Contato</h4>
          <ul className="space-y-4 text-sm">
            {contato.telefone && (
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-orange-500" /> {contato.telefone}
              </li>
            )}
            {contato.email && (
              <li className="flex items-center gap-3 break-all">
                <Mail className="w-4 h-4 text-orange-500 shrink-0" /> {contato.email}
              </li>
            )}
            {contato.endereco && (
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-1" />
                <span>
                  {contato.endereco.map((linha, i) => (
                    <span key={i}>{i > 0 && <br/>}{linha}</span>
                  ))}
                </span>
              </li>
            )}
          </ul>
        </div>

        {rodape.newsletter && (
          <div>
            <h4 className="text-white font-semibold mb-6">Newsletter</h4>
            <p className="text-sm text-slate-400 mb-4">Receba novidades e cotações especiais no seu email.</p>
            <div className="flex">
              <input type="email" placeholder="Seu email" className="bg-slate-900 border border-slate-800 text-white px-4 py-2 w-full rounded-l-md outline-none focus:border-orange-500" />
              <button className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-r-md transition-colors text-slate-950 font-medium">
                Assinar
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} {site.nomeCompleto}. Todos os direitos reservados.
        {contato.cnpj && <span className="block mt-1">CNPJ {contato.cnpj}</span>}
        {contato.registro && <span className="block mt-1">{contato.registro}</span>}
      </div>
    </footer>
  );
}
