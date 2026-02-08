import React from 'react';
import { ArrowLeft, ShieldCheck, ChevronRight, Search, Clock, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const MyLoansScreen = ({ myLoans, darkMode, setCurrentPage }) => {
    const item = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'} pb-32 font-['Outfit']`}>
            {/* Header */}
            <div className={`sticky top-0 z-40 px-6 py-6 flex items-center justify-between ${darkMode ? 'bg-slate-950/80' : 'bg-slate-50/80'} backdrop-blur-xl`}>
                <div className="flex items-center gap-4">
                    <button onClick={() => setCurrentPage('home')} className={`w-10 h-10 rounded-xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'} flex items-center justify-center`}>
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-xl font-black tracking-tight">Financial Assets</h1>
                </div>
                <button className={`w-10 h-10 rounded-xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'} flex items-center justify-center`}>
                    <Search className="w-5 h-5 opacity-40" />
                </button>
            </div>

            <div className="px-6 space-y-8 mt-6">
                {/* Active/Pending Summary */}
                <motion.div initial="hidden" animate="show" className="grid grid-cols-2 gap-4">
                    <div className="premium-card p-5 bg-emerald-500/10 border-emerald-500/20">
                        <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Total Limit</p>
                        <h4 className="text-xl font-black">৳ 2.50L</h4>
                    </div>
                    <div className="premium-card p-5 bg-slate-900/5 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Utilization</p>
                        <h4 className="text-xl font-black text-emerald-500">12.5%</h4>
                    </div>
                </motion.div>

                {/* Loans List */}
                <div className="space-y-4">
                    <h3 className="text-sm font-black uppercase tracking-[0.15em] opacity-40 px-1">Active Contracts</h3>

                    {myLoans.length > 0 ? myLoans.map((loan) => (
                        <motion.div
                            key={loan.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="premium-card p-6 flex items-center justify-between group cursor-pointer"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${darkMode ? 'bg-slate-800' : 'bg-slate-50'}`}>
                                    {loan.purpose?.toLowerCase().includes('micro') ? '🏢' : '🏠'}
                                </div>
                                <div>
                                    <h4 className="text-sm font-black mb-1">{loan.purpose}</h4>
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${loan.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                                        <span className={`text-[10px] font-black uppercase tracking-widest ${loan.status === 'Active' ? 'text-emerald-500' : 'text-amber-500'}`}>
                                            {loan.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className={`text-lg font-black ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>৳{(loan.amount / 1000).toFixed(1)}k</p>
                                <p className="text-[10px] font-bold text-slate-400">EMI: ৳{(loan.amount / 12).toFixed(0)}</p>
                            </div>
                        </motion.div>
                    )) : (
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
