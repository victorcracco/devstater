import { whatsappLink } from "@/lib/whatsapp";
import QuoteForm from "./QuoteForm";

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
      <section className="relative bg-gradient-to-b from-blue-50 via-white to-white overflow-hidden py-20 md:py-32">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/4 w-[500px] h-[500px] bg-blue-100/60 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-4xl mx-auto px-4 text-center z-10">
          <span className="inline-block mb-6 text-sm font-semibold py-1 px-3 rounded-full bg-blue-100 text-blue-700 border border-blue-200">
            {badge}
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
            {heroTitle}{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">
              {heroHighlight}
            </span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            {heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={whatsappLink(heroCtaMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 hover:shadow-blue-300 transform hover:-translate-y-1"
            >
              Falar agora no WhatsApp
            </a>
            <a
              href="#orcamento"
              className="px-8 py-4 bg-white text-slate-900 font-bold rounded-lg border-2 border-slate-200 hover:border-slate-300 transition-all"
            >
              Pedir orçamento
            </a>
          </div>
        </div>
      </section>

      {/* DORES */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">{painsTitle}</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">{painsSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pains.map((pain, i) => (
              <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-600 mb-4 text-2xl">
                  {pain.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{pain.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{pain.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OFERTA E BENEFÍCIOS */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">{offerTitle}</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">{offerDescription}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((benefit, i) => (
              <div key={i} className="p-6 bg-white rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4 text-2xl">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{benefit.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORMULÁRIO DE ORÇAMENTO */}
      <section id="orcamento" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">{formTitle}</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">{formSubtitle}</p>
          </div>

          <QuoteForm
            segment={segment}
            necessidadeLabel={necessidadeLabel}
            necessidadePlaceholder={necessidadePlaceholder}
          />
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Prefere falar direto?</h2>
          <p className="text-lg text-slate-600 mb-8">
            Chama no WhatsApp e te respondemos rapidinho.
          </p>
          <a
            href={whatsappLink(ctaFinalMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-all hover:-translate-y-1 shadow-xl shadow-slate-200"
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
