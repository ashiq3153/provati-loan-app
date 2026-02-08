import React from 'react';
import { Check, Bell, Plus, TrendingUp, Send, Menu } from 'lucide-react';

const HomeVariant4 = ({ user, setCurrentScreen, communitySuccess }) => (
    <div className="min-h-screen bg-white pb-24">
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                        {user.name.charAt(0)}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white">
                        <Check className="w-3 h-3 text-white" strokeWidth={4} />
                    </div>
                </div>
                <div>
                    <p className="text-xs text-emerald-600 font-semibold">{user.organization.toUpperCase()}</p>
                    <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                </div>
            </div>
            <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <Bell className="w-5 h-5 text-gray-600" />
            </button>
        </div>

        {/* Portfolio Balance */}
        <div className="px-6 mb-6">
            <p className="text-sm text-gray-500 mb-2">PORTFOLIO BALANCE</p>
            <div className="flex items-baseline gap-2 mb-2">
                <h1 className="text-5xl font-bold text-gray-900">৳{user.portfolioBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h1>
                <span className="text-emerald-500 font-bold text-lg">+{user.portfolioChange}%</span>
            </div>
        </div>

        {/* Quick Actions */}
        <div className="px-6 mb-6">
            <div className="grid grid-cols-4 gap-3">
                {[
                    { icon: Plus, label: 'Apply', bg: 'bg-gradient-to-br from-emerald-400 to-green-500', text: 'text-white', screen: 'loanRequest' },
                    { icon: TrendingUp, label: 'Withdraw', bg: 'bg-gray-100', text: 'text-gray-700' },
                    { icon: Send, label: 'History', bg: 'bg-gray-100', text: 'text-gray-700' },
                    { icon: Menu, label: 'More', bg: 'bg-gray-100', text: 'text-gray-700' }
                ].map((action, idx) => (
                    <button
                        key={idx}
                        onClick={() => action.screen && setCurrentScreen(action.screen)}
                        className="flex flex-col items-center gap-2"
                    >
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${action.bg}`}>
                            <action.icon className={`w-6 h-6 ${action.text}`} strokeWidth={2.5} />
                        </div>
                        <span className="text-xs font-semibold text-gray-700">{action.label}</span>
                    </button>
                ))}
            </div>
        </div>

        {/* Community Success */}
        <div className="px-6 mb-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">COMMUNITY SUCCESS</h3>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {communitySuccess.map((person) => (
                    <div key={person.id} className="flex-shrink-0 w-72 bg-white rounded-2xl p-5 border-2 border-gray-100 hover:border-emerald-200 transition-all">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 bg-gray-200 rounded-2xl overflow-hidden">
                                <div className="w-full h-full bg-emerald-50 flex items-center justify-center">
                                    <span className="text-2xl">👤</span>
                                </div>
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-gray-900 mb-1">{person.name}</h4>
                                <p className="text-sm text-gray-500">{person.profession}</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div>
                                <p className="text-xs text-emerald-600 font-bold mb-1">FUNDED AMOUNT</p>
                                <p className="text-2xl font-bold text-gray-900">৳{person.funded.toLocaleString()}</p>
                            </div>
                            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold">
                                {person.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default HomeVariant4;
