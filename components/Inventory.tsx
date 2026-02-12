import React, { useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Car } from '../types';
import { Clock, Flame, Utensils, ArrowUpRight } from 'lucide-react';

const dishes: Car[] = [
  {
    id: 1,
    name: "Wagyu A5 Gold",
    brand: "Cortes Nobres",
    year: "30 min",
    price: "25.000 KZ",
    features: ["Wagyu Japão", "Folha de Ouro", "Trufas"],
    image: "https://images.unsplash.com/photo-1546833998-877b37c2e5c4?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Lagosta Thermidor",
    brand: "Frutos do Mar",
    year: "45 min",
    price: "18.000 KZ",
    features: ["Lagosta Fresca", "Queijo Gruyère", "Ervas Finas"],
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Risoto de Açafrão",
    brand: "Prato Principal",
    year: "25 min",
    price: "12.000 KZ",
    features: ["Arroz Arbóreo", "Açafrão Real", "Parmesão"],
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Caviar Beluga",
    brand: "Entradas",
    year: "10 min",
    price: "Sob Consulta",
    features: ["Caviar Importado", "Blinis", "Creme Azedo"],
    image: "https://images.unsplash.com/photo-1625937751876-4515cd8e7752?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "Tiramisu Gold",
    brand: "Sobremesa",
    year: "15 min",
    price: "6.000 KZ",
    features: ["Mascarpone", "Café Arábica", "Cacau"],
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 6,
    name: "Vinho Château Margaux",
    brand: "Adega",
    year: "Safra 2015",
    price: "Sob Consulta",
    features: ["Tinto", "França", "Encorpado"],
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 7,
    name: "Salmão Grelhado",
    brand: "Frutos do Mar",
    year: "25 min",
    price: "14.000 KZ",
    features: ["Salmão Fresco", "Aspargos", "Molho Citrico"],
    image: "https://images.unsplash.com/photo-1467003909585-2f8a7270028d?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 8,
    name: "Carré de Cordeiro",
    brand: "Cortes Nobres",
    year: "40 min",
    price: "19.500 KZ",
    features: ["Cordeiro", "Hortelã", "Purê Rústico"],
    image: "https://images.unsplash.com/photo-1544025162-d76690b6d029?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 9,
    name: "Sushi Premium Set",
    brand: "Japonês",
    year: "20 min",
    price: "22.000 KZ",
    features: ["Peixe Fresco", "Sashimi", "Nigiri"],
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1000&auto=format&fit=crop"
  }
];

const categories = ['Todos', ...new Set(dishes.map(d => d.brand))];

const DishCard: React.FC<{ car: Car; index: number }> = ({ car, index }) => {
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <div 
      ref={elementRef}
      className={`group relative bg-[#0a0a0a] border border-white/5 overflow-hidden transition-all duration-700 transform hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(191,149,63,0.15)] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
      style={{ transitionDelay: `${index * 50}ms` }}
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
                <Clock className="w-3 h-3 text-[#BF953F]" />
                {car.year}
            </div>
             <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded">
                <Utensils className="w-3 h-3 text-[#BF953F]" />
                {car.features[0]}
            </div>
             <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded">
                <Flame className="w-3 h-3 text-[#BF953F]" />
                {car.features[2]}
            </div>
        </div>

        <div className="flex justify-between items-end">
            <div>
                <p className="text-xs uppercase tracking-widest text-[#BF953F] mb-1">Valor</p>
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
  const [activeCategory, setActiveCategory] = useState('Todos');

  const filteredDishes = activeCategory === 'Todos' 
    ? dishes 
    : dishes.filter(dish => dish.brand === activeCategory);

  return (
    <section id="inventory" className="py-24 bg-brand-black relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-4 uppercase">
                Menu <span className="text-gold-gradient">Exclusivo</span>
            </h2>
            <div className="h-1 w-24 bg-gold-metallic mb-6"></div>
            <p className="text-gray-400 max-w-xl mb-10">
              Uma seleção curada dos pratos mais desejados. Selecione uma categoria abaixo para explorar nossos sabores.
            </p>

            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2 border transition-all duration-300 uppercase text-xs tracking-widest font-bold ${
                    activeCategory === category
                      ? 'bg-gold-metallic text-black border-[#BF953F] shadow-[0_0_15px_rgba(191,149,63,0.4)]'
                      : 'bg-transparent text-gray-400 border-white/10 hover:border-[#BF953F] hover:text-[#FCF6BA]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[500px]">
            {filteredDishes.map((dish, index) => (
                <DishCard key={dish.id} car={dish} index={index} />
            ))}
        </div>
        
         <div className="mt-16 text-center">
             <a href="#contact" className="inline-flex px-8 py-3 border border-[#BF953F] text-[#FCF6BA] uppercase text-sm tracking-widest hover:bg-[#BF953F] hover:text-black transition-all duration-300">
                Ver Carta Completa em PDF
            </a>
         </div>
      </div>
    </section>
  );
};