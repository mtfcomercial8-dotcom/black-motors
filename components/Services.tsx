import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Utensils, Wine, PartyPopper, ChefHat } from 'lucide-react';

const services = [
    {
        icon: <Utensils className="w-8 h-8" />,
        title: "Jantar à La Carte",
        description: "Um menu cuidadosamente elaborado com ingredientes locais e importados, preparado por nossos chefs premiados."
    },
    {
        icon: <PartyPopper className="w-8 h-8" />,
        title: "Eventos Privados",
        description: "Transforme sua celebração em um momento inesquecível com nosso salão exclusivo e menu personalizado."
    },
    {
        icon: <Wine className="w-8 h-8" />,
        title: "Carta de Vinhos",
        description: "Uma seleção rigorosa dos melhores rótulos do mundo, harmonizados perfeitamente com nossos pratos."
    },
    {
        icon: <ChefHat className="w-8 h-8" />,
        title: "Chef em Casa",
        description: "Leve a experiência do Sabores do Começo para sua residência com nosso serviço exclusivo de personal chef."
    }
];

export const Services: React.FC = () => {
    const { elementRef, isVisible } = useIntersectionObserver();

    return (
        <section id="services" className="py-24 bg-brand-dark relative overflow-hidden">
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-10 left-10 w-96 h-96 bg-[#BF953F] rounded-full filter blur-[150px] opacity-20"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#AA771C] rounded-full filter blur-[150px] opacity-10"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                     <span className="text-[#FCF6BA] uppercase tracking-[0.2em] text-sm font-bold">Nossa Expertise</span>
                     <h2 className="text-4xl md:text-5xl font-display font-bold text-white mt-4 uppercase">
                        Excelência em <span className="text-gold-gradient">Cada Detalhe</span>
                    </h2>
                </div>

                <div ref={elementRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <div 
                            key={index}
                            className={`p-8 border border-white/5 bg-white/5 backdrop-blur-sm hover:bg-[#1a1a1a] hover:border-[#BF953F]/30 transition-all duration-500 group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'} hover:shadow-[0_0_20px_rgba(191,149,63,0.1)]`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <div className="mb-6 p-4 bg-black border border-[#BF953F]/20 inline-block rounded-lg text-[#FCF6BA] group-hover:text-black group-hover:bg-gold-metallic transition-all duration-500 shadow-[0_0_10px_rgba(191,149,63,0.2)]">
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-display font-bold text-white mb-4 uppercase">{service.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};