import { Mail, MapPin, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import { ICONES } from "@/app/(clientes)/transportes/components/icones";
import { linkContato } from "@/lib/prototipos/conteudo";
import { iniciais, linkLigar, linkMapa } from "@/lib/prototipos/utilidades";
import type { PropsModelo } from "./index";

type Acao = { icone: LucideIcon; rotulo: string; detalhe?: string; href: string };

// Para a empresa pequena: uma tela só, feita para o celular, como um cartão de visita
export default function ModeloCartao({ site, dados }: PropsModelo) {
  const { contato, conversao, hero, servicos } = site;
  const secundarias: Acao[] = [
    ...(contato.whatsapp && contato.telefone
      ? [{ icone: Phone, rotulo: "Ligar", detalhe: contato.telefone, href: linkLigar(contato.telefone)! }]
      : []),
    ...(contato.email ? [{ icone: Mail, rotulo: "E-mail", detalhe: contato.email, href: `mailto:${contato.email}` }] : []),
    { icone: MapPin, rotulo: "Como chegar", detalhe: `${dados.cidade}/${dados.uf}`, href: linkMapa(dados) },
  ];
  const principal = linkContato(contato, conversao.mensagem);

  return (
    <main className="min-h-screen bg-slate-200 px-4 py-6 sm:py-12">
      <article className="mx-auto w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-xl">
        <div className="relative h-40">
          <img src={hero.imagem} alt={hero.imagemAlt} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-slate-950/10" />
        </div>

        <div className="px-6 pb-8">
          <div className="relative -mt-10 mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-900 text-2xl font-extrabold text-white ring-4 ring-white">
            {iniciais(dados.nome)}
          </div>
          <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-slate-900">{dados.nome}</h1>
          <p className="mt-1 text-slate-600">{hero.selo}</p>
          {dados.desde && <p className="mt-1 text-sm text-slate-500">Desde {dados.desde}</p>}

          <div className="mt-6 space-y-3">
            {principal && (
              <a
                href={principal}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-4 font-bold text-white transition-colors hover:bg-emerald-800"
              >
                {contato.whatsapp ? <MessageCircle className="h-5 w-5" /> : <Phone className="h-5 w-5" />}
                {contato.whatsapp ? `${conversao.acao} no WhatsApp` : `Ligar e ${conversao.acao.toLowerCase()}`}
              </a>
            )}
            {secundarias.map(({ icone: Icone, rotulo, detalhe, href }) => (
              <a
                key={rotulo}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 transition-colors hover:bg-slate-50"
              >
                <Icone className="h-5 w-5 shrink-0 text-slate-500" />
                <span className="min-w-0">
                  <span className="block text-sm font-bold text-slate-900">{rotulo}</span>
                  {detalhe && <span className="block truncate text-sm text-slate-500">{detalhe}</span>}
                </span>
              </a>
            ))}
          </div>

          <h2 className="mt-8 mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">O que fazemos</h2>
          <ul className="space-y-3">
            {servicos.itens.map((servico) => {
              const Icone = ICONES[servico.icone];
              return (
                <li key={servico.titulo} className="flex items-center gap-3 font-medium text-slate-800">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                    <Icone className="h-5 w-5 text-slate-700" />
                  </span>
                  {servico.titulo}
                </li>
              );
            })}
          </ul>

          {dados.endereco && (
            <p className="mt-8 border-t border-slate-200 pt-5 text-sm leading-relaxed text-slate-500">
              {dados.endereco}
              <br />
              {dados.cidade}, {dados.uf}
              {dados.cep ? ` - ${dados.cep}` : ""}
            </p>
          )}
        </div>
      </article>
      <p className="mt-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {dados.nome}
        {contato.cnpj ? ` · CNPJ ${contato.cnpj}` : ""}
        {contato.registro ? ` · ${contato.registro}` : ""}
      </p>
    </main>
  );
}
