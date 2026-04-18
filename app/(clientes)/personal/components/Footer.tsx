export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="py-8 bg-slate-950 border-t border-slate-900">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-lime-400 font-black">⚡</span>
          <span className="text-white font-bold text-sm">Move Personal</span>
        </div>
        <p className="text-slate-600 text-xs text-center">© {year} Move Personal Training. Todos os direitos reservados.</p>
        <p className="text-slate-700 text-xs">
          Site por{" "}
          <a href="/" className="text-slate-500 hover:text-slate-300 transition-colors">DevStarter</a>
        </p>
      </div>
    </footer>
  );
}
