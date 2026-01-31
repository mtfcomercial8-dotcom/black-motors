import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Wrench, Shield, Droplets, Gem } from 'lucide-react';

const services = [
    {
        icon: <Gem className="w-8 h-8" />,
        title: "Venda Premium",
        description: "Acesso aos veículos mais exclusivos do mercado mundial, com processo de importação transparente e seguro."
    },
    {
        icon: <Wrench className="w-8 h-8" />,
        title: "Customização",
        description: "Transforme seu veículo em uma obra de arte única com nossos serviços de tuning e modificação estética."
    },
    {
        icon: <Droplets className="w-8 h-8" />,
        title: "Estética Automotiva",
        description: "Detalhamento completo, polimento técnico e proteção cerâmica para manter o brilho de showroom."
    },
    {
        icon: <Shield className="w-8 h-8" />,
        title: "Blindagem",
        description: "Tecnologia de ponta em proteção balística, garantindo segurança máxima sem comprometer a performance."
    }
];

export const Services: React.FC = () => {
    const { elementRef, isVisible } = useIntersectionObserver();

    return (
        <section id="services" className="py-24 bg-brand-dark relative overflow-hidden">
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-10 left-10 w-96 h-96 bg-brand-gold rounded-full filter blur-[150px]"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-900 rounded-full filter blur-[150px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                     <span className="text-brand-gold uppercase tracking-[0.2em] text-sm font-bold">Nossa Expertise</span>
                     <h2 className="text-4xl md:text-5xl font-display font-bold text-white mt-4 uppercase">
                        Excelência em <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">Cada Detalhe</span>
                    </h2>
                </div>

                <div ref={elementRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <div 
                            key={index}
                            className={`p-8 border border-white/5 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-brand-gold/50 transition-all duration-500 group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <div className="mb-6 p-4 bg-black inline-block rounded-lg text-brand-gold group-hover:text-black group-hover:bg-brand-gold transition-colors duration-300">
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