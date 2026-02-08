import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    CreditCard,
    CheckCircle2,
    XCircle,
    Clock,
    ShieldCheck,
    Search,
    RefreshCcw,
    ArrowLeft
} from 'lucide-react';
import { supabase } from '../lib/supabase';

const AdminDashboard = () => {
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0 });

    const fetchAllLoans = useCallback(async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('loans')
                .select(`
                    *,
                    users (
                        username
                    )
                `)
                .order('id', { ascending: false });

            if (!error) {
                // Flatten the data for easier use in table
                const flattenedData = data.map(loan => ({
                    ...loan,
                    username: loan.users?.username || 'Unknown'
                }));
                setLoans(flattenedData);
                calculateStats(flattenedData);
            }
        } catch (error) {
            console.error('Error fetching admin data:', error);
        }
        setLoading(false);
    }, []);

    const calculateStats = (data) => {
        setStats({
            total: data.length,
            pending: data.filter(l => l.status === 'Pending Review' || l.status === 'Pending').length,
            approved: data.filter(l => l.status === 'Approved' || l.status === 'Active').length
        });
    };

    const updateLoanStatus = async (id, status) => {
        try {
            const { error } = await supabase
                .from('loans')
                .update({ status })
                .eq('id', id);

            if (!error) {
                fetchAllLoans();
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    useEffect(() => {
        fetchAllLoans();
    }, [fetchAllLoans]);

    return (
        <div className="min-h-screen bg-slate-950 text-white font-['Outfit'] p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-12">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter">Admin Control Vault</h1>
                    <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest mt-1">Provati Institutional Access</p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={fetchAllLoans}
                        className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-slate-800 transition-colors"
                    >
                        <RefreshCcw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-emerald-glow">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 mb-12">
                {[
                    { label: 'Total Enrolled', value: stats.total, icon: Users, color: 'blue' },
                    { label: 'Pending Review', value: stats.pending, icon: Clock, color: 'amber' },
                    { label: 'Sanctioned', value: stats.approved, icon: CheckCircle2, color: 'emerald' }
                ].map((s, i) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={i}
                        className="premium-card p-6 bg-slate-900 border-slate-800"
                    >
                        <s.icon className={`w-6 h-6 text-${s.color}-500 mb-4`} />
                        <h3 className="text-4xl font-black tracking-tighter">{s.value}</h3>
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{s.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Loan Queue */}
            <div className="premium-card bg-slate-900 border-slate-800 overflow-hidden">
                <div className="px-8 py-6 border-b border-slate-800 flex items-center justify-between">
                    <h3 className="text-sm font-black uppercase tracking-widest">Global Loan Queue</h3>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                            type="text"
                            className="bg-slate-950 border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-xs outline-none focus:border-emerald-500 transition-colors"
                            placeholder="Filter by Applicant..."
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                            <tr>
                                <th className="px-8 py-4">Applicant</th>
                                <th className="px-8 py-4">Amount</th>
                                <th className="px-8 py-4">Purpose</th>
                                <th className="px-8 py-4">Status</th>
                                <th className="px-8 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {loans.map((loan) => (
                                <tr key={loan.id} className="border-t border-slate-800/50 hover:bg-slate-800/20 transition-colors">
                                    <td className="px-8 py-6 font-black">{loan.username}</td>
                                    <td className="px-8 py-6 text-emerald-500 font-black">৳{loan.amount.toLocaleString()}</td>
                                    <td className="px-8 py-6 text-slate-400">{loan.purpose}</td>
                                    <td className="px-8 py-6">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${loan.status === 'Approved' || loan.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' :
                                            loan.status === 'Rejected' ? 'bg-rose-500/10 text-rose-500' :
                                                'bg-amber-500/10 text-amber-500'
                                            }`}>
                                            {loan.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        {(loan.status === 'Pending Review' || loan.status === 'Pending') && (
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => updateLoanStatus(loan.id, 'Approved')}
                                                    className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all shadow-emerald-glow/10"
                                                >
                                                    <CheckCircle2 className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => updateLoanStatus(loan.id, 'Rejected')}
                                                    className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all"
                                                >
                                                    <XCircle className="w-5 h-5" />
                                                </button>
                                            </div>
                                        )}
                                        {loan.status !== 'Pending' && loan.status !== 'Pending Review' && (
                                            <span className="text-[10px] font-bold text-slate-600 uppercase">Settled</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {loans.length === 0 && !loading && (
                        <div className="py-20 text-center text-slate-600 italic">No loan applications found in the system.</div>
                    )}
                </div>
            </div>

            <div className="mt-8 flex justify-center">
                <p className="text-[10px] font-bold text-slate-700 uppercase tracking-[0.4em]">PROVATI DATA INTEGRITY GUARANTEED</p>
            </div>
        </div>
    );
};

export default AdminDashboard;
