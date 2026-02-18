import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    LayoutGrid,
    CreditCard,
    PieChart,
    User,
    ArrowRight,
    Loader2
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
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import CustomToast from './components/CustomToast';

import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import AdminDashboard from './screens/AdminDashboard';
import { supabase } from './lib/supabase';

// Helper to check for password recovery in URL
const isRecoveryFlow = () => {
    const hash = window.location.hash;
    return hash && hash.includes('type=recovery');
};

const UserApp = () => {
    const [session, setSession] = useState(null);
    const [user, setUser] = useState({ id: null, username: 'Guest', profileCompletion: 0 });
    const [appReady, setAppReady] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    // Navigation State
    const [currentScreen, setCurrentScreen] = useState('login');
    const [currentPage, setCurrentPage] = useState('home');

    // Operation State
    const [loading, setLoading] = useState(false);
    const [isPasswordReset, setIsPasswordReset] = useState(false);
    const [toast, setToast] = useState(null);

    // Forms State
    const [loanForm, setLoanForm] = useState({ loanType: 'Micro-Enterprise', amount: 15000, period: '12 Months', dataConfirmed: false });
    const [profileForm, setProfileForm] = useState({ fullName: '', dob: '1995-05-15', gender: 'Male', nid: '', job: 'Micro-Entrepreneur', income: '35000' });
    const [myLoans, setMyLoans] = useState([]);

    // --- Toast Helper ---
    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 4000);
    };

    // --- Auth Initialization ---
    useEffect(() => {
        // Check if we are in a recovery flow immediately
        if (isRecoveryFlow()) {
            setIsPasswordReset(true);
            setAppReady(true);
            return;
        }

        // Initialize Session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            if (session) {
                fetchUserProfile(session.user.id);
            } else {
                setAppReady(true);
            }
        });

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            console.log("Auth Event:", event);
            setSession(session);

            if (event === 'PASSWORD_RECOVERY') {
                setIsPasswordReset(true);
                setAppReady(true);
            } else if (event === 'SIGNED_IN' && session) {
                await fetchUserProfile(session.user.id);
                setIsPasswordReset(false);
            } else if (event === 'SIGNED_OUT') {
                setUser({ id: null, username: 'Guest', profileCompletion: 0 });
                setCurrentScreen('login');
                setIsPasswordReset(false);
            } else if (event === 'USER_UPDATED') {
                // Handle password update success if needed
                if (session) fetchUserProfile(session.user.id);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    // --- Data Fetching ---
    const fetchUserProfile = async (userId) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .maybeSingle();

            if (data) {
                setUser({
                    id: data.id,
                    username: data.username,
                    fullName: data.full_name,
                    email: data.email,
                    profileCompletion: 45
                });
                setCurrentScreen('home');
                fetchLoans(data.id);
            } else {
                // User exists in Auth but not in Profiles (rare, but possible if reg failed halfway)
                // We let them stay logged in but maybe direct to profile completion? 
                // For now, treat as guest or logged in with missing data
                console.warn('User logged in but no profile found.');
                setCurrentScreen('home'); // Or 'completeProfile'
            }
        } catch (error) {
            console.error('Profile fetch error:', error);
        } finally {
            setAppReady(true);
        }
    };

    const fetchLoans = async (userId) => {
        if (!userId) return;
        const { data } = await supabase.from('loans').select('*').eq('user_id', userId);
        if (data) setMyLoans(data);
    };

    // --- Auth Actions ---

    const handleLogin = async (idOrEmail, password) => {
        setLoading(true);
        try {
            const loginId = idOrEmail?.trim();
            const pass = password?.trim();

            if (!loginId || !pass) {
                showToast('Please enter both User ID/Email and Password.', 'error');
                return;
            }

            let email = loginId;

            // Resolve Username to Email if not an email address
            if (!loginId.includes('@')) {
                const { data: profile, error } = await supabase
                    .from('profiles')
                    .select('email')
                    .eq('username', loginId)
                    .maybeSingle();

                if (error || !profile) {
                    throw new Error('Username not found. Please register first.');
                }
                email = profile.email;
            }

            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password: pass
            });

            if (error) throw error;
            if (!data.session) throw new Error('Login failed. Please try again.');

            showToast('Welcome back!', 'success');
        } catch (error) {
            console.error("Login Error:", error);
            let msg = error.message;
            if (msg.includes('Invalid login credentials')) msg = 'Incorrect Email or Password.';
            showToast(msg, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleSendOtp = async (email) => {
        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: { shouldCreateUser: true }
        });
        if (error) {
            showToast(error.message, 'error');
            return false;
        }
        showToast('OTP code sent to ' + email, 'success');
        return true;
    };

    const handleVerifyOtp = async (email, token) => {
        const { data, error } = await supabase.auth.verifyOtp({
            email,
            token,
            type: 'email'
        });
        if (error) {
            showToast(error.message, 'error');
            return false;
        }
        showToast('Email verified successfully!', 'success');
        return true;
    };

    const checkUsernameUniqueness = async (username) => {
        const { count, error } = await supabase
            .from('profiles')
            .select('username', { count: 'exact', head: true })
            .eq('username', username);
        if (error) return false;
        return count === 0;
    };

    const handleRegister = async (registerData) => {
        setLoading(true);
        try {
            // 1. Check Username
            const isUnique = await checkUsernameUniqueness(registerData.userId);
            if (!isUnique) {
                showToast('Username already taken.', 'warning');
                return false;
            }

            // 2. Check Session (from OTP)
            const { data: { session } } = await supabase.auth.getSession();
            let userId = session?.user?.id;

            if (session) {
                // Update Password for OTP-authenticated user
                const { error: updateError } = await supabase.auth.updateUser({
                    password: registerData.password,
                    data: {
                        username: registerData.userId,
                        full_name: registerData.fullName
                    }
                });
                if (updateError) throw updateError;
            } else {
                // Standard Signup (Fallback)
                const { data: authData, error: authError } = await supabase.auth.signUp({
                    email: registerData.email,
                    password: registerData.password,
                    options: {
                        data: {
                            username: registerData.userId,
                            full_name: registerData.fullName
                        }
                    }
                });
                if (authError) throw authError;
                userId = authData.user?.id;
            }

            // 3. Create Profile
            if (userId) {
                // Upsert profile to be safe
                const { error: profileError } = await supabase
                    .from('profiles')
                    .upsert({
                        id: userId,
                        username: registerData.userId,
                        full_name: registerData.fullName,
                        email: registerData.email
                    }, { onConflict: 'id' });

                if (profileError) throw profileError;

                showToast('Registration Successful!', 'success');
                await fetchUserProfile(userId);
                return true;
            }
            return false;

        } catch (error) {
            console.error('Registration Error:', error);
            showToast(error.message, 'error');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async (email) => {
        setLoading(true);
        try {
            // Ensure we redirect to the current origin
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: window.location.origin,
            });
            if (error) throw error;
            showToast('Recovery email sent. Please check your inbox.', 'success');
        } catch (error) {
            showToast(error.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdatePassword = async (newPassword) => {
        setLoading(true);
        try {
            const { error } = await supabase.auth.updateUser({ password: newPassword });
            if (error) throw error;
            showToast('Password reset successfully. Please login.', 'success');
            setIsPasswordReset(false);
            // Sign out to force clean login with new credentials
            await supabase.auth.signOut();
        } catch (error) {
            showToast(error.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    const handleSubmitLoan = async () => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            const { error } = await supabase
                .from('loans')
                .insert([{
                    user_id: user.id || session?.user?.id,
                    loan_type: loanForm.loanType,
                    amount: loanForm.amount,
                    period: loanForm.period,
                    status: 'Pending Review',
                    purpose: loanForm.loanType
                }]);

            if (error) throw error;

            showToast('Application Submitted! Our team is reviewing it.', 'success');
            setCurrentScreen('home');
            if (user.id) fetchLoans(user.id);
        } catch (error) {
            console.error('Loan submission error:', error);
            showToast('Failed to submit loan: ' + error.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitProfile = async () => {
        setLoading(true);
        try {
            const { error } = await supabase
                .from('profiles')
                .update({
                    full_name: profileForm.fullName,
                    dob: profileForm.dob,
                    gender: profileForm.gender,
                    occupation: profileForm.job,
                    monthly_income: profileForm.income
                })
                .eq('id', user.id || session?.user?.id);

            if (error) throw error;

            showToast('Profile Updated Successfully!', 'success');
            setUser(prev => ({ ...prev, fullName: profileForm.fullName }));
        } catch (error) {
            showToast('Update failed: ' + error.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    // --- Render Logic ---
    const renderContent = () => {
        // 1. Password Reset Flow
        if (isPasswordReset) {
            return <ResetPasswordScreen darkMode={darkMode} handleUpdatePassword={handleUpdatePassword} showToast={showToast} />;
        }

        // 2. Loading State
        if (!appReady) {
            return (
                <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950">
                    <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
                </div>
            );
        }

        // 3. Login Screen
        if (!session) {
            return (
                <LoginScreen
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                    handleLogin={handleLogin}
                    handleRegister={handleRegister}
                    handleSendOtp={handleSendOtp}
                    handleVerifyOtp={handleVerifyOtp}
                    handleForgotPassword={handleForgotPassword}
                    loading={loading}
                    showToast={showToast}
                />
            );
        }

        // 4. Main App Screens
        switch (currentScreen) {
            case 'home':
                return currentPage === 'home'
                    ? <HomeVariant1 user={user} darkMode={darkMode} setDarkMode={setDarkMode} setCurrentScreen={setCurrentScreen} setCurrentPage={setCurrentPage} myLoans={myLoans} communitySuccess={communitySuccess} handleLogout={handleLogout} />
                    : currentPage === 'loans'
                        ? <MyLoansScreen myLoans={myLoans} darkMode={darkMode} setCurrentPage={setCurrentPage} />
                        : currentPage === 'stats'
                            ? <StatsScreen darkMode={darkMode} setCurrentPage={setCurrentPage} />
                            : <HomeVariant1 user={user} darkMode={darkMode} setDarkMode={setDarkMode} setCurrentScreen={setCurrentScreen} setCurrentPage={setCurrentPage} myLoans={myLoans} communitySuccess={communitySuccess} />;
            case 'selectLoan': return <SelectLoanScreen loanCategories={loanCategories} darkMode={darkMode} setCurrentScreen={setCurrentScreen} />;
            case 'loanRequest': return <LoanRequestScreen loanForm={loanForm} setLoanForm={setLoanForm} darkMode={darkMode} setCurrentScreen={setCurrentScreen} />;
            case 'loanAmount': return <LoanAmountScreen loanForm={loanForm} setLoanForm={setLoanForm} darkMode={darkMode} setCurrentScreen={setCurrentScreen} />;
            case 'completeProfile': return <CompleteProfileScreen user={user} profileForm={profileForm} setProfileForm={setProfileForm} darkMode={darkMode} setCurrentScreen={setCurrentScreen} handleSubmitProfile={handleSubmitProfile} showToast={showToast} />;
            case 'documentUpload': return <DocumentUploadScreen darkMode={darkMode} setCurrentScreen={setCurrentScreen} handleSubmitLoan={handleSubmitLoan} showToast={showToast} />;
            case 'notifications': return <NotificationsScreen darkMode={darkMode} setCurrentScreen={setCurrentScreen} />;
            default: return <HomeVariant1 user={user} darkMode={darkMode} setDarkMode={setDarkMode} setCurrentScreen={setCurrentScreen} setCurrentPage={setCurrentPage} myLoans={myLoans} communitySuccess={communitySuccess} />;
        }
    };

    return (
        <div className={`transition-colors duration-500 ${darkMode ? 'dark bg-slate-950' : 'bg-slate-50'}`}>
            <div className="max-w-md mx-auto min-h-screen relative shadow-2xl overflow-hidden bg-inherit">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={session ? (currentScreen + currentPage) : 'auth'}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {renderContent()}
                    </motion.div>
                </AnimatePresence>

                {/* Toasts */}
                <AnimatePresence>
                    {toast && (
                        <CustomToast
                            message={toast.message}
                            type={toast.type}
                            onClose={() => setToast(null)}
                            darkMode={darkMode}
                        />
                    )}
                </AnimatePresence>

                {/* Bottom Navigation (Only when logged in and on main screens) */}
                {session && currentScreen === 'home' && (
                    <div className={`fixed bottom-0 left-0 right-0 z-50 px-6 py-4 ${darkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-white/80 border-slate-100'} backdrop-blur-xl border-t flex items-center justify-around rounded-t-[2.5rem] shadow-2xl max-w-md mx-auto`}>
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
