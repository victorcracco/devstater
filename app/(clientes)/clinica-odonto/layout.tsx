import "@/app/globals.css";

export const metadata = {
  title: "Sorriso Pleno Odontologia | Clínica Especializada",
  description: "Clínica odontológica com tratamentos modernos: ortodontia, implantes, clareamento e facetas. Agende sua consulta gratuita.",
};

export default function ClinicaLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
