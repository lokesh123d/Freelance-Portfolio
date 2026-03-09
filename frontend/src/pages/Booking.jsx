import { useState } from "react";
import { useStorage } from "../context/StorageContext";
import { useToast } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const glowPulse = {
    initial: { opacity: 0, scale: 0.9 },
    animate: {
        opacity: [0.3, 0.6, 0.3],
        scale: [0.9, 1.05, 0.9],
        transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
    }
};

export default function Booking() {
    const { addBooking } = useStorage();
    const { showToast } = useToast();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        date: "",
        time: "",
        type: "Consultation",
        platform: "Google Meet",
        message: ""
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        } else if (formData.name.trim().length < 2) {
            newErrors.name = "Name must be at least 2 characters";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!formData.mobile.trim()) {
            newErrors.mobile = "Mobile number is required";
        } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
            newErrors.mobile = "Please enter a valid 10-digit mobile number";
        }

        if (!formData.date) {
            newErrors.date = "Please select a date";
        }

        if (!formData.time) {
            newErrors.time = "Please select a time";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            showToast("Please fix the errors in the form", "error");
            return;
        }

        setIsSubmitting(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            const bookingData = {
                name: formData.name.trim(),
                email: formData.email.trim(),
                mobile: formData.mobile.trim(),
                date: formData.date,
                time: formData.time,
                type: formData.type,
                platform: formData.platform,
                message: formData.message.trim(),
            };

            // Save to Firebase
            addBooking(bookingData);

            // Send email via backend
            try {
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                const response = await fetch(`${API_URL}/api/notifications/booking`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(bookingData)
                });

                if (!response.ok) {
                    console.warn('Email notification failed, but booking was saved');
                }
            } catch (emailError) {
                console.log('Email service unavailable, but booking was saved:', emailError.message);
            }

            showToast("Booking confirmed! We'll contact you soon at the provided details.", "success");
            setTimeout(() => navigate("/"), 2000);
        } catch (error) {
            showToast("Failed to book session. Please try again.", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Clear error for this field when user starts editing
        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
    };

    const getTomorrowDate = () => {
        const today = new Date();
        today.setDate(today.getDate() + 1);
        return today.toISOString().split('T')[0];
    };

    return (
        <main className="py-32 px-6 bg-charcoal min-h-screen flex items-center justify-center relative overflow-hidden">
            <motion.div
                variants={glowPulse}
                initial="initial"
                animate="animate"
                className="pointer-events-none absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/20 blur-3xl"
            />
            <div className="max-w-2xl w-full relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="text-center mb-12"
                >
                    <motion.span variants={fadeInUp} className="text-primary font-bold tracking-[0.3em] uppercase block mb-4 text-xs">Let's Talk</motion.span>
                    <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl font-bold uppercase tracking-tighter mb-6">Book a Session</motion.h1>
                    <motion.p variants={fadeInUp} className="text-neutral-400">Share your details and select a time for us to discuss your project.</motion.p>
                </motion.div>

                <motion.form
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    onSubmit={handleSubmit}
                    className="glass-panel p-8 md:p-12 rounded-3xl space-y-6"
                >
                    {/* Contact Information Section */}
                    <div className="space-y-6">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Contact Information</h3>

                        <motion.div variants={fadeInUp}>
                            <label className="block text-xs font-bold uppercase tracking-widest text-neutral-500 mb-3">Full Name *</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your full name"
                                className={`w-full bg-white/5 border rounded-xl px-4 py-4 text-white focus:outline-none transition-colors placeholder:text-neutral-600 ${
                                    errors.name ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-primary'
                                }`}
                                value={formData.name}
                                onChange={handleChange}
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-2">{errors.name}</p>}
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <motion.div variants={fadeInUp}>
                                <label className="block text-xs font-bold uppercase tracking-widest text-neutral-500 mb-3">Email Address *</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="your@email.com"
                                    className={`w-full bg-white/5 border rounded-xl px-4 py-4 text-white focus:outline-none transition-colors placeholder:text-neutral-600 ${
                                        errors.email ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-primary'
                                    }`}
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-2">{errors.email}</p>}
                            </motion.div>
                            <motion.div variants={fadeInUp}>
                                <label className="block text-xs font-bold uppercase tracking-widest text-neutral-500 mb-3">Mobile Number *</label>
                                <input
                                    type="tel"
                                    name="mobile"
                                    placeholder="1234567890"
                                    maxLength="10"
                                    className={`w-full bg-white/5 border rounded-xl px-4 py-4 text-white focus:outline-none transition-colors placeholder:text-neutral-600 ${
                                        errors.mobile ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-primary'
                                    }`}
                                    value={formData.mobile}
                                    onChange={handleChange}
                                />
                                {errors.mobile && <p className="text-red-500 text-xs mt-2">{errors.mobile}</p>}
                            </motion.div>
                        </div>
                    </div>

                    <div className="editorial-line my-6"></div>

                    {/* Booking Details Section */}
                    <div className="space-y-6">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Booking Details</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <motion.div variants={fadeInUp}>
                                <label className="block text-xs font-bold uppercase tracking-widest text-neutral-500 mb-3">Select Date *</label>
                                <input
                                    type="date"
                                    name="date"
                                    min={getTomorrowDate()}
                                    className={`w-full bg-white/5 border rounded-xl px-4 py-4 text-white focus:outline-none transition-colors disabled:opacity-50 ${
                                        errors.date ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-primary'
                                    }`}
                                    value={formData.date}
                                    onChange={handleChange}
                                />
                                {errors.date && <p className="text-red-500 text-xs mt-2">{errors.date}</p>}
                            </motion.div>
                            <motion.div variants={fadeInUp}>
                                <label className="block text-xs font-bold uppercase tracking-widest text-neutral-500 mb-3">Time *</label>
                                <select
                                    name="time"
                                    className={`w-full bg-white/5 border rounded-xl px-4 py-4 text-white focus:outline-none transition-colors appearance-none ${
                                        errors.time ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-primary'
                                    }`}
                                    value={formData.time}
                                    onChange={handleChange}
                                >
                                    <option value="" disabled>Select Time</option>
                                    <option value="10:00 AM">10:00 AM</option>
                                    <option value="11:30 AM">11:30 AM</option>
                                    <option value="02:00 PM">02:00 PM</option>
                                    <option value="04:00 PM">04:00 PM</option>
                                    <option value="06:00 PM">06:00 PM</option>
                                </select>
                                {errors.time && <p className="text-red-500 text-xs mt-2">{errors.time}</p>}
                            </motion.div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <motion.div variants={fadeInUp}>
                                <label className="block text-xs font-bold uppercase tracking-widest text-neutral-500 mb-3">Session Type</label>
                                <select
                                    name="type"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-primary transition-colors appearance-none"
                                    value={formData.type}
                                    onChange={handleChange}
                                >
                                    <option value="Consultation">Discovery Call (30m)</option>
                                    <option value="Studio Session">Design Review (1h)</option>
                                    <option value="Strategy">Brand Strategy (2h)</option>
                                </select>
                            </motion.div>
                            <motion.div variants={fadeInUp}>
                                <label className="block text-xs font-bold uppercase tracking-widest text-neutral-500 mb-3">Platform</label>
                                <select
                                    name="platform"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-primary transition-colors appearance-none"
                                    value={formData.platform}
                                    onChange={handleChange}
                                >
                                    <option value="Google Meet">Google Meet</option>
                                    <option value="Zoom">Zoom</option>
                                    <option value="Phone Call">Phone Call</option>
                                    <option value="WhatsApp">WhatsApp</option>
                                </select>
                            </motion.div>
                        </div>

                        <motion.div variants={fadeInUp}>
                            <label className="block text-xs font-bold uppercase tracking-widest text-neutral-500 mb-3">Message (Optional)</label>
                            <textarea
                                name="message"
                                rows="4"
                                placeholder="Tell us about your project..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-primary transition-colors resize-none placeholder:text-neutral-600"
                                value={formData.message}
                                onChange={handleChange}
                            />
                        </motion.div>
                    </div>

                    <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: isSubmitting ? 1 : 1.03 }}
                        whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
                        className="w-full py-5 mt-6 rounded-full bg-primary text-black font-bold uppercase tracking-widest shadow-lg shadow-primary/20 text-sm disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                    >
                        {isSubmitting ? "BOOKING..." : "CONFIRM BOOKING"}
                    </motion.button>
                </motion.form>
            </div>
        </main>
    );
}
