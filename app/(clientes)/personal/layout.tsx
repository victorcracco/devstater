import "@/app/globals.css";

export const metadata = {
  title: "Move Personal Training | Treinamento Personalizado",
  description: "Personal trainer em São Paulo. Treino funcional, musculação e emagrecimento com acompanhamento individualizado. Agende uma avaliação gratuita.",
};

export default function PersonalLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
