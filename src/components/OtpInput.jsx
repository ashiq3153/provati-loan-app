import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const OtpInput = ({ length = 6, value, onChange, darkMode }) => {
    const inputRefs = useRef([]);

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const handleChange = (e, index) => {
        const val = e.target.value;
        if (isNaN(val)) return;

        const newOtp = value.split('');
        newOtp[index] = val.substring(val.length - 1);
        const otpString = newOtp.join('');
        onChange(otpString);

        if (val && index < length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !value[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        const data = e.clipboardData.getData('text').slice(0, length);
        if (/^\d+$/.test(data)) {
            onChange(data);
            if (inputRefs.current[data.length - 1]) {
                inputRefs.current[data.length - 1].focus();
            }
        }
    };

    return (
        <div className="flex justify-between gap-2" onPaste={handlePaste}>
            {Array.from({ length }).map((_, index) => (
                <motion.input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={value[index] || ''}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`w-full h-12 text-center text-lg font-black rounded-xl border-2 transition-all outline-none
                        ${darkMode
                            ? 'bg-slate-900 border-slate-800 text-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10'
                            : 'bg-white border-slate-100 text-slate-900 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10'
                        }`}
                />
            ))}
        </div>
    );
};

export default OtpInput;
