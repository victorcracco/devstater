import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import CoverageArea from './components/CoverageArea';
import Differentials from './components/Differentials';
import Testimonials from './components/Testimonials';
import ContactCTA from './components/ContactCTA';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import { novaVia } from './site';

export default function TransportesPage() {
  return (
    // O flex-col e min-h-screen garantem que o footer fique sempre no final da tela,
    // mesmo que o conteúdo da página seja pequeno (o que não é o caso aqui, mas é uma boa prática).
    <div className="flex flex-col min-h-screen font-sans bg-slate-50">

      {/* Menu de navegação fixo e transparente/sólido */}
      <Navbar site={novaVia} />

      {/* Conteúdo principal da página */}
      <main className="flex-grow">
        <Hero site={novaVia} />
        <About site={novaVia} />
        <Services site={novaVia} />
        <CoverageArea site={novaVia} />
        <Differentials site={novaVia} />
        <Testimonials site={novaVia} />
        <ContactCTA site={novaVia} />
      </main>

      {/* Rodapé escuro premium */}
      <Footer site={novaVia} />

      {/* Botão flutuante do WhatsApp para conversão rápida */}
      <WhatsAppButton site={novaVia} />

    </div>
  );
}
