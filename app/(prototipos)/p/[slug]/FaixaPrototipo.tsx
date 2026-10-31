import Link from "next/link";
import { MODELOS, type ModeloSite } from "@/lib/prototipos/modelos";
import { whatsappLink } from "@/lib/whatsapp";

type Props = {
  nome: string;
  slug: string;
  modelo: ModeloSite;
  nomes?: Partial<Record<ModeloSite, string>>;
};

// Quem abre o protótipo é leigo: precisa entender na hora que é um modelo e que há outras versões.
// A altura (112px no celular, 72px a partir de md) é repetida em page.tsx e no Navbar com comFaixa.
export default function FaixaPrototipo({ nome, slug, modelo, nomes }: Props) {
  const mensagem = `Olá! Vi o protótipo do site da ${nome} (devstarter.com.br/p/${slug}?modelo=${modelo}) e quero conversar.`;
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-brand-dark text-white shadow-lg">
      <div className="mx-auto grid h-[112px] max-w-7xl grid-cols-[1fr_auto] content-center items-center gap-x-3 gap-y-2 px-3 md:h-[72px] md:grid-cols-[1fr_auto_auto] md:gap-x-5 md:px-6">
        <div className="min-w-0">
          <p className="truncate text-sm font-extrabold md:text-base">Este é um modelo do seu site</p>
          <p className="truncate text-xs text-white/80">
            <span className="md:hidden">Toque abaixo para ver outras versões</span>
            <span className="hidden md:inline">Clique ao lado para ver outras versões</span>
          </p>
        </div>

        <nav aria-label="Versões do site" className="col-span-2 row-start-2 flex gap-1.5 overflow-x-auto md:col-span-1 md:col-start-2 md:row-start-1">
          {MODELOS.map(({ id, nome: rotulo, descricao }) => (
            <Link
              key={id}
              href={`/p/${slug}?modelo=${id}`}
              aria-current={id === modelo ? "page" : undefined}
              className={`min-w-[78px] flex-1 rounded-lg border px-2 py-1 text-center leading-tight transition-colors md:min-w-[104px] md:flex-none ${
                id === modelo
                  ? "border-white bg-white text-ink"
                  : "border-white/35 bg-white/10 text-white hover:bg-white/25"
              }`}
            >
              <span className="block text-[13px] font-extrabold md:text-sm">{nomes?.[id] ?? rotulo}</span>
              <span className={`block whitespace-nowrap text-[10px] md:text-[11px] ${id === modelo ? "text-ink/70" : "text-white/80"}`}>
                {descricao}
              </span>
            </Link>
          ))}
        </nav>

        <a
          href={whatsappLink(mensagem)}
          target="_blank"
          rel="noopener noreferrer"
          className="col-start-2 row-start-1 shrink-0 rounded-lg bg-accent px-3 py-2 text-[13px] font-extrabold text-ink transition-opacity hover:opacity-90 md:col-start-3 md:px-4 md:py-2.5 md:text-sm"
        >
          Quero este site
        </a>
      </div>
    </div>
  );
}
