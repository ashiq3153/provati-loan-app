import React from 'react';
import {
    Bell,
    ArrowUpRight,
    ArrowDownLeft,
    Plus,
    Wallet,
    ChevronRight,
    ShieldCheck,
    CreditCard,
    LayoutGrid,
    Search
} from 'lucide-react';
import { motion } from 'framer-motion';

const HomeVariant1 = ({ user, darkMode, setDarkMode, setCurrentScreen, setCurrentPage, myLoans, communitySuccess, handleLogout }) => {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.1 }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 15 },
        show: { opacity: 1, y: 0, transition: { type: 'spring', damping: 20, stiffness: 100 } }
    };

    const totalBalance = 24500.85;

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className={`min-h-screen ${darkMode ? 'bg-slate-950' : 'bg-slate-50'} pb-32 font-['Outfit']`}
        >
            {/* Top Bar */}
            <div className={`sticky top-0 z-40 px-6 py-4 flex items-center justify-between ${darkMode ? 'bg-slate-950/80' : 'bg-slate-50/80'} backdrop-blur-xl`}>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white shadow-emerald-glow">
                        <span className="font-black text-lg">{(user.fullName || user.username || 'G').charAt(0).toUpperCase()}</span>
                    </div>
                    <div>
                        <p className={`text-[10px] font-bold tracking-widest uppercase ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Good Day,</p>
                        <h2 className={`text-lg font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>{user.fullName || user.username}</h2>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setCurrentScreen('notifications')}
                        className="relative p-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-emerald-500 transition-colors group"
                    >
                        <Bell className="w-6 h-6" />
                        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-emerald-500 rounded-full border-2 border-slate-950"></span>
                    </button>
                    <button
                        onClick={handleLogout}
                        className="p-2.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 hover:bg-rose-500 hover:text-white transition-all active:scale-95"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                    </button>
                </div>
            </div>

            <div className="px-6 mt-4">
                <motion.div variants={item} className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'} shadow-sm mb-6`}>
                    <Search className="w-5 h-5 text-slate-400" />
                    <input type="text" placeholder="Search for benefits..." className="flex-1 bg-transparent outline-none text-sm font-medium" />
                </motion.div>

                {/* Main Card */}
                <motion.div variants={item} className="relative mb-8 group">
                    <div className="absolute inset-0 bg-emerald-500 rounded-[2.5rem] blur-2xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
                    <div className="relative overflow-hidden premium-card bg-slate-900 border-slate-800 p-8 text-white min-h-[200px] flex flex-col justify-between">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-400/10 rounded-full blur-3xl"></div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Available Balance</p>
                                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                            </div>
                            <h3 className="text-4xl font-black tracking-tighter mb-1">৳{totalBalance.toLocaleString()}</h3>
                            <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-black uppercase tracking-wider">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                                Insured by Provati Safeguard
                            </div>
                        </div>

                        <div className="flex gap-4 mt-8">
                            <button className="flex-1 bg-white text-slate-900 py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-all">
                                <ArrowUpRight className="w-4 h-4" /> Transfer
                            </button>
                            <button className="flex-1 bg-slate-800 text-white py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-all">
                                <ArrowDownLeft className="w-4 h-4" /> Deposit
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Quick Actions Grid */}
                <motion.div variants={item} className="grid grid-cols-4 gap-4 mb-10">
                    {[
                        { label: 'Loan', icon: CreditCard, color: 'emerald', screen: 'loanRequest' },
                        { label: 'Withdraw', icon: Wallet, color: 'blue', screen: '' },
                        { label: 'History', icon: LayoutGrid, color: 'purple', screen: 'stats' },
                        { label: 'Invite', icon: ArrowUpRight, color: 'orange', screen: '' }
                    ].map((btn, i) => (
                        <button
                            key={i}
                            onClick={btn.screen ? () => {
                                if (btn.screen === 'stats') setCurrentPage('stats');
                                else setCurrentScreen(btn.screen);
                            } : undefined}
                            className="flex flex-col items-center gap-3 group"
                        >
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm group-hover:scale-110 group-hover:shadow-lg`}>
                                <btn.icon className={`w-6 h-6 text-${btn.color}-500`} />
                            </div>
                            <span className={`text-[10px] font-bold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{btn.label}</span>
                        </button>
                    ))}
                </motion.div>

                {/* Ticker / Success stories */}
                <motion.div variants={item} className={`mb-10 p-4 rounded-3xl border ${darkMode ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-emerald-50 border-emerald-100'} flex items-center gap-4`}>
                    <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0">
                        <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div className="overflow-hidden">
                        <p className={`text-[9px] font-black uppercase tracking-widest text-emerald-600 mb-0.5`}>Community Trust</p>
                        <div className="flex gap-2 whitespace-nowrap animate-marquee">
                            {communitySuccess.map((s, i) => (
                                <span key={i} className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                                    {s.name} sanctioned ৳{(s.amount / 1000).toFixed(0)}k •
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Active Loans */}
                <div className="mb-8">
                    <motion.div variants={item} className="flex items-center justify-between mb-6">
                        <h3 className={`text-xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>Active Contracts</h3>
                        <button onClick={() => setCurrentPage('loans')} className="text-emerald-500 text-xs font-black uppercase tracking-widest flex items-center gap-1 group">
                            Manage All <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>

                    <div className="space-y-4">
                        {myLoans.length > 0 ? myLoans.slice(0, 2).map((loan, idx) => (
                            <motion.div
                                key={loan.id}
                                variants={item}
                                className="premium-card p-6 flex items-center justify-between group cursor-pointer"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${darkMode ? 'bg-slate-800' : 'bg-slate-50'}`}>
                                        🏠
                                    </div>
                                    <div>
                                        <h4 className={`text-sm font-black ${darkMode ? 'text-white' : 'text-slate-900'} mb-1`}>{loan.purpose}</h4>
                                        <div className="flex items-center gap-2">
                                            <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${loan.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>{loan.status}</span>
                                            <span className="text-[9px] font-bold text-slate-400">Next: 12 Jan</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`text-lg font-black ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>৳{(loan.amount / 1000).toFixed(1)}k</p>
                                    <p className="text-[10px] font-bold text-slate-400">Left: 12m</p>
                                </div>
                            </motion.div>
                        )) : (
                            <motion.div variants={item} className="premium-card p-10 flex flex-col items-center justify-center text-center opacity-50 italic">
                                <Plus className="w-8 h-8 mb-2 opacity-20" />
                                <p className="text-sm font-medium">No active contracts found.</p>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default HomeVariant1;
