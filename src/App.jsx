import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
// Vercel Build Trigger: v1.0.3
import {
    LayoutGrid,
    CreditCard,
    PieChart,
    User,
    Bell,
    Search,
    ArrowLeft,
    ShieldCheck,
    TrendingUp,
    ChevronRight
} from 'lucide-react';

// Data
import { loanCategories, communitySuccess } from './data/data';

// Screens
import LoginScreen from './screens/LoginScreen';
import HomeVariant1 from './screens/HomeScreen/HomeVariant1';
import SelectLoanScreen from './screens/LoanFlow/SelectLoanScreen';
import LoanRequestScreen from './screens/LoanFlow/LoanRequestScreen';
import LoanAmountScreen from './screens/LoanFlow/LoanAmountScreen';
import CompleteProfileScreen from './screens/ProfileFlow/CompleteProfileScreen';
import DocumentUploadScreen from './screens/ProfileFlow/DocumentUploadScreen';
import MyLoansScreen from './screens/MyLoansScreen';
import StatsScreen from './screens/StatsScreen';
import NotificationsScreen from './screens/NotificationsScreen';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminDashboard from './screens/AdminDashboard';
import { supabase } from './lib/supabase';

const UserApp = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({ id: 1, username: 'Guest', profileCompletion: 45 });
    const [darkMode, setDarkMode] = useState(false);
    const [currentScreen, setCurrentScreen] = useState('login');
    const [currentPage, setCurrentPage] = useState('home');
    const [loading, setLoading] = useState(false);
    const [loanForm, setLoanForm] = useState({ loanType: 'Micro-Enterprise', amount: 15000, period: '12 Months', dataConfirmed: false });
    const [profileForm, setProfileForm] = useState({ fullName: '', dob: '1995-05-15', gender: 'Male', nid: '', job: 'Micro-Entrepreneur', income: '35000' });
    const [myLoans, setMyLoans] = useState([]);

    const handleLogin = async (idOrEmail, password) => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .or(`username.eq.${idOrEmail},email.eq.${idOrEmail}`)
                .eq('password', password)
                .maybeSingle();

            if (error || !data) {
                alert('Invalid User ID/Email or password');
            } else {
                setUser({
                    ...user,
                    username: data.username,
                    id: data.id,
                    fullName: data.full_name,
                    email: data.email
                });
                setIsLoggedIn(true);
                setCurrentScreen('home');
                fetchLoans(data.id);
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('An unexpected error occurred. Please try again.');
        }
        setLoading(false);
    };

    const handleRegister = async (registerData) => {
        setLoading(true);
        try {
            // Check if user already exists
            const { data: existingUser, error: checkError } = await supabase
                .from('users')
                .select('id')
                .or(`username.eq.${registerData.userId},email.eq.${registerData.email}`)
                .maybeSingle();

            if (existingUser) {
                alert('User ID or Email already registered.');
                setLoading(false);
                return false;
            }

            const { error } = await supabase
                .from('users')
                .insert([
                    {
                        username: registerData.userId,
                        password: registerData.password,
                        email: registerData.email,
                        full_name: registerData.fullName
                    }
                ]);

            if (error) {
                alert('Registration failed: ' + error.message);
                setLoading(false);
                return false;
            } else {
                alert('Registration Successful! You can now login.');
                setLoading(false);
                return true;
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert('An error occurred during registration.');
            setLoading(false);
            return false;
        }
    };

    const fetchLoans = async (userId = user.id) => {
        if (!userId) return;
        try {
            const { data, error } = await supabase
                .from('loans')
                .select('*')
                .eq('user_id', userId);

            if (!error) {
                setMyLoans(data);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    const handleSubmitLoan = async () => {
        try {
            const { data, error } = await supabase
                .from('loans')
                .insert([
                    {
                        user_id: user.id,
                        amount: loanForm.amount,
                        purpose: loanForm.loanType,
                        status: 'Pending Review'
                    }
                ]);

            if (!error) {
                fetchLoans();
                setCurrentScreen('home');
                setCurrentPage('loans');
            } else {
                alert('Error submitting loan: ' + error.message);
            }
        } catch (error) {
            console.error('Submit error:', error);
        }
    };

    const renderScreen = () => {
        if (!isLoggedIn) return (
            <LoginScreen
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                handleLogin={handleLogin}
                handleRegister={handleRegister}
                loading={loading}
            />
        );

        let content;
        switch (currentScreen) {
            case 'home':
                if (currentPage === 'home') content = <HomeVariant1 user={user} darkMode={darkMode} setDarkMode={setDarkMode} setCurrentScreen={setCurrentScreen} setCurrentPage={setCurrentPage} myLoans={myLoans} communitySuccess={communitySuccess} />;
                else if (currentPage === 'loans') content = <MyLoansScreen myLoans={myLoans} darkMode={darkMode} setCurrentPage={setCurrentPage} />;
                else if (currentPage === 'stats') content = <StatsScreen darkMode={darkMode} setCurrentPage={setCurrentPage} />;
                else content = <HomeVariant1 user={user} darkMode={darkMode} setDarkMode={setDarkMode} setCurrentScreen={setCurrentScreen} setCurrentPage={setCurrentPage} myLoans={myLoans} communitySuccess={communitySuccess} />;
                break;
            case 'selectLoan': content = <SelectLoanScreen loanCategories={loanCategories} darkMode={darkMode} setCurrentScreen={setCurrentScreen} />; break;
            case 'loanRequest': content = <LoanRequestScreen loanForm={loanForm} setLoanForm={setLoanForm} darkMode={darkMode} setCurrentScreen={setCurrentScreen} />; break;
            case 'loanAmount': content = <LoanAmountScreen darkMode={darkMode} setCurrentScreen={setCurrentScreen} />; break;
            case 'completeProfile': content = <CompleteProfileScreen user={user} profileForm={profileForm} setProfileForm={setProfileForm} darkMode={darkMode} setCurrentScreen={setCurrentScreen} />; break;
            case 'documentUpload': content = <DocumentUploadScreen darkMode={darkMode} setCurrentScreen={setCurrentScreen} handleSubmitLoan={handleSubmitLoan} />; break;
            case 'notifications': content = <NotificationsScreen darkMode={darkMode} setCurrentScreen={setCurrentScreen} />; break;
            default: content = <HomeVariant1 user={user} darkMode={darkMode} setDarkMode={setDarkMode} setCurrentScreen={setCurrentScreen} setCurrentPage={setCurrentPage} myLoans={myLoans} communitySuccess={communitySuccess} />;
        }

        return (
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentScreen + currentPage}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    {content}
                </motion.div>
            </AnimatePresence>
        );
    };

    return (
        <div className={`transition-colors duration-500 ${darkMode ? 'dark bg-slate-950' : 'bg-slate-50'}`}>
            <div className="max-w-md mx-auto min-h-screen relative shadow-[0_0_100px_rgba(0,0,0,0.1)] overflow-hidden bg-inherit">
                {renderScreen()}

                {isLoggedIn && currentScreen === 'home' && (
                    <div className={`fixed bottom-0 left-0 right-0 z-50 px-6 py-4 ${darkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-white/80 border-slate-100'} backdrop-blur-xl border-t flex items-center justify-around rounded-t-[2.5rem] shadow-2xl`}>
                        {[
                            { id: 'home', icon: LayoutGrid, label: 'Home' },
                            { id: 'loans', icon: CreditCard, label: 'Loans' },
                            { id: 'stats', icon: PieChart, label: 'Stats' },
                            { id: 'profile', icon: User, label: 'Profile' }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => tab.id === 'profile' ? setCurrentScreen('completeProfile') : setCurrentPage(tab.id)}
                                className="flex flex-col items-center gap-1 group"
                            >
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-all ${currentPage === tab.id ? 'bg-emerald-500 text-white shadow-emerald-glow' : 'text-slate-400 group-hover:bg-slate-100 dark:group-hover:bg-slate-800'}`}>
                                    <tab.icon className="w-5 h-5" />
                                </div>
                                <span className={`text-[8px] font-black uppercase tracking-widest ${currentPage === tab.id ? 'text-emerald-500' : 'text-slate-400'}`}>{tab.label}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<UserApp />} />
        </Routes>
    </BrowserRouter>
);

export default App;
