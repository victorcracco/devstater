"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Scale, Menu, X } from "lucide-react";

const navLinks = [
  { name: "Áreas de Atuação", href: "#servicos" },
  { name: "O Escritório", href: "#sobre" },
  { name: "Equipe", href: "#equipe" },
  { name: "Contato", href: "#contato" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-slate-950/98 backdrop-blur-md shadow-md py-4" : "bg-transparent py-6"}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/advocacia" className="flex items-center gap-2">
          <Scale className="w-6 h-6 text-amber-400" />
          <span className="text-xl font-bold text-white tracking-tight">
            Ferreira <span className="text-amber-400">&</span> Associados
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href}
              className="text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors">
              {link.name}
            </Link>
          ))}
          <a href="#contato"
            className="border border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-slate-900 px-6 py-2.5 rounded-sm font-semibold transition-all text-sm tracking-wide">
            Consulta Gratuita
          </a>
        </nav>

        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen
            ? <X className="w-6 h-6 text-white" />
            : <Menu className="w-6 h-6 text-white" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-950 shadow-lg py-4 px-6 flex flex-col gap-4 border-t border-slate-800">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-slate-300 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}>
              {link.name}
            </Link>
          ))}
          <a href="#contato" className="border border-amber-400 text-amber-400 px-6 py-3 font-semibold text-center">
            Consulta Gratuita
          </a>
        </div>
      )}
    </header>
  );
}
