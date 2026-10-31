import { Check, MapPin, Phone } from "lucide-react";
import { ICONES } from "@/app/(clientes)/transportes/components/icones";
import WhatsAppButton from "@/app/(clientes)/transportes/components/WhatsAppButton";
import { linkContato } from "@/lib/prototipos/conteudo";
import { linkLigar, linkMapa } from "@/lib/prototipos/utilidades";
import FormularioOrcamento from "./FormularioOrcamento";
import type { PropsModelo } from "./index";

// Para quem vive de pedido de contato: o formulário já aparece no topo da página
export default function ModeloOrcamento({ site, dados }: PropsModelo) {
  const { contato, conversao, diferenciais, hero, servicos } = site;
  const ligar = linkLigar(contato.telefone);
  const principal = linkContato(contato, conversao.mensagem);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="bg-slate-950 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <span className="min-w-0 truncate text-xl font-extrabold tracking-tight">{dados.nome}</span>
          {ligar && (
            <a href={ligar} className="flex shrink-0 items-center gap-2 text-sm font-bold text-yellow-400 hover:text-yellow-300">
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">{contato.telefone}</span>
              <span className="sm:hidden">Ligar</span>
            </a>
          )}
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden bg-slate-950 text-white">
          <img src={hero.imagem} alt={hero.imagemAlt} className="absolute inset-0 h-full w-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-slate-950/20" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 py-12 md:py-20 lg:grid-cols-[3fr_2fr]">
            <div>
              <p className="mb-4 font-bold text-yellow-400">{hero.selo}</p>
              <h1 className="mb-5 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
                {hero.antes} <span className="text-yellow-400">{hero.destaque}</span> {hero.depois}
              </h1>
              <p className="mb-6 max-w-xl text-lg text-slate-200">{hero.subtitulo}</p>
              <ul className="space-y-2">
                {diferenciais.itens.slice(0, 3).map((item) => (
                  <li key={item.titulo} className="flex items-center gap-2 font-semibold">
                    <Check className="h-5 w-5 shrink-0 text-yellow-400" />
                    {item.titulo}
                  </li>
                ))}
              </ul>
            </div>
            {contato.whatsapp || contato.email ? (
              <FormularioOrcamento conversao={conversao} whatsapp={contato.whatsapp} email={contato.email} />
            ) : (
              principal && (
                <a href={principal} className="rounded-2xl bg-yellow-400 p-8 text-center text-2xl font-extrabold text-slate-950 hover:bg-yellow-300">
                  {conversao.acao} por telefone
                </a>
              )
            )}
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="mb-10 text-3xl font-extrabold tracking-tight">{conversao.tituloPassos}</h2>
            <ol className="grid gap-6 md:grid-cols-3">
              {conversao.passos.map((passo, i) => (
                <li key={passo.titulo} className="rounded-2xl border border-slate-200 p-6">
                  <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 font-extrabold text-slate-950">{i + 1}</span>
                  <h3 className="mb-2 text-lg font-extrabold">{passo.titulo}</h3>
                  <p className="leading-relaxed text-slate-600">{passo.texto}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-slate-100 py-16">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="mb-10 text-3xl font-extrabold tracking-tight">{servicos.titulo}</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {servicos.itens.map((servico) => {
                const Icone = ICONES[servico.icone];
                return (
                  <div key={servico.titulo} className="flex gap-4 rounded-2xl bg-white p-6">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-950">
                      <Icone className="h-6 w-6 text-yellow-400" />
                    </span>
                    <div>
                      <h3 className="mb-1 text-lg font-extrabold">{servico.titulo}</h3>
                      <p className="leading-relaxed text-slate-600">{servico.descricao}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-yellow-400 py-12 text-slate-950">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 md:flex-row md:items-center">
            <div>
              <h2 className="mb-2 text-3xl font-extrabold tracking-tight">{contato.titulo}</h2>
              <a href={linkMapa(dados)} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 font-semibold hover:underline">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0" />
                <span>{contato.endereco?.join(" · ")}</span>
              </a>
            </div>
            {principal && (
              <a
                href={principal}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full shrink-0 rounded-lg bg-slate-950 px-8 py-4 text-center font-extrabold text-white hover:bg-slate-800 md:w-auto"
              >
                {contato.rotuloBotao}
              </a>
            )}
          </div>
        </section>
      </main>

      <footer className="bg-slate-950 px-6 py-6 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} {dados.nome}
        {contato.cnpj ? ` · CNPJ ${contato.cnpj}` : ""}
        {contato.registro ? ` · ${contato.registro}` : ""}
      </footer>
      <WhatsAppButton site={site} />
    </div>
  );
}
