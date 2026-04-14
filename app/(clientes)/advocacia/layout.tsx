import "@/app/globals.css";

export const metadata = {
  title: "Ferreira & Associados | Escritório de Advocacia",
  description: "Escritório de advocacia com 18 anos de experiência. Direito Civil, Trabalhista, Empresarial e de Família. Consulta inicial gratuita.",
};

export default function AdvocaciaLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
