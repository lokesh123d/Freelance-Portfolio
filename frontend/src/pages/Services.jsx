import { Link } from "react-router-dom";
import { useStorage } from "../context/StorageContext";
import { motion } from "framer-motion";
import { useState } from "react";

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
            staggerChildren: 0.15
        }
    }
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

export default function Services() {
    const { projects } = useStorage();
    const [selectedCategory, setSelectedCategory] = useState("all");

    const services = [
        {
            id: 1,
            icon: "terminal",
            title: "Full Stack Development",
            tagline: "Complete digital ecosystems from concept to production",
            description: "Enterprise-grade full-stack web applications built with modern technologies and industry best practices. I develop complete digital solutions handling both frontend user experiences and robust backend systems, delivering scalable applications that grow with your business.",
            features: [
                "MERN Stack (MongoDB, Express, React, Node.js)",
                "Custom Backend Architecture & Microservices",
                "Responsive & Accessible UI Implementation",
                "RESTful API Design & GraphQL Integration",
                "Database Design, Optimization & Management",
                "Real-time Features (WebSockets, Firebase, Socket.io)",
                "Authentication & Authorization (JWT, OAuth 2.0, Google Auth)",
                "Cloud Deployment & Scaling (AWS, Vercel, Heroku, DigitalOcean)",
                "CI/CD Pipeline Setup & Automation",
                "Performance Tuning & Load Testing"
            ],
            color: "primary"
        },
        {
            id: 2,
            icon: "palette",
            title: "Frontend & UI/UX Development",
            tagline: "Beautiful, intuitive interfaces that users love",
            description: "Crafting pixel-perfect, responsive user interfaces with modern React patterns and accessibility standards. Every component is optimized for performance, maintains consistent branding, and provides exceptional user experience across all devices.",
            features: [
                "React Component Architecture & Reusability",
                "Responsive Design (Mobile-First Approach)",
                "Advanced Animations & Micro-interactions (Framer Motion)",
                "Design System Implementation & Maintenance",
                "Web Accessibility Standards (WCAG 2.1 Compliance)",
                "State Management (Context API, Redux, Zustand)",
                "Form Validation & Error Handling",
                "Progressive Enhancement & Graceful Degradation",
                "Browser Compatibility Testing",
                "Tailwind CSS & Custom Styling Solutions"
            ],
            color: "accent-pink"
        },
        {
            id: 3,
            icon: "speed",
            title: "Performance & Optimization",
            tagline: "Lightning-fast performance that drives conversions",
            description: "Transforming sluggish applications into blazing-fast experiences. I analyze, optimize, and continuously monitor for peak performance, ensuring your site ranks well, loads instantly, and keeps users engaged.",
            features: [
                "Core Web Vitals Optimization (LCP, FID, CLS)",
                "Code Splitting & Dynamic Imports",
                "Image Optimization & WebP Conversion",
                "Lazy Loading Implementation",
                "Caching Strategies (Browser, Server, CDN)",
                "Minification & Bundle Analysis",
                "Server-Side Rendering (SSR) & Static Generation (SSG)",
                "Database Query Optimization",
                "SEO Best Practices & Structured Data",
                "Performance Monitoring & Analytics Setup"
            ],
            color: "primary"
        },
        {
            id: 4,
            icon: "integration_instructions",
            title: "Backend & API Development",
            tagline: "Powerful, scalable APIs that handle enterprise traffic",
            description: "Building production-grade backend systems with clean, maintainable code following industry standards. Secure APIs that seamlessly integrate with frontend applications, third-party services, and handle complex business logic efficiently.",
            features: [
                "RESTful API Design & Best Practices",
                "GraphQL API Development & Optimization",
                "Database Design (MongoDB, PostgreSQL, MySQL)",
                "Authentication & Authorization Systems",
                "API Documentation (Swagger/OpenAPI)",
                "Rate Limiting, Throttling & Caching",
                "Error Handling & Logging Systems",
                "Third-party API Integrations",
                "Webhook Implementation",
                "Background Jobs & Task Scheduling (Node-Cron, Bull Queue)"
            ],
            color: "accent-pink"
        },
        {
            id: 5,
            icon: "shield_lock",
            title: "Security & Authentication",
            tagline: "Enterprise-grade security protecting your data",
            description: "Implementing comprehensive security measures to protect your application and user data from threats. From secure authentication systems to vulnerability assessments, ensuring compliance with industry standards.",
            features: [
                "JWT Authentication & Refresh Tokens",
                "OAuth 2.0 & Social Login Integration",
                "Role-Based Access Control (RBAC)",
                "Password Hashing & Encryption (Bcrypt, SHA-256)",
                "HTTPS & SSL/TLS Configuration",
                "CORS & CSRF Protection",
                "Input Validation & Sanitization",
                "SQL Injection Prevention",
                "XSS & Security Header Implementation",
                "Regular Security Audits & Penetration Testing"
            ],
            color: "primary"
        },
        {
            id: 6,
            icon: "support_agent",
            title: "Maintenance & Support",
            tagline: "Keep your application running smoothly 24/7",
            description: "Ongoing technical support, monitoring, and maintenance to ensure your application stays secure, performant, and up-to-date. Priority fixes, feature enhancements, and proactive issue resolution.",
            features: [
                "24/7 Application Monitoring & Alerts",
                "Bug Fixes & Patch Management",
                "Performance Monitoring & Optimization",
                "Security Updates & Vulnerability Patches",
                "Dependency Updates & Library Upgrades",
                "Feature Enhancements & New Development",
                "Technical Documentation & Maintenance",
                "Server Maintenance & Backups",
                "Analytics & Reporting",
                "Priority Support Response (same-day, critical issues)"
            ],
            color: "accent-pink"
        }
    ];

    const pricingTiers = [
        {
            name: "Starter",
            subtitle: "Perfect for MVPs & Small Projects",
            price: "$3,500",
            period: "per project",
            description: "Ideal for startups, freelancers, and small businesses launching their first digital presence. Includes a professional website with essential features, responsive design, and basic optimization.",
            features: [
                "3-5 Page Custom Website",
                "Mobile-Responsive Design",
                "Contact Form with Email Integration",
                "Basic SEO Optimization",
                "Social Media Meta Tags",
                "1 Month Technical Support",
                "Domain & Host Setup Assistance",
                "Basic Performance Optimization"
            ],
            cta: "Start Your Project",
            popular: false,
            accent: false
        },
        {
            name: "Professional",
            subtitle: "Most Popular - Full-Featured Apps",
            price: "$8,500",
            period: "per project",
            description: "Comprehensive web applications with advanced features, custom functionality, and professional polish. Perfect for growing businesses needing e-commerce, bookings, or complex user workflows.",
            features: [
                "Custom Full-Stack Web Application",
                "Advanced Frontend with Animations",
                "Robust Backend API Development",
                "Database Architecture & Optimization",
                "Admin Dashboard with Analytics",
                "Payment Integration (Stripe, Razorpay)",
                "User Authentication & Authorization",
                "Email Notifications & Automations",
                "SEO Optimization & Analytics Setup",
                "3 Months Premium Support",
                "Performance Tuning & Caching",
                "Deployment & DevOps Setup"
            ],
            cta: "Get Started",
            popular: true,
            accent: true
        },
        {
            name: "Enterprise",
            subtitle: "Complex Systems & Scale",
            price: "$18,000+",
            period: "per project",
            description: "Large-scale, mission-critical applications with advanced architecture, high traffic handling, and enterprise-grade security. Custom solutions for complex business requirements.",
            features: [
                "Complex Multi-Module Platform",
                "Microservices Architecture",
                "Advanced Security & Compliance",
                "Real-time Features (WebSockets, Live Updates)",
                "Third-party SaaS Integrations",
                "API Rate Limiting & Scaling",
                "Load Balancing & CDN Setup",
                "Advanced Database Optimization",
                "Custom Workflow Automation",
                "6 Months Premium Support",
                "Regular Security Audits",
                "Performance Benchmarking & Optimization"
            ],
            cta: "Discuss Your Needs",
            popular: false,
            accent: false
        },
        {
            name: "Retainer",
            subtitle: "Ongoing Partnership & Growth",
            price: "$5,000",
            period: "per month",
            description: "Long-term partnership for continuous development, maintenance, and growth. Perfect for scaling applications, adding features, and ensuring peak performance.",
            features: [
                "40 Hours Monthly Development Time",
                "Priority Support (24-48 hrs response)",
                "Monthly Performance Reports",
                "Regular Security Updates & Patches",
                "Feature Development & Enhancements",
                "Bug Fixes & Optimization",
                "Database Maintenance & Optimization",
                "Dependency & Library Updates",
                "Technical Consultation & Strategy",
                "Uptime Monitoring & Alerts",
                "Flexible Scheduling & Project Planning",
                "Custom Integrations & Automations"
            ],
            cta: "Partner With Me",
            popular: false,
            accent: false
        }
    ];

    const categories = [
        { id: "all", label: "All Work" },
        { id: "full-stack", label: "Full Stack" },
        { id: "ecommerce", label: "E-Commerce" },
        { id: "edtech", label: "EdTech" },
        { id: "web-design", label: "Web Design" }
    ];

    const filteredProjects = selectedCategory === "all"
        ? projects.slice(0, 6)
        : projects.filter(p => {
            const projectType = p.type?.toLowerCase() || "";
            const categoryId = selectedCategory.toLowerCase();

            if (categoryId === "full-stack") {
                return projectType.includes("full stack");
            } else if (categoryId === "ecommerce") {
                return projectType.includes("e-commerce") || projectType.includes("ecommerce");
            } else if (categoryId === "edtech") {
                return projectType.includes("edtech") || projectType.includes("education");
            } else if (categoryId === "web-design") {
                return projectType.includes("web design") || projectType.includes("design");
            }
            return false;
        }).slice(0, 6);

    return (
        <main className="min-h-screen">
            {/* HERO SECTION */}
            <section className="min-h-screen flex flex-col justify-center items-center px-6 py-32 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary/20"></div>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="max-w-7xl w-full text-center space-y-8 relative z-10"
                >
                    <motion.span variants={fadeInUp} className="text-primary font-medium tracking-[0.4em] uppercase block text-xs">
                        Services & Pricing
                    </motion.span>
                    <motion.h1 variants={fadeInUp} className="text-6xl md:text-[10rem] font-black leading-[0.85] tracking-tight uppercase">
                        <span className="block">Craft Your</span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-accent-pink mt-4">
                            Digital Future
                        </span>
                    </motion.h1>
                    <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto font-light leading-relaxed">
                        Premium web development services tailored to transform your vision into high-performance digital experiences.
                    </motion.p>
                    <motion.div variants={fadeInUp} className="flex justify-center gap-4 pt-8">
                        <a href="#pricing" className="px-8 py-4 bg-primary text-black font-bold uppercase tracking-wider text-sm rounded-full hover:scale-105 transition-transform duration-300 shadow-lg shadow-primary/20">
                            View Pricing
                        </a>
                        <Link to="/contact" className="px-8 py-4 border-2 border-primary text-primary font-bold uppercase tracking-wider text-sm rounded-full hover:bg-primary hover:text-black transition-all duration-300">
                            Let's Talk
                        </Link>
                    </motion.div>
                </motion.div>
                {/* Decorative Elements */}
                <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]"></div>
                <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-accent-pink/5 rounded-full blur-[150px]"></div>
            </section>

            {/* SERVICES GRID */}
            <section className="py-32 px-6 bg-charcoal border-y border-white/5">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeInUp}
                        className="text-center mb-24"
                    >
                        <span className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-4 block">What I Offer</span>
                        <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-tight">
                            Services <span className="text-primary">Portfolio</span>
                        </h2>
                        <p className="text-neutral-400 max-w-2xl mx-auto mt-6 text-lg">
                            Specialized expertise across the full spectrum of modern web development
                        </p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {services.map((service, index) => (
                            <motion.div
                                key={service.id}
                                variants={scaleIn}
                                className="group glass-panel p-8 rounded-2xl hover:border-primary/30 transition-all duration-500 relative overflow-hidden"
                            >
                                {/* Hover Glow Effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-accent-pink/5 transition-all duration-700 rounded-2xl"></div>

                                <div className="relative z-10">
                                    <div className="flex items-start justify-between mb-6">
                                        <span className={`material-symbols-outlined text-${service.color} text-6xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                                            {service.icon}
                                        </span>
                                        <span className="text-sm text-neutral-600 font-mono">0{index + 1}</span>
                                    </div>

                                    <h3 className="text-3xl font-bold uppercase tracking-tight mb-3 group-hover:text-primary transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-primary/70 text-base uppercase tracking-wider mb-5 font-medium">
                                        {service.tagline}
                                    </p>
                                    <p className="text-neutral-400 leading-relaxed mb-6 text-base">
                                        {service.description}
                                    </p>

                                    <div className="editorial-line mb-6"></div>

                                    <ul className="space-y-3">
                                        {service.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-neutral-400">
                                                <span className="material-symbols-outlined text-primary text-lg mt-0.5">check_circle</span>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* PRICING SECTION */}
            <section className="py-32 px-6 relative overflow-hidden" id="pricing">
                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-24"
                    >
                        <span className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Investment</span>
                        <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-tight mb-6">
                            Transparent <span className="text-primary">Pricing</span>
                        </h2>
                        <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
                            Choose the package that fits your project scope and budget. All plans include my full commitment to quality.
                        </p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 lg:grid-cols-4 gap-6"
                    >
                        {pricingTiers.map((tier) => (
                            <motion.div
                                key={tier.name}
                                variants={fadeInUp}
                                className={`relative p-8 rounded-2xl flex flex-col h-full transition-all duration-500 hover:scale-[1.02] ${tier.accent
                                    ? 'bg-primary/10 border-2 border-primary shadow-2xl shadow-primary/20 lg:scale-105'
                                    : 'glass-panel hover:border-primary/30'
                                    }`}
                            >
                                {tier.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-black text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1 rounded-full whitespace-nowrap">
                                        Most Popular
                                    </div>
                                )}

                                <div className="mb-6">
                                    <span className={`text-xs font-bold uppercase tracking-[0.3em] ${tier.accent ? 'text-primary' : 'text-neutral-500'} block mb-3`}>
                                        {tier.subtitle}
                                    </span>
                                    <h3 className="text-2xl font-bold uppercase tracking-tight mb-4">
                                        {tier.name}
                                    </h3>
                                    <div className="flex items-baseline gap-1 mb-4">
                                        <span className={`text-4xl font-bold ${tier.accent ? 'text-primary' : 'text-white'}`}>
                                            {tier.price}
                                        </span>
                                        <span className="text-neutral-500 text-sm uppercase tracking-widest">
                                            {tier.period}
                                        </span>
                                    </div>
                                    <p className="text-neutral-400 text-sm leading-relaxed">
                                        {tier.description}
                                    </p>
                                </div>

                                <div className="editorial-line mb-6"></div>

                                <ul className="space-y-4 mb-8 flex-grow">
                                    {tier.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-neutral-300">
                                            <span className="material-symbols-outlined text-primary text-lg mt-0.5">check_circle</span>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    to="/booking"
                                    className={`w-full py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 text-center block ${tier.accent
                                        ? 'bg-primary text-black hover:scale-105 shadow-lg shadow-primary/30'
                                        : 'border border-primary/30 hover:bg-primary hover:text-black hover:border-primary'
                                        }`}
                                >
                                    {tier.cta}
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Add-ons */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="mt-20 glass-panel p-8 rounded-2xl"
                    >
                        <h3 className="text-2xl font-bold uppercase tracking-tight mb-6 text-center">
                            Additional Services
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { name: "Custom API Development", price: "$2,000+" },
                                { name: "Database Migration & Optimization", price: "$1,500+" },
                                { name: "Security Audit & Implementation", price: "$2,500+" },
                                { name: "Performance Audit & Optimization", price: "$1,200+" },
                                { name: "Email Marketing Integration", price: "$800+" },
                                { name: "Payment Gateway Integration", price: "$1,000+" },
                                { name: "Admin Dashboard Development", price: "$3,000+" },
                                { name: "Mobile App Development", price: "$5,000+" },
                                { name: "Analytics & Reporting Setup", price: "$600+" },
                                { name: "Third-party API Integrations", price: "$500-2,000" },
                                { name: "Content Writing & SEO Copy", price: "$500+" },
                                { name: "Logo Design & Brand Identity", price: "$1,500+" }
                            ].map((addon, i) => (
                                <div key={i} className="flex justify-between items-center p-4 bg-background-dark/40 rounded-lg border border-white/5">
                                    <span className="text-sm font-medium">{addon.name}</span>
                                    <span className="text-primary text-sm font-bold">{addon.price}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Background Elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-pink/5 rounded-full blur-[120px]"></div>
            </section>

            {/* PREVIOUS WORK SHOWCASE */}
            <section className="py-32 px-6 bg-charcoal border-y border-white/5">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="mb-16"
                    >
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12">
                            <div>
                                <span className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Portfolio</span>
                                <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-tight">
                                    Previous <span className="text-primary">Work</span>
                                </h2>
                                <p className="text-neutral-400 mt-4 text-lg max-w-xl">
                                    Real projects, real results. Explore how I've helped clients achieve their digital goals.
                                </p>
                            </div>
                            <Link
                                to="/#work"
                                className="px-6 py-3 border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider rounded-full hover:bg-primary hover:text-black transition-all duration-300"
                            >
                                View All Projects
                            </Link>
                        </div>

                        {/* Category Filter */}
                        <div className="flex gap-3 flex-wrap justify-center md:justify-start">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${selectedCategory === cat.id
                                        ? 'bg-primary text-black'
                                        : 'border border-white/10 text-neutral-400 hover:border-primary/50 hover:text-primary'
                                        }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Projects Grid */}
                    {filteredProjects.length === 0 ? (
                        <div className="text-center py-20">
                            <span className="material-symbols-outlined text-neutral-600 text-6xl mb-4">work_off</span>
                            <p className="text-neutral-500 text-lg">No projects found in this category.</p>
                        </div>
                    ) : (
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            variants={staggerContainer}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {filteredProjects.map((project) => {
                                const coverImage = (Array.isArray(project.images) && project.images[0]) || project.image;
                                return (
                                    <motion.div key={project.id} variants={scaleIn}>
                                        <Link to={`/case-study/${project.id}`} className="group block">
                                            <div className="overflow-hidden rounded-lg aspect-[4/5] bg-neutral-muted relative border border-white/5">
                                                <img
                                                    alt={project.name}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                                                    src={coverImage}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent opacity-100 group-hover:opacity-90 transition-opacity duration-500"></div>
                                                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                                    <h3 className="text-2xl font-bold uppercase tracking-tight text-white mb-2">
                                                        {project.name}
                                                    </h3>
                                                    <p className="text-primary text-xs uppercase tracking-widest font-bold">
                                                        {project.type} • {project.year}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    )}
                </div>
            </section>


            {/* SKILLS SHOWCASE SECTION */}
            <section className="py-32 px-6 bg-charcoal border-y border-white/5">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-24"
                    >
                        <span className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Expertise</span>
                        <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-tight mb-8">
                            Skills & <span className="text-primary">Technologies</span>
                        </h2>
                        <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
                            Proficient in modern technologies and frameworks used by leading companies worldwide
                        </p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-2 gap-12"
                    >
                        {/* Frontend Stack */}
                        <motion.div variants={scaleIn} className="glass-panel p-8 rounded-2xl border border-primary/20">
                            <div className="flex items-center gap-3 mb-8">
                                <span className="material-symbols-outlined text-primary text-4xl">code</span>
                                <h3 className="text-2xl font-bold uppercase tracking-tight">Frontend</h3>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Frameworks & Libraries</p>
                                    <div className="flex flex-wrap gap-2">
                                        {["React", "Next.js", "Framer Motion", "Redux", "Context API", "Zustand"].map((tech, i) => (
                                            <span key={i} className="px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-xs font-medium text-white">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Styling & UI</p>
                                    <div className="flex flex-wrap gap-2">
                                        {["Tailwind CSS", "CSS3", "SASS/SCSS", "Material UI", "Bootstrap"].map((tech, i) => (
                                            <span key={i} className="px-3 py-1 bg-accent-pink/10 border border-accent-pink/30 rounded-full text-xs font-medium text-white">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Tools & Build</p>
                                    <div className="flex flex-wrap gap-2">
                                        {["Webpack", "Vite", "npm", "Git", "GitHub", "Figma"].map((tech, i) => (
                                            <span key={i} className="px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-xs font-medium text-white">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Backend Stack */}
                        <motion.div variants={scaleIn} className="glass-panel p-8 rounded-2xl border border-accent-pink/20">
                            <div className="flex items-center gap-3 mb-8">
                                <span className="material-symbols-outlined text-accent-pink text-4xl">storage</span>
                                <h3 className="text-2xl font-bold uppercase tracking-tight">Backend</h3>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Runtime & Frameworks</p>
                                    <div className="flex flex-wrap gap-2">
                                        {["Node.js", "Express.js", "REST APIs", "GraphQL", "JWT Auth", "OAuth 2.0"].map((tech, i) => (
                                            <span key={i} className="px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-xs font-medium text-white">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Databases</p>
                                    <div className="flex flex-wrap gap-2">
                                        {["MongoDB", "PostgreSQL", "MySQL", "Firebase", "DynamoDB", "Redis"].map((tech, i) => (
                                            <span key={i} className="px-3 py-1 bg-accent-pink/10 border border-accent-pink/30 rounded-full text-xs font-medium text-white">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Tools & Services</p>
                                    <div className="flex flex-wrap gap-2">
                                        {["Postman", "MongoDB Atlas", "Stripe", "Nodemailer", "AWS", "Socket.io"].map((tech, i) => (
                                            <span key={i} className="px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-xs font-medium text-white">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* DevOps & Deployment */}
                        <motion.div variants={scaleIn} className="glass-panel p-8 rounded-2xl border border-primary/20">
                            <div className="flex items-center gap-3 mb-8">
                                <span className="material-symbols-outlined text-primary text-4xl">cloud_upload</span>
                                <h3 className="text-2xl font-bold uppercase tracking-tight">DevOps & Cloud</h3>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Deployment Platforms</p>
                                    <div className="flex flex-wrap gap-2">
                                        {["AWS", "Vercel", "Netlify", "Heroku", "DigitalOcean", "Firebase Hosting"].map((tech, i) => (
                                            <span key={i} className="px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-xs font-medium text-white">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">CI/CD & Version Control</p>
                                    <div className="flex flex-wrap gap-2">
                                        {["GitHub Actions", "Git Flow", "Docker", "Linux", "Nginx", "SSL/TLS"].map((tech, i) => (
                                            <span key={i} className="px-3 py-1 bg-accent-pink/10 border border-accent-pink/30 rounded-full text-xs font-medium text-white">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Monitoring & Performance</p>
                                    <div className="flex flex-wrap gap-2">
                                        {["Google Analytics", "Sentry", "New Relic", "Lighthouse", "AWS CloudWatch"].map((tech, i) => (
                                            <span key={i} className="px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-xs font-medium text-white">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Expertise & Specializations */}
                        <motion.div variants={scaleIn} className="glass-panel p-8 rounded-2xl border border-accent-pink/20">
                            <div className="flex items-center gap-3 mb-8">
                                <span className="material-symbols-outlined text-accent-pink text-4xl">lightbulb</span>
                                <h3 className="text-2xl font-bold uppercase tracking-tight">Expertise</h3>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Core Competencies</p>
                                    <div className="flex flex-wrap gap-2">
                                        {["Full Stack Development", "Web Performance", "API Design", "Database Optimization", "Security Implementation"].map((tech, i) => (
                                            <span key={i} className="px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-xs font-medium text-white">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Soft Skills</p>
                                    <div className="flex flex-wrap gap-2">
                                        {["Problem Solving", "Project Management", "Client Communication", "Code Review", "Documentation"].map((tech, i) => (
                                            <span key={i} className="px-3 py-1 bg-accent-pink/10 border border-accent-pink/30 rounded-full text-xs font-medium text-white">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Specializations</p>
                                    <div className="flex flex-wrap gap-2">
                                        {["E-Commerce", "EdTech", "SaaS Platforms", "Real-time Apps", "Mobile Responsive"].map((tech, i) => (
                                            <span key={i} className="px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-xs font-medium text-white">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Skills Statistics */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="mt-24 grid grid-cols-1 md:grid-cols-4 gap-6"
                    >
                        {[
                            { label: "Technologies", value: "50+" },
                            { label: "Years Experience", value: "2+" },
                            { label: "Projects Completed", value: "50+" },
                            { label: "Satisfied Clients", value: "30+" }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                variants={fadeInUp}
                                className="glass-panel p-8 rounded-2xl text-center border border-white/5"
                            >
                                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                                <div className="text-sm text-neutral-400 uppercase tracking-widest font-medium">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* PROCESS SECTION */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-20"
                    >
                        <span className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-4 block">How It Works</span>
                        <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-tight">
                            My <span className="text-primary">Process</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                        {/* Connection Line */}
                        <div className="hidden md:block absolute top-12 left-0 w-full h-[2px] bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 -z-10"></div>

                        {[
                            {
                                step: "01",
                                title: "Discovery",
                                description: "We discuss your goals, target audience, and project requirements to build a solid foundation."
                            },
                            {
                                step: "02",
                                title: "Design",
                                description: "I create wireframes and high-fidelity mockups, ensuring every pixel aligns with your vision."
                            },
                            {
                                step: "03",
                                title: "Development",
                                description: "Clean, scalable code brings the design to life with attention to performance and best practices."
                            },
                            {
                                step: "04",
                                title: "Launch",
                                description: "Thorough testing, deployment, and training ensure a smooth launch and long-term success."
                            }
                        ].map((phase, index) => (
                            <motion.div
                                key={index}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeInUp}
                                transition={{ delay: index * 0.15 }}
                                className="text-center relative"
                            >
                                <div className="w-20 h-20 mx-auto mb-6 rounded-full border-2 border-primary bg-background-dark flex items-center justify-center text-2xl font-bold text-primary ring-8 ring-background-dark relative z-10">
                                    {phase.step}
                                </div>
                                <h3 className="text-xl font-bold uppercase tracking-tight mb-3">
                                    {phase.title}
                                </h3>
                                <p className="text-neutral-400 text-sm leading-relaxed">
                                    {phase.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-32 px-6 bg-primary/5 border-t border-white/5 relative overflow-hidden">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="max-w-4xl mx-auto text-center relative z-10"
                >
                    <h2 className="text-4xl md:text-7xl font-bold uppercase tracking-tighter leading-tight mb-8">
                        Ready to Build<br />
                        <span className="text-primary">Something Amazing?</span>
                    </h2>
                    <p className="text-xl text-neutral-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Let's collaborate to create a digital experience that drives results and exceeds expectations.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/booking"
                            className="px-10 py-5 bg-primary text-black font-bold uppercase tracking-wider text-sm rounded-full hover:scale-105 transition-transform duration-300 shadow-lg shadow-primary/30"
                        >
                            Book A Call
                        </Link>
                        <Link
                            to="/contact"
                            className="px-10 py-5 border-2 border-primary text-primary font-bold uppercase tracking-wider text-sm rounded-full hover:bg-primary hover:text-black transition-all duration-300"
                        >
                            Send Message
                        </Link>
                    </div>
                </motion.div>
                <div className="absolute -top-20 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px]"></div>
                <div className="absolute -bottom-20 left-0 w-[300px] h-[300px] bg-accent-pink/10 rounded-full blur-[120px]"></div>
            </section>
        </main>
    );
}
