import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const featuredDishes = [
  {
    image: "https://images.unsplash.com/photo-1544025162-d76690b6d029?q=80&w=1000&auto=format&fit=crop",
    label: "Fusion Cuisine"
  },
  {
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=1000&auto=format&fit=crop",
    label: "Cortes Premium"
  },
  {
    image: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?q=80&w=1000&auto=format&fit=crop",
    label: "Adega Exclusiva"
  }
];

export const Featured: React.FC = () => {
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <section className="py-20 bg-[#080808] relative border-b border-white/5">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
            <span className="text-[#BF953F] uppercase tracking-[0.2em] text-xs font-bold">Experiência</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mt-2 uppercase">
                O Chef <span className="text-gold-gradient">Recomenda</span>
            </h2>
        </div>

        <div 
          ref={elementRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {featuredDishes.map((dish, index) => (
            <div 
              key={index}
              className={`group relative h-64 md:h-80 overflow-hidden border border-white/10 rounded-sm cursor-pointer transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Image */}
              <div className="absolute inset-0 bg-gray-900">
                  <img 
                    src={dish.image} 
                    alt={dish.label} 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"
                  />
              </div>

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>

              {/* Border Effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#BF953F]/40 transition-colors duration-300 z-10"></div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-6 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="h-0.5 w-8 bg-gold-metallic mb-3 group-hover:w-16 transition-all duration-500"></div>
                <h3 className="text-xl font-display font-bold text-white uppercase tracking-wider group-hover:text-[#FCF6BA] transition-colors">
                    {dish.label}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};