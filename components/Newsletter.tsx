import React, { useState } from 'react';
import { Mail, Bell } from 'lucide-react';

export const Newsletter: React.FC = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'success'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(email) {
            setStatus('success');
            setTimeout(() => setStatus('idle'), 3000);
            setEmail('');
        }
    };

    return (
        <section className="py-20 bg-[#050505] border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="bg-gradient-to-r from-[#0a0a0a] to-[#111] border border-[#BF953F]/20 p-8 md:p-12 rounded-sm relative overflow-hidden">
                    {/* Decorative Shine */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#BF953F]/10 blur-[100px] rounded-full"></div>
                    
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                        <div className="md:w-1/2">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-[#BF953F]/20 rounded-full">
                                    <Bell className="w-5 h-5 text-[#FCF6BA]" />
                                </div>
                                <span className="text-[#BF953F] font-bold text-xs uppercase tracking-[0.2em]">Sabores VIP Club</span>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                                Eventos Exclusivos & <br/>Menus Sazonais
                            </h3>
                            <p className="text-gray-400 text-sm">
                                Junte-se à nossa lista exclusiva para receber convites para jantares harmonizados e novidades do Chef em primeira mão.
                            </p>
                        </div>

                        <div className="w-full md:w-1/2">
                            {status === 'success' ? (
                                <div className="bg-green-900/20 border border-green-500/50 p-4 text-center text-green-400 rounded animate-[fadeIn_0.5s_ease-out]">
                                    <span className="font-bold">Bem-vindo ao Clube!</span> Entraremos em contato em breve.
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                                    <div className="relative w-full">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                                        <input 
                                            type="email" 
                                            placeholder="Seu melhor e-mail"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="w-full bg-black border border-white/10 py-3 pl-12 pr-4 text-white focus:outline-none focus:border-[#BF953F] transition-colors"
                                        />
                                    </div>
                                    <button 
                                        type="submit"
                                        className="px-8 py-3 bg-[#BF953F] text-black font-bold uppercase tracking-widest hover:bg-[#FCF6BA] transition-colors whitespace-nowrap"
                                    >
                                        Inscrever-se
                                    </button>
                                </form>
                            )}
                            <p className="text-xs text-gray-600 mt-3">
                                *Zero spam. Apenas gastronomia de alta qualidade.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};