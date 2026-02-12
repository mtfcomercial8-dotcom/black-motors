import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Award, Star, Globe } from 'lucide-react';

export const ChefSpotlight: React.FC = () => {
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute right-0 top-20 w-1/3 h-full bg-gradient-to-l from-[#BF953F]/5 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Image Section */}
          <div 
            ref={elementRef}
            className={`w-full lg:w-1/2 relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}
          >
            <div className="relative z-10">
                <div className="absolute inset-0 border border-[#BF953F]/30 translate-x-4 translate-y-4"></div>
                <img 
                  src="https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=1000&auto=format&fit=crop" 
                  alt="Chef Executivo" 
                  className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
                />
            </div>
          </div>

          {/* Content Section */}
          <div className={`w-full lg:w-1/2 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            <span className="text-[#BF953F] uppercase tracking-[0.2em] text-xs font-bold mb-2 block">A Mente Criativa</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 uppercase">
              Chef <span className="text-gold-gradient">André Silva</span>
            </h2>
            
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              "A cozinha não é apenas sobre alimentar o corpo, mas sobre contar histórias através dos sabores. Cada prato que crio no Sabores do Começo é uma viagem entre as minhas raízes angolanas e as técnicas contemporâneas da gastronomia mundial."
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/5 p-4 border border-white/5 text-center group hover:border-[#BF953F]/30 transition-colors">
                    <Award className="w-8 h-8 text-[#BF953F] mx-auto mb-3" />
                    <h4 className="text-white font-bold text-sm uppercase">3 Estrelas</h4>
                    <span className="text-xs text-gray-500">Michelin Experience</span>
                </div>
                <div className="bg-white/5 p-4 border border-white/5 text-center group hover:border-[#BF953F]/30 transition-colors">
                    <Globe className="w-8 h-8 text-[#BF953F] mx-auto mb-3" />
                    <h4 className="text-white font-bold text-sm uppercase">Internacional</h4>
                    <span className="text-xs text-gray-500">Formado em Paris</span>
                </div>
                <div className="bg-white/5 p-4 border border-white/5 text-center group hover:border-[#BF953F]/30 transition-colors">
                    <Star className="w-8 h-8 text-[#BF953F] mx-auto mb-3" />
                    <h4 className="text-white font-bold text-sm uppercase">Premiado</h4>
                    <span className="text-xs text-gray-500">Chef do Ano 2023</span>
                </div>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-[#BF953F] to-transparent opacity-30 mb-8"></div>
            
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Signature_sample.svg" 
              alt="Assinatura do Chef" 
              className="h-12 filter invert opacity-50" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};