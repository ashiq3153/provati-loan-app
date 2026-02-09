import React, { useState } from 'react';
import { Lock, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const InputField = ({ icon: Icon, label, type, placeholder, value, onChange, darkMode }) => (
    <div className="space-y-1.5 group">
        <label className={`text-[10px] font-black uppercase tracking-[0.2em] ml-1 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
            {label}
        </label>
        <div className="relative">
            <div className={`absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${darkMode ? 'bg-slate-800 text-slate-400 group-focus-within:bg-emerald-500 group-focus-within:text-white' : 'bg-slate-100 text-slate-400 group-focus-within:bg-emerald-500 group-focus-within:text-white'}`}>
                <Icon className="w-5 h-5" />
            </div>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`w-full pl-16 pr-6 py-4 rounded-2xl border-2 outline-none font-bold text-sm transition-all ${darkMode ? 'bg-slate-900 border-slate-800 text-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10' : 'bg-white border-slate-100 text-slate-900 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10'}`}
            />
        </div>
    </div>
);

const ResetPasswordScreen = ({ darkMode, handleUpdatePassword }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password.length < 6) {
            alert('Password should be at least 6 characters.');
            return;
        }
        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        setLoading(true);
        await handleUpdatePassword(password);
        setLoading(false);
    };

    return (
        <div className={`min-h-screen flex items-center justify-center p-6 font-['Outfit'] transition-colors duration-700 ${darkMode ? 'bg-slate-950' : 'bg-emerald-50'}`}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-sm relative z-10"
            >
                <div className={`premium-card p-8 space-y-6 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-white shadow-xl'}`}>
                    <div className="text-center mb-4">
                        <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-4">
                            <Lock className="w-8 h-8" />
                        </div>
                        <h2 className={`text-2xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>Set New Password</h2>
                        <p className="text-xs font-medium text-slate-500 mt-2">Please create a new secure password for your account.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <InputField
                            icon={Lock}
                            label="New Password"
                            type="password"
                            placeholder="6+ chars"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            darkMode={darkMode}
                        />
                        <InputField
                            icon={ShieldCheck}
                            label="Confirm Password"
                            type="password"
                            placeholder="Re-type password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            darkMode={darkMode}
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-5 rounded-2xl bg-emerald-500 text-white font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-colors shadow-emerald-glow flex items-center justify-center gap-2"
                        >
                            {loading ? 'Updating...' : (
                                <>
                                    Update Password <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default ResetPasswordScreen;
