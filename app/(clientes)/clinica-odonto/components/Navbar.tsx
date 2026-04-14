"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Smile, Menu, X } from "lucide-react";

const navLinks = [
  { name: "Serviços", href: "#servicos" },
  { name: "Sobre", href: "#sobre" },
  { name: "Depoimentos", href: "#depoimentos" },
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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/clinica-odonto" className="flex items-center gap-2">
          <Smile className={`w-7 h-7 ${isScrolled ? "text-sky-600" : "text-white"} transition-colors`} />
          <span className={`text-xl font-bold ${isScrolled ? "text-slate-900" : "text-white"}`}>
            Sorriso<span className={isScrolled ? "text-sky-600" : "text-sky-300"}> Pleno</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href}
              className={`text-sm font-medium hover:text-sky-500 transition-colors ${isScrolled ? "text-slate-600" : "text-white/80"}`}>
              {link.name}
            </Link>
          ))}
          <a href="#contato"
            className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2.5 rounded-full font-medium transition-all hover:scale-105 text-sm">
            Agendar Consulta
          </a>
        </nav>

        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen
            ? <X className={`w-6 h-6 ${isScrolled ? "text-slate-900" : "text-white"}`} />
            : <Menu className={`w-6 h-6 ${isScrolled ? "text-slate-900" : "text-white"}`} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 px-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-slate-700 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}>
              {link.name}
            </Link>
          ))}
          <a href="#contato" className="bg-sky-500 text-white px-6 py-3 rounded-full font-medium text-center">
            Agendar Consulta
          </a>
        </div>
      )}
    </header>
  );
}
