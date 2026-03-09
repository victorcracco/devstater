"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Truck, Menu, X } from "lucide-react";

// Array com os links exatos
const navLinks = [
  { name: "Serviços", href: "#servicos" },
  { name: "Diferenciais", href: "#diferenciais" },
  { name: "Frota", href: "#frota" },
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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/transportes" className="flex items-center gap-2 group">
          <Truck className={`w-8 h-8 ${isScrolled ? "text-blue-900" : "text-white"} transition-colors`} />
          <span className={`text-2xl font-bold tracking-tighter ${isScrolled ? "text-slate-900" : "text-white"}`}>
            Nova<span className="text-orange-500">Via</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium hover:text-orange-500 transition-colors ${isScrolled ? "text-slate-600" : "text-slate-200"}`}
            >
              {link.name}
            </Link>
          ))}
          <a href="#contato" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-full font-medium transition-all transform hover:scale-105">
            Cotação Expressa
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
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
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-slate-700 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}