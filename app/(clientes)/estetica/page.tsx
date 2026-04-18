import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import ContactInfo from './components/ContactInfo';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

export default function EsteticaPage() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-white">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Services />
        <ContactInfo />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
