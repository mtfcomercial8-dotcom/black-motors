import React from 'react';
import { Instagram, Facebook, Phone, MapPin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
    return (
        <footer id="contact" className="bg-black border-t border-white/10 pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                    <div className="col-span-1">
                        <h2 className="font-display font-bold text-3xl tracking-widest text-white mb-6">
                            BLACK<span className="text-gold-gradient">MOTORS</span>
                        </h2>
                        <p className="text-gray-400 max-w-sm mb-8">
                            A referência em automóveis de luxo em Angola. Trazemos o que há de mais moderno e exclusivo no mundo automotivo diretamente para sua garagem.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://www.instagram.com/blackmotors_ao/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 hover:bg-gold-metallic hover:text-black flex items-center justify-center transition-colors text-white border border-white/10 hover:border-transparent">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-blue-600 flex items-center justify-center transition-colors text-white border border-white/10 hover:border-transparent">
                                <Facebook className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-display font-bold text-white uppercase tracking-widest mb-6">Contato</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li className="flex items-center gap-3 group">
                                <Phone className="w-4 h-4 text-[#BF953F] group-hover:text-[#FCF6BA] transition-colors" />
                                <span>+244 923 000 000</span>
                            </li>
                            <li className="flex items-center gap-3 group">
                                <Mail className="w-4 h-4 text-[#BF953F] group-hover:text-[#FCF6BA] transition-colors" />
                                <span>contato@blackmotors.ao</span>
                            </li>
                            <li className="flex items-start gap-3 group">
                                <MapPin className="w-4 h-4 text-[#BF953F] group-hover:text-[#FCF6BA] mt-1 transition-colors" />
                                <span>Luanda, Angola<br/>Talatona, Via S8</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-display font-bold text-white uppercase tracking-widest mb-6">Links Rápidos</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li><a href="#hero" className="hover:text-[#FCF6BA] transition-colors">Início</a></li>
                            <li><a href="#inventory" className="hover:text-[#FCF6BA] transition-colors">Estoque</a></li>
                            <li><a href="https://wa.me/244923000000" className="hover:text-[#FCF6BA] transition-colors">Agendar Visita</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 uppercase tracking-widest">
                    <p>&copy; {new Date().getFullYear()} Black Motors AO. Todos os direitos reservados.</p>
                    <p className="mt-4 md:mt-0">Design inspirado no Futuro</p>
                </div>
            </div>
        </footer>
    );
};