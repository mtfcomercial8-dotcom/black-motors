import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const stats = [
    { value: "500+", label: "Veículos Vendidos" },
    { value: "100%", label: "Satisfação" },
    { value: "10", label: "Anos de Mercado" },
];

export const About: React.FC = () => {
    const { elementRef, isVisible } = useIntersectionObserver();

    return (
        <section id="about" className="py-24 bg-brand-black relative">
             <div className="container mx-auto px-6 relative z-10">
                 <div className="flex flex-col md:flex-row gap-16 items-center">
                     <div className="w-full md:w-1/2" ref={elementRef}>
                         <h2 className={`text-4xl md:text-6xl font-display font-bold text-white mb-8 uppercase leading-tight transition-all duration-700 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
                             Não vendemos apenas carros, <br/>
                             <span className="text-gold-gradient">Realizamos Sonhos.</span>
                         </h2>
                         <p className={`text-gray-400 text-lg mb-8 leading-relaxed transition-all duration-700 delay-200 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
                             A Black Motors AO nasceu da paixão pela velocidade e pelo design. Em Angola, nos estabelecemos como a ponte direta entre você e as máquinas mais desejadas do planeta. Nosso compromisso é com a qualidade, procedência e um atendimento que entende o seu estilo de vida.
                         </p>
                         
                         <div className={`grid grid-cols-3 gap-8 transition-all duration-700 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                             {stats.map((stat, idx) => (
                                 <div key={idx}>
                                     <h3 className="text-3xl md:text-4xl font-bold text-[#FCF6BA] mb-2">{stat.value}</h3>
                                     <p className="text-xs text-gray-500 uppercase tracking-widest">{stat.label}</p>
                                 </div>
                             ))}
                         </div>
                     </div>
                     
                     <div className="w-full md:w-1/2 relative">
                         <div className="relative z-10 border border-white/10 bg-white/5 p-2 backdrop-blur-sm">
                             <img src="https://i.postimg.cc/fRFYYxvY/504885413-1747222475863981-5039661255860359832-n.jpg" alt="Showroom" className="w-full h-auto shadow-2xl" />
                         </div>
                         {/* Decorative squares */}
                         <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-[#BF953F] z-0 opacity-70"></div>
                         <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-[#BF953F] z-0 opacity-70"></div>
                     </div>
                 </div>
             </div>
        </section>
    );
};