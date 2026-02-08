import React from 'react';
import { ArrowLeft, Bell, CheckCircle2, AlertCircle, Info, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const NotificationsScreen = ({ darkMode, setCurrentScreen }) => {
    const notifications = [
        {
            id: 1,
            title: 'Loan Prequalified',
            message: 'Your Micro-Enterprise loan application has been prequalified. Complete your profile to finalize.',
            time: '2 mins ago',
            type: 'success',
            icon: CheckCircle2,
            color: 'emerald'
        },
        {
            id: 2,
            title: 'Security Alert',
            message: 'A new login was detected from a Chrome browser on Windows.',
            time: '1 hour ago',
            type: 'warning',
            icon: AlertCircle,
            color: 'amber'
        },
        {
            id: 3,
            title: 'Repayment Reminder',
            message: 'Your next EMI for Personal Loan is due in 3 days.',
            time: '5 hours ago',
            type: 'info',
            icon: Info,
            color: 'blue'
        }
    ];

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'} pb-32 font-['Outfit']`}>
            {/* Header */}
            <div className={`sticky top-0 z-40 px-6 py-6 flex items-center justify-between ${darkMode ? 'bg-slate-950/80' : 'bg-slate-50/80'} backdrop-blur-xl`}>
                <div className="flex items-center gap-4">
                    <button onClick={() => setCurrentScreen('home')} className={`w-10 h-10 rounded-xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'} flex items-center justify-center`}>
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-xl font-black tracking-tight">Activity Center</h1>
                </div>
                <button className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Mark All Read</button>
            </div>

            <div className="px-6 space-y-4 mt-6">
                {notifications.map((notif, i) => (
                    <motion.div
                        key={notif.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`premium-card p-5 border-l-4 border-l-${notif.color}-500 flex items-start gap-4 group cursor-pointer hover:bg-${notif.color}-500/5 transition-colors`}
                    >
                        <div className={`w-12 h-12 rounded-2xl bg-${notif.color}-500/10 text-${notif.color}-500 flex items-center justify-center shrink-0`}>
                            <notif.icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                                <h4 className="text-sm font-black">{notif.title}</h4>
                                <span className={`text-[9px] font-bold ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>{notif.time}</span>
                            </div>
                            <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-500'} mb-2`}>
                                {notif.message}
                            </p>
                            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-transform ml-auto" />
                        </div>
                    </motion.div>
                ))}

                {/* Empty State Mockup if needed */}
                <div className="pt-12 text-center opacity-20">
                    <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
                        <Bell className="w-8 h-8" />
                    </div>
                    <p className="text-xs font-black uppercase tracking-widest">End of Stream</p>
                </div>
            </div>
        </div>
    );
};

export default NotificationsScreen;
