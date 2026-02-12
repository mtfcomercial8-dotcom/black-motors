import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: "Mariana Costa",
    role: "Crítica Gastronômica",
    text: "Uma explosão de sabores indescritível. O Wagyu A5 é simplesmente a melhor carne que já provei em Luanda. O atendimento é de classe mundial.",
    rating: 5
  },
  {
    name: "Carlos Eduardo",
    role: "Empresário",
    text: "O ambiente é perfeito para fechar negócios importantes. A privacidade, a carta de vinhos e a sofisticação fazem do Sabores do Começo minha única escolha.",
    rating: 5
  },
  {
    name: "Sofia Mendes",
    role: "Sommelier",
    text: "Fiquei impressionada com a harmonização proposta pelo Chef. A adega é vasta e muito bem curada. Uma joia em Talatona.",
    rating: 5
  }
];

export const Testimonials: React.FC = () => {
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <section className="py-24 bg-[#0a0a0a] relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
            <span className="text-[#BF953F] uppercase tracking-[0.2em] text-xs font-bold">Reconhecimento</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mt-2 uppercase">
                A Palavra de Quem <span className="text-gold-gradient">Provou</span>
            </h2>
        </div>

        <div 
          ref={elementRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((item, index) => (
            <div 
              key={index}
              className={`bg-[#050505] p-8 border border-white/5 relative group hover:-translate-y-2 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <Quote className="absolute top-8 right-8 w-10 h-10 text-[#BF953F]/10 group-hover:text-[#BF953F]/30 transition-colors" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#BF953F] fill-[#BF953F]" />
                ))}
              </div>

              <p className="text-gray-400 italic mb-8 leading-relaxed">"{item.text}"</p>
              
              <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#BF953F] to-[#AA771C] rounded-full flex items-center justify-center font-bold text-black font-display">
                      {item.name.charAt(0)}
                  </div>
                  <div>
                      <h4 className="text-white font-bold uppercase text-sm tracking-wide">{item.name}</h4>
                      <p className="text-[#BF953F] text-xs uppercase tracking-wider">{item.role}</p>
                  </div>
              </div>
              
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-metallic group-hover:w-full transition-all duration-700"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};