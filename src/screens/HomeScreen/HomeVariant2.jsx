import React from 'react';
import { Check, Bell, Plus, Wallet, Send, Clock, ChevronRight } from 'lucide-react';
import CircularProgress from '../../components/CircularProgress';

const HomeVariant2 = ({ user, darkMode, setDarkMode, setCurrentScreen, myLoans }) => (
    <div className="min-h-screen bg-gradient-to-b from-green-800 to-green-900 pb-24">
        {/* Header */}
        <div className="px-6 py-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="relative">
                    <div className="w-14 h-14 bg-amber-400 rounded-2xl flex items-center justify-center text-white text-xl font-bold">
                        {user.name.charAt(0)}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full border-2 border-green-900 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </div>
                </div>
                <div>
                    <p className="text-xs text-green-200">{user.organization.toUpperCase()}</p>
                    <h2 className="text-xl font-bold text-white">{user.name}</h2>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <button onClick={() => setDarkMode(!darkMode)} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center">
                    <div className="w-6 h-6 bg-white rounded-full"></div>
                </button>
                <button className="relative w-10 h-10 rounded-full bg-green-700 flex items-center justify-center">
                    <Bell className="w-5 h-5 text-white" />
                </button>
            </div>
        </div>

        {/* Balance Card */}
        <div className="px-6 mb-6">
            <div className="bg-green-700 rounded-3xl p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-10 -mt-10"></div>

                <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <p className="text-sm text-green-200 mb-2">TOTAL BALANCE</p>
                            <h1 className="text-5xl font-bold">৳ {user.totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h1>
                        </div>
                        <div className="text-right">
                            <CircularProgress percentage={user.progress} size={80} strokeWidth={6} showLabel={true} darkMode={true} />
                            <p className="text-xs text-green-200 mt-2">PAID</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <p className="text-xs text-green-200 mb-1">APPROVED LOAN</p>
                            <p className="text-2xl font-bold">৳ {user.approvedLoan.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Quick Actions */}
        <div className="px-6 mb-6">
            <div className="bg-white rounded-3xl p-4 grid grid-cols-4 gap-3 shadow-xl">
                {[
                    { icon: Plus, label: 'Loan Request', screen: 'loanRequest' },
                    { icon: Wallet, label: 'Withdraw' },
                    { icon: Send, label: 'Transfer' },
                    { icon: Clock, label: 'History' }
                ].map((action, idx) => (
                    <button
                        key={idx}
                        onClick={() => action.screen && setCurrentScreen(action.screen)}
                        className="flex flex-col items-center gap-2"
                    >
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${idx === 0 ? 'bg-gradient-to-br from-emerald-400 to-green-500' : 'bg-green-100'}`}>
                            <action.icon className={`w-6 h-6 ${idx === 0 ? 'text-white' : 'text-green-700'}`} strokeWidth={2.5} />
                        </div>
                        <span className="text-xs font-semibold text-gray-700">{action.label}</span>
                    </button>
                ))}
            </div>
        </div>

        {/* My Loans */}
        <div className="px-6 mb-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">My Loans</h3>
                <button className="text-emerald-300 text-sm font-bold">See All</button>
            </div>

            <div className="space-y-3">
                {myLoans.slice(0, 2).map((loan) => (
                    <div key={loan.id} className="bg-white/10 backdrop-blur-lg rounded-2xl p-5">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <CircularProgress percentage={loan.progress} size={60} strokeWidth={5} showLabel={true} darkMode={true} />
                                <div>
                                    <h4 className="font-bold text-white mb-1">{loan.type}</h4>
                                    <p className="text-sm text-green-200">Remaining: ৳ {loan.remaining.toLocaleString()}</p>
                                </div>
                            </div>
                            <ChevronRight className="w-6 h-6 text-green-300" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default HomeVariant2;
