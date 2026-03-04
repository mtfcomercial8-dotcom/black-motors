import React, { useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Car } from '../types';
import { Clock, Flame, Utensils, ArrowUpRight, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const dishes: Car[] = [
  {
    id: 1,
    name: "Moamba de Galinha",
    brand: "Prato Típico",
    year: "45 min",
    price: "15.000 KZ",
    features: ["Galinha Rija", "Funge de Bombó", "Quiabos"],
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Mufete Completo",
    brand: "Especialidade",
    year: "40 min",
    price: "18.000 KZ",
    features: ["Peixe Grelhado", "Feijão de Óleo", "Batata Doce"],
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Calulu de Peixe Seco",
    brand: "Tradição",
    year: "35 min",
    price: "14.000 KZ",
    features: ["Peixe Seco", "Funge de Milho", "Legumes"],
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Cabidela de Galinha",
    brand: "Prato Típico",
    year: "50 min",
    price: "16.500 KZ",
    features: ["Galinha do Campo", "Arroz", "Sangue Fresco"],
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "Funge de Carne Seca",
    brand: "Tradição",
    year: "40 min",
    price: "15.500 KZ",
    features: ["Carne Seca", "Funge Misto", "Molho de Tomate"],
    image: "https://images.unsplash.com/photo-1574484284002-952d92456975?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 6,
    name: "Choco Frito",
    brand: "Frutos do Mar",
    year: "25 min",
    price: "13.000 KZ",
    features: ["Choco Fresco", "Batata Frita", "Molho Tártaro"],
    image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 7,
    name: "Feijão de Óleo de Palma",
    brand: "Acompanhamento",
    year: "30 min",
    price: "8.000 KZ",
    features: ["Feijão Manteiga", "Óleo de Palma", "Tempero Caseiro"],
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 8,
    name: "Kitaba (Entrada)",
    brand: "Petiscos",
    year: "15 min",
    price: "5.000 KZ",
    features: ["Pasta de Amendoim", "Piri-piri", "Mandioca"],
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 9,
    name: "Banana Pão Assada",
    brand: "Acompanhamento",
    year: "20 min",
    price: "3.000 KZ",
    features: ["Banana Pão", "Brasa", "Mel (Opcional)"],
    image: "https://images.unsplash.com/photo-1603052875302-d376b7c0638a?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 10,
    name: "Mousse de Múcua",
    brand: "Sobremesa",
    year: "10 min",
    price: "4.000 KZ",
    features: ["Fruta Múcua", "Creme", "Toque de Canela"],
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 11,
    name: "Kissangua Tradicional",
    brand: "Bebidas",
    year: "Fresco",
    price: "2.500 KZ",
    features: ["Milho/Ananás", "Fermentação Natural", "Gelada"],
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 12,
    name: "Vinho Português",
    brand: "Adega",
    year: "Safra 2018",
    price: "Sob Consulta",
    features: ["Tinto", "Douro", "Encorpado"],
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1000&auto=format&fit=crop"
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

  const generatePDF = () => {
    const doc = new jsPDF();

    // Add Logo/Header
    doc.setFillColor(5, 5, 5); // Black background for header
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(191, 149, 63); // Gold color
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("SABORES DO COMEÇO", 105, 20, { align: "center" });
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Menu Exclusivo", 105, 28, { align: "center" });

    // Prepare table data
    const tableData = dishes.map(dish => [
      dish.name,
      dish.brand, // Category
      dish.features.join(', '),
      dish.price
    ]);

    autoTable(doc, {
      startY: 50,
      head: [['Prato', 'Categoria', 'Detalhes', 'Preço']],
      body: tableData,
      theme: 'grid',
      headStyles: {
        fillColor: [191, 149, 63], // Gold
        textColor: [0, 0, 0],
        fontStyle: 'bold'
      },
      styles: {
        fontSize: 10,
        cellPadding: 6,
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      columnStyles: {
        0: { fontStyle: 'bold', cellWidth: 50 },
        2: { cellWidth: 'auto' },
        3: { fontStyle: 'bold', halign: 'right' }
      }
    });

    // Footer
    const pageCount = doc.getNumberOfPages();
    for(let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(100);
        doc.text('Sabores do Começo - Luanda, Angola', 105, 290, { align: 'center' });
    }

    doc.save('menu-sabores-do-comeco.pdf');
  };

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
             <button 
                onClick={generatePDF}
                className="inline-flex items-center gap-2 px-8 py-3 border border-[#BF953F] text-[#FCF6BA] uppercase text-sm tracking-widest hover:bg-[#BF953F] hover:text-black transition-all duration-300"
             >
                <Download className="w-4 h-4" />
                Baixar Menu em PDF
            </button>
         </div>
      </div>
    </section>
  );
};