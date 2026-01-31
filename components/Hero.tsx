import React, { useEffect, useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=2070&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translateY(${offset * 0.5}px)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div 
          className="mb-6 opacity-0 animate-[fadeIn_1s_ease-out_forwards]"
          style={{ animationDelay: '0.2s' }}
        >
          <span className="inline-block px-4 py-1 border border-white/20 rounded-full bg-white/5 backdrop-blur-sm text-xs font-bold uppercase tracking-[0.3em] text-brand-gold mb-4">
            Angola • Premium Cars
          </span>
        </div>
        
        <h1 className="font-display text-5xl md:text-7xl lg:text-9xl font-black text-white uppercase tracking-tighter mb-6 opacity-0 animate-[slideUp_1s_ease-out_forwards]" style={{ animationDelay: '0.4s' }}>
          O Futuro <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Começa Aqui</span>
        </h1>

        <p className="font-sans text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed opacity-0 animate-[slideUp_1s_ease-out_forwards]" style={{ animationDelay: '0.6s' }}>
          Experimente a perfeição em movimento. Na Black Motors, unimos luxo, performance e exclusividade para os motoristas mais exigentes de Angola.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center opacity-0 animate-[slideUp_1s_ease-out_forwards]" style={{ animationDelay: '0.8s' }}>
          <a href="#inventory" className="group relative px-8 py-4 bg-brand-gold text-black font-bold uppercase tracking-widest overflow-hidden transition-all hover:bg-yellow-600">
            <span className="relative z-10 flex items-center gap-2">
              Ver Estoque <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </a>
          <a href="#contact" className="px-8 py-4 border border-white/20 hover:border-white text-white font-bold uppercase tracking-widest transition-all hover:bg-white/10 backdrop-blur-sm">
            Fale Conosco
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce opacity-50">
        <ChevronDown className="w-8 h-8 text-white" />
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