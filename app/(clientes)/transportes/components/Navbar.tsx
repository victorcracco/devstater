"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { ICONES } from "./icones";
import type { SiteTransportadora } from "../site";

export default function Navbar({ site, comFaixa = false }: { site: SiteTransportadora; comFaixa?: boolean }) {
  const Logo = ICONES[site.icone];
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed ${comFaixa ? "top-[112px] md:top-[72px]" : "top-0"} left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between gap-4">
        <Link href={site.inicio} className="flex items-center gap-2 group min-w-0">
          <Logo className={`w-8 h-8 shrink-0 ${isScrolled ? "text-blue-900" : "text-white"} transition-colors`} />
          <span className={`text-2xl font-bold tracking-tighter truncate ${isScrolled ? "text-slate-900" : "text-white"}`}>
            {site.marca.texto}<span className="text-orange-500">{site.marca.destaque}</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8 shrink-0">
          {site.menu.map((link) => (
            <Link
              key={link.nome}
              href={link.href}
              className={`text-sm font-medium hover:text-orange-500 transition-colors ${isScrolled ? "text-slate-600" : "text-slate-200"}`}
            >
              {link.nome}
            </Link>
          ))}
          <a href={site.ctaMenu.href} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-full font-medium transition-all transform hover:scale-105">
            {site.ctaMenu.rotulo}
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Abrir menu">
          {isMobileMenuOpen ? (
             <X className={`w-6 h-6 ${isScrolled ? "text-slate-900" : "text-white"}`} />
          ) : (
             <Menu className={`w-6 h-6 ${isScrolled ? "text-slate-900" : "text-white"}`} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 px-6 flex flex-col gap-4">
          {site.menu.map((link) => (
            <Link key={link.nome} href={link.href} className="text-slate-700 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
              {link.nome}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
