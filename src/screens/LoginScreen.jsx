import React from 'react';
import { Building2, ShieldCheck, Globe, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

const LoginScreen = ({ loginForm, setLoginForm, darkMode, setDarkMode, language, setLanguage, handleLogin }) => {
    const containerVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.8,
                staggerChildren: 0.1,
                ease: [0.16, 1, 0.3, 1]
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className={`min-h-screen flex items-center justify-center p-6 sm:p-12 ${darkMode ? 'bg-slate-950' : 'bg-slate-50'} relative overflow-hidden font-['Outfit']`}>
            {/* Ambient Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-[100px]" />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-[420px] relative z-10"
            >
                <div className="text-center mb-12">
                    <motion.div
                        variants={itemVariants}
                        className="inline-flex items-center justify-center w-20 h-20 rounded-[2.5rem] bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-emerald-glow mb-8"
                    >
                        <Building2 className="w-10 h-10 text-white" />
                    </motion.div>
                    <motion.h1 variants={itemVariants} className={`text-4xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'} mb-3`}>
                        Provati<span className="text-emerald-500">.</span>
                    </motion.h1>
                    <motion.p variants={itemVariants} className={`text-base font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        Secure access to your professional finances.
                    </motion.p>
                </div>

                <div className="premium-card p-8 sm:p-10">
                    <div className="space-y-6 mb-8">
                        <motion.div variants={itemVariants}>
                            <label className={`block text-xs font-bold uppercase tracking-widest ${darkMode ? 'text-slate-400' : 'text-slate-500'} mb-2.5 ml-1`}>
                                Username
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your username"
                                value={loginForm.username}
                                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                                className="input-premium"
                            />
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <label className={`block text-xs font-bold uppercase tracking-widest ${darkMode ? 'text-slate-400' : 'text-slate-500'} mb-2.5 ml-1`}>
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={loginForm.password}
                                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                                className="input-premium"
                            />
                        </motion.div>
                    </div>

                    <motion.button
                        variants={itemVariants}
                        whileHover={{ scale: 1.01, translateY: -1 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleLogin}
                        className="w-full btn-primary flex items-center justify-center gap-2 group"
                    >
                        <ShieldCheck className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
                        Login Securely
                    </motion.button>

                    <motion.div variants={itemVariants} className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 flex gap-4">
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border ${darkMode ? 'border-slate-800 bg-slate-900/50 text-slate-300' : 'border-slate-100 bg-slate-50 text-slate-600'} text-xs font-bold uppercase tracking-wider hover:border-emerald-500/30 transition-all duration-300`}
                        >
                            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                            {darkMode ? 'Light' : 'Dark'}
                        </button>
                        <button
                            onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border ${darkMode ? 'border-slate-800 bg-slate-900/50 text-slate-300' : 'border-slate-100 bg-slate-50 text-slate-600'} text-xs font-bold uppercase tracking-wider hover:border-emerald-500/30 transition-all duration-300`}
                        >
                            <Globe className="w-4 h-4" />
                            {language === 'bn' ? 'English' : 'বাংলা'}
                        </button>
                    </motion.div>
                </div>

                <motion.p variants={itemVariants} className="mt-8 text-center text-xs font-medium text-slate-400">
                    Trusted by over 50,000+ members worldwide.<br />
                    &copy; 2026 Provati Somobay Somiti Ltd.
                </motion.p>
            </motion.div>
        </div>
    );
};

export default LoginScreen;
