import React, { useEffect, useState } from 'react';
import { ArrowLeft, Search, Clock, CheckCircle2, AlertTriangle, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabase';

const MyLoansScreen = ({ darkMode, setCurrentPage }) => {
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ totalLimit: 250000, utilization: 0, activeCount: 0 });

    useEffect(() => {
        fetchMyLoans();
    }, []);

    const fetchMyLoans = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data, error } = await supabase
                .from('loans')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;

            setLoans(data || []);
            calculateStats(data || []);
        } catch (error) {
            console.error('Error fetching loans:', error);
        } finally {
            setLoading(false);
        }
    };

    const calculateStats = (loanData) => {
        const totalActiveAmount = loanData
            .filter(l => l.status === 'Approved' || l.status === 'Active')
            .reduce((sum, loan) => sum + (parseFloat(loan.amount) || 0), 0);

        const limit = 250000;
        const util = (totalActiveAmount / limit) * 100;

        setStats({
            totalLimit: limit,
            utilization: util.toFixed(1),
            activeCount: loanData.filter(l => l.status === 'Active').length
        });
    };

    const getStatusColor = (status) => {
        if (!status) return 'text-slate-500 bg-slate-500/10';
        const s = status.toLowerCase();
        if (s.includes('approved')) return 'text-emerald-500 bg-emerald-500/10';
        if (s.includes('active')) return 'text-blue-500 bg-blue-500/10';
        if (s.includes('reject')) return 'text-rose-500 bg-rose-500/10';
        if (s.includes('pending')) return 'text-amber-500 bg-amber-500/10';
        return 'text-slate-500 bg-slate-500/10';
    };

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'} pb-32 font-['Outfit']`}>
            {/* Header */}
            <div className={`sticky top-0 z-40 px-6 py-6 flex items-center justify-between ${darkMode ? 'bg-slate-950/80' : 'bg-slate-50/80'} backdrop-blur-xl`}>
                <div className="flex items-center gap-4">
                    <button onClick={() => setCurrentPage('home')} className={`w-10 h-10 rounded-xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'} flex items-center justify-center hover:scale-105 transition-transform`}>
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-xl font-black tracking-tight">Financial Assets</h1>
                </div>
                <div className={`w-10 h-10 rounded-xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'} flex items-center justify-center`}>
                    <TrendingUp className="w-5 h-5 text-emerald-500" />
                </div>
            </div>

            <div className="px-6 space-y-8 mt-6">
                {/* Active/Pending Summary */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 gap-4">
                    <div className="premium-card p-5 bg-emerald-500/10 border-emerald-500/20">
                        <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Total Limit</p>
                        <h4 className="text-xl font-black">৳ {(stats.totalLimit / 1000).toFixed(0)}k</h4>
                    </div>
                    <div className="premium-card p-5 bg-slate-900/5 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Utilization</p>
                        <h4 className={`text-xl font-black ${stats.utilization > 80 ? 'text-rose-500' : 'text-emerald-500'}`}>{stats.utilization}%</h4>
                    </div>
                </motion.div>

                {/* Loans List */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between px-1">
                        <h3 className="text-sm font-black uppercase tracking-[0.15em] opacity-40">Active Contracts</h3>
                        <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">{loans.length} Total</span>
                    </div>

                    {loading ? (
                        <div className="space-y-4 p-8 text-center text-slate-400 animate-pulse">Loading financial data...</div>
                    ) : loans.length > 0 ? (
                        loans.map((loan, index) => (
                            <motion.div
                                key={loan.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`premium-card p-6 flex items-center justify-between group cursor-pointer border-l-4 ${loan.status === 'Active' ? 'border-l-emerald-500' :
                                        loan.status === 'Rejected' ? 'border-l-rose-500' : 'border-l-amber-500'
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${darkMode ? 'bg-slate-800' : 'bg-slate-50'}`}>
                                        {loan.loan_type?.toLowerCase().includes('micro') ? '🏢' : '🏠'}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black mb-1">{loan.loan_type}</h4>
                                        <div className="flex items-center gap-2">
                                            <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${getStatusColor(loan.status)}`}>
                                                {loan.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`text-lg font-black ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>৳{(Number(loan.amount) / 1000).toFixed(1)}k</p>
                                    <p className="text-[10px] font-bold text-slate-400">{loan.period}</p>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="p-20 text-center opacity-30 italic">
                            <Clock className="w-12 h-12 mx-auto mb-4 opacity-10" />
                            <p className="text-sm">No active loan records found.</p>
                        </div>
                    )}
                </div>

                {/* Trust Badge */}
                <div className={`p-6 rounded-[2rem] border dashed ${darkMode ? 'border-slate-800 bg-slate-900/30' : 'border-slate-100 bg-slate-50/50'} text-center mt-12`}>
                    <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-3" />
                    <p className="text-xs font-black uppercase tracking-widest text-emerald-600 mb-1">Asset Monitoring</p>
                    <p className={`text-[10px] leading-relaxed ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                        All active contracts are monitored by Provati Fin-Vault. Ensure timely payments to improve your trust score.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MyLoansScreen;
