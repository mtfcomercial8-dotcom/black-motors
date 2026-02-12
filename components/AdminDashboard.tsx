import React, { useEffect, useState, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { ReservationData } from '../types';
import { Check, X, Clock, ShoppingBag, Utensils, RefreshCcw, Lock } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
    const [reservations, setReservations] = useState<ReservationData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'pending'>('all');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');

    const fetchReservations = useCallback(async () => {
        setIsLoading(true);
        if (!isSupabaseConfigured()) {
            setIsLoading(false);
            return;
        }

        let query = supabase
            .from('reservations')
            .select('*')
            .order('created_at', { ascending: false });

        if (filter === 'pending') {
            query = query.eq('status', 'pendente');
        }

        const { data, error } = await query;

        if (!error && data) {
            setReservations(data as ReservationData[]);
        }
        setIsLoading(false);
    }, [filter]);

    const updateStatus = async (id: number, newStatus: 'confirmado' | 'cancelado') => {
        const { error } = await supabase
            .from('reservations')
            .update({ status: newStatus })
            .eq('id', id);

        if (!error) {
            setReservations(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchReservations();
            
            // Set up realtime subscription
            const channel = supabase
                .channel('reservations_channel')
                .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'reservations' }, (payload) => {
                    setReservations(prev => [payload.new as ReservationData, ...prev]);
                    // Optional: Play a sound or show notification
                })
                .subscribe();

            return () => {
                supabase.removeChannel(channel);
            };
        }
    }, [isAuthenticated, fetchReservations]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple mock authentication for demo purposes
        if (password === 'admin123') {
            setIsAuthenticated(true);
        } else {
            alert('Senha incorreta');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6">
                <div className="bg-[#0a0a0a] border border-[#BF953F]/30 p-8 rounded-lg max-w-md w-full text-center">
                    <div className="w-16 h-16 bg-[#BF953F]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Lock className="w-8 h-8 text-[#BF953F]" />
                    </div>
                    <h2 className="text-2xl font-display font-bold text-white mb-6 uppercase">Acesso Administrativo</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Digite a senha de acesso"
                            className="w-full bg-black border border-white/20 py-3 px-4 text-white focus:outline-none focus:border-[#BF953F] transition-colors text-center tracking-widest"
                        />
                        <button className="w-full py-3 bg-gold-metallic text-black font-bold uppercase tracking-widest hover:opacity-90 transition-opacity">
                            Entrar
                        </button>
                    </form>
                    <p className="mt-4 text-xs text-gray-600">Senha Demo: admin123</p>
                </div>
            </div>
        );
    }

    return (
        <section className="min-h-screen bg-[#050505] pt-24 pb-12 px-6">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                    <div>
                        <h2 className="text-3xl font-display font-bold text-white uppercase">Painel de <span className="text-[#BF953F]">Gestão</span></h2>
                        <p className="text-gray-400 text-sm">Monitoramento em tempo real</p>
                    </div>
                    
                    <div className="flex gap-4">
                        <button 
                            onClick={() => setFilter(filter === 'all' ? 'pending' : 'all')}
                            className={`px-4 py-2 border rounded text-xs uppercase tracking-wider font-bold transition-all ${filter === 'pending' ? 'bg-[#BF953F] text-black border-[#BF953F]' : 'text-gray-400 border-white/10'}`}
                        >
                            {filter === 'pending' ? 'Vendo Pendentes' : 'Ver Todos'}
                        </button>
                        <button 
                            onClick={fetchReservations}
                            className="p-2 bg-white/5 border border-white/10 rounded hover:text-[#BF953F] transition-colors"
                        >
                            <RefreshCcw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
                        </button>
                    </div>
                </div>

                {!isSupabaseConfigured() && (
                     <div className="bg-red-900/20 border border-red-500/50 p-4 mb-6 text-center text-red-200 rounded">
                        Erro: Supabase não configurado. Verifique as variáveis de ambiente.
                    </div>
                )}

                <div className="grid gap-4">
                    {reservations.length === 0 && !isLoading ? (
                        <div className="text-center py-20 bg-[#0a0a0a] border border-white/5 rounded-lg">
                            <p className="text-gray-500">Nenhuma solicitação encontrada.</p>
                        </div>
                    ) : (
                        reservations.map((res) => (
                            <div key={res.id} className={`bg-[#0a0a0a] border-l-4 p-6 rounded-r-lg shadow-lg flex flex-col md:flex-row justify-between gap-6 transition-all ${
                                res.status === 'pendente' ? 'border-[#BF953F] bg-[#BF953F]/5' : 
                                res.status === 'confirmado' ? 'border-green-500 opacity-75' : 'border-red-500 opacity-50'
                            }`}>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${res.type === 'reserva' ? 'bg-blue-900/30 text-blue-400' : 'bg-purple-900/30 text-purple-400'}`}>
                                            {res.type === 'reserva' ? <><Utensils className="w-3 h-3 inline mr-1"/> Mesa</> : <><ShoppingBag className="w-3 h-3 inline mr-1"/> Encomenda</>}
                                        </span>
                                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                                            res.status === 'pendente' ? 'bg-yellow-900/30 text-yellow-500' : 
                                            res.status === 'confirmado' ? 'bg-green-900/30 text-green-500' : 'bg-red-900/30 text-red-500'
                                        }`}>
                                            {res.status}
                                        </span>
                                        <span className="text-gray-500 text-xs ml-auto md:ml-0 flex items-center gap-1">
                                            <Clock className="w-3 h-3" /> {new Date(res.created_at).toLocaleString()}
                                        </span>
                                    </div>
                                    
                                    <h3 className="text-xl font-bold text-white mb-1">{res.name}</h3>
                                    <div className="text-sm text-gray-400 grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                                        <div><span className="block text-[#BF953F] text-[10px] uppercase">Data</span> {new Date(res.date).toLocaleDateString()}</div>
                                        <div><span className="block text-[#BF953F] text-[10px] uppercase">Hora</span> {res.time.substring(0, 5)}</div>
                                        <div><span className="block text-[#BF953F] text-[10px] uppercase">Qtd</span> {res.guests}</div>
                                        <div><span className="block text-[#BF953F] text-[10px] uppercase">Tel</span> {res.phone}</div>
                                    </div>
                                    
                                    {res.notes && (
                                        <div className="mt-4 p-3 bg-black/50 border border-white/5 rounded text-sm text-gray-300 italic">
                                            "{res.notes}"
                                        </div>
                                    )}
                                </div>

                                {res.status === 'pendente' && (
                                    <div className="flex md:flex-col gap-2 justify-center border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
                                        <button 
                                            onClick={() => updateStatus(res.id, 'confirmado')}
                                            className="flex-1 px-4 py-2 bg-green-600/20 hover:bg-green-600/40 text-green-400 border border-green-600/50 rounded flex items-center justify-center gap-2 transition-colors"
                                        >
                                            <Check className="w-4 h-4" /> Aprovar
                                        </button>
                                        <button 
                                            onClick={() => updateStatus(res.id, 'cancelado')}
                                            className="flex-1 px-4 py-2 bg-red-600/20 hover:bg-red-600/40 text-red-400 border border-red-600/50 rounded flex items-center justify-center gap-2 transition-colors"
                                        >
                                            <X className="w-4 h-4" /> Recusar
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};