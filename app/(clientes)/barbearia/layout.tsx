import "@/app/globals.css";

export const metadata = {
  title: "Barbearia Dom | Corte, Barba e Estilo",
  description: "Barbearia profissional em São Paulo. Corte masculino, degradê, barba e muito mais. Agende pelo WhatsApp.",
};

export default function BarbeariaLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
