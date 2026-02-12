import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { ReservationData } from '../types';
import { Check, X, Clock, ShoppingBag, Utensils, RefreshCcw, LogOut, LayoutDashboard, AlertCircle, CalendarCheck, Archive } from 'lucide-react';

interface AdminDashboardProps {
    onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
    const [reservations, setReservations] = useState<ReservationData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'pending' | 'confirmed' | 'all'>('pending');

    // Busca todos os dados para permitir filtros locais e métricas
    const fetchReservations = useCallback(async () => {
        setIsLoading(true);
        if (!isSupabaseConfigured()) {
            setIsLoading(false);
            return;
        }

        const { data, error } = await supabase
            .from('reservations')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data) {
            setReservations(data as ReservationData[]);
        }
        setIsLoading(false);
    }, []);

    const updateStatus = async (id: number, newStatus: 'pendente' | 'confirmado' | 'cancelado') => {
        // Atualização otimista da UI
        setReservations(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));

        const { error } = await supabase
            .from('reservations')
            .update({ status: newStatus })
            .eq('id', id);

        if (error) {
            // Reverte se der erro (opcional, simplificado aqui)
            console.error("Erro ao atualizar status", error);
            fetchReservations(); 
        }
    };

    useEffect(() => {
        fetchReservations();
        
        const channel = supabase
            .channel('reservations_channel')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'reservations' }, (payload) => {
                setReservations(prev => [payload.new as ReservationData, ...prev]);
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [fetchReservations]);

    // Métricas calculadas em tempo real
    const stats = useMemo(() => {
        return {
            pending: reservations.filter(r => r.status === 'pendente').length,
            confirmed: reservations.filter(r => r.status === 'confirmado').length,
            total: reservations.length
        };
    }, [reservations]);

    // Filtra a lista baseada na aba ativa
    const filteredList = useMemo(() => {
        if (activeTab === 'all') return reservations;
        return reservations.filter(r => r.status === activeTab);
    }, [reservations, activeTab]);

    return (
        <section className="min-h-screen bg-[#050505] pt-24 pb-12 px-4 md:px-8">
            <div className="container mx-auto max-w-6xl">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6 border-b border-white/10 pb-6">
                    <div>
                        <h2 className="text-3xl font-display font-bold text-white uppercase flex items-center gap-3">
                            <LayoutDashboard className="text-[#BF953F]" />
                            Gestão <span className="text-[#BF953F]">Sabores</span>
                        </h2>
                        <p className="text-gray-400 text-sm mt-1">Bem-vindo à área administrativa.</p>
                    </div>
                    
                    <div className="flex gap-4 items-center">
                        <button 
                            onClick={fetchReservations}
                            className="p-3 bg-white/5 border border-white/10 rounded-full hover:text-[#BF953F] transition-colors"
                            title="Atualizar Lista"
                        >
                            <RefreshCcw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
                        </button>
                        <div className="h-8 w-px bg-white/10 mx-2"></div>
                        <button 
                            onClick={onLogout}
                            className="px-5 py-2.5 bg-red-900/10 text-red-400 border border-red-900/30 rounded text-xs uppercase tracking-wider font-bold hover:bg-red-900/30 transition-colors flex items-center gap-2"
                        >
                            <LogOut className="w-4 h-4" /> Sair
                        </button>
                    </div>
                </div>

                {!isSupabaseConfigured() && (
                     <div className="bg-red-900/20 border border-red-500/50 p-4 mb-6 text-center text-red-200 rounded">
                        Erro: Supabase não configurado.
                    </div>
                )}

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-[#0a0a0a] border border-[#BF953F]/30 p-6 rounded-lg relative overflow-hidden group">
                        <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <AlertCircle className="w-16 h-16 text-[#BF953F]" />
                        </div>
                        <p className="text-xs text-[#BF953F] uppercase tracking-widest font-bold mb-2">Pendentes</p>
                        <h3 className="text-4xl font-display font-bold text-white">{stats.pending}</h3>
                        <p className="text-gray-500 text-xs mt-2">Aguardando aprovação</p>
                    </div>

                    <div className="bg-[#0a0a0a] border border-green-500/20 p-6 rounded-lg relative overflow-hidden group">
                        <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <CalendarCheck className="w-16 h-16 text-green-500" />
                        </div>
                        <p className="text-xs text-green-500 uppercase tracking-widest font-bold mb-2">Confirmados</p>
                        <h3 className="text-4xl font-display font-bold text-white">{stats.confirmed}</h3>
                        <p className="text-gray-500 text-xs mt-2">Agendados na agenda</p>
                    </div>

                    <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-lg relative overflow-hidden group">
                        <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Archive className="w-16 h-16 text-gray-400" />
                        </div>
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-2">Total Geral</p>
                        <h3 className="text-4xl font-display font-bold text-white">{stats.total}</h3>
                        <p className="text-gray-500 text-xs mt-2">Histórico completo</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-8 border-b border-white/10 overflow-x-auto">
                    <button 
                        onClick={() => setActiveTab('pending')}
                        className={`pb-4 px-6 text-sm font-bold uppercase tracking-wider transition-all relative ${activeTab === 'pending' ? 'text-[#BF953F]' : 'text-gray-500 hover:text-white'}`}
                    >
                        Pendentes
                        {activeTab === 'pending' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#BF953F]"></span>}
                    </button>
                    <button 
                        onClick={() => setActiveTab('confirmed')}
                        className={`pb-4 px-6 text-sm font-bold uppercase tracking-wider transition-all relative ${activeTab === 'confirmed' ? 'text-green-500' : 'text-gray-500 hover:text-white'}`}
                    >
                        Confirmados
                        {activeTab === 'confirmed' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500"></span>}
                    </button>
                    <button 
                        onClick={() => setActiveTab('all')}
                        className={`pb-4 px-6 text-sm font-bold uppercase tracking-wider transition-all relative ${activeTab === 'all' ? 'text-white' : 'text-gray-500 hover:text-white'}`}
                    >
                        Histórico Completo
                        {activeTab === 'all' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white"></span>}
                    </button>
                </div>

                {/* List */}
                <div className="grid gap-4">
                    {filteredList.length === 0 ? (
                        <div className="text-center py-20 bg-[#0a0a0a] border border-white/5 rounded-lg border-dashed">
                            <p className="text-gray-500 text-sm uppercase tracking-widest">Nenhum registro encontrado nesta categoria.</p>
                        </div>
                    ) : (
                        filteredList.map((res) => (
                            <div key={res.id} className={`bg-[#0a0a0a] border border-white/5 p-6 rounded-lg hover:border-white/10 transition-all shadow-lg flex flex-col lg:flex-row justify-between gap-6 relative overflow-hidden group ${
                                res.status === 'pendente' ? 'border-l-4 border-l-[#BF953F]' : 
                                res.status === 'confirmado' ? 'border-l-4 border-l-green-500' : 'border-l-4 border-l-red-500 opacity-60'
                            }`}>
                                {/* Status Badge (Mobile visible, Desktop minimal) */}
                                <div className="flex flex-col gap-1 lg:min-w-[150px]">
                                    <span className="text-xs text-gray-500 font-mono">#{res.id.toString().padStart(4, '0')}</span>
                                    <div className="flex items-center gap-2 mt-1">
                                         <span className={`w-2 h-2 rounded-full ${
                                            res.status === 'pendente' ? 'bg-[#BF953F] animate-pulse' : 
                                            res.status === 'confirmado' ? 'bg-green-500' : 'bg-red-500'
                                        }`}></span>
                                        <span className={`text-xs font-bold uppercase tracking-wider ${
                                            res.status === 'pendente' ? 'text-[#BF953F]' : 
                                            res.status === 'confirmado' ? 'text-green-500' : 'text-red-500'
                                        }`}>
                                            {res.status}
                                        </span>
                                    </div>
                                    <span className={`mt-2 inline-flex items-center gap-1 w-fit px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${
                                        res.type === 'reserva' ? 'bg-blue-900/10 text-blue-400 border-blue-900/30' : 'bg-purple-900/10 text-purple-400 border-purple-900/30'
                                    }`}>
                                        {res.type === 'reserva' ? <Utensils className="w-3 h-3"/> : <ShoppingBag className="w-3 h-3"/>}
                                        {res.type}
                                    </span>
                                </div>

                                {/* Main Info */}
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-1">{res.name}</h3>
                                        <p className="text-sm text-[#BF953F] flex items-center gap-2">
                                            <span className="opacity-70">Tel:</span> {res.phone}
                                        </p>
                                    </div>
                                    
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 text-sm text-gray-300">
                                            <Clock className="w-4 h-4 text-gray-500" />
                                            <span className="font-bold">{new Date(res.date).toLocaleDateString()}</span>
                                            <span className="text-gray-600">|</span>
                                            <span>{res.time}</span>
                                        </div>
                                        <div className="text-sm text-gray-400">
                                            {res.type === 'reserva' ? 'Mesa para' : 'Quantidade:'} <span className="text-white font-bold">{res.guests}</span>
                                        </div>
                                    </div>

                                    {res.notes && (
                                        <div className="md:col-span-2 mt-2 p-3 bg-white/5 border border-white/5 rounded text-sm text-gray-300 italic">
                                            <span className="text-xs text-gray-500 uppercase not-italic block mb-1">Observações:</span>
                                            "{res.notes}"
                                        </div>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex flex-row lg:flex-col gap-3 justify-center items-center lg:items-end min-w-[140px] border-t lg:border-t-0 lg:border-l border-white/10 pt-4 lg:pt-0 lg:pl-6">
                                    <div className="text-right hidden lg:block mb-auto">
                                        <span className="text-[10px] text-gray-600 uppercase tracking-widest block">Recebido em</span>
                                        <span className="text-xs text-gray-500">{new Date(res.created_at).toLocaleString()}</span>
                                    </div>

                                    {res.status === 'pendente' ? (
                                        <>
                                            <button 
                                                onClick={() => updateStatus(res.id, 'confirmado')}
                                                className="flex-1 lg:flex-none w-full px-4 py-2 bg-green-600 text-white font-bold text-xs uppercase tracking-wider rounded hover:bg-green-500 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] transition-all flex items-center justify-center gap-2"
                                            >
                                                <Check className="w-4 h-4" /> Aprovar
                                            </button>
                                            <button 
                                                onClick={() => updateStatus(res.id, 'cancelado')}
                                                className="flex-1 lg:flex-none w-full px-4 py-2 bg-transparent text-red-400 border border-red-500/50 font-bold text-xs uppercase tracking-wider rounded hover:bg-red-950 hover:text-red-300 transition-all flex items-center justify-center gap-2"
                                            >
                                                <X className="w-4 h-4" /> Recusar
                                            </button>
                                        </>
                                    ) : (
                                        <div className="mt-auto opacity-50">
                                            <button 
                                                onClick={() => updateStatus(res.id, 'pendente')}
                                                className="text-xs text-gray-500 hover:text-white underline decoration-gray-700 underline-offset-4 transition-colors"
                                            >
                                                Reabrir Pedido
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};