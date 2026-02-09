import React from 'react';
import { ArrowLeft, User, Mail, Calendar, MapPin, Briefcase, DollarSign, ChevronRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const CompleteProfileScreen = ({ user, profileForm, setProfileForm, darkMode, setCurrentScreen, showToast }) => {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 }
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
                <button onClick={() => setCurrentScreen('loanAmount')} className={`w-12 h-12 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'} shadow-sm flex items-center justify-center active:scale-90 transition-all`}>
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <div className="text-center">
                    <h1 className="text-lg font-black tracking-tight">Identity Profile</h1>
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Step 3 of 3</p>
                </div>
                <div className="w-12" />
            </div>

            <div className="px-6 space-y-8 mt-6">
                {/* Progress Mini Map */}
                <motion.div variants={item} className="flex gap-2">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="h-1.5 flex-1 rounded-full bg-emerald-500 shadow-emerald-glow/20" />
                    ))}
                </motion.div>

                {/* Section Title */}
                <motion.div variants={item}>
                    <h2 className="text-2xl font-black tracking-tight">Personal Information</h2>
                    <p className={`text-xs font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'} mt-1`}>Please ensure your data matches your official NID.</p>
                </motion.div>

                {/* Form Fields */}
                <div className="space-y-6">
                    <motion.div variants={item}>
                        <label className={`block text-[10px] font-black uppercase tracking-widest ${darkMode ? 'text-slate-500' : 'text-slate-400'} mb-3 ml-1`}>Full Legal Name</label>
                        <div className="relative">
                            <User className={`absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`} />
                            <input
                                type="text"
                                value={profileForm.fullName}
                                onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                                className="input-premium pl-14"
                                placeholder="As on NID"
                            />
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-2 gap-4">
                        <motion.div variants={item}>
                            <label className={`block text-[10px] font-black uppercase tracking-widest ${darkMode ? 'text-slate-500' : 'text-slate-400'} mb-3 ml-1`}>Birth Date</label>
                            <div className="relative">
                                <Calendar className={`absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`} />
                                <input
                                    type="text"
                                    value={profileForm.dob}
                                    onChange={(e) => setProfileForm({ ...profileForm, dob: e.target.value })}
                                    className="input-premium pl-14 text-sm"
                                />
                            </div>
                        </motion.div>
                        <motion.div variants={item}>
                            <label className={`block text-[10px] font-black uppercase tracking-widest ${darkMode ? 'text-slate-500' : 'text-slate-400'} mb-3 ml-1`}>Gender</label>
                            <select
                                value={profileForm.gender}
                                onChange={(e) => setProfileForm({ ...profileForm, gender: e.target.value })}
                                className="input-premium text-sm appearance-none"
                            >
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>
                        </motion.div>
                    </div>

                    <motion.div variants={item}>
                        <label className={`block text-[10px] font-black uppercase tracking-widest ${darkMode ? 'text-slate-500' : 'text-slate-400'} mb-3 ml-1`}>Occupational Role</label>
                        <div className="relative">
                            <Briefcase className={`absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`} />
                            <input
                                type="text"
                                value={profileForm.job}
                                onChange={(e) => setProfileForm({ ...profileForm, job: e.target.value })}
                                className="input-premium pl-14"
                                placeholder="Student, Engineer, etc."
                            />
                        </div>
                    </motion.div>

                    <motion.div variants={item}>
                        <label className={`block text-[10px] font-black uppercase tracking-widest ${darkMode ? 'text-slate-500' : 'text-slate-400'} mb-3 ml-1`}>Monthly Gross Income</label>
                        <div className="relative">
                            <DollarSign className={`absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`} />
                            <input
                                type="text"
                                value={profileForm.income}
                                onChange={(e) => setProfileForm({ ...profileForm, income: e.target.value })}
                                className="input-premium pl-14"
                            />
                        </div>
                    </motion.div>
                </div>

                <motion.div variants={item} className="pt-8">
                    <button
                        onClick={() => {
                            if (!profileForm.fullName || !profileForm.dob || !profileForm.gender || !profileForm.job || !profileForm.income) {
                                showToast("Please fill in all fields to proceed.", "warning");
                                return;
                            }
                            setCurrentScreen('documentUpload');
                        }}
                        className="w-full py-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-black text-[11px] uppercase tracking-[0.2em] shadow-emerald-glow hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                    >
                        Proceed to Verification <ChevronRight className="w-4 h-4" />
                    </button>
                    <div className="flex items-center justify-center gap-2 mt-6 opacity-40">
                        <ShieldCheck className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">End-to-End Encrypted Data</span>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default CompleteProfileScreen;
