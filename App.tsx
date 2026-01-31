import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Featured } from './components/Featured';
import { About } from './components/About';
import { Services } from './components/Services';
import { Inventory } from './components/Inventory';
import { Footer } from './components/Footer';
import { MessageCircle } from 'lucide-react';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'inventory'>('home');

  const handleNavigate = (page: 'home' | 'inventory', sectionId?: string) => {
    setCurrentPage(page);
    
    if (page === 'home' && sectionId) {
      // Pequeno delay para garantir que o componente foi renderizado antes do scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-brand-black min-h-screen text-white selection:bg-[#BF953F] selection:text-black">
      <Navbar onNavigate={handleNavigate} currentPage={currentPage} />
      <main>
        {currentPage === 'home' ? (
          <>
            <Hero onNavigate={handleNavigate} />
            <Featured />
            <About />
            <Services />
          </>
        ) : (
          <div className="pt-20 min-h-screen bg-brand-black">
             <Inventory />
          </div>
        )}
      </main>
      <Footer onNavigate={handleNavigate} />

      {/* Floating Action Button (WhatsApp Style) */}
      <a 
        href="https://wa.me/244923000000" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.5)] hover:scale-110 transition-transform duration-300 group"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute right-full mr-4 bg-white text-black px-3 py-1 rounded text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 top-1/2 transform -translate-y-1/2">
            Fale no WhatsApp
        </span>
      </a>
    </div>
  );
};

export default App;