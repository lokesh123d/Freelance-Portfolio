import { useStorage } from "../context/StorageContext";
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

const progressVariant = {
    hidden: { width: 0 },
    visible: (width) => ({
        width: `${width}%`,
        transition: { duration: 1.5, ease: "easeOut", delay: 0.2 }
    })
};

export default function About() {
    const { siteConfig } = useStorage();
    const personal = siteConfig?.personal || {};
    const about = siteConfig?.about || {};

    const skills = [
        { name: "React.js", level: 95 },
        { name: "Node.js & Express.js", level: 90 },
        { name: "Full Stack Development", level: 92 },
        { name: "JavaScript/TypeScript", level: 95 },
        { name: "MongoDB & PostgreSQL", level: 88 },
        { name: "REST APIs & GraphQL", level: 90 },
        { name: "Tailwind CSS & UI Design", level: 92 },
        { name: "Authentication & Security", level: 88 },
        { name: "Cloud Deployment (AWS/Vercel)", level: 85 },
        { name: "Performance Optimization", level: 87 },
        { name: "Git & Version Control", level: 90 },
        { name: "Redux & State Management", level: 88 },
    ];

    return (
        <main>
            {/* HERO */}
            <header className="min-h-[70vh] flex flex-col justify-center items-center px-6 relative overflow-hidden pt-32">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="max-w-7xl w-full text-center space-y-6 text-white z-10"
                >
                    <motion.span variants={fadeInUp} className="text-primary font-medium tracking-[0.3em] uppercase block mb-4">The Journey So Far</motion.span>
                    <motion.h1 variants={fadeInUp} className="text-5xl md:text-[10rem] font-bold leading-[0.85] tracking-tighter uppercase">
                        ABOUT
                    </motion.h1>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0.2, scale: 0.9 }}
                    animate={{ opacity: [0.2, 0.5, 0.2], scale: [0.9, 1.05, 0.9] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-24 -left-24 w-96 h-96 pink-glow"
                />
            </header>

            {/* STORY */}
            <section className="py-24 md:py-32 px-6 max-w-7xl mx-auto" id="about">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start"
                >
                    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-8 md:space-y-12">
                        <div className="space-y-6">
                            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold uppercase tracking-tighter leading-tight font-display text-white">Professional <span className="italic font-serif text-primary">Full-Stack Developer</span>.</motion.h2>
                            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-neutral-400 font-light leading-relaxed">I'm a dedicated full-stack web developer specializing in building scalable, high-performance web applications. With expertise in modern technologies like React, Node.js, and cloud platforms, I create digital solutions that solve real business problems and drive measurable results.</motion.p>
                            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-neutral-400 font-light leading-relaxed">My approach combines clean architecture, performance optimization, and user-centric design. I'm passionate about writing maintainable code, implementing security best practices, and delivering production-ready applications that scale. Every project is an opportunity to apply cutting-edge technologies to create lasting value.</motion.p>
                            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-neutral-400 font-light leading-relaxed">Whether you need a complete web platform, API development, performance optimization, or ongoing technical support, I bring a strategic mindset and hands-on expertise to every engagement. Let's build something remarkable together.</motion.p>
                        </div>
                        <motion.div variants={fadeInUp} className="editorial-line"></motion.div>
                        <motion.div variants={staggerContainer} className="grid grid-cols-2 gap-8 md:gap-12 pt-4 text-center md:text-left">
                            {[
                                { n: "50+", t: "Projects Delivered" },
                                { n: "30+", t: "Satisfied Clients" },
                                { n: "50+", t: "Technologies" },
                                { n: "2+", t: "Years Experience" }
                            ].map((s, i) => (
                                <motion.div variants={fadeInUp} key={i} className="space-y-2">
                                    <span className="text-primary font-bold text-3xl md:text-4xl font-serif">{s.n}</span>
                                    <p className="text-[10px] uppercase tracking-widest text-neutral-500">{s.t}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="relative group max-w-md mx-auto lg:mx-0 lg:max-w-none w-full"
                    >
                        <div className="aspect-3/4 overflow-hidden rounded-lg bg-neutral-muted border border-white/5">
                            <img className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0" src={personal.profileImage} alt="Portrait" />
                        </div>
                        <div className="absolute -bottom-6 -left-6 md:-bottom-12 md:-left-12 bg-charcoal border border-primary/20 p-6 md:p-8 rounded-lg shadow-2xl max-w-xs hidden md:block">
                            <p className="text-xs md:text-sm font-serif italic text-primary mb-2">"{about.tagline || ""}"</p>
                            <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-neutral-500">— My Development Philosophy</p>
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* SKILLS */}
            <section className="py-32 bg-charcoal">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="mb-16"
                    >
                        <span className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Tech Stack</span>
                        <h2 className="text-5xl font-bold uppercase tracking-tighter">My <span className="text-primary">Skills</span></h2>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {skills.map((skill, i) => (
                            <div key={i} className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold uppercase tracking-widest">{skill.name}</span>
                                    <span className="text-xs text-primary font-mono">{skill.level}%</span>
                                </div>
                                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        variants={progressVariant}
                                        custom={skill.level}
                                        className="h-full bg-linear-to-r from-primary to-primary/60 rounded-full"
                                    ></motion.div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* EDUCATION & EXPERIENCE */}
            <section className="py-32 px-6 max-w-7xl mx-auto">
                <div className="mb-16">
                    <motion.span initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Professional Journey</motion.span>
                    <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-5xl font-bold uppercase tracking-tighter">Education & <span className="text-primary">Experience</span></motion.h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Education Cards */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="glass-panel rounded-3xl p-10 relative overflow-hidden group border border-primary/20"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px]"></div>
                        <span className="material-symbols-outlined text-primary text-4xl mb-6 block">school</span>
                        <h3 className="text-2xl font-bold uppercase tracking-tighter mb-4">Full Stack Web Development</h3>
                        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">NavGurukul | Comprehensive Training</p>
                        <p className="text-neutral-400 leading-relaxed">Intensive full-stack bootcamp covering modern web technologies: HTML5, CSS3, JavaScript ES6+, React.js, Node.js, Express.js, MongoDB, and cloud deployment. Built production-ready applications with real-world project experience.</p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        transition={{ delay: 0.2 }}
                        className="glass-panel rounded-3xl p-10 relative overflow-hidden group border border-accent-pink/20"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent-pink/10 blur-[60px]"></div>
                        <span className="material-symbols-outlined text-accent-pink text-4xl mb-6 block">menu_book</span>
                        <h3 className="text-2xl font-bold uppercase tracking-tighter mb-4">Higher Secondary Education</h3>
                        <p className="text-xs font-bold uppercase tracking-widest text-accent-pink mb-4">12th Grade — PCM Stream</p>
                        <p className="text-neutral-400 leading-relaxed">Completed higher secondary education with Physics, Chemistry, and Mathematics. Strong foundation in analytical thinking, problem-solving, and logical reasoning that translates directly to software development.</p>
                    </motion.div>
                </div>

                {/* Professional Experience */}
                <div className="mt-16 pt-16 border-t border-white/10">
                    <motion.h3 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-3xl font-bold uppercase tracking-tighter mb-12 mt-8">
                        Professional <span className="text-primary">Experience</span>
                    </motion.h3>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="space-y-8"
                    >
                        {[
                            {
                                title: "Freelance Full Stack Developer",
                                period: "2023 - Present",
                                description: "Building scalable web applications for startups and businesses. Specializing in full-stack development with focus on performance, security, and user experience.",
                                highlights: ["50+ projects delivered", "30+ satisfied clients", "E-commerce, SaaS, and EdTech platforms", "99%+ uptime applications"]
                            },
                            {
                                title: "Full Stack Development Enthusiast",
                                period: "2022 - 2023",
                                description: "Intensive learning and project development phase. Built multiple production applications demonstrating proficiency across the full technology stack.",
                                highlights: ["Real-world project experience", "Database optimization", "API development", "Responsive UI/UX design"]
                            }
                        ].map((exp, i) => (
                            <motion.div
                                key={i}
                                variants={fadeInUp}
                                className="glass-panel rounded-2xl p-8 border border-white/5 hover:border-primary/30 transition-all duration-300"
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                    <h4 className="text-xl font-bold uppercase tracking-tight text-white">{exp.title}</h4>
                                    <span className="text-sm text-primary font-bold uppercase tracking-widest mt-2 md:mt-0">{exp.period}</span>
                                </div>
                                <p className="text-neutral-400 mb-6 leading-relaxed">{exp.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {exp.highlights.map((highlight, j) => (
                                        <span key={j} className="px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-xs font-medium text-white">
                                            {highlight}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* VALUES & PRINCIPLES */}
            <section className="py-32 bg-charcoal">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-20"
                    >
                        <span className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Core Values</span>
                        <h2 className="text-5xl font-bold uppercase tracking-tighter mb-6">What I <span className="text-primary">Stand For</span></h2>
                        <p className="text-neutral-400 max-w-2xl mx-auto text-lg">Principles that guide every project and client engagement</p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-3 gap-12"
                    >
                        {[
                            {
                                icon: "code",
                                title: "Clean Code Architecture",
                                desc: "Every line of code is intentional. I write readable, maintainable code following industry best practices and design patterns that scale with your business."
                            },
                            {
                                icon: "rocket_launch",
                                title: "Production Excellence",
                                desc: "I build applications that work flawlessly in production. Security, performance, scalability, and reliability are built in from day one, not added later."
                            },
                            {
                                icon: "psychology",
                                title: "Continuous Learning",
                                desc: "Technology evolves rapidly. I stay current with latest frameworks, tools, and best practices. Every project pushes my skills and brings new innovations to your solution."
                            },
                            {
                                icon: "done_all",
                                title: "Communication First",
                                desc: "Clear communication is the foundation of successful projects. I keep you informed, explain technical decisions in plain language, and align development with your goals."
                            },
                            {
                                icon: "security",
                                title: "Security & Privacy",
                                desc: "Protecting your data and user information is non-negotiable. I implement industry-standard security practices, encryption, and compliance measures across all applications."
                            },
                            {
                                icon: "trending_up",
                                title: "Business Impact",
                                desc: "Technology should solve business problems and drive growth. I focus on ROI, user engagement, and measurable results, not just code for code's sake."
                            }
                        ].map((v, i) => (
                            <motion.div
                                variants={fadeInUp}
                                key={i}
                                className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-primary/30 transition-all duration-300 group space-y-6"
                            >
                                <span className="text-primary material-symbols-outlined text-4xl group-hover:scale-110 transition-transform duration-300">{v.icon}</span>
                                <h3 className="text-2xl font-bold uppercase tracking-tighter">{v.title}</h3>
                                <p className="text-neutral-400 leading-relaxed">{v.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-32 px-6 relative overflow-hidden">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="max-w-4xl mx-auto text-center relative z-10 space-y-8"
                >
                    <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-tight">
                        Ready to Work<br />
                        <span className="text-primary">Together?</span>
                    </motion.h2>
                    <motion.p variants={fadeInUp} className="text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                        Whether you have a project in mind or just want to discuss possibilities, I'm here to help. Let's create something remarkable.
                    </motion.p>
                    <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="/booking" className="px-10 py-5 bg-primary text-black font-bold uppercase tracking-wider text-sm rounded-full hover:scale-105 transition-transform duration-300 shadow-lg shadow-primary/30">
                            Schedule A Call
                        </a>
                        <a href="/contact" className="px-10 py-5 border-2 border-primary text-primary font-bold uppercase tracking-wider text-sm rounded-full hover:bg-primary hover:text-black transition-all duration-300">
                            Send A Message
                        </a>
                    </motion.div>
                </motion.div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-pink/5 rounded-full blur-[120px] -z-10"></div>
            </section>
        </main>
    );
}
