import Link from "next/link";
import { MODELOS, type ModeloSite } from "@/lib/prototipos/modelos";
import { whatsappLink } from "@/lib/whatsapp";

type Props = { nome: string; slug: string; expiraEm: string; modelo: ModeloSite };

export default function FaixaPrototipo({ nome, slug, expiraEm, modelo }: Props) {
  const validade = new Date(expiraEm).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", timeZone: "UTC" });
  const mensagem = `Olá! Vi o protótipo do site da ${nome} (devstarter.com.br/p/${slug}?modelo=${modelo}) e quero conversar.`;
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-brand-dark text-white text-xs sm:text-sm">
      <div className="mx-auto flex h-[72px] max-w-7xl flex-wrap content-center items-center justify-between gap-x-3 gap-y-1.5 px-4 sm:h-10 sm:flex-nowrap md:px-12">
        <p className="order-1 min-w-0 flex-1 truncate">
          <span className="font-bold">Protótipo DevStarter</span>
          <span className="hidden xl:inline"> para {nome} · textos e fotos ilustrativos · até {validade}</span>
        </p>
        <nav aria-label="Modelos de site" className="order-3 flex w-full shrink-0 items-center gap-1 sm:order-2 sm:w-auto">
          {MODELOS.map(({ id, nome: rotulo }) => (
            <Link
              key={id}
              href={`/p/${slug}?modelo=${id}`}
              aria-current={id === modelo ? "page" : undefined}
              className={`flex-1 rounded-full px-2.5 py-0.5 text-center font-semibold transition-colors sm:flex-none ${
                id === modelo ? "bg-white text-ink" : "text-white/80 hover:bg-white/15 hover:text-white"
              }`}
            >
              {rotulo}
            </Link>
          ))}
        </nav>
        <a
          href={whatsappLink(mensagem)}
          target="_blank"
          rel="noopener noreferrer"
          className="order-2 shrink-0 rounded-full bg-accent px-3 py-1 font-bold text-ink hover:opacity-90 transition-opacity sm:order-3"
        >
          Quero este site
        </a>
      </div>
    </div>
  );
}
