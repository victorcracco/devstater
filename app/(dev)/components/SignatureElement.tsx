interface SignatureElementProps {
  message?: string;
  reply?: string;
}

export default function SignatureElement({
  message = "Olá! Vi seu site 👋",
  reply = "Posso te ajudar?",
}: SignatureElementProps) {
  return (
    <div
      className="relative mx-auto aspect-[9/19] w-full max-w-[220px] overflow-hidden rounded-[2rem] border-[6px] border-brand-dark bg-white shadow-xl sm:max-w-[280px] md:border-[8px]"
      aria-hidden="true"
    >
      {/* Camada do site */}
      <div className="absolute inset-0 flex flex-col">
        {/* Barra do navegador */}
        <div className="flex items-center gap-1.5 border-b border-line bg-white px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="ml-2 h-2 w-16 rounded-full bg-line" />
        </div>

        {/* Conteúdo do site */}
        <div className="flex flex-1 flex-col gap-3 px-5 py-6">
          <div className="h-3 w-3/4 rounded-full bg-line" />
          <div className="h-3 w-1/2 rounded-full bg-line" />
          <div className="mt-1 h-16 w-full rounded-lg bg-line/60" />
          <div className="h-3 w-2/3 rounded-full bg-line" />
          <div className="mt-auto flex justify-center pb-2">
            <span className="signature-cta inline-flex items-center justify-center rounded-md bg-accent px-4 py-2 text-sm font-bold text-brand-dark">
              Fale Conosco
            </span>
          </div>
        </div>
      </div>

      {/* Camada da conversa do WhatsApp */}
      <div className="signature-chat absolute inset-x-0 bottom-0 flex h-[62%] flex-col overflow-hidden rounded-t-2xl bg-[#ECE5DD] shadow-[0_-10px_30px_rgba(0,0,0,0.18)]">
        {/* Cabeçalho do chat */}
        <div className="flex items-center gap-2 bg-brand px-3 py-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-paper/20 text-xs">
            💬
          </span>
          <div className="flex flex-col">
            <span className="text-xs font-bold leading-tight text-paper">WhatsApp</span>
            <span className="text-[10px] leading-tight text-paper/70">online</span>
          </div>
        </div>

        {/* Corpo do chat */}
        <div className="flex flex-1 flex-col gap-2 px-3 py-3">
          <div className="signature-msg max-w-[85%] self-end rounded-2xl rounded-br-sm bg-accent px-3 py-2 text-xs font-semibold text-brand-dark shadow-sm">
            {message}
          </div>
          <div className="signature-reply max-w-[85%] self-start rounded-2xl rounded-bl-sm bg-white px-3 py-2 text-xs font-semibold text-ink shadow-sm">
            {reply}
          </div>
        </div>
      </div>
    </div>
  );
}
