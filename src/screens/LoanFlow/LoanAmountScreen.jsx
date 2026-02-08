import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ShieldCheck, TrendingUp, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const LoanAmountScreen = ({ darkMode, setCurrentScreen }) => {
    const [amount, setAmount] = useState(15000);
    const [period, setPeriod] = useState(12);

    const interestRate = 0.092; // 9.2%
    const monthlyInterest = interestRate / 12;
    const monthlyPayment = (amount * monthlyInterest * Math.pow(1 + monthlyInterest, period)) / (Math.pow(1 + monthlyInterest, period) - 1);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const item = {
        hidden: { opacity: 0, scale: 0.95 },
        show: { opacity: 1, scale: 1 }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className={`min-h-screen ${darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'} pb-24 font-['Outfit']`}
        >
            {/* Header */}
            <div className={`sticky top-0 z-40 px-6 py-6 flex items-center justify-between ${darkMode ? 'bg-slate-950/80' : 'bg-slate-50/80'} backdrop-blur-xl`}>
                <button onClick={() => setCurrentScreen('loanRequest')} className={`w-12 h-12 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'} shadow-sm flex items-center justify-center active:scale-90 transition-all`}>
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <div className="text-center">
                    <h1 className="text-lg font-black tracking-tight">Configure Loan</h1>
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Step 2 of 3</p>
                </div>
                <div className="w-12" />
            </div>

            <div className="px-6 space-y-8 mt-6">
                {/* Progress Mini Map */}
                <motion.div variants={item} className="flex gap-2">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${s <= 2 ? 'bg-emerald-500' : darkMode ? 'bg-slate-800' : 'bg-slate-200'}`} />
                    ))}
                </motion.div>

                {/* Amount Selection */}
                <motion.div variants={item} className="premium-card p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl -mr-16 -mt-16" />
                    <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Requested Amount</p>

                    <div className="flex items-center justify-center gap-2 mb-8">
                        <span className="text-3xl font-black text-emerald-500 mb-2">৳</span>
                        <h3 className="text-6xl font-black tracking-tighter">{amount.toLocaleString()}</h3>
                    </div>

                    <input
                        type="range"
                        min="1000"
                        max="100000"
                        step="500"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 mb-6"
                    />

                    <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <span>৳ 1,000</span>
                        <span>৳ 100,000</span>
                    </div>
                </motion.div>

                {/* Period Selection */}
                <motion.div variants={item} className="space-y-4">
                    <div className="flex items-center justify-between px-1">
                        <label className={`text-xs font-bold uppercase tracking-widest ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Repayment Term</label>
                        <span className="text-emerald-500 text-[10px] font-black uppercase tracking-widest">{period} Months</span>
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                        {[6, 12, 18, 24].map((p) => (
                            <button
                                key={p}
                                onClick={() => setPeriod(p)}
                                className={`py-4 rounded-2xl border-2 text-xs font-black transition-all ${period === p
                                    ? 'border-emerald-500 bg-emerald-500 text-white shadow-emerald-glow'
                                    : darkMode ? 'border-slate-800 bg-slate-900 text-slate-500' : 'border-slate-100 bg-white text-slate-400'}`}
                            >
                                {p}M
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Summary / Calculator View */}
                <motion.div variants={item} className={`premium-card p-6 ${darkMode ? 'bg-slate-900 border-slate-800 shadow-2xl' : 'bg-slate-900 text-white shadow-emerald-glow/20'}`}>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between pb-4 border-b border-white/10">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
                                    <TrendingUp className="w-5 h-5" />
                                </div>
                                <span className="text-xs font-bold uppercase tracking-widest opacity-60">Estimated EMI</span>
                            </div>
                            <h4 className="text-2xl font-black tracking-tight text-white">৳ {monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}</h4>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-2">
                            <div className="space-y-1">
                                <span className="text-[10px] font-bold uppercase tracking-widest opacity-40 flex items-center gap-1.5 line-height-1">
                                    <Calendar className="w-3 h-3" /> Start Date
                                </span>
                                <p className="text-xs font-black">Tomorrow</p>
                            </div>
                            <div className="space-y-1">
                                <span className="text-[10px] font-bold uppercase tracking-widest opacity-40 flex items-center gap-1.5 line-height-1">
                                    <ShieldCheck className="w-3 h-3" /> APR Rate
                                </span>
                                <p className="text-xs font-black text-emerald-400">9.2% Fixed</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div variants={item}>
                    <button
                        onClick={() => setCurrentScreen('completeProfile')}
                        className="w-full btn-primary flex items-center justify-center gap-3 py-5"
                    >
                        <span>Initiate Application</span>
                        <ArrowRight className="w-5 h-5" />
                    </button>
                    <p className={`text-center mt-6 text-[10px] font-bold ${darkMode ? 'text-slate-500' : 'text-slate-400'} uppercase tracking-widest`}>
                        Decision in under 12 hours guaranteed
                    </p>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default LoanAmountScreen;
