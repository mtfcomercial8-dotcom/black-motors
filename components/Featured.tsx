import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const featuredCars = [
  {
    image: "https://i.postimg.cc/DZP1t09s/523935194-1073335728106542-8462685573564621876-n.jpg",
    label: "Design Exclusivo"
  },
  {
    image: "https://i.postimg.cc/KYXLjtFr/1769857257.png",
    label: "Alta Performance"
  },
  {
    image: "https://i.postimg.cc/xC5b67ms/520992981-646857705092804-1035826799427051737-n.jpg",
    label: "Luxo Supremo"
  }
];

export const Featured: React.FC = () => {
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <section className="py-20 bg-[#080808] relative border-b border-white/5">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
            <span className="text-[#BF953F] uppercase tracking-[0.2em] text-xs font-bold">Showroom</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mt-2 uppercase">
                Novas <span className="text-gold-gradient">Aquisições</span>
            </h2>
        </div>

        <div 
          ref={elementRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {featuredCars.map((car, index) => (
            <div 
              key={index}
              className={`group relative h-64 md:h-80 overflow-hidden border border-white/10 rounded-sm cursor-pointer transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Image */}
              <div className="absolute inset-0 bg-gray-900">
                  <img 
                    src={car.image} 
                    alt={car.label} 
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
                    {car.label}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};