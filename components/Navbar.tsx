import React, { useState, useEffect } from 'react';
import { Menu, X, CarFront } from 'lucide-react';
import { NavItem } from '../types';

const navItems: NavItem[] = [
  { label: 'Início', href: '#hero' },
  { label: 'Estoque', href: '#inventory' },
  { label: 'Serviços', href: '#services' },
  { label: 'Sobre', href: '#about' },
  { label: 'Contato', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <CarFront className="w-8 h-8 text-[#FCF6BA] drop-shadow-[0_0_5px_rgba(191,149,63,0.5)]" />
          <span className="font-display font-bold text-2xl tracking-widest text-white">
            BLACK<span className="text-gold-gradient drop-shadow-[0_0_8px_rgba(191,149,63,0.3)]">MOTORS</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => (
            <a 
              key={item.label} 
              href={item.href}
              className="text-sm uppercase tracking-widest text-gray-300 hover:text-[#FCF6BA] transition-colors duration-300 font-medium relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-metallic transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <button className="relative px-6 py-2 group overflow-hidden">
            <div className="absolute inset-0 bg-gold-metallic opacity-20 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 border border-[#BF953F] group-hover:border-[#FCF6BA] transition-colors duration-300"></div>
            <span className="relative z-10 text-[#FCF6BA] group-hover:text-black uppercase text-xs tracking-widest font-bold font-display transition-colors duration-300">
              Agendar Visita
            </span>
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu className="text-[#FCF6BA]" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="flex flex-col p-6 gap-4">
          {navItems.map((item) => (
            <a 
              key={item.label} 
              href={item.href}
              className="text-lg font-display uppercase text-white hover:text-[#FCF6BA]"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};