# Provati Loan App - Professional Setup Guide

## 🎯 Overview
This is a professional microfinance loan application built with React, Supabase, and modern authentication practices. The app features:
- ✅ Secure Supabase Authentication with email/password
- ✅ Professional OTP verification system
- ✅ Session management (auto-login on refresh)
- ✅ Username or Email login support
- ✅ Profile and loan management
- ✅ Admin dashboard
- ✅ Real-time database synchronization

---

## 📋 Prerequisites
- Node.js (v16 or higher)
- A Supabase account (free tier works fine)
- Git

---

## 🚀 Step 1: Supabase Database Setup

### 1.1 Create a New Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Wait for the database to initialize (2-3 minutes)

### 1.2 Run Database Schema
Go to **SQL Editor** in your Supabase dashboard and run this SQL:

```sql
-- ==========================================
-- PROFILES TABLE (User Information)
-- ==========================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  email TEXT,
  dob TEXT,
  gender TEXT,
  occupation TEXT,
  monthly_income TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Public profiles are viewable by everyone" 
  ON public.profiles FOR SELECT 
  USING (true);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

-- ==========================================
-- LOANS TABLE (Loan Applications)
-- ==========================================
CREATE TABLE IF NOT EXISTS public.loans (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  loan_type TEXT,
  amount NUMERIC,
  period TEXT,
  status TEXT DEFAULT 'Pending Review',
  purpose TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.loans ENABLE ROW LEVEL SECURITY;

-- Policies for loans
CREATE POLICY "Users can view their own loans" 
  ON public.loans FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own loans" 
  ON public.loans FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all loans" 
  ON public.loans FOR SELECT 
  USING (true);

CREATE POLICY "Admins can update all loans" 
  ON public.loans FOR UPDATE 
  USING (true);

-- ==========================================
-- INDEXES (Performance Optimization)
-- ==========================================
CREATE INDEX IF NOT EXISTS idx_profiles_username ON public.profiles(username);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_loans_user_id ON public.loans(user_id);
CREATE INDEX IF NOT EXISTS idx_loans_status ON public.loans(status);
```

---

## 🔧 Step 2: Configure Environment Variables

### 2.1 Get Your Supabase Credentials
1. In Supabase Dashboard, go to **Settings** → **API**
2. Copy:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

### 2.2 Create `.env` File
Create a file named `.env` in the project root:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

**⚠️ Important:** Replace the placeholder values with your actual credentials!

---

## 📧 Step 3: Configure Email Authentication

### 3.1 Enable Email Provider
1. Go to **Authentication** → **Providers** in Supabase
2. Enable **Email** provider
3. **Disable** "Confirm email" if you want to test without email verification
   - For production, keep it enabled and configure SMTP

### 3.2 (Optional) Configure Custom SMTP
For production, set up custom email:
1. Go to **Authentication** → **Email Templates**
2. Configure your SMTP settings (Gmail, SendGrid, etc.)

---

## 💻 Step 4: Install and Run the App

### 4.1 Install Dependencies
```bash
npm install
```

### 4.2 Run Development Server
```bash
npm run dev
```

The app will open at `http://localhost:5173`

---

## 🧪 Step 5: Test the Application

### 5.1 Register a New User
1. Click **"Apply for Membership"**
2. Fill in:
   - Full Name: `Test User`
   - User ID: `test123` (must have letters and numbers)
   - Email: Your real email
   - Click **"Send OTP"**
3. Check your email for the 6-digit code
4. Enter the OTP and click **"Verify Security Code"**
5. Set a password (6+ characters, alphanumeric)
6. Click **"Register Account"**

### 5.2 Login
1. Use either:
   - Your email address, OR
   - Your username (e.g., `test123`)
2. Enter your password
3. Click **"Authorize & Enter"**

### 5.3 Test Features
- **Home Screen**: View balance and active loans
- **Apply for Loan**: Navigate through the loan application flow
- **Profile**: Update your personal information
- **Logout**: Click the red logout button in the top-right

---

## 🔐 Security Features Implemented

✅ **Supabase Auth Integration**
- Industry-standard authentication
- Encrypted password storage
- Session tokens with automatic refresh

✅ **OTP Email Verification**
- 6-digit verification codes
- Resend timer (60 seconds)
- Professional UI with discrete input boxes

✅ **Row Level Security (RLS)**
- Users can only see their own data
- Admin access for loan management
- Secure database queries

✅ **Session Management**
- Auto-login on page refresh
- Secure logout functionality
- Token-based authentication

---

## 🎨 Key Features

### Authentication
- Email/Username login
- OTP verification
- Password reset (forgot password flow)
- Session persistence

### User Features
- Profile management
- Loan applications
- Loan history
- Real-time balance updates

### Admin Features
- View all loan applications
- Approve/reject loans
- User management
- Access at `/admin` route

---

## 🐛 Troubleshooting

### "Invalid login credentials"
- Check if email is verified in Supabase Dashboard → Authentication → Users
- Ensure password meets requirements (6+ chars, alphanumeric)

### "OTP not received"
- Check spam folder
- Verify email provider is enabled in Supabase
- For production, configure custom SMTP

### "Profile not found"
- The profile is created automatically after OTP verification
- Check Supabase Dashboard → Table Editor → profiles

### Database errors
- Verify all SQL commands ran successfully
- Check RLS policies are enabled
- Ensure environment variables are correct

---

## 📱 Deployment

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
```

### Environment Variables for Production
Add these in Vercel/Netlify dashboard:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

---

## 📚 Project Structure

```
src/
├── components/
│   └── OtpInput.jsx          # Professional OTP input component
├── screens/
│   ├── LoginScreen.jsx       # Auth screens (login/register)
│   ├── HomeScreen/           # Main dashboard
│   ├── LoanFlow/             # Loan application flow
│   ├── ProfileFlow/          # Profile management
│   └── AdminDashboard.jsx    # Admin panel
├── lib/
│   └── supabase.js           # Supabase client configuration
└── App.jsx                   # Main app with routing
```

---

## 🎯 Next Steps

1. **Customize Email Templates**: Go to Supabase → Authentication → Email Templates
2. **Add More Loan Types**: Edit `src/data/data.js`
3. **Enhance Admin Dashboard**: Add analytics and reporting
4. **Mobile Optimization**: Test on various devices
5. **Add Payment Integration**: Stripe, PayPal, etc.

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review Supabase documentation: [supabase.com/docs](https://supabase.com/docs)
3. Check browser console for errors (F12)

---

## ✅ Checklist

- [ ] Supabase project created
- [ ] Database schema executed
- [ ] Environment variables configured
- [ ] Email provider enabled
- [ ] Dependencies installed
- [ ] App running locally
- [ ] Test user registered
- [ ] Login working
- [ ] Loan application tested
- [ ] Ready for deployment

---

**Built with ❤️ using React, Supabase, and Framer Motion**
