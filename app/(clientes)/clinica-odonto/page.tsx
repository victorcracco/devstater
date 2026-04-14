import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Testimonials from './components/Testimonials';
import ContactCTA from './components/ContactCTA';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

export default function ClinicaOdontoPage() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-white">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Services />
        <About />
        <Testimonials />
        <ContactCTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
