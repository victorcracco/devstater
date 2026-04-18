"use client";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/60">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lime-400 font-black text-xl">⚡</span>
          <span className="text-white font-black text-lg tracking-wide">Move Personal</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <a href="#servicos" className="text-slate-400 hover:text-white text-sm font-medium transition-colors">Serviços</a>
          <a href="#contato" className="text-slate-400 hover:text-white text-sm font-medium transition-colors">Contato</a>
          <a
            href="https://wa.me/5511999887766"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 bg-lime-400 text-slate-900 font-bold text-sm rounded-lg hover:bg-lime-300 transition-colors"
          >
            Avaliação gratuita
          </a>
        </div>
        <button
          className="md:hidden text-slate-400 hover:text-white"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            }
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 px-4 py-4 flex flex-col gap-4">
          <a href="#servicos" className="text-slate-300 text-sm font-medium" onClick={() => setOpen(false)}>Serviços</a>
          <a href="#contato" className="text-slate-300 text-sm font-medium" onClick={() => setOpen(false)}>Contato</a>
          <a
            href="https://wa.me/5511999887766"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3 bg-lime-400 text-slate-900 font-bold text-sm rounded-lg text-center"
          >
            Avaliação gratuita
          </a>
        </div>
      )}
    </nav>
  );
}
