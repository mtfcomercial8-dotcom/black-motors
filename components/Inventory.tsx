import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Car } from '../types';
import { Gauge, Calendar, Zap, ArrowUpRight } from 'lucide-react';

const cars: Car[] = [
  {
    id: 1,
    name: "Land Cruiser LC300",
    brand: "Toyota",
    year: 2024,
    price: "Sob Consulta",
    features: ["V6 Twin-Turbo", "GR Sport", "0km"],
    image: "https://i.postimg.cc/VkdCsDCj/573183476-17882799537400240-2328421518204069278-n.jpg"
  },
  {
    id: 2,
    name: "Lexus LX 600",
    brand: "Lexus",
    year: 2024,
    price: "Sob Consulta",
    features: ["VIP Edition", "V6 Turbo", "Ultra Luxury"],
    image: "https://i.postimg.cc/W1FdctRL/588512416-17888293113400240-565333317880983856-n.jpg"
  },
  {
    id: 3,
    name: "Prado VX-L",
    brand: "Toyota",
    year: 2025,
    price: "Sob Consulta",
    features: ["Diesel D-4D", "4x4", "Black Pack"],
    image: "https://i.postimg.cc/59syH81R/599495475-17887812369400240-3675555262069311108-n.jpg"
  },
  {
    id: 4,
    name: "Fortuner GR-S",
    brand: "Toyota",
    year: 2024,
    price: "Sob Consulta",
    features: ["Sport Tuned", "224 HP", "Leather"],
    image: "https://i.postimg.cc/MTWZHpLc/599864913-17887722840400240-7779305653126395731-n.jpg"
  },
  {
    id: 5,
    name: "Hilux GR Sport",
    brand: "Toyota",
    year: 2024,
    price: "Sob Consulta",
    features: ["Wide Track", "Suspension+", "JBL Audio"],
    image: "https://i.postimg.cc/HxZmL45Z/602985793-17888622564400240-3406813203303493612-n.jpg"
  },
  {
    id: 6,
    name: "Range Rover",
    brand: "Land Rover",
    year: 2024,
    price: "Sob Consulta",
    features: ["Autobiography", "P530", "Exec Class"],
    image: "https://i.postimg.cc/wvGKzx8Z/603057709-17888622210400240-8920537023901278805-n.jpg"
  },
  {
    id: 7,
    name: "G 63 AMG",
    brand: "Mercedes-Benz",
    year: 2023,
    price: "Sob Consulta",
    features: ["V8 Biturbo", "Night Pkg", "Carbon"],
    image: "https://i.postimg.cc/jj8qWbYg/509680605-593791197115587-4192616528417946862-n.jpg"
  },
  {
    id: 8,
    name: "Land Cruiser 79",
    brand: "Toyota",
    year: 2024,
    price: "Sob Consulta",
    features: ["V8 Diesel", "Namib Edition", "4x4"],
    image: "https://i.postimg.cc/9Fdzbsjy/599525265-17887946079400240-1779273656960371058-n.jpg"
  },
  {
    id: 9,
    name: "Lexus LX 500d",
    brand: "Lexus",
    year: 2024,
    price: "Sob Consulta",
    features: ["F-Sport", "Diesel", "Black Ed."],
    image: "https://i.postimg.cc/28hLJVnj/601765087-17888293083400240-8636408631964467256-n.jpg"
  }
];

const CarCard: React.FC<{ car: Car; index: number }> = ({ car, index }) => {
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <div 
      ref={elementRef}
      className={`group relative bg-[#0a0a0a] border border-white/5 overflow-hidden transition-all duration-700 transform hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(191,149,63,0.15)] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Golden Border Gradient on Hover */}
      <div className="absolute inset-0 border border-transparent group-hover:border-[#BF953F]/50 transition-colors duration-500 z-10 pointer-events-none"></div>

      {/* Image Container */}
      <div className="relative h-72 overflow-hidden">
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
           <h3 className="text-2xl font-display font-black text-white uppercase italic tracking-tighter drop-shadow-xl w-full break-words pr-4">{car.name}</h3>
        </div>
        
        <div className="mt-4 flex gap-3 text-gray-400 text-xs mb-6 border-b border-white/5 pb-4 flex-wrap">
            <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded">
                <Calendar className="w-3 h-3 text-[#BF953F]" />
                {car.year}
            </div>
             <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded">
                <Zap className="w-3 h-3 text-[#BF953F]" />
                {car.features[0]}
            </div>
             <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded">
                <Gauge className="w-3 h-3 text-[#BF953F]" />
                {car.features[2]}
            </div>
        </div>

        <div className="flex justify-between items-end">
            <div>
                <p className="text-xs uppercase tracking-widest text-[#BF953F] mb-1">Preço</p>
                <p className="text-lg font-bold text-white group-hover:text-[#FCF6BA] transition-colors">{car.price}</p>
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
        <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-4 uppercase">
                Estoque <span className="text-gold-gradient">Atualizado</span>
            </h2>
            <div className="h-1 w-24 bg-gold-metallic mb-6"></div>
            <p className="text-gray-400 max-w-xl">
              Nossa seleção curada dos veículos mais desejados de Angola. Qualidade, procedência e exclusividade garantida.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car, index) => (
                <CarCard key={car.id} car={car} index={index} />
            ))}
        </div>
        
         <div className="mt-16 text-center">
             <a href="#contact" className="inline-flex px-8 py-3 border border-[#BF953F] text-[#FCF6BA] uppercase text-sm tracking-widest hover:bg-[#BF953F] hover:text-black transition-all duration-300">
                Falar com um consultor
            </a>
         </div>
      </div>
    </section>
  );
};