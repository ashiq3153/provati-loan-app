import React from 'react';
import { ArrowLeft, Search, ShieldCheck, ChevronRight, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const SelectLoanScreen = ({ loanCategories, darkMode, setCurrentScreen }) => {
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
                <button onClick={() => setCurrentScreen('home')} className={`w-12 h-12 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'} shadow-sm flex items-center justify-center active:scale-90 transition-all`}>
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <div className="text-center">
                    <h1 className="text-lg font-black tracking-tight">Loan Products</h1>
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Select your package</p>
                </div>
                <button className={`w-12 h-12 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'} shadow-sm flex items-center justify-center opacity-0 pointer-events-none`}>
                    <Info className="w-5 h-5" />
                </button>
            </div>

            <div className="px-6 space-y-8 mt-4">
                {/* Search */}
                <motion.div variants={item} className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'} shadow-sm transition-all focus-within:border-emerald-500/50`}>
                    <Search className="w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search specific loan plans..."
                        className="flex-1 bg-transparent outline-none text-sm font-medium"
                    />
                </motion.div>

                {/* Categories List */}
                <div className="space-y-4">
                    {loanCategories.map((category) => (
                        <motion.button
                            key={category.id}
                            variants={item}
                            whileHover={{ scale: 1.01, translateY: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setCurrentScreen('loanRequest')}
                            className="w-full text-left premium-card p-6 flex items-center justify-between group overflow-hidden relative"
                        >
                            <div className={`absolute top-0 right-0 w-32 h-32 ${darkMode ? 'bg-emerald-500/5' : 'bg-emerald-500/5'} rounded-full blur-3xl -mr-16 -mt-16`}></div>

                            <div className="flex items-center gap-5 relative z-10">
                                <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-3xl transition-transform group-hover:scale-110 ${darkMode ? 'bg-slate-800 shadow-inner' : 'bg-slate-50 shadow-sm'}`}>
                                    {category.icon}
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-black text-base">{category.name}</h4>
                                        <span className={`text-[8px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest ${darkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600'}`}>
                                            {category.badge}
                                        </span>
                                    </div>
                                    <p className={`text-xs font-bold ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>Interest: {category.rate}</p>
                                    <p className={`text-[10px] font-medium tracking-tight ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Limit: {category.range}</p>
                                </div>
                            </div>

                            <div className="flex flex-col items-end gap-3 relative z-10">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${darkMode ? 'bg-slate-800 group-hover:bg-emerald-500 text-slate-500 group-hover:text-white' : 'bg-slate-50 group-hover:bg-emerald-500 text-slate-400 group-hover:text-white'}`}>
                                    <ChevronRight className="w-6 h-6" />
                                </div>
                            </div>
                        </motion.button>
                    ))}
                </div>

                {/* Trust Footer */}
                <motion.div variants={item} className={`p-6 rounded-[2rem] border dashed ${darkMode ? 'border-slate-800 bg-slate-900/30' : 'border-slate-100 bg-slate-50/50'} text-center`}>
                    <ShieldCheck className="w-8 h-8 text-emerald-500 mx-auto mb-3" />
                    <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-1">Guaranteed Security</p>
                    <p className={`text-[10px] leading-relaxed ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                        All loan applications are processed with 256-bit SSL encryption and monitored by Provati Fin-Guard.
                    </p>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default SelectLoanScreen;
