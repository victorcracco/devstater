export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="py-8 bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-amber-400 font-black">✂</span>
          <span className="text-white font-bold text-sm">Barbearia Dom</span>
        </div>
        <p className="text-zinc-600 text-xs text-center">© {year} Barbearia Dom. Todos os direitos reservados.</p>
        <p className="text-zinc-700 text-xs">
          Site por{" "}
          <a href="/" className="text-zinc-500 hover:text-zinc-300 transition-colors">DevStarter</a>
        </p>
      </div>
    </footer>
  );
}
