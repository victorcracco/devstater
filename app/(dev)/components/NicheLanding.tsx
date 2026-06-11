import { whatsappLink } from "@/lib/whatsapp";
import QuoteForm from "./QuoteForm";
import SignatureElement from "./SignatureElement";

interface PontoProps {
  icon: string;
  title: string;
  description: string;
}

export interface NicheLandingProps {
  segment: string;
  badge: string;
  heroTitle: string;
  heroHighlight: string;
  heroSubtitle: string;
  heroCtaMessage: string;
  signatureMessage?: string;
  signatureReply?: string;
  painsTitle: string;
  painsSubtitle: string;
  pains: PontoProps[];
  offerTitle: string;
  offerDescription: string;
  benefits: PontoProps[];
  formTitle: string;
  formSubtitle: string;
  necessidadeLabel: string;
  necessidadePlaceholder: string;
  ctaFinalMessage: string;
}

export default function NicheLanding({
  segment,
  badge,
  heroTitle,
  heroHighlight,
  heroSubtitle,
  heroCtaMessage,
  signatureMessage,
  signatureReply,
  painsTitle,
  painsSubtitle,
  pains,
  offerTitle,
  offerDescription,
  benefits,
  formTitle,
  formSubtitle,
  necessidadeLabel,
  necessidadePlaceholder,
  ctaFinalMessage,
}: NicheLandingProps) {
  return (
    <>
      {/* HERO */}
      <section className="bg-paper py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16 items-center">
            <div className="order-1">
              <span className="inline-block mb-6 text-sm font-semibold py-1.5 px-3 rounded-full bg-brand/10 text-brand border border-brand/20">
                {badge}
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-ink mb-6 tracking-tight leading-tight">
                {heroTitle}{" "}
                <span className="font-display text-brand">
                  {heroHighlight}
                </span>
              </h1>
              <p className="text-lg md:text-xl text-ink/70 mb-10 max-w-2xl leading-relaxed">
                {heroSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <a
                  href={whatsappLink(heroCtaMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-accent text-brand-dark font-bold rounded-lg hover:opacity-90 transition-opacity text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  Falar agora no WhatsApp
                </a>
                <a
                  href="#orcamento"
                  className="px-4 py-2 text-ink font-semibold underline underline-offset-4 decoration-line hover:text-brand hover:decoration-brand transition-colors text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand rounded"
                >
                  Pedir orçamento
                </a>
              </div>
            </div>

            <div className="order-2">
              <SignatureElement message={signatureMessage} reply={signatureReply} />
            </div>
          </div>
        </div>
      </section>

      {/* DORES */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4 tracking-tight">{painsTitle}</h2>
            <p className="text-lg text-ink/70 max-w-2xl mx-auto">{painsSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pains.map((pain, i) => (
              <div key={i} className="p-6 bg-paper rounded-xl border border-line">
                <div className="w-12 h-12 bg-amber/20 rounded-lg flex items-center justify-center text-amber mb-4 text-2xl">
                  {pain.icon}
                </div>
                <h3 className="text-lg font-bold text-ink mb-2">{pain.title}</h3>
                <p className="text-ink/70 text-sm leading-relaxed">{pain.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OFERTA E BENEFÍCIOS */}
      <section className="py-20 bg-paper">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4 tracking-tight">{offerTitle}</h2>
            <p className="text-lg text-ink/70 max-w-2xl mx-auto">{offerDescription}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((benefit, i) => (
              <div key={i} className="p-6 bg-white rounded-xl border border-line hover:border-brand/30 hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-brand/10 rounded-lg flex items-center justify-center text-brand mb-4 text-2xl">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-bold text-ink mb-2">{benefit.title}</h3>
                <p className="text-ink/70 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORMULÁRIO DE ORÇAMENTO */}
      <section id="orcamento" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4 tracking-tight">{formTitle}</h2>
            <p className="text-lg text-ink/70 max-w-2xl mx-auto">{formSubtitle}</p>
          </div>

          <QuoteForm
            segment={segment}
            necessidadeLabel={necessidadeLabel}
            necessidadePlaceholder={necessidadePlaceholder}
          />
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 bg-brand-dark text-paper">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">Prefere falar direto?</h2>
          <p className="text-lg text-paper/70 mb-8">
            Chama no WhatsApp e te respondemos rapidinho.
          </p>
          <a
            href={whatsappLink(ctaFinalMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-accent text-brand-dark font-bold rounded-lg hover:opacity-90 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
          >
            Falar no WhatsApp
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>
          </a>
        </div>
      </section>
    </>
  );
}
