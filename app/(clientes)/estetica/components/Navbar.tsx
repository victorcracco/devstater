"use client";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-rose-100/80 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-rose-400 text-xl">✿</span>
          <span className="text-slate-900 font-black text-lg tracking-wide">Studio Luma</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <a href="#servicos" className="text-slate-500 hover:text-slate-900 text-sm font-medium transition-colors">Serviços</a>
          <a href="#contato" className="text-slate-500 hover:text-slate-900 text-sm font-medium transition-colors">Contato</a>
          <a
            href="https://wa.me/5511912345678"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 bg-rose-500 text-white font-bold text-sm rounded-lg hover:bg-rose-600 transition-colors shadow-sm shadow-rose-200"
          >
            Agendar
          </a>
        </div>
        <button
          className="md:hidden text-slate-500 hover:text-slate-900"
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
        <div className="md:hidden bg-white border-t border-rose-100 px-4 py-4 flex flex-col gap-4">
          <a href="#servicos" className="text-slate-600 text-sm font-medium" onClick={() => setOpen(false)}>Serviços</a>
          <a href="#contato" className="text-slate-600 text-sm font-medium" onClick={() => setOpen(false)}>Contato</a>
          <a
            href="https://wa.me/5511912345678"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3 bg-rose-500 text-white font-bold text-sm rounded-lg text-center"
          >
            Agendar
          </a>
        </div>
      )}
    </nav>
  );
}
