import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const teamMembers = [
  {
    name: "André Silva",
    role: "Chef Executivo",
    image: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=1000&auto=format&fit=crop"
  },
  {
    name: "Maria João",
    role: "Sous Chef",
    image: "https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?q=80&w=1000&auto=format&fit=crop"
  },
  {
    name: "Paulo Mendes",
    role: "Sommelier",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"
  },
  {
    name: "Ana Costa",
    role: "Gerente de Sala",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop"
  }
];

export const Team: React.FC = () => {
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <section className="py-24 bg-[#0a0a0a] border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#BF953F] uppercase tracking-[0.2em] text-xs font-bold">Talentos</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mt-2 uppercase">
            Quem Faz <span className="text-gold-gradient">Acontecer</span>
          </h2>
        </div>

        <div 
          ref={elementRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              className={`group relative overflow-hidden rounded-sm transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-6 pt-20">
                <h3 className="text-xl font-display font-bold text-white mb-1">{member.name}</h3>
                <p className="text-[#BF953F] text-sm uppercase tracking-widest">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
