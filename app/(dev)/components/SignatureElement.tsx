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
      className="relative mx-auto aspect-[9/19] w-full max-w-[220px] sm:max-w-[280px] overflow-hidden rounded-[2rem] border-[6px] border-brand-dark bg-paper shadow-xl md:border-[8px]"
      aria-hidden="true"
    >
      {/* Mini site preview */}
      <div className="flex h-full w-full flex-col">
        {/* Header bar */}
        <div className="flex items-center gap-1.5 border-b border-line bg-white px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="ml-2 h-2 w-16 rounded-full bg-line" />
        </div>

        {/* Page content placeholders */}
        <div className="flex flex-1 flex-col gap-3 px-5 py-6">
          <div className="h-3 w-3/4 rounded-full bg-line" />
          <div className="h-3 w-1/2 rounded-full bg-line" />
          <div className="mt-2 h-20 w-full rounded-lg bg-line/60" />
          <div className="h-3 w-2/3 rounded-full bg-line" />
        </div>

        {/* CTA button that morphs into a chat bubble */}
        <div className="relative h-28 px-5 pb-6">
          <button
            type="button"
            tabIndex={-1}
            className="signature-cta relative inline-flex items-center justify-center rounded-md bg-accent px-4 py-2 text-sm font-bold text-brand-dark"
          >
            Fale Conosco
          </button>

          {/* Typed message bubble */}
          <div className="signature-bubble-1 absolute bottom-[4.25rem] right-5 max-w-[85%] overflow-hidden whitespace-nowrap rounded-2xl rounded-br-sm bg-accent px-3 py-2 text-xs font-semibold text-brand-dark">
            {message}
          </div>

          {/* Reply bubble */}
          <div className="signature-bubble-2 absolute bottom-7 right-5 max-w-[85%] rounded-2xl rounded-br-sm bg-white px-3 py-2 text-xs font-semibold text-ink shadow-sm">
            {reply}
          </div>
        </div>
      </div>
    </div>
  );
}
