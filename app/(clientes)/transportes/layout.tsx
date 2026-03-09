import "@/app/globals.css"; // ou "../globals.css" (use o mesmo que funcionou no outro layout)

// Você pode colocar metadados genéricos aqui se quiser
export const metadata = {
  title: 'Página do Cliente',
  description: 'Apresentação de projeto',
};

export default function ClientesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        {/* O 'children' aqui será a sua página page.tsx do /transportes */}
        {children}
      </body>
    </html>
  );
}