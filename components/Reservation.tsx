import React, { useState } from 'react';
import { Calendar, Clock, Users, User, Phone, Send, ShoppingBag, Utensils, CheckCircle, AlertCircle, Home, CreditCard, Upload, FileText } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

export const Reservation: React.FC = () => {
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    type: 'reserva' as 'reserva' | 'encomenda',
    date: '',
    time: '',
    guests: '2',
    name: '',
    phone: '',
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
      } else {
        alert('Por favor, envie apenas arquivos PDF.');
        e.target.value = ''; // Reset input
      }
    }
  };

  const handleReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionStatus('loading');
    setErrorMessage('');

    try {
        let fileUrl = null;

        // 1. Upload do Arquivo (se existir)
        if (file) {
            const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.pdf`;
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('receipts')
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            // Obter URL pública
            const { data: { publicUrl } } = supabase.storage
                .from('receipts')
                .getPublicUrl(fileName);
            
            fileUrl = publicUrl;
        }

        // 2. Inserir no Banco
        const { error } = await supabase
            .from('reservations')
            .insert([
                { 
                    name: formData.name,
                    phone: formData.phone,
                    date: formData.date,
                    time: formData.time,
                    guests: formData.guests,
                    type: formData.type,
                    notes: formData.notes,
                    file_url: fileUrl
                }
            ]);

        if (error) throw error;

        setSubmissionStatus('success');
    } catch (error: any) {
        console.error('Error inserting reservation:', error);
        setSubmissionStatus('error');
        
        if (error.message && error.message.includes('row-level security')) {
            setErrorMessage('Erro de permissão. Peça ao admin para atualizar o script SQL.');
        } else {
            setErrorMessage(error.message || 'Erro ao processar pedido. Tente novamente.');
        }
    }
  };

  return (
    <section className="min-h-screen py-12 relative bg-black flex items-center justify-center">
        {/* Background Image Parallax Feel */}
        <div className="absolute inset-0 z-0">
            <img 
                src="https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?q=80&w=1000&auto=format&fit=crop" 
                alt="Dining Table" 
                className="w-full h-full object-cover opacity-30 fixed"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto bg-[#0a0a0a]/95 backdrop-blur-md border border-[#BF953F]/30 p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.8)] rounded-sm my-12">
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-white uppercase mb-4">
                        Faça seu <span className="text-gold-gradient">Pedido</span>
                    </h2>
                    <p className="text-gray-400">Preencha os dados abaixo para reservar sua mesa ou realizar uma encomenda.</p>
                </div>

                {submissionStatus === 'success' ? (
                    <div className="flex flex-col items-center justify-center p-12 bg-green-900/10 border border-green-500/30 rounded-lg animate-[fadeIn_0.5s_ease-out]">
                        <CheckCircle className="w-20 h-20 text-green-500 mb-6" />
                        <h3 className="text-3xl font-display font-bold text-white mb-4">Solicitação Confirmada!</h3>
                        <p className="text-gray-400 text-center text-lg mb-8 max-w-md">
                            Recebemos seus dados com sucesso. Nossa equipe entrará em contato pelo telefone <strong>{formData.phone}</strong> para finalizar os detalhes.
                        </p>
                        <div className="flex gap-4">
                            <button 
                                onClick={() => {
                                    setSubmissionStatus('idle');
                                    setFormData({...formData, name: '', phone: '', notes: ''});
                                    setFile(null);
                                }}
                                className="px-8 py-3 bg-[#BF953F] text-black font-bold uppercase tracking-widest hover:bg-[#FCF6BA] transition-colors"
                            >
                                Novo Pedido
                            </button>
                            <a 
                                href="#hero"
                                onClick={(e) => { e.preventDefault(); window.location.href='/'; }}
                                className="px-8 py-3 border border-white/20 text-white font-bold uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center gap-2"
                            >
                                <Home className="w-4 h-4" /> Início
                            </a>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleReservation} className="space-y-6">
                        {/* Type Toggle */}
                        <div className="flex gap-4 p-1 bg-white/5 rounded-lg mb-8">
                            <button
                                type="button"
                                onClick={() => setFormData({...formData, type: 'reserva'})}
                                className={`flex-1 py-4 flex items-center justify-center gap-2 text-sm uppercase tracking-widest font-bold transition-all duration-300 rounded-md ${formData.type === 'reserva' ? 'bg-[#BF953F] text-black shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                            >
                                <Utensils className="w-4 h-4" /> Reserva de Mesa
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData({...formData, type: 'encomenda'})}
                                className={`flex-1 py-4 flex items-center justify-center gap-2 text-sm uppercase tracking-widest font-bold transition-all duration-300 rounded-md ${formData.type === 'encomenda' ? 'bg-[#BF953F] text-black shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                            >
                                <ShoppingBag className="w-4 h-4" /> Encomenda (Take-away)
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name Input */}
                            <div className="group">
                                <label className="block text-xs text-[#BF953F] uppercase tracking-wider mb-2">Seu Nome</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#BF953F] w-5 h-5 transition-colors" />
                                    <input 
                                        required
                                        type="text" 
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Nome Completo"
                                        className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#BF953F] transition-colors rounded-sm"
                                    />
                                </div>
                            </div>

                            {/* Phone Input */}
                            <div className="group">
                                <label className="block text-xs text-[#BF953F] uppercase tracking-wider mb-2">Telefone</label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#BF953F] w-5 h-5 transition-colors" />
                                    <input 
                                        required
                                        type="tel" 
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+244 9XX XXX XXX"
                                        className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#BF953F] transition-colors rounded-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Date Input */}
                            <div className="group">
                                <label className="block text-xs text-[#BF953F] uppercase tracking-wider mb-2">Data</label>
                                <div className="relative">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#BF953F] w-5 h-5 transition-colors" />
                                    <input 
                                        required
                                        type="date" 
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#BF953F] transition-colors scheme-dark rounded-sm"
                                    />
                                </div>
                            </div>

                            {/* Time Input */}
                            <div className="group">
                                <label className="block text-xs text-[#BF953F] uppercase tracking-wider mb-2">Horário</label>
                                <div className="relative">
                                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#BF953F] w-5 h-5 transition-colors" />
                                    <select 
                                        required
                                        name="time"
                                        value={formData.time}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#BF953F] transition-colors appearance-none rounded-sm"
                                    >
                                        <option value="" className="bg-black">Selecione...</option>
                                        <option value="12:00" className="bg-black">12:00 (Almoço)</option>
                                        <option value="13:00" className="bg-black">13:00 (Almoço)</option>
                                        <option value="19:00" className="bg-black">19:00</option>
                                        <option value="20:00" className="bg-black">20:00</option>
                                        <option value="21:00" className="bg-black">21:00</option>
                                        <option value="22:00" className="bg-black">22:00</option>
                                        <option value="23:00" className="bg-black">23:00</option>
                                    </select>
                                </div>
                            </div>

                            {/* Guests/Qty Input */}
                            <div className="group">
                                <label className="block text-xs text-[#BF953F] uppercase tracking-wider mb-2">
                                    {formData.type === 'reserva' ? 'Pessoas' : 'Qtd. Pratos'}
                                </label>
                                <div className="relative">
                                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#BF953F] w-5 h-5 transition-colors" />
                                    <select 
                                        required
                                        name="guests"
                                        value={formData.guests}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#BF953F] transition-colors appearance-none rounded-sm"
                                    >
                                        <option value="1" className="bg-black">1</option>
                                        <option value="2" className="bg-black">2</option>
                                        <option value="3" className="bg-black">3</option>
                                        <option value="4" className="bg-black">4</option>
                                        <option value="5+" className="bg-black">5+</option>
                                        <option value="10+" className="bg-black">10+ (Grupo)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Payment Information Block - Only for 'encomenda' */}
                        {formData.type === 'encomenda' && (
                            <div className="bg-white/5 border border-[#BF953F]/20 p-6 rounded-lg animate-[fadeIn_0.5s_ease-out]">
                                <h3 className="text-[#BF953F] font-bold uppercase tracking-widest text-sm flex items-center gap-2 mb-4">
                                    <CreditCard className="w-4 h-4" /> Dados para Pagamento
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div className="space-y-1">
                                        <p className="text-gray-500 text-xs uppercase">Banco</p>
                                        <p className="text-white font-bold">BAI</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-gray-500 text-xs uppercase">Titular</p>
                                        <p className="text-white font-bold">Sabores do Começo LDA</p>
                                    </div>
                                    <div className="space-y-1 md:col-span-2">
                                        <p className="text-gray-500 text-xs uppercase">IBAN</p>
                                        <p className="text-white font-mono tracking-wider bg-black/30 p-2 rounded border border-white/5 select-all">
                                            AO06 0040 0000 1234 5678 9012 3
                                        </p>
                                    </div>
                                    <div className="space-y-1 md:col-span-2">
                                        <p className="text-gray-500 text-xs uppercase">Express / Multicaixa</p>
                                        <p className="text-white font-mono tracking-wider bg-black/30 p-2 rounded border border-white/5 select-all">
                                            923 000 000
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-4 flex items-start gap-2 text-xs text-yellow-500/80 bg-yellow-900/10 p-2 rounded">
                                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                    <p>Para confirmar sua encomenda, por favor anexe o comprovativo de pagamento abaixo.</p>
                                </div>
                            </div>
                        )}

                        {/* File Upload for PDF */}
                        <div className="group">
                             <label className="block text-xs text-[#BF953F] uppercase tracking-wider mb-2">
                                {formData.type === 'encomenda' ? 'Anexar Comprovativo (PDF)' : 'Anexar Documento (Opcional - PDF)'}
                             </label>
                             <div className="relative">
                                <input 
                                    type="file" 
                                    accept="application/pdf"
                                    onChange={handleFileChange}
                                    className="hidden" 
                                    id="file-upload"
                                />
                                <label 
                                    htmlFor="file-upload" 
                                    className={`w-full flex items-center justify-between bg-white/5 border border-white/10 py-4 px-4 text-white cursor-pointer hover:bg-white/10 transition-colors rounded-sm ${file ? 'border-[#BF953F]' : ''}`}
                                >
                                    <span className={`text-sm ${file ? 'text-white' : 'text-gray-500'}`}>
                                        {file ? file.name : 'Clique para selecionar um arquivo PDF...'}
                                    </span>
                                    {file ? <FileText className="w-5 h-5 text-[#BF953F]" /> : <Upload className="w-5 h-5 text-gray-500" />}
                                </label>
                            </div>
                        </div>

                         {/* Notes Input */}
                         <div className="group">
                             <label className="block text-xs text-[#BF953F] uppercase tracking-wider mb-2">Observações / Detalhes do Pedido</label>
                             <textarea 
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                placeholder={formData.type === 'reserva' ? "Preferência de mesa, alergias, ocasião especial..." : "Descreva seu pedido aqui (Ex: 1x Wagyu, 2x Risoto)"}
                                className="w-full bg-white/5 border border-white/10 py-4 px-4 text-white focus:outline-none focus:border-[#BF953F] transition-colors h-32 resize-none rounded-sm"
                             ></textarea>
                        </div>

                        <button 
                            type="submit"
                            disabled={submissionStatus === 'loading'}
                            className="w-full py-5 mt-4 bg-gold-metallic text-black font-bold uppercase tracking-widest hover:shadow-[0_0_30px_rgba(191,149,63,0.4)] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed rounded-sm"
                        >
                            {submissionStatus === 'loading' ? (
                                <span className="animate-pulse">Enviando Dados e Arquivos...</span>
                            ) : (
                                <>
                                    <Send className="w-5 h-5" />
                                    {formData.type === 'reserva' ? 'Confirmar Reserva' : 'Finalizar Encomenda'}
                                </>
                            )}
                        </button>
                        
                        {submissionStatus === 'error' && (
                             <div className="flex items-center gap-2 justify-center text-red-400 text-sm mt-4 bg-red-900/20 p-3 rounded border border-red-500/20">
                                <AlertCircle className="w-5 h-5" />
                                <span>{errorMessage}</span>
                             </div>
                        )}

                        <p className="text-center text-xs text-gray-500 mt-4 uppercase tracking-wider">
                            *Dress Code: Esporte Fino | Tolerância de 15 min para reservas
                        </p>
                    </form>
                )}
            </div>
        </div>
    </section>
  );
};