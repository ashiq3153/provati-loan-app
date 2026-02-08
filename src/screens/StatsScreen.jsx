import React from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, PieChart, BarChart3, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const StatsScreen = ({ darkMode, setCurrentPage }) => {
    return (
        <div className={`min-h-screen ${darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'} pb-32 font-['Outfit']`}>
            {/* Header */}
            <div className={`sticky top-0 z-40 px-6 py-6 flex items-center justify-between ${darkMode ? 'bg-slate-950/80' : 'bg-slate-50/80'} backdrop-blur-xl`}>
                <div className="flex items-center gap-4">
                    <button onClick={() => setCurrentPage('home')} className={`w-10 h-10 rounded-xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'} flex items-center justify-center`}>
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-xl font-black tracking-tight">Fin-Intelligence</h1>
                </div>
                <div className="w-10 h-10" />
            </div>

            <div className="px-6 space-y-8 mt-6">
                {/* Main Progress Tracker */}
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="premium-card p-8 bg-slate-900 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20" />

                    <div className="relative z-10">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Sanction Health</p>
                        <div className="flex items-end justify-between gap-4 h-32 mb-6">
                            {[40, 70, 45, 90, 65, 80, 55, 95].map((h, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    transition={{ delay: i * 0.05, duration: 0.8 }}
                                    className={`flex-1 rounded-full ${i === 7 ? 'bg-emerald-500 shadow-emerald-glow' : 'bg-emerald-500/20 hover:bg-emerald-500/40'} transition-colors`}
                                />
                            ))}
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-3xl font-black tracking-tighter">842</h4>
                                <p className="text-[10px] font-bold text-emerald-400 uppercase">Trust Score: Excellent</p>
                            </div>
                            <div className="text-right">
                                <TrendingUp className="text-emerald-500 w-8 h-8 ml-auto mb-1" />
                                <p className="text-[10px] font-bold text-slate-400 uppercase">+12% this month</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Distribution Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="premium-card p-6">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4">
                            <PieChart className="w-5 h-5" />
                        </div>
                        <h5 className="text-sm font-black mb-1">Repaid</h5>
                        <p className="text-xl font-black text-blue-500">৳ 24.5k</p>
                        <p className="text-[10px] font-bold text-slate-400 mt-2">15 active EMI</p>
                    </div>
                    <div className="premium-card p-6">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center mb-4">
                            <BarChart3 className="w-5 h-5" />
                        </div>
                        <h5 className="text-sm font-black mb-1">Balance</h5>
                        <p className="text-xl font-black text-purple-500">৳ 12.8k</p>
                        <p className="text-[10px] font-bold text-slate-400 mt-2">Next: 12 Jan</p>
                    </div>
                </div>

                {/* Recent Activity Mini */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between px-1">
                        <h3 className="text-sm font-black uppercase tracking-widest opacity-40">Insight Stream</h3>
                        <button className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Detail View</button>
                    </div>
                    <div className="space-y-3">
                        {[
                            { label: 'Weekly Repayment', amount: '-৳1,200', type: 'down', icon: TrendingDown, color: 'rose' },
                            { label: 'Micro Sanction', amount: '+৳15,000', type: 'up', icon: TrendingUp, color: 'emerald' }
                        ].map((item, i) => (
                            <div key={i} className="premium-card p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-lg bg-${item.color}-500/10 text-${item.color}-500 flex items-center justify-center`}>
                                        <item.icon className="w-4 h-4" />
                                    </div>
                                    <p className="text-xs font-black">{item.label}</p>
                                </div>
                                <p className={`text-xs font-black ${item.type === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>{item.amount}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsScreen;
