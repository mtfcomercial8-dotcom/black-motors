import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1000&auto=format&fit=crop",
    alt: "Prato de Marisco Premium",
    category: "Pratos"
  },
  {
    src: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1000&auto=format&fit=crop",
    alt: "Cocktails de Assinatura",
    category: "Bebidas"
  },
  {
    src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop",
    alt: "Ambiente do Restaurante",
    category: "Ambiente"
  },
  {
    src: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=1000&auto=format&fit=crop",
    alt: "Moamba de Galinha",
    category: "Pratos"
  },
  {
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop",
    alt: "Sala de Jantar VIP",
    category: "Ambiente"
  },
  {
    src: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=1000&auto=format&fit=crop",
    alt: "Chef em Ação",
    category: "Equipa"
  },
  {
    src: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=1000&auto=format&fit=crop",
    alt: "Mufete Tradicional",
    category: "Pratos"
  },
  {
    src: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1000&auto=format&fit=crop",
    alt: "Calulu de Peixe",
    category: "Pratos"
  }
];

export const Gallery: React.FC = () => {
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <section className="py-24 bg-[#050505]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#BF953F] uppercase tracking-[0.2em] text-xs font-bold">Visual</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mt-2 uppercase">
            Nossa <span className="text-gold-gradient">Galeria</span>
          </h2>
        </div>

        <div 
          ref={elementRef}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {galleryImages.map((img, index) => (
            <div 
              key={index}
              className={`relative group overflow-hidden rounded-sm aspect-square cursor-pointer transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center p-4">
                  <span className="text-[#BF953F] text-xs uppercase tracking-widest block mb-2">{img.category}</span>
                  <h4 className="text-white font-display font-bold">{img.alt}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
