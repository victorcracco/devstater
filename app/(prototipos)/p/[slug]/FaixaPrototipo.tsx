import { whatsappLink } from "@/lib/whatsapp";

export default function FaixaPrototipo({ nome, slug, expiraEm }: { nome: string; slug: string; expiraEm: string }) {
  const validade = new Date(expiraEm).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", timeZone: "UTC" });
  const mensagem = `Olá! Vi o protótipo do site da ${nome} (devstarter.com.br/p/${slug}) e quero conversar.`;
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-10 bg-brand-dark text-white text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto h-full px-4 md:px-12 flex items-center justify-between gap-3">
        <p className="truncate">
          <span className="font-bold">Protótipo DevStarter</span>
          <span className="hidden sm:inline"> para {nome} · textos e fotos ilustrativos · disponível até {validade}</span>
        </p>
        <a
          href={whatsappLink(mensagem)}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-full bg-accent px-3 py-1 font-bold text-ink hover:opacity-90 transition-opacity"
        >
          Quero este site
        </a>
      </div>
    </div>
  );
}
