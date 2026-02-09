import React, { useState } from 'react';
import {
    Building2,
    ShieldCheck,
    Globe,
    Moon,
    Sun,
    User,
    Mail,
    Lock,
    ArrowRight,
    Fingerprint,
    Info,
    ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import OtpInput from '../components/OtpInput';

const InputField = ({ icon: Icon, label, type, placeholder, value, onChange, error, darkMode, variants, action }) => (
    <motion.div variants={variants} className="space-y-1.5 group">
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
                className={`w-full pl-16 ${action ? 'pr-28' : 'pr-6'} py-4 rounded-2xl border-2 outline-none font-bold text-sm transition-all ${darkMode ? 'bg-slate-900 border-slate-800 text-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10' : 'bg-white border-slate-100 text-slate-900 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10'}`}
            />
            {action && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                    {action}
                </div>
            )}
        </div>
        {error && <p className="text-[10px] text-rose-500 font-bold ml-1">{error}</p>}
    </motion.div>
);

const LoginScreen = ({ darkMode, setDarkMode, handleLogin, handleRegister, handleSendOtp, handleVerifyOtp, loading }) => {
    const [mode, setMode] = useState('login'); // 'login', 'register', 'forgot'
    const [formData, setFormData] = useState({
        userId: '',
        email: '',
        fullName: '',
        password: '',
        confirmPassword: '',
        otp: ''
    });

    const [otpSent, setOtpSent] = useState(false);
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [sendingOtp, setSendingOtp] = useState(false);
    const [verifyingOtp, setVerifyingOtp] = useState(false);
    const [resendTimer, setResendTimer] = useState(0);

    React.useEffect(() => {
        let interval;
        if (resendTimer > 0) {
            interval = setInterval(() => {
                setResendTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [resendTimer]);

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, staggerChildren: 0.1 }
        },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: { opacity: 1, x: 0 }
    };

    const validateUserId = (id) => {
        // Must contain letters and numbers
        return /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/.test(id);
    };

    const validatePassword = (pass) => {
        // Must be at least 6 characters and contain letters and numbers
        return pass.length >= 6 && /^(?=.*[a-zA-Z])(?=.*[0-9]).+$/.test(pass);
    };

    const onLogin = (e) => {
        e.preventDefault();
        handleLogin(formData.userId, formData.password);
    };

    const onRegister = async (e) => {
        e.preventDefault();
        if (!validateUserId(formData.userId)) {
            alert('User ID must contain both letters and numbers.');
            return;
        }
        if (!isOtpVerified) {
            alert('Please verify your email with OTP first.');
            return;
        }
        if (!validatePassword(formData.password)) {
            alert('Password must be at least 6 characters and contain both letters and numbers.');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        const success = await handleRegister(formData);
        if (success) setMode('login');
    };

    const sendOtp = async () => {
        if (!formData.email || !formData.email.includes('@')) {
            alert('Please enter a valid email address.');
            return;
        }
        setSendingOtp(true);
        const success = await handleSendOtp(formData.email);
        setSendingOtp(false);
        if (success) {
            setOtpSent(true);
            setResendTimer(60); // 60 seconds countdown
        }
    };

    const verifyOtp = async () => {
        if (formData.otp.length < 6) return;

        setVerifyingOtp(true);
        const success = await handleVerifyOtp(formData.email, formData.otp);
        setVerifyingOtp(false);

        if (success) {
            setIsOtpVerified(true);
        }
    };


    return (
        <div className={`min-h-screen relative overflow-hidden flex items-center justify-center p-6 font-['Outfit'] transition-colors duration-700 ${darkMode ? 'bg-slate-950' : 'bg-emerald-50'}`}>
            {/* Animated Gradient Orbs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                    x: [0, 50, 0]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px]"
            />
            <motion.div
                animate={{
                    scale: [1.2, 1, 1.2],
                    rotate: [0, -90, 0],
                    x: [0, -50, 0]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]"
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-sm relative z-10"
            >
                {/* Logo & Branding */}
                <div className="text-center mb-10">
                    <motion.div
                        whileHover={{ rotate: 5, scale: 1.05 }}
                        className="inline-flex w-20 h-20 rounded-[2.2rem] bg-gradient-to-br from-emerald-400 to-green-600 items-center justify-center shadow-emerald-glow mb-6"
                    >
                        <Building2 className="w-10 h-10 text-white" />
                    </motion.div>
                    <h1 className={`text-4xl font-black tracking-tighter ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                        Provati<span className="text-emerald-500">.</span>
                    </h1>
                    <p className={`text-xs font-bold uppercase tracking-[0.3em] mt-2 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                        Microforest Network
                    </p>
                </div>

                <AnimatePresence mode="wait">
                    {mode === 'login' && (
                        <motion.form
                            key="login"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            onSubmit={onLogin}
                            className="space-y-6"
                        >
                            <div className="space-y-4">
                                <InputField
                                    icon={User}
                                    label="User ID or Email"
                                    type="text"
                                    placeholder="your-id-123 or mail@example.com"
                                    value={formData.userId}
                                    onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                                    darkMode={darkMode}
                                    variants={itemVariants}
                                />
                                <InputField
                                    icon={Lock}
                                    label="Password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    darkMode={darkMode}
                                    variants={itemVariants}
                                />
                            </div>

                            <div className="flex items-center justify-between px-1">
                                <button type="button" onClick={() => setMode('forgot')} className="text-[10px] font-black text-emerald-500 uppercase tracking-widest hover:underline">Forgot Password?</button>
                                <button type="button" onClick={() => setMode('register')} className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-emerald-500 transition-colors">Apply for Membership</button>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={loading}
                                className="w-full py-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-black text-[11px] uppercase tracking-[0.3em] shadow-emerald-glow flex items-center justify-center gap-3 disabled:opacity-50"
                            >
                                {loading ? 'Securing Connection...' : (
                                    <>
                                        Authorize & Enter <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </motion.button>
                        </motion.form>
                    )}

                    {mode === 'register' && (
                        <motion.form
                            key="register"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            onSubmit={onRegister}
                            className={`premium-card p-8 space-y-5 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-white shadow-xl'}`}
                        >
                            <div className="flex items-center gap-4 mb-2">
                                <button type="button" onClick={() => setMode('login')} className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <h3 className="text-lg font-black tracking-tight">New Enrollment</h3>
                            </div>

                            <div className="space-y-4 no-scrollbar max-h-[500px] overflow-y-auto px-1 pb-4">
                                <InputField
                                    icon={Fingerprint}
                                    label="Full Name"
                                    type="text"
                                    placeholder="Example: Md. Rahim Ali"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    darkMode={darkMode}
                                    variants={itemVariants}
                                />
                                <InputField
                                    icon={User}
                                    label="Create User ID"
                                    type="text"
                                    placeholder="id123 (Letters & Numbers)"
                                    value={formData.userId}
                                    onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                                    darkMode={darkMode}
                                    variants={itemVariants}
                                />
                                <InputField
                                    icon={Mail}
                                    label="Email Address"
                                    type="email"
                                    placeholder="rahim@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    darkMode={darkMode}
                                    variants={itemVariants}
                                    action={
                                        isOtpVerified ? (
                                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">
                                                <ShieldCheck className="w-3.5 h-3.5" />
                                                <span className="text-[10px] font-black uppercase tracking-widest">Verified</span>
                                            </div>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={sendOtp}
                                                disabled={sendingOtp}
                                                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${otpSent ? 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400' : 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/20'}`}
                                            >
                                                {sendingOtp ? 'Sending...' : (otpSent ? 'Resend' : 'Send OTP')}
                                            </button>
                                        )
                                    }
                                />

                                {otpSent && !isOtpVerified && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="p-6 rounded-[2.5rem] bg-emerald-500/5 border-2 border-emerald-500/10 mt-6 mb-6"
                                    >
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <label className={`text-[10px] font-black uppercase tracking-[0.2em] ml-1 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                                                    Security Verification Code
                                                </label>
                                                {resendTimer > 0 ? (
                                                    <span className="text-[10px] font-black text-emerald-500 tabular-nums">
                                                        {Math.floor(resendTimer / 60)}:{(resendTimer % 60).toString().padStart(2, '0')}
                                                    </span>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        onClick={sendOtp}
                                                        className="text-[10px] font-black text-emerald-500 uppercase tracking-widest hover:underline"
                                                    >
                                                        Resend code
                                                    </button>
                                                )}
                                            </div>

                                            <OtpInput
                                                length={6}
                                                value={formData.otp}
                                                onChange={(otp) => setFormData({ ...formData, otp })}
                                                darkMode={darkMode}
                                            />

                                            <p className="text-[10px] font-bold text-slate-400 mt-4 leading-relaxed flex gap-2">
                                                <Info className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                                একটি ৬ ডিজিটের নিরাপত্তা কোড আপনার ইমেইলে পাঠানো হয়েছে। সেটি এখানে প্রদান করুন।
                                            </p>

                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                type="button"
                                                onClick={verifyOtp}
                                                disabled={verifyingOtp || formData.otp.length < 6}
                                                className="w-full py-4 mt-2 rounded-xl bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:grayscale"
                                            >
                                                {verifyingOtp ? (
                                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                ) : <ShieldCheck className="w-4 h-4" />}
                                                {verifyingOtp ? 'Verifying...' : 'Verify Security Code'}
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                )}

                                <InputField
                                    icon={Lock}
                                    label="Create Password"
                                    type="password"
                                    placeholder="6+ chars, Alphanumeric"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    darkMode={darkMode}
                                    variants={itemVariants}
                                />
                                <InputField
                                    icon={ShieldCheck}
                                    label="Confirm Password"
                                    type="password"
                                    placeholder="Re-type password"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    darkMode={darkMode}
                                    variants={itemVariants}
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-5 rounded-2xl bg-emerald-500 text-white font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-colors"
                            >
                                Register Account
                            </button>
                        </motion.form>
                    )}

                    {mode === 'forgot' && (
                        <motion.div
                            key="forgot"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className={`premium-card p-8 text-center ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-white shadow-xl'}`}
                        >
                            <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-6">
                                <Globe className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-black tracking-tight mb-2">Recover Access</h3>
                            <p className="text-xs font-medium text-slate-500 mb-8 px-4">Enter your registered email and we&apos;ll send recovery instructions.</p>

                            <InputField
                                icon={Mail}
                                label="Email"
                                type="email"
                                placeholder="Enter your email"
                                darkMode={darkMode}
                                variants={itemVariants}
                            />

                            <div className="mt-8 space-y-4">
                                <button className="w-full btn-primary py-4 text-[10px]">Send Recovery Link</button>
                                <button onClick={() => setMode('login')} className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-emerald-500">Back to Portal</button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Footer Utilities */}
                <div className="mt-12 flex items-center justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all">
                    <button onClick={() => setDarkMode(!darkMode)} className="flex items-center gap-2">
                        {darkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-blue-500" />}
                        <span className="text-[9px] font-black uppercase tracking-widest">{darkMode ? 'Light' : 'Dark'}</span>
                    </button>
                    <div className="w-px h-4 bg-slate-300 dark:bg-slate-800" />
                    <div className="flex items-center gap-2">
                        <Info className="w-4 h-4" />
                        <span className="text-[9px] font-black uppercase tracking-widest">v2.4 Secure</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginScreen;
