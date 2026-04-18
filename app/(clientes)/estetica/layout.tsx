import "@/app/globals.css";

export const metadata = {
  title: "Studio Luma | Estética e Beleza",
  description: "Studio de estética em São Paulo. Limpeza de pele, design de sobrancelha, cílios, depilação e muito mais. Agende pelo WhatsApp.",
};

export default function EsteticaLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
