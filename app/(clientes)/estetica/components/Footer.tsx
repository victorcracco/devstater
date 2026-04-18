export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="py-8 bg-white border-t border-rose-100">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-rose-400">✿</span>
          <span className="text-slate-900 font-bold text-sm">Studio Luma</span>
        </div>
        <p className="text-slate-400 text-xs text-center">© {year} Studio Luma. Todos os direitos reservados.</p>
        <p className="text-slate-300 text-xs">
          Site por{" "}
          <a href="/" className="text-slate-400 hover:text-slate-600 transition-colors">DevStarter</a>
        </p>
      </div>
    </footer>
  );
}
