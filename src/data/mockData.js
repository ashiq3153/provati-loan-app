export const mockUser = {
    name: 'Dustin Kozey',
    nameBn: 'মোহাম্মদ রহিম',
    organization: 'Provati Somobay Somiti',
    verified: true,
    approvedBalance: 123118.88,
    totalBalance: 12311.88,
    availableToWithdraw: 4500.00,
    approvedLoan: 45000.00,
    activeLoansCount: 2,
    creditScore: 60,
    progress: 65,
    portfolioBalance: 12311.88,
    portfolioChange: 2.4,
    profileCompletion: 85
};

export const loanCategories = [
    { id: 1, name: 'Personal Loan', icon: '👤', rate: '0.5%', range: '$345 - $10,000', badge: 'LOWEST INTEREST', color: 'bg-emerald-50', iconColor: 'text-emerald-600' },
    { id: 2, name: 'Business Loan', icon: '🏢', rate: '4%', range: '$10,000 - $25,000', badge: 'FAST APPROVAL', color: 'bg-blue-50', iconColor: 'text-blue-600' },
    { id: 3, name: 'Home Loan', icon: '🏠', rate: '4%', range: '$10,000 - $50,000', badge: 'LONG TERM', color: 'bg-orange-50', iconColor: 'text-orange-600' },
    { id: 4, name: 'Car Loan', icon: '🚗', rate: '2.5%', range: '$1,000 - $25,000', badge: 'ZERO DOWN', color: 'bg-purple-50', iconColor: 'text-purple-600' },
    { id: 5, name: 'Medical Loan', icon: '🏥', rate: '0%', range: '$500 - $5,000', badge: 'EMERGENCY', color: 'bg-red-50', iconColor: 'text-red-600' },
    { id: 6, name: 'Student Loan', icon: '🎓', rate: '0.5%', range: '$345 - $10,000', badge: 'FUTURE READY', color: 'bg-cyan-50', iconColor: 'text-cyan-600' },
    { id: 7, name: 'Probashi Loan', icon: '✈️', rate: 'Special', range: '$5,000 - $30,000', badge: 'For Expatriates', color: 'bg-green-50', iconColor: 'text-green-600' }
];

export const myLoans = [
    { id: 1, type: 'Student Loan', icon: '🎓', period: '12 Months period', nextRepayment: 170.00, progress: 25, remaining: 4200, color: 'text-emerald-600' },
    { id: 2, type: 'Business Loan', icon: '💼', period: '60 Months period', nextRepayment: 633.00, progress: 75, remaining: 12800, color: 'text-emerald-600' },
    { id: 3, type: 'Personal Loan', icon: '👤', period: '24 Months', nextRepayment: 280.00, progress: 65, remaining: 4200, color: 'text-emerald-600' },
    { id: 4, type: 'Commercial Loan', icon: '🏢', period: '48 Months', nextRepayment: 850.00, progress: 45, remaining: 28000, color: 'text-emerald-600' }
];

export const successStories = [
    { id: 1, name: 'Arif Rahman', title: 'Shop Owner', amount: 50000, status: 'Completed', image: null },
    { id: 2, name: 'Sara Islam', title: 'Tailor Artist', amount: 30000, status: 'Completed', image: null },
    { id: 3, name: 'Amir Hossain', title: 'Retail Merchant', amount: 12000, status: 'Completed', image: null }
];

export const communitySuccess = [
    { id: 1, name: 'Amir Hossain', profession: 'Retail Merchant', funded: 12000, status: 'COMPLETED' },
    { id: 2, name: 'Sara Ahmed', profession: 'Agri-Entrepreneur', funded: 25000, status: 'COMPLETED' }
];
