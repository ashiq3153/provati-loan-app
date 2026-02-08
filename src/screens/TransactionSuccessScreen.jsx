import React from 'react';
import { CheckCircle, ArrowRight, Download, Share2, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const TransactionSuccessScreen = ({ darkMode, setCurrentScreen }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`min-h-screen ${darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'} flex flex-col items-center justify-center p-6 font-['Outfit']`}
        >
            <div className="w-full max-w-sm space-y-8 text-center">
                {/* Success Animation Container */}
                <div className="relative inline-block">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', damping: 12, stiffness: 200 }}
                        className="w-32 h-32 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-emerald-glow relative z-10"
                    >
                        <CheckCircle className="w-16 h-16" strokeWidth={3} />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1.5 }}
                        transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
                        className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl"
                    />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <h2 className="text-3xl font-black tracking-tighter mb-2">Application Sent</h2>
                    <p className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'} leading-relaxed`}>
                        Your loan request has been successfully submitted to our underwriting department.
                    </p>
                </motion.div>

                {/* Receipt Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="premium-card p-8 bg-white dark:bg-slate-900 border-dashed border-2 text-left relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full -mr-12 -mt-12 blur-2xl" />

                    <div className="space-y-4 relative z-10">
                        <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Reference ID</span>
                            <span className="text-xs font-black">#PRV-82910-X</span>
                        </div>
                        <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sanction Status</span>
                            <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full uppercase">Prequalified</span>
                        </div>
                        <div className="flex justify-between items-center text-lg font-black pt-2">
                            <span>Total Amount</span>
                            <span className="text-emerald-500">৳ 15,000</span>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex gap-4"
                >
                    <button className={`flex-1 py-4 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'} shadow-sm flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest active:scale-95 transition-all`}>
                        <Download className="w-4 h-4" /> Receipt
                    </button>
                    <button className={`flex-1 py-4 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'} shadow-sm flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest active:scale-95 transition-all`}>
                        <Share2 className="w-4 h-4" /> Share
                    </button>
                </motion.div>

                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    onClick={() => setCurrentScreen('home')}
                    className="w-full btn-primary py-5 group"
                >
                    <span>Back to Dashboard</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform inline ml-2" />
                </motion.button>

                <div className="flex items-center justify-center gap-2 opacity-30">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Provati Trusted Institution</span>
                </div>
            </div>
        </motion.div>
    );
};

export default TransactionSuccessScreen;
