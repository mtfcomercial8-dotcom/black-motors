import React, { useState, useEffect } from 'react';
import { Menu, X, UtensilsCrossed, User } from 'lucide-react';
import { NavItem, PageType } from '../types';

const navItems: NavItem[] = [
  { label: 'Início', href: '#hero' },
  { label: 'O Chef', href: '#about' },
  { label: 'Experiências', href: '#services' },
  { label: 'Menu', href: '#inventory' },
  { label: 'Reservas', href: '#reservation' },
];

interface NavbarProps {
  onNavigate: (page: PageType, sectionId?: string) => void;
  currentPage: PageType;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (href === '#inventory') {
      onNavigate('inventory');
    } else if (href === '#reservation') {
      onNavigate('reservation');
    } else {
      onNavigate('home', href);
    }
  };

  // Don't show Navbar on Login page
  if (currentPage === 'login') return null;

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled || currentPage !== 'home' ? 'bg-black/90 backdrop-blur-md border-b border-white/10 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 group cursor-pointer"
          onClick={() => onNavigate('home', '#hero')}
        >
          <UtensilsCrossed className="w-8 h-8 text-[#FCF6BA] drop-shadow-[0_0_5px_rgba(191,149,63,0.5)]" />
          <span className="font-display font-bold text-xl md:text-2xl tracking-widest text-white">
            SABORES<span className="text-gold-gradient drop-shadow-[0_0_8px_rgba(191,149,63,0.3)]">DOCOMEÇO</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => (
            <a 
              key={item.label} 
              href={item.href}
              onClick={(e) => handleLinkClick(e, item.href)}
              className={`text-sm uppercase tracking-widest hover:text-[#FCF6BA] transition-colors duration-300 font-medium relative group ${
                (currentPage === 'inventory' && item.href === '#inventory') || 
                (currentPage === 'reservation' && item.href === '#reservation') ||
                (currentPage === 'home' && item.href !== '#inventory' && item.href !== '#reservation') 
                  ? 'text-white' 
                  : 'text-gray-400'
              }`}
            >
              {item.label}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-gold-metallic transition-all duration-300 ${
                (currentPage === 'inventory' && item.href === '#inventory') || 
                (currentPage === 'reservation' && item.href === '#reservation')
                  ? 'w-full' 
                  : 'w-0 group-hover:w-full'
              }`}></span>
            </a>
          ))}
          
          <div className="flex items-center gap-4">
             <button 
              onClick={() => onNavigate('admin')}
              className="text-gray-400 hover:text-[#BF953F] transition-colors p-2"
              title="Área do Cliente / Login"
            >
              <User className="w-5 h-5" />
            </button>
            
            <button 
              className="relative px-6 py-2 group overflow-hidden"
              onClick={() => onNavigate('reservation')}
            >
              <div className="absolute inset-0 bg-gold-metallic opacity-20 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 border border-[#BF953F] group-hover:border-[#FCF6BA] transition-colors duration-300"></div>
              <span className="relative z-10 text-[#FCF6BA] group-hover:text-black uppercase text-xs tracking-widest font-bold font-display transition-colors duration-300">
                Reservar Agora
              </span>
            </button>
          </div>
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
              onClick={(e) => handleLinkClick(e, item.href)}
            >
              {item.label}
            </a>
          ))}
          <button 
             onClick={() => { setIsMenuOpen(false); onNavigate('admin'); }}
             className="text-lg font-display uppercase text-left text-white hover:text-[#BF953F] flex items-center gap-2"
          >
             <User className="w-5 h-5" /> Login / Admin
          </button>
        </div>
      </div>
    </nav>
  );
};