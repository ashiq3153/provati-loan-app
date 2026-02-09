import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, XCircle, X, Info } from 'lucide-react';

const toastVariants = {
    initial: { opacity: 0, y: -20, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.9, transition: { duration: 0.2 } }
};

const CustomToast = ({ message, type = 'success', onClose, darkMode }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 4000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const styles = {
        success: 'bg-emerald-500 text-white shadow-emerald-500/30',
        error: 'bg-rose-500 text-white shadow-rose-500/30',
        info: 'bg-blue-500 text-white shadow-blue-500/30',
        warning: 'bg-amber-500 text-white shadow-amber-500/30'
    };

    const icons = {
        success: <CheckCircle2 className="w-5 h-5" />,
        error: <XCircle className="w-5 h-5" />,
        info: <Info className="w-5 h-5" />,
        warning: <AlertCircle className="w-5 h-5" />
    };

    return (
        <motion.div
            variants={toastVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed top-6 left-0 right-0 flex justify-center z-[100] px-4 pointer-events-none"
        >
            <div className={`pointer-events-auto min-w-[300px] max-w-sm flex items-center gap-3 px-5 py-4 rounded-2xl shadow-xl backdrop-blur-md ${styles[type] || styles.info}`}>
                <div className="bg-white/20 p-2 rounded-xl">
                    {icons[type]}
                </div>
                <div className="flex-1">
                    <p className="font-bold text-sm tracking-wide">{message}</p>
                </div>
                <button
                    onClick={onClose}
                    className="p-1 rounded-full hover:bg-white/20 transition-colors"
                >
                    <X className="w-4 h-4 opacity-80" />
                </button>
            </div>
        </motion.div>
    );
};

export default CustomToast;
