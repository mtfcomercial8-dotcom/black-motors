import React, { useEffect, useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { PageType } from '../types';

interface HeroProps {
  onNavigate: (page: PageType, sectionId?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#050505]">
      {/* Background - Subtle gradient */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(circle at center, #1a1a1a 0%, #000000 100%)',
          transform: `translateY(${offset * 0.5}px)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        {/* Optional: Add a subtle texture or overlay image here if desired, but keeping pure dark/gold as requested */}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div 
          className="mb-8 opacity-0 animate-[fadeIn_1s_ease-out_forwards]"
          style={{ animationDelay: '0.2s' }}
        >
          <div className="inline-flex items-center px-6 py-2 border border-[#BF953F]/50 rounded-none bg-black/40 backdrop-blur-md">
            <div className="w-2 h-2 bg-gold-metallic rounded-full animate-pulse mr-3"></div>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#FCF6BA]">
              Luanda • Alta Gastronomia
            </span>
          </div>
        </div>
        
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter mb-6 opacity-0 animate-[slideUp_1s_ease-out_forwards]" style={{ animationDelay: '0.4s' }}>
          O Sabor <br />
          <span className="text-gold-gradient drop-shadow-[0_0_15px_rgba(191,149,63,0.3)]">Começa Aqui</span>
        </h1>

        <p className="font-sans text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed opacity-0 animate-[slideUp_1s_ease-out_forwards]" style={{ animationDelay: '0.6s' }}>
          Uma fusão de tradição e vanguarda. Experimente pratos desenhados para despertar sentidos e celebrar momentos únicos em um ambiente exclusivo.
        </p>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center opacity-0 animate-[slideUp_1s_ease-out_forwards]" style={{ animationDelay: '0.8s' }}>
          <button 
            onClick={() => onNavigate('inventory')}
            className="group relative px-8 py-4 bg-gold-metallic text-black font-bold uppercase tracking-widest overflow-hidden hover:shadow-[0_0_20px_rgba(212,175,55,0.6)] transition-shadow duration-300 cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-2">
              Ver Menu <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            {/* Shine effect */}
            <div className="absolute inset-0 bg-white/40 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </button>
          <button 
            onClick={() => onNavigate('reservation')}
            className="px-8 py-4 border border-[#BF953F]/50 text-[#FCF6BA] hover:border-[#FCF6BA] hover:text-white font-bold uppercase tracking-widest transition-all hover:bg-white/5 backdrop-blur-sm cursor-pointer"
          >
            Reservar Mesa
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce opacity-50">
        <ChevronDown className="w-8 h-8 text-[#FCF6BA]" />
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};