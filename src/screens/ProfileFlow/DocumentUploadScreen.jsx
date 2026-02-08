import React from 'react';
import { ArrowLeft, Check, Upload, ShieldCheck, FileText, Camera, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const DocumentUploadScreen = ({ darkMode, setCurrentScreen, handleSubmitLoan }) => {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 15 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className={`min-h-screen ${darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'} pb-32 font-['Outfit']`}
        >
            {/* Header */}
            <div className={`sticky top-0 z-40 px-6 py-6 flex items-center justify-between ${darkMode ? 'bg-slate-950/80' : 'bg-slate-50/80'} backdrop-blur-xl`}>
                <button onClick={() => setCurrentScreen('completeProfile')} className={`w-12 h-12 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'} shadow-sm flex items-center justify-center active:scale-90 transition-all`}>
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <div className="text-center">
                    <h1 className="text-lg font-black tracking-tight">Compliance Verification</h1>
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Final Verification</p>
                </div>
                <div className="w-12" />
            </div>

            <div className="px-6 space-y-8 mt-6">
                {/* Info Card */}
                <motion.div variants={item} className={`p-6 rounded-[2rem] border ${darkMode ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-emerald-50 border-emerald-100'} flex items-start gap-4`}>
                    <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="text-sm font-black text-emerald-600 mb-1">Verify your identity</h4>
                        <p className={`text-[10px] leading-relaxed font-medium ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                            Provati requires high-quality photos of your official documents to finalize your loan sanction. All documents are stored in an encrypted vault.
                        </p>
                    </div>
                </motion.div>

                {/* Upload Section */}
                <div className="space-y-4">
                    <motion.div variants={item}>
                        <label className={`block text-[10px] font-black uppercase tracking-widest ${darkMode ? 'text-slate-500' : 'text-slate-400'} mb-3 ml-1`}>National ID / Passport</label>

                        <div className="space-y-3">
                            {/* Done Item */}
                            <div className="premium-card p-5 flex items-center justify-between bg-emerald-500/5 border-emerald-500/20">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-emerald-glow">
                                        <Check className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black">NID (Front Side)</p>
                                        <p className="text-[10px] font-bold text-emerald-600">Verified & Secure</p>
                                    </div>
                                </div>
                                <button className={`text-[10px] font-black uppercase tracking-widest ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Edit</button>
                            </div>

                            {/* Pending Item */}
                            <button className={`w-full premium-card p-5 flex items-center justify-between border-dashed border-2 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} group`}>
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${darkMode ? 'bg-slate-800 text-slate-500 group-hover:bg-emerald-500 group-hover:text-white' : 'bg-slate-50 text-slate-400 group-hover:bg-emerald-500 group-hover:text-white'}`}>
                                        <Camera className="w-6 h-6" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-xs font-black">NID (Back Side)</p>
                                        <p className="text-[10px] font-bold text-slate-400 italic">Required for approval</p>
                                    </div>
                                </div>
                                <div className="p-2 bg-emerald-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Upload className="w-4 h-4" />
                                </div>
                            </button>
                        </div>
                    </motion.div>

                    <motion.div variants={item}>
                        <label className={`block text-[10px] font-black uppercase tracking-widest ${darkMode ? 'text-slate-500' : 'text-slate-400'} mb-3 ml-1`}>Selfie Verification</label>
                        <button className={`w-full premium-card p-8 flex flex-col items-center justify-center border-dashed border-2 gap-3 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'} group transition-all`}>
                            <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border-4 border-white dark:border-slate-900 shadow-sm relative overflow-hidden group-hover:border-emerald-500/50 transition-colors">
                                <FileText className="w-8 h-8 text-slate-300" />
                                <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div className="text-center">
                                <p className="text-xs font-black">Hold your NID and take a selfie</p>
                                <p className={`text-[10px] font-medium ${darkMode ? 'text-slate-500' : 'text-slate-400'} mt-1`}>Ensure your face is clearly visible</p>
                            </div>
                        </button>
                    </motion.div>
                </div>

                {/* Footer Buttons */}
                <motion.div variants={item} className="pt-6">
                    <button
                        onClick={handleSubmitLoan}
                        className="w-full btn-primary py-5 shadow-emerald-glow"
                    >
                        Review & Submit Application
                    </button>

                    <div className="flex items-center justify-center gap-2 mt-8 opacity-40">
                        <Info className="w-3.5 h-3.5" />
                        <span className="text-[9px] font-bold uppercase tracking-widest">Expected turnaround: 4 working hours</span>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default DocumentUploadScreen;
