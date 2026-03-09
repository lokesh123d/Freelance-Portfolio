import { useRef } from "react";
import { Link } from "react-router-dom";
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

export default function Home() {
    const { projects, siteConfig } = useStorage();
    const personal = siteConfig?.personal || {};
    const about = siteConfig?.about || {};
    const seo = siteConfig?.seo || {};

    const testimonialRef = useRef(null);

    const scroll = (direction) => {
        if (testimonialRef.current) {
            const { scrollLeft, clientWidth } = testimonialRef.current;
            const scrollTo = direction === 'left'
                ? scrollLeft - clientWidth
                : scrollLeft + clientWidth;

            testimonialRef.current.scrollTo({
                left: scrollTo,
                behavior: 'smooth'
            });
        }
    };

    // Show ONLY pinned projects, giving admin full control. Default projects will not show unless pinned.
    const pinnedProjects = projects.filter(p => p?.pinned === true);
    // const regularProjects = projects.filter(p => !p?.pinned); // Disabled fallback
    const displayProjects = pinnedProjects.slice(0, 4); // Still limit to 4 for layout consistency
    const isLoadingProjects = projects.length === 0;

    return (
        <main>
            {/* HERO SECTION */}
            <header className="min-h-screen flex flex-col justify-center items-center px-6 relative overflow-hidden" id="home">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="max-w-7xl w-full text-center space-y-6 relative z-10"
                >
                    <motion.span variants={fadeInUp} className="text-primary font-medium tracking-[0.4em] uppercase block mb-6 text-xs">{seo.terminology || "Web Developer"}</motion.span>
                    <motion.h1 variants={fadeInUp} className="text-6xl md:text-[15rem] mt-24 md:mt-40 font-black leading-[0.8] tracking-[0.05em] uppercase flex flex-col items-center">
                        <motion.span>{(personal.name || "Lokesh").split(' ')[0]}</motion.span>
                        <motion.span className="text-transparent bg-clip-text mt-4 md:mt-8 bg-gradient-to-r from-primary via-primary/80 to-primary/30">{(personal.name || "").split(' ').slice(1).join(' ')}</motion.span>
                    </motion.h1>
                    <motion.div variants={fadeInUp} className="flex justify-center mt-12 md:mt-16">
                        <div className="w-px h-24 md:h-32 bg-gradient-to-b from-primary to-transparent"></div>
                    </motion.div>
                </motion.div>
                <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px]"></div>
                <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px]"></div>
            </header>

            {/* WORK SECTION - Only show if there are pinned projects or loading */}
            {(displayProjects.length > 0 || isLoadingProjects) && (
                <section className="py-32 px-6 max-w-7xl mx-auto" id="work">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeInUp}
                        className="flex flex-col md:flex-row justify-between items-baseline gap-8 mb-24"
                    >
                        <h2 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter leading-none">Selected<br /><span className="text-primary">Projects</span></h2>
                        <div className="max-w-xs space-y-4">
                            <div className="w-12 h-px bg-primary"></div>
                            <p className="text-neutral-400 text-xs leading-relaxed uppercase tracking-widest">
                                A collection of full-stack web applications built with modern tech stacks and clean code.
                            </p>
                        </div>
                    </motion.div>
                    {isLoadingProjects ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-32">
                            {[0, 1, 2, 3].map((i) => (
                                <div key={i} className={`${i === 1 || i === 3 ? 'md:mt-48' : ''}`}>
                                    <div className="overflow-hidden rounded-lg aspect-[4/5] bg-neutral-muted/40 border border-white/5 animate-pulse">
                                        <div className="h-full w-full bg-gradient-to-br from-neutral-800 via-neutral-700 to-neutral-900" />
                                    </div>
                                    <div className="mt-8 space-y-3">
                                        <div className="h-5 w-2/3 bg-neutral-800 rounded-full animate-pulse" />
                                        <div className="h-3 w-1/3 bg-neutral-800/80 rounded-full animate-pulse" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            variants={staggerContainer}
                            className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-32"
                        >
                            {displayProjects.map((p, index) => {
                                const coverImage = (Array.isArray(p?.images) && p.images[0]) || p?.image;
                                return (
                                    <motion.div variants={fadeInUp} key={p?.id || index}>
                                        <Link to={`/case-study/${p?.id}`} className={`group cursor-pointer block ${index === 1 || index === 3 ? 'md:mt-48' : ''}`}>
                                            <div className="overflow-hidden rounded-lg aspect-[4/5] bg-neutral-muted relative border border-white/5">
                                                {coverImage ? (
                                                    <img
                                                        alt={p?.name || 'Project'}
                                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-70 group-hover:opacity-100"
                                                        src={coverImage}
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-white/5 group-hover:bg-white/10 transition-colors">
                                                        <span className="text-neutral-500 font-bold uppercase tracking-widest text-xs px-4 text-center">{p?.name || 'No Image'}</span>
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-end p-12">
                                                    <span className="bg-primary text-black px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.2em]">Explore Case Study</span>
                                                </div>
                                            </div>
                                            <div className="mt-8 flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-3xl font-bold uppercase tracking-tighter group-hover:text-primary transition-colors">{p?.name || 'Untitled Project'}</h3>
                                                    <p className="text-neutral-500 font-medium mt-2 uppercase tracking-widest text-[10px]">{p?.type || 'Project'} / {p?.year || '2024'}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    )}
                </section>
            )}

            {/* SERVICES SECTION */}
            <section className="py-32 bg-primary/5 border-y border-white/5" id="services">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="editorial-line mb-24"></div>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 lg:grid-cols-3 gap-24 lg:gap-16"
                    >
                        <motion.div variants={fadeInUp} className="space-y-8 group">
                            <span className="material-symbols-outlined text-primary text-5xl transition-transform duration-500 group-hover:scale-110">terminal</span>
                            <h3 className="text-4xl font-bold uppercase tracking-tighter leading-none">Full Stack<br />Development</h3>
                            <p className="text-neutral-400 leading-relaxed font-light text-lg">Building end-to-end web applications using the MERN stack — React.js, Node.js, Express.js, and MongoDB. From REST APIs to admin dashboards, all production-ready.</p>
                        </motion.div>
                        <motion.div variants={fadeInUp} className="space-y-8 group">
                            <span className="material-symbols-outlined text-primary text-5xl transition-transform duration-500 group-hover:scale-110">deployed_code</span>
                            <h3 className="text-4xl font-bold uppercase tracking-tighter leading-none">Frontend<br />Engineering</h3>
                            <p className="text-neutral-400 leading-relaxed font-light text-lg">Creating responsive, dynamic user interfaces with React.js and modern CSS frameworks. Focused on smooth UX, component reusability, and pixel-perfect implementation.</p>
                        </motion.div>
                        <motion.div variants={fadeInUp} className="space-y-8 group">
                            <span className="material-symbols-outlined text-primary text-5xl transition-transform duration-500 group-hover:scale-110">shield_lock</span>
                            <h3 className="text-4xl font-bold uppercase tracking-tighter leading-none">Backend &<br />Auth Systems</h3>
                            <p className="text-neutral-400 leading-relaxed font-light text-lg">Designing secure authentication systems with JWT, role-based access control, and scalable backend architectures. Payment integration and database modeling included.</p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* WORKFLOW SECTION */}
            <section className="max-w-7xl mx-auto px-6 py-24 border-t border-primary/10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="mb-16"
                >
                    <h2 className="font-serif text-4xl mb-4 text-white">The Creative Workflow</h2>
                    <p className="text-neutral-400 max-w-xl">Transparent, iterative, and focused on delivering results that matter.</p>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    <div className="hidden md:block absolute top-12 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent -z-10"></div>
                    {/* Steps */}
                    {[
                        { num: "01", title: "Discovery", desc: "We begin by diving deep into your brand's DNA, goals, and target audience to build a solid strategic foundation." },
                        { num: "02", title: "Creation", desc: "Designing high-fidelity prototypes and developing robust solutions with continuous feedback and iteration loops." },
                        { num: "03", title: "Delivery", desc: "Fine-tuning every detail before launch, followed by training and ongoing support to ensure long-term success.", filled: true }
                    ].map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            transition={{ delay: idx * 0.2 }}
                            className="flex flex-col items-center md:items-start text-center md:text-left"
                        >
                            <div className={`w-16 h-16 rounded-full border-2 ${step.filled ? 'bg-primary text-black border-primary' : 'bg-background-dark text-primary border-primary'} flex items-center justify-center mb-6 font-bold text-xl ring-8 ring-background-dark relative`}>
                                {step.num}
                            </div>
                            <h4 className="text-xl font-bold mb-3 text-white">{step.title}</h4>
                            <p className="text-neutral-400 text-sm leading-relaxed">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* PRICING SECTION */}
            <section className="py-32 px-6" id="pricing">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="flex flex-col md:flex-row justify-between items-baseline gap-6 mb-20"
                    >
                        <h2 className="text-5xl font-bold uppercase tracking-tighter">Investment<br /><span className="text-primary">Structures</span></h2>
                        <p className="max-w-sm text-neutral-400 text-sm leading-relaxed uppercase tracking-widest">Tailored engagement models designed to scale with your project's ambitions and complexities.</p>
                    </motion.div>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {/* Essential */}
                        <motion.div variants={fadeInUp} className="pricing-card p-10 rounded-2xl flex flex-col h-full bg-neutral-muted/20 border border-white/5">
                            <div className="mb-8">
                                <span className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-500 block mb-4">Foundation</span>
                                <h4 className="text-2xl font-bold uppercase tracking-tight mb-2">Essential</h4>
                                <div className="flex items-baseline gap-1"><span className="text-4xl font-bold text-primary">$4.5k</span><span className="text-neutral-500 text-sm uppercase tracking-widest">/ Project</span></div>
                            </div>
                            <div className="editorial-line mb-8"></div>
                            <ul className="space-y-5 mb-12 flex-grow">
                                <li className="flex items-start gap-3 text-sm text-neutral-300"><span className="material-symbols-outlined text-primary text-lg">check_circle</span><span>Core Identity Design</span></li>
                                <li className="flex items-start gap-3 text-sm text-neutral-300"><span className="material-symbols-outlined text-primary text-lg">check_circle</span><span>3-Page Landing Experience</span></li>
                            </ul>
                            <Link to="/booking" className="w-full py-5 rounded-full border border-white/10 text-xs font-bold uppercase tracking-widest hover:border-primary hover:text-primary transition-all duration-300 text-center block">Book Project</Link>
                        </motion.div>
                        {/* Premium */}
                        <motion.div variants={fadeInUp} className="pricing-card p-8 md:p-10 rounded-2xl flex flex-col h-full relative border-primary/40 bg-primary/5 shadow-2xl md:scale-105 z-10 my-4 md:my-0">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-black text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1 rounded-full whitespace-nowrap">Most Selected</div>
                            <div className="mb-8 mt-4 md:mt-0">
                                <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary block mb-4">The Standard</span>
                                <h4 className="text-2xl font-bold uppercase tracking-tight mb-2">Premium</h4>
                                <div className="flex items-baseline gap-1"><span className="text-4xl font-bold text-primary">$12k</span><span className="text-neutral-500 text-sm uppercase tracking-widest">/ Project</span></div>
                            </div>
                            <div className="editorial-line mb-8 bg-primary/30"></div>
                            <ul className="space-y-5 mb-12 flex-grow">
                                <li className="flex items-start gap-3 text-sm text-white"><span className="material-symbols-outlined text-primary text-lg">check_circle</span><span>Complete Brand Strategy</span></li>
                                <li className="flex items-start gap-3 text-sm text-white"><span className="material-symbols-outlined text-primary text-lg">check_circle</span><span>Full Digital Product Suite</span></li>
                                <li className="flex items-start gap-3 text-sm text-white"><span className="material-symbols-outlined text-primary text-lg">check_circle</span><span>Motion & Interaction Library</span></li>
                            </ul>
                            <Link to="/booking" className="w-full py-5 rounded-full bg-primary text-black text-xs font-bold uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all duration-300 text-center block">Book Design Sprint</Link>
                        </motion.div>
                        {/* Retainer */}
                        <motion.div variants={fadeInUp} className="pricing-card p-10 rounded-2xl flex flex-col h-full bg-neutral-muted/20 border border-white/5">
                            <div className="mb-8">
                                <span className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-500 block mb-4">Unlimited</span>
                                <h4 className="text-2xl font-bold uppercase tracking-tight mb-2">Retainer</h4>
                                <div className="flex items-baseline gap-1"><span className="text-4xl font-bold text-primary">$8k</span><span className="text-neutral-500 text-sm uppercase tracking-widest">/ Month</span></div>
                            </div>
                            <div className="editorial-line mb-8"></div>
                            <ul className="space-y-5 mb-12 flex-grow">
                                <li className="flex items-start gap-3 text-sm text-neutral-300"><span className="material-symbols-outlined text-primary text-lg">check_circle</span><span>Priority Task Queue</span></li>
                                <li className="flex items-start gap-3 text-sm text-neutral-300"><span className="material-symbols-outlined text-primary text-lg">check_circle</span><span>Weekly Design Consultations</span></li>
                            </ul>
                            <Link to="/booking" className="w-full py-5 rounded-full border border-primary/30 text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-300 text-center block">Enquire Now</Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ABOUT PREVIEW */}
            <section className="py-48 px-6 max-w-7xl mx-auto" id="about">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center mb-32"
                >
                    <motion.div variants={fadeInUp} className="relative max-w-md mx-auto lg:mx-0">
                        <div className="aspect-square rounded-full border border-primary/20 p-4 md:p-6">
                            <div className="w-full h-full rounded-full overflow-hidden border border-white/10">
                                <img alt="Portrait" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-110" src={personal.profileImage} />
                            </div>
                        </div>
                        <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-primary w-32 h-32 md:w-44 md:h-44 rounded-full flex items-center justify-center p-4 md:p-8 text-center rotate-12 shadow-2xl">
                            <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] leading-tight text-black">A Decade of Crafting Excellence</span>
                        </div>
                    </motion.div>
                    <motion.div variants={fadeInUp} className="space-y-6 md:space-y-10 text-center md:text-left">
                        <h2 className="text-4xl md:text-7xl font-bold uppercase tracking-tighter leading-[0.9]">{about.tagline || ""}</h2>
                        <p className="text-lg md:text-xl text-neutral-400 font-light leading-relaxed">{about.bio || ""}</p>
                    </motion.div>
                </motion.div>
            </section>

            {/* TESTIMONIALS */}
            <section className="relative py-24 overflow-hidden border-t border-white/5">
                <div className="absolute inset-0 grain-overlay"></div>
                <div className="container mx-auto px-6 relative">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8"
                    >
                        <div className="max-w-xl">
                            <span className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Kind Words</span>
                            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight dark:text-white leading-tight">Selected <br /> <span className="text-primary italic font-serif font-normal">Collaborations.</span></h2>
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={() => scroll('left')}
                                className="w-16 h-16 rounded-full border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-black transition-all duration-300 active:scale-90"
                            >
                                <span className="material-icons">west</span>
                            </button>
                            <button
                                onClick={() => scroll('right')}
                                className="w-16 h-16 rounded-full border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-black transition-all duration-300 active:scale-90"
                            >
                                <span className="material-icons">east</span>
                            </button>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        ref={testimonialRef}
                        className="flex gap-12 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-12"
                    >
                        {/* Testimonial 1 */}
                        <div className="min-w-full md:min-w-[800px] snap-center">
                            <div className="relative p-8 md:p-12 bg-neutral-muted/40 border border-primary/5 rounded-xl backdrop-blur-sm h-full">
                                <span className="absolute -top-6 -left-2 text-8xl font-serif text-primary/10 italic select-none">“</span>
                                <blockquote className="relative z-10">
                                    <p className="text-2xl md:text-3xl font-serif italic leading-relaxed text-white/90 mb-10 text-shadow-subtle">Working with Lokesh was a transformative experience. He didn't just build a website; he articulated our brand's soul through motion and code.</p>
                                </blockquote>
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/20 p-0.5">
                                        <img alt="Client" className="w-full h-full object-cover rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200" />
                                    </div>
                                    <div><h4 className="font-bold text-white tracking-wide">Amara Vance</h4><p className="text-sm text-primary uppercase tracking-widest font-semibold opacity-80">Founder, Lume Design</p></div>
                                </div>
                            </div>
                        </div>

                        {/* Testimonial 2 */}
                        <div className="min-w-full md:min-w-[800px] snap-center">
                            <div className="relative p-8 md:p-12 bg-neutral-muted/40 border border-primary/5 rounded-xl backdrop-blur-sm h-full">
                                <span className="absolute -top-6 -left-2 text-8xl font-serif text-primary/10 italic select-none">“</span>
                                <blockquote className="relative z-10">
                                    <p className="text-2xl md:text-3xl font-serif italic leading-relaxed text-white/90 mb-10 text-shadow-subtle">The attention to detail in the backend architecture surprised us. Clean, scalable code and a perfectly responsive UI. A true full-stack professional.</p>
                                </blockquote>
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/20 p-0.5">
                                        <img alt="Client" className="w-full h-full object-cover rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200" />
                                    </div>
                                    <div><h4 className="font-bold text-white tracking-wide">Julian Thorne</h4><p className="text-sm text-primary uppercase tracking-widest font-semibold opacity-80">Tech Lead, Nexa Systems</p></div>
                                </div>
                            </div>
                        </div>

                        {/* Testimonial 3 */}
                        <div className="min-w-full md:min-w-[800px] snap-center">
                            <div className="relative p-8 md:p-12 bg-neutral-muted/40 border border-primary/5 rounded-xl backdrop-blur-sm h-full">
                                <span className="absolute -top-6 -left-2 text-8xl font-serif text-primary/10 italic select-none">“</span>
                                <blockquote className="relative z-10">
                                    <p className="text-2xl md:text-3xl font-serif italic leading-relaxed text-white/90 mb-10 text-shadow-subtle">What sets Lokesh apart is his ability to bridge the gap between design and development. The animations are smooth and the performance is top-notch.</p>
                                </blockquote>
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/20 p-0.5">
                                        <img alt="Client" className="w-full h-full object-cover rounded-full" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200" />
                                    </div>
                                    <div><h4 className="font-bold text-white tracking-wide">Elena Rodriguez</h4><p className="text-sm text-primary uppercase tracking-widest font-semibold opacity-80">Creative Director, Bloom</p></div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* FAQ */}
            <section className="max-w-7xl mx-auto px-6 py-12 mb-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="lg:col-span-4"
                    >
                        <h2 className="font-serif text-5xl md:text-6xl text-white leading-tight">Frequently <br /><span className="italic text-primary">Asked</span> <br />Questions</h2>
                    </motion.div>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        className="lg:col-span-8 space-y-0 border-t border-primary/10"
                    >
                        {[
                            { q: "How long does a typical project take?", a: "Project timelines vary depending on scope, but a standard custom website typically takes between 6 to 10 weeks from discovery to launch." },
                            { q: "Do you offer payment plans?", a: "Yes, we typically split payments into three or four installments: a deposit to secure your spot, and subsequent payments at key milestones." },
                            { q: "What tech stack do you use?", a: "I specialize in the MERN stack (MongoDB, Express, React, Node.js) but I also work with Next.js, Firebase, and modern CSS frameworks like Tailwind CSS to build scalable applications." },
                            { q: "Do you provide post-launch maintenance?", a: "Absolutely. I offer monthly maintenance packages that include security updates, performance monitoring, and small content updates to keep your site running smoothly." },
                            { q: "How many revisions are included?", a: "Each phase (Design & Development) includes two major rounds of revisions. My goal is to ensure you're 100% satisfied with the final product through clear communication." },
                        ].map((faq, i) => (
                            <motion.details variants={fadeInUp} key={i} className="group border-b border-primary/10">
                                <summary className="flex items-center justify-between py-8 cursor-pointer list-none">
                                    <span className="font-serif text-xl md:text-2xl font-bold text-white group-hover:text-primary transition-colors">{faq.q}</span>
                                    <span className="material-icons text-primary/60 text-3xl transition-transform duration-300 group-open:rotate-45">add</span>
                                </summary>
                                <div className="pb-8 pr-12"><p className="text-neutral-400 text-lg leading-relaxed font-light">{faq.a}</p></div>
                            </motion.details>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CONTACT CTA */}
            <section className="py-32 px-6 bg-charcoal overflow-hidden relative" id="contact">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="max-w-7xl mx-auto relative z-10 text-center space-y-12"
                >
                    <h1 className="text-4xl md:text-8xl leading-none font-bold tracking-tight uppercase" dangerouslySetInnerHTML={{ __html: (about.greeting || "Let's Create Something Epic").replace('Something', '<br /><span className="text-stroke">Something</span><br />') }}></h1>
                    <Link to="/contact" className="inline-flex items-center justify-center px-10 py-5 md:px-12 md:py-6 bg-primary text-black font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(0,243,255,0.4)] text-sm md:text-base">
                        <span className="relative z-10 flex items-center gap-2">START PROJECT <span className="material-icons text-xl">north_east</span></span>
                    </Link>
                </motion.div>
            </section>
        </main>
    );
}
