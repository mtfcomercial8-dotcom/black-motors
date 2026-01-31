import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Car } from '../types';
import { Gauge, Calendar, Zap, ArrowUpRight, ArrowRight } from 'lucide-react';

const cars: Car[] = [
  {
    id: 1,
    name: "Huracán EVO",
    brand: "Lamborghini",
    year: 2024,
    price: "Sob Consulta",
    features: ["640 HP", "V10", "2.9s 0-100"],
    image: "https://images.unsplash.com/photo-1566008885218-90abf9200ddb?q=80&w=2232&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "GT-R Nismo",
    brand: "Nissan",
    year: 2023,
    price: "Ao 245.000.000",
    features: ["600 HP", "V6 Twin-Turbo", "AWD"],
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "G 63 AMG",
    brand: "Mercedes-Benz",
    year: 2024,
    price: "Sob Consulta",
    features: ["577 HP", "V8 Biturbo", "Luxury"],
    image: "https://images.unsplash.com/photo-1520031441872-265149a9e690?q=80&w=1997&auto=format&fit=crop"
  }
];

const CarCard: React.FC<{ car: Car; index: number }> = ({ car, index }) => {
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <div 
      ref={elementRef}
      className={`group relative bg-[#0a0a0a] border border-white/5 overflow-hidden transition-all duration-700 transform hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(191,149,63,0.15)] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Golden Border Gradient on Hover */}
      <div className="absolute inset-0 border border-transparent group-hover:border-[#BF953F]/50 transition-colors duration-500 z-10 pointer-events-none"></div>

      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-60"></div>
        <img 
          src={car.image} 
          alt={car.name} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md px-3 py-1 border border-[#BF953F]/30">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FCF6BA]">{car.brand}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 relative z-20">
        <div className="absolute -top-10 left-6">
           <h3 className="text-3xl font-display font-black text-white uppercase italic tracking-tighter drop-shadow-xl">{car.name}</h3>
        </div>
        
        <div className="mt-4 flex gap-4 text-gray-400 text-sm mb-6 border-b border-white/5 pb-4">
            <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-[#BF953F]" />
                {car.year}
            </div>
             <div className="flex items-center gap-1">
                <Zap className="w-4 h-4 text-[#BF953F]" />
                {car.features[0]}
            </div>
             <div className="flex items-center gap-1">
                <Gauge className="w-4 h-4 text-[#BF953F]" />
                {car.features[2]}
            </div>
        </div>

        <div className="flex justify-between items-end">
            <div>
                <p className="text-xs uppercase tracking-widest text-[#BF953F] mb-1">Preço</p>
                <p className="text-xl font-bold text-white group-hover:text-[#FCF6BA] transition-colors">{car.price}</p>
            </div>
            <button className="w-10 h-10 rounded-full bg-white/5 group-hover:bg-gold-metallic flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:text-black border border-white/10 group-hover:border-transparent">
                <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-black" />
            </button>
        </div>
      </div>
      
      {/* Bottom Metallic Line */}
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-gold-metallic group-hover:w-full transition-all duration-700 ease-in-out"></div>
    </div>
  );
};

export const Inventory: React.FC = () => {
  return (
    <section id="inventory" className="py-24 bg-brand-black relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 uppercase">
                    Coleção <span className="text-gold-gradient">Exclusiva</span>
                </h2>
                <div className="h-1 w-20 bg-gold-metallic"></div>
            </div>
            <a href="#" className="hidden md:flex items-center gap-2 text-gray-400 hover:text-[#FCF6BA] transition-colors uppercase text-sm tracking-widest mt-6 md:mt-0">
                Ver todo o estoque <ArrowUpRight className="w-4 h-4" />
            </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car, index) => (
                <CarCard key={car.id} car={car} index={index} />
            ))}
        </div>
        
         <div className="mt-12 text-center md:hidden">
             <a href="#" className="inline-flex items-center gap-2 text-white uppercase text-sm tracking-widest border-b border-[#BF953F] pb-1">
                Ver todo o estoque <ArrowRight className="w-4 h-4" />
            </a>
         </div>
      </div>
    </section>
  );
};