import React from 'react';
import { CheckCircle, Bell, Plus, Wallet, Send, Clock, User, ChevronRight } from 'lucide-react';
import CircularProgress from '../../components/CircularProgress';

const HomeVariant3 = ({ user, darkMode, setDarkMode, setCurrentScreen }) => (
    <div className="min-h-screen bg-gray-950 pb-24">
        {/* Header */}
        <div className="px-6 py-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="relative">
                    <div className="w-14 h-14 bg-amber-400 rounded-2xl flex items-center justify-center text-white text-xl font-bold border-4 border-green-500">
                        {user.name.charAt(0)}
                    </div>
                </div>
                <div>
                    <p className="text-xs text-green-400 font-semibold">{user.organization.toUpperCase()}</p>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        {user.name}
                        <CheckCircle className="w-5 h-5 text-green-400" fill="currentColor" />
                    </h2>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <button onClick={() => setDarkMode(!darkMode)} className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                    <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
                </button>
                <button className="w-10 h-10 rounded-full bg-green-900 flex items-center justify-center">
                    <Bell className="w-5 h-5 text-green-400" />
                </button>
            </div>
        </div>

        {/* Balance Card */}
        <div className="px-6 mb-6">
            <div className="bg-gradient-to-br from-green-800 to-green-900 rounded-3xl p-6 text-white relative overflow-hidden border border-green-700">
                <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <p className="text-sm text-green-300 mb-2">AVAILABLE BALANCE</p>
                            <h1 className="text-5xl font-bold">৳ {user.totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h1>
                        </div>
                        <CircularProgress percentage={user.progress} size={80} strokeWidth={6} showLabel={true} darkMode={true} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs text-green-300 mb-1">APPROVED LOAN</p>
                            <p className="text-2xl font-bold text-green-400">৳ {user.approvedLoan.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-green-300 mb-1">PROGRESS</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Quick Actions */}
        <div className="px-6 mb-6">
            <div className="bg-gray-900 rounded-3xl p-6 grid grid-cols-4 gap-4 border border-gray-800">
                {[
                    { icon: Plus, label: 'Loan Request', bg: 'bg-gradient-to-br from-green-600 to-green-700', screen: 'loanRequest' },
                    { icon: Wallet, label: 'Withdraw', bg: 'bg-gray-800' },
                    { icon: Send, label: 'Transfer', bg: 'bg-gray-800' },
                    { icon: Clock, label: 'History', bg: 'bg-gray-800' }
                ].map((action, idx) => (
                    <button
                        key={idx}
                        onClick={() => action.screen && setCurrentScreen(action.screen)}
                        className="flex flex-col items-center gap-2"
                    >
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${action.bg}`}>
                            <action.icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                        </div>
                        <span className="text-xs font-semibold text-gray-400">{action.label}</span>
                    </button>
                ))}
            </div>
        </div>

        {/* Recent Success Stories */}
        <div className="px-6 mb-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">RECENT SUCCESSES</h3>
            </div>

            <div className="bg-gray-900 rounded-3xl p-6 border border-green-900">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-green-900 rounded-2xl flex items-center justify-center">
                        <User className="w-8 h-8 text-green-400" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm text-green-400 font-bold mb-1">LOAN SUCCESSFULLY COMPLETED</p>
                        <h4 className="text-xl font-bold text-white mb-1">Amir Hossain</h4>
                        <p className="text-sm text-gray-500">Retail Merchant</p>
                    </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                    <span className="text-sm text-gray-500">Funded Amount</span>
                    <span className="text-2xl font-bold text-green-400">৳12,000</span>
                </div>
            </div>
        </div>
    </div>
);

export default HomeVariant3;
