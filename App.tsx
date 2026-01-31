import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Inventory } from './components/Inventory';
import { Services } from './components/Services';
import { About } from './components/About';
import { Footer } from './components/Footer';
import { MessageCircle } from 'lucide-react';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  // Simulate initial loading for a smooth entrance
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full bg-black flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 to-black"></div>
        <div className="z-10 flex flex-col items-center">
            <span className="font-display font-bold text-4xl tracking-widest text-white animate-pulse">
            BLACK<span className="text-brand-gold">MOTORS</span>
            </span>
            <div className="mt-4 w-48 h-0.5 bg-gray-800 overflow-hidden relative">
                <div className="absolute inset-y-0 left-0 bg-brand-gold w-1/2 animate-[shimmer_1s_infinite]"></div>
            </div>
            <p className="mt-2 text-xs text-gray-500 uppercase tracking-[0.5em]">Carregando</p>
        </div>
        <style>{`
            @keyframes shimmer {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(200%); }
            }
        `}</style>
      </div>
    );
  }

  return (
    <div className="bg-brand-black min-h-screen text-white selection:bg-brand-gold selection:text-black">
      <Navbar />
      <main>
        <Hero />
        <Inventory />
        <Services />
        <About />
      </main>
      <Footer />

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