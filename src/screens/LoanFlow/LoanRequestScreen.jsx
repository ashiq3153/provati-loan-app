import React from 'react';
import { ArrowLeft, ChevronRight, Info, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const LoanRequestScreen = ({ loanForm, setLoanForm, darkMode, setCurrentScreen }) => {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const item = {
        hidden: { opacity: 0, x: -10 },
        show: { opacity: 1, x: 0 }
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
                <button onClick={() => setCurrentScreen('selectLoan')} className={`w-12 h-12 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'} shadow-sm flex items-center justify-center active:scale-90 transition-all`}>
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <div className="text-center">
                    <h1 className="text-lg font-black tracking-tight">Loan Details</h1>
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Step 1 of 3</p>
                </div>
                <div className="w-12" />
            </div>

            <div className="px-6 space-y-8 mt-6">
                {/* Progress Mini Map */}
                <motion.div variants={item} className="flex gap-2">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${s === 1 ? 'bg-emerald-500' : darkMode ? 'bg-slate-800' : 'bg-slate-200'}`} />
                    ))}
                </motion.div>

                <div className="space-y-6">
                    <motion.div variants={item}>
                        <label className={`block text-xs font-bold uppercase tracking-widest ${darkMode ? 'text-slate-400' : 'text-slate-500'} mb-3 ml-1`}>
                            Loan Category
                        </label>
                        <select
                            value={loanForm.loanType}
                            onChange={(e) => setLoanForm({ ...loanForm, loanType: e.target.value })}
                            className="input-premium appearance-none"
                        >
                            <option>Micro-Enterprise</option>
                            <option>Agricultural Growth</option>
                            <option>Education Excellence</option>
                            <option>Small Business Plus</option>
                        </select>
                    </motion.div>

                    <motion.div variants={item}>
                        <label className={`block text-xs font-bold uppercase tracking-widest ${darkMode ? 'text-slate-400' : 'text-slate-500'} mb-3 ml-1`}>
                            Repayment Period
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                            {['6 Months', '12 Months', '24 Months'].map((p) => (
                                <button
                                    key={p}
                                    onClick={() => setLoanForm({ ...loanForm, period: p })}
                                    className={`py-4 rounded-2xl border-2 text-xs font-bold transition-all ${loanForm.period === p
                                        ? 'border-emerald-500 bg-emerald-500/5 text-emerald-500 shadow-emerald-glow/20'
                                        : darkMode ? 'border-slate-800 bg-slate-900 text-slate-500' : 'border-slate-100 bg-white text-slate-400'}`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div variants={item} className="p-6 rounded-[2rem] bg-emerald-500/5 border border-emerald-500/10 flex items-start gap-4">
                        <Info className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <p className={`text-[10px] leading-relaxed font-medium ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                            Your interest rate will be determined based on your credit score and the selected period. Current estimated rate: <span className="text-emerald-500 font-bold">9.2% p.a.</span>
                        </p>
                    </motion.div>
                </div>

                <motion.div variants={item} className="pt-4">
                    <button
                        onClick={() => setCurrentScreen('loanAmount')}
                        className="w-full btn-primary flex items-center justify-center gap-3 py-5"
                    >
                        <span>Continue to Amount</span>
                        <ChevronRight className="w-5 h-5" />
                    </button>
                    <p className="text-center mt-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        No hidden charges • Instant Prequalification
                    </p>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default LoanRequestScreen;
