import { whatsappLink } from "@/lib/whatsapp";

export default function PrototipoExpirado({ nome }: { nome: string }) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-paper px-6 font-sans">
      <div className="max-w-md text-center">
        <p className="text-sm font-bold uppercase tracking-wider text-brand mb-3">DevStarter</p>
        <h1 className="text-3xl font-bold text-ink mb-4">O protótipo do site da {nome} expirou</h1>
        <p className="text-ink/70 mb-8">
          Quer ver de novo ou conversar sobre o site? É só chamar a gente.
        </p>
        <a
          href={whatsappLink(`Olá! O protótipo do site da ${nome} expirou e quero ver de novo.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full bg-brand px-6 py-3 font-bold text-white hover:opacity-90 transition-opacity"
        >
          Falar com a DevStarter
        </a>
      </div>
    </main>
  );
}
