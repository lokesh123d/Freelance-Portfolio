import { useState } from "react";
import { useStorage } from "../context/StorageContext";
import { useToast } from "../context/ToastContext";
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
            staggerChildren: 0.2
        }
    }
};

export default function Contact() {
    const { addInquiry } = useStorage();
    const { showToast } = useToast();
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
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

        if (!formData.message.trim()) {
            newErrors.message = "Message is required";
        } else if (formData.message.trim().length < 10) {
            newErrors.message = "Message must be at least 10 characters";
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
            const inquiryData = {
                name: formData.name.trim(),
                email: formData.email.trim(),
                subject: "General Inquiry",
                message: formData.message.trim(),
            };

            // Save to Firebase
            addInquiry(inquiryData);

            // Send email via backend
            try {
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                const response = await fetch(`${API_URL}/api/notifications/inquiry`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(inquiryData)
                });

                if (!response.ok) {
                    console.warn('Email notification failed, but form was saved');
                }
            } catch (emailError) {
                console.log('Email service unavailable, but inquiry was saved:', emailError.message);
            }

            showToast("Message sent successfully! We'll get back to you shortly.", "success");
            setFormData({ name: "", email: "", message: "" });
            setErrors({});
        } catch (error) {
            showToast("Failed to send message. Please try again.", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
    };

    return (
        <main className="min-h-screen py-32 px-6 bg-charcoal flex items-center">
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="lg:col-span-7"
                >
                    <div className="mb-20">
                        <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl leading-none font-bold tracking-tight uppercase">
                            Let's create<br />
                            <span className="text-stroke">Something</span><br />
                            <span className="flex items-center gap-4">
                                Epic <motion.span
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "12rem" }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className="h-[2px] bg-primary mt-4 hidden lg:block"
                                ></motion.span>
                            </span>
                        </motion.h1>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-12">
                        <motion.div variants={fadeInUp} className="relative group">
                            <input
                                className={`peer w-full bg-transparent border-t-0 border-x-0 border-b-2 focus:ring-0 px-0 py-4 text-xl lg:text-2xl transition-all duration-300 placeholder-transparent text-white ${
                                    errors.name ? 'border-red-500 focus:border-red-500' : 'border-primary/20 focus:border-primary'
                                }`}
                                id="name" name="name" placeholder="Name" type="text" value={formData.name} onChange={handleChange} />
                            <label className="absolute left-0 top-4 text-xl lg:text-2xl text-slate-500 pointer-events-none transition-all duration-300 origin-left peer-focus:-translate-y-6 peer-focus:scale-75 peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-75 peer-focus:text-primary peer-[:not(:placeholder-shown)]:text-primary" htmlFor="name">Your Name</label>
                            {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
                        </motion.div>
                        <motion.div variants={fadeInUp} className="relative group">
                            <input
                                className={`peer w-full bg-transparent border-t-0 border-x-0 border-b-2 focus:ring-0 px-0 py-4 text-xl lg:text-2xl transition-all duration-300 placeholder-transparent text-white ${
                                    errors.email ? 'border-red-500 focus:border-red-500' : 'border-primary/20 focus:border-primary'
                                }`}
                                id="email" name="email" placeholder="Email" type="email" value={formData.email} onChange={handleChange} />
                            <label className="absolute left-0 top-4 text-xl lg:text-2xl text-slate-500 pointer-events-none transition-all duration-300 origin-left peer-focus:-translate-y-6 peer-focus:scale-75 peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-75 peer-focus:text-primary peer-[:not(:placeholder-shown)]:text-primary" htmlFor="email">Email Address</label>
                            {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
                        </motion.div>
                        <motion.div variants={fadeInUp} className="relative group">
                            <textarea
                                className={`peer w-full bg-transparent border-t-0 border-x-0 border-b-2 focus:ring-0 px-0 py-4 text-xl lg:text-2xl transition-all duration-300 resize-none placeholder-transparent text-white ${
                                    errors.message ? 'border-red-500 focus:border-red-500' : 'border-primary/20 focus:border-primary'
                                }`}
                                id="message" name="message" placeholder="Message" rows="4" value={formData.message} onChange={handleChange}></textarea>
                            <label className="absolute left-0 top-4 text-xl lg:text-2xl text-slate-500 pointer-events-none transition-all duration-300 origin-left peer-focus:-translate-y-6 peer-focus:scale-75 peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-75 peer-focus:text-primary peer-[:not(:placeholder-shown)]:text-primary" htmlFor="message">Project Details</label>
                            {errors.message && <p className="text-red-500 text-sm mt-2">{errors.message}</p>}
                        </motion.div>
                        <motion.div variants={fadeInUp} className="pt-6">
                            <button
                                disabled={isSubmitting}
                                className="group relative inline-flex items-center justify-center px-12 py-6 bg-primary text-black font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(0,243,255,0.4)] disabled:opacity-70 disabled:cursor-not-allowed"
                                type="submit"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                                    {!isSubmitting && <span className="material-icons text-xl">north_east</span>}
                                </span>
                            </button>
                        </motion.div>
                    </form>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="lg:col-span-5 flex flex-col justify-between pt-32 lg:pt-0"
                >
                    <div className="space-y-12">
                        <motion.div variants={fadeInUp}>
                            <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">Email me at</p>
                            <a className="text-3xl lg:text-4xl font-bold hover:text-primary transition-colors block break-words" href="mailto:lokesh25@navgurukul.org">asyncsamurai@gmail.com</a>
                        </motion.div>
                        <motion.div variants={forceStagger => ({ ...staggerContainer.visible, transition: { staggerChildren: 0.1 } })}>
                            <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">Socials</p>
                            <ul className="space-y-4">
                                <motion.li variants={fadeInUp}><a className="flex items-center justify-between text-2xl font-medium border-b border-primary/10 py-2 hover:text-primary transition-colors" href="https://github.com/lokesh123d" target="_blank" rel="noopener noreferrer">GitHub <span className="material-icons text-sm">north_east</span></a></motion.li>
                                <motion.li variants={fadeInUp}><a className="flex items-center justify-between text-2xl font-medium border-b border-primary/10 py-2 hover:text-primary transition-colors" href="https://www.linkedin.com/in/lokesh-dangwal-444397344" target="_blank" rel="noopener noreferrer">LinkedIn <span className="material-icons text-sm">north_east</span></a></motion.li>
                                <motion.li variants={fadeInUp}><a className="flex items-center justify-between text-2xl font-medium border-b border-primary/10 py-2 hover:text-primary transition-colors" href="tel:+918091780737">+91 8091780737 <span className="material-icons text-sm">call</span></a></motion.li>
                            </ul>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
