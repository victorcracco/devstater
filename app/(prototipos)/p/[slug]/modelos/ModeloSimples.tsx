import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ICONES } from "@/app/(clientes)/transportes/components/icones";
import { linkContato } from "@/lib/prototipos/conteudo";
import { linkLigar, linkMapa } from "@/lib/prototipos/utilidades";
import type { PropsModelo } from "./index";

// Para a empresa pequena já estruturada: uma página clara e tradicional, sem excessos
export default function ModeloSimples({ site, dados }: PropsModelo) {
  const { contato, conversao, hero, servicos, sobre } = site;
  const principal = linkContato(contato, conversao.mensagem);
  const ligar = linkLigar(contato.telefone);

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <header className="border-b border-slate-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <span className="line-clamp-2 min-w-0 font-display text-lg font-bold leading-tight text-[#0B3C5D] md:text-xl">{dados.nome}</span>
          <div className="flex shrink-0 items-center gap-5">
            {ligar && (
              <a href={ligar} className="hidden items-center gap-2 text-sm font-semibold text-slate-700 hover:text-[#0B3C5D] md:flex">
                <Phone className="h-4 w-4" />
                {contato.telefone}
              </a>
            )}
            <a href="#contato" className="rounded-lg bg-[#0B3C5D] px-4 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90">
              Fale conosco
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-12 md:grid-cols-2 md:py-20">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-wider text-[#0B3C5D]">{hero.selo}</p>
            <h1 className="mb-5 font-display text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
              {hero.antes} {hero.destaque} {hero.depois}
            </h1>
            <p className="mb-8 max-w-lg text-lg leading-relaxed text-slate-600">{hero.subtitulo}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              {principal && (
                <a
                  href={principal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-[#0B3C5D] px-6 py-3.5 text-center font-bold text-white transition-opacity hover:opacity-90"
                >
                  {conversao.acao}
                </a>
              )}
              <a href="#servicos" className="rounded-lg border border-slate-300 px-6 py-3.5 text-center font-bold text-slate-800 transition-colors hover:bg-slate-50">
                Ver serviços
              </a>
            </div>
          </div>
          <div className="relative mb-6 md:mb-0">
            <img src={hero.imagem} alt={hero.imagemAlt} className="aspect-[4/3] w-full rounded-2xl object-cover" />
            {dados.desde && (
              <div className="absolute -bottom-5 left-5 rounded-xl bg-white px-5 py-3 shadow-lg">
                <p className="font-display text-2xl font-bold text-[#0B3C5D]">Desde {dados.desde}</p>
                <p className="text-sm text-slate-500">{dados.cidade}/{dados.uf}</p>
              </div>
            )}
          </div>
        </section>

        <section id="servicos" className="bg-slate-50 py-16">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="mb-10 font-display text-3xl font-bold text-slate-900">{servicos.titulo}</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {servicos.itens.map((servico) => {
                const Icone = ICONES[servico.icone];
                return (
                  <div key={servico.titulo}>
                    <Icone className="mb-3 h-7 w-7 text-[#0B3C5D]" />
                    <h3 className="mb-2 text-lg font-bold text-slate-900">{servico.titulo}</h3>
                    <p className="leading-relaxed text-slate-600">{servico.descricao}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-5 font-display text-3xl font-bold text-slate-900">{sobre.rotulo}</h2>
            {sobre.paragrafos.map((paragrafo) => (
              <p key={paragrafo} className="mb-4 text-lg leading-relaxed text-slate-600">{paragrafo}</p>
            ))}
          </div>
        </section>

        <section id="contato" className="bg-[#0B3C5D] py-16 text-white">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-2">
            <div>
              <h2 className="mb-3 font-display text-3xl font-bold">{contato.titulo}</h2>
              <p className="text-lg text-white/80">{contato.texto}</p>
            </div>
            <ul className="space-y-4">
              {contato.whatsapp && (
                <li>
                  <a href={principal} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-semibold hover:underline">
                    <MessageCircle className="h-5 w-5 shrink-0" /> Chamar no WhatsApp
                  </a>
                </li>
              )}
              {ligar && (
                <li>
                  <a href={ligar} className="flex items-center gap-3 font-semibold hover:underline">
                    <Phone className="h-5 w-5 shrink-0" /> {contato.telefone}
                  </a>
                </li>
              )}
              {contato.email && (
                <li>
                  <a href={`mailto:${contato.email}`} className="flex items-center gap-3 break-all font-semibold hover:underline">
                    <Mail className="h-5 w-5 shrink-0" /> {contato.email}
                  </a>
                </li>
              )}
              <li>
                <a href={linkMapa(dados)} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 font-semibold hover:underline">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0" />
                  <span>{contato.endereco?.join(" · ")}</span>
                </a>
              </li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="px-6 py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} {dados.nome}
        {contato.cnpj ? ` · CNPJ ${contato.cnpj}` : ""}
        {contato.registro ? ` · ${contato.registro}` : ""}
      </footer>
    </div>
  );
}
