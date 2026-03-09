import { useParams, Link } from "react-router-dom";
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
            staggerChildren: 0.1
        }
    }
};

export default function CaseStudy() {
    const { id } = useParams();
    const { projects } = useStorage();

    // Loading state: while projects are still being fetched from Firebase
    if (!projects || projects.length === 0) {
        return (
            <main className="bg-background-dark min-h-screen text-slate-100 font-display">
                <header className="min-h-screen flex flex-col justify-center px-6 pt-32 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full -mr-64 -mt-64"></div>

                    <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-24 relative z-10">
                        <div className="lg:col-span-8 space-y-4 animate-pulse">
                            <div className="flex items-center gap-4 mb-6">
                                <span className="h-px w-8 md:w-12 bg-primary/40"></span>
                                <span className="h-3 w-40 bg-neutral-800 rounded-full"></span>
                            </div>
                            <div className="h-16 md:h-40 w-3/4 bg-neutral-800 rounded-3xl"></div>
                        </div>
                        <div className="lg:col-span-4 flex flex-col justify-end pb-4 animate-pulse">
                            <div className="h-20 w-full max-w-sm bg-neutral-900 rounded-2xl border border-white/5"></div>
                        </div>
                    </div>

                    <div className="w-full aspect-video rounded-2xl md:rounded-[2rem] overflow-hidden mb-12 relative z-10 border border-white/5 shadow-2xl">
                        <div className="h-full w-full bg-linear-to-br from-neutral-900 via-neutral-800 to-neutral-900 animate-pulse" />
                    </div>
                </header>
            </main>
        );
    }

    const currentIndex = projects.findIndex((p) => p.id == id);
    if (currentIndex === -1) {
        return (
            <div className="h-screen flex items-center justify-center text-white">
                Project not found. <Link to="/" className="text-primary ml-2 underline">Go Home</Link>
            </div>
        );
    }

    const project = projects[currentIndex];
    const imagesArray = Array.isArray(project.images) && project.images.length
        ? project.images
        : (project.image ? [project.image] : []);
    const heroImage = imagesArray[0] || project.image;
    // Calculate next project ID based on array position, looping back to start
    const nextIndex = (currentIndex + 1) % projects.length;
    const nextId = projects[nextIndex].id;

    return (
        <main className="bg-background-dark min-h-screen text-slate-100 font-display">
            {/* HERO SECTION */}
            <header className="min-h-screen flex flex-col justify-center px-6 pt-32 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full -mr-64 -mt-64"></div>

                <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-24 relative z-10">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="lg:col-span-8"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <span className="h-px w-8 md:w-12 bg-primary"></span>
                            <span className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs">Featured Case Study</span>
                        </div>
                        <h1 className="text-4xl md:text-[10rem] font-black leading-[0.85] md:leading-[0.8] tracking-tighter uppercase mb-8 drop-shadow-2xl wrap-break-word">
                            {project.name}
                        </h1>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="lg:col-span-4 flex flex-col justify-end pb-4"
                    >
                        <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed max-w-sm border-l-2 border-primary/20 pl-6">
                            {project.subtitle || "Exploring the intersection of brand identity and digital experience."}
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="w-full aspect-video rounded-2xl md:rounded-[2rem] overflow-hidden mb-12 relative z-10 border border-white/5 shadow-2xl group"
                >
                    <img alt={project.name} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" src={heroImage} />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent md:hidden"></div>
                </motion.div>
            </header>

            {/* QUICK STATS */}
            <section className="border-y border-white/5 py-16 px-6 bg-white/2 backdrop-blur-sm">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12"
                >
                    {[
                        { label: "Client", value: project.client || "Confidential" },
                        { label: "Role", value: project.type },
                        { label: "Year", value: project.year },
                        { label: "Timeline", value: project.duration || "Ongoing" }
                    ].map((stat, i) => (
                        <motion.div variants={fadeInUp} key={i} className="space-y-3">
                            <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold">{stat.label}</span>
                            <p className="text-lg font-bold text-slate-200">{stat.value}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* TECH STACK & SERVICES */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="py-24 px-6 border-b border-white/5"
            >
                <div className="max-w-7xl mx-auto flex flex-wrap gap-3">
                    {(project.services || []).map((service, i) => (
                        <motion.span
                            variants={fadeInUp}
                            key={i}
                            className="px-6 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-widest text-primary hover:bg-primary hover:text-black transition-all cursor-default"
                        >
                            {service}
                        </motion.span>
                    ))}
                </div>
            </motion.section>

            {/* CONTENT SECTION */}
            <section className="py-32 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
                    <div className="lg:col-span-4 space-y-8 sticky top-32 self-start hidden lg:block">
                        <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary">
                            <span className="material-icons-round text-4xl">auto_awesome</span>
                        </div>
                        <h3 className="text-4xl font-black uppercase tracking-tighter leading-none italic opacity-20">PROJECT<br />STORY</h3>
                    </div>

                    <div className="lg:col-span-8">
                        <div className="prose prose-invert max-w-none">
                            <motion.h2
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeInUp}
                                className="text-3xl md:text-4xl font-bold uppercase tracking-tighter mb-8 md:mb-12 text-white text-center md:text-left"
                            >
                                THE CONTEXT
                            </motion.h2>
                            <motion.p
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeInUp}
                                className="text-xl md:text-3xl font-light text-slate-300 leading-relaxed mb-12 md:mb-16 italic text-center md:text-left"
                            >
                                "{project.description}"
                            </motion.p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20">
                                <motion.div
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={fadeInUp}
                                    className="glass-panel p-10 rounded-[2rem] border-l-4 border-l-accent-pink bg-linear-to-br from-accent-pink/5 to-transparent"
                                >
                                    <h4 className="text-accent-pink font-black uppercase tracking-[0.2em] text-[10px] mb-6">Discovery</h4>
                                    <h3 className="text-2xl font-bold uppercase tracking-tighter mb-4 text-white">The Challenge</h3>
                                    <p className="text-slate-400 leading-relaxed text-sm">{project.challenge}</p>
                                </motion.div>
                                <motion.div
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={fadeInUp}
                                    transition={{ delay: 0.2 }}
                                    className="glass-panel p-10 rounded-[2rem] border-l-4 border-l-primary bg-linear-to-br from-primary/5 to-transparent"
                                >
                                    <h4 className="text-primary font-black uppercase tracking-[0.2em] text-[10px] mb-6">Execution</h4>
                                    <h3 className="text-2xl font-bold uppercase tracking-tighter mb-4 text-white">The Solution</h3>
                                    <p className="text-slate-400 leading-relaxed text-sm">{project.solution}</p>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* IMMERSIVE GALLERY */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    <div className="space-y-8">
                        <motion.div variants={fadeInUp} className="aspect-4/5 rounded-[2rem] overflow-hidden border border-white/5 group relative">
                            <img
                                alt="Project Detail"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                src={imagesArray[0] || heroImage}
                            />
                            <div className="absolute bottom-10 left-10">
                                <span className="text-[10px] font-bold uppercase tracking-widest bg-black/50 backdrop-blur px-4 py-2 rounded-full">
                                    Interface Detail
                                </span>
                            </div>
                        </motion.div>
                        <motion.div variants={fadeInUp} className="aspect-video rounded-[2rem] overflow-hidden border border-white/5">
                            <img
                                alt="Project Detail"
                                className="w-full h-full object-cover"
                                src={imagesArray[1] || imagesArray[0] || heroImage}
                            />
                        </motion.div>
                    </div>
                    <div className="flex items-center">
                        <motion.div variants={fadeInUp} className="aspect-3/4 rounded-[2rem] overflow-hidden border border-white/5 w-full shadow-2xl">
                            <img
                                alt="Project Detail"
                                className="w-full h-full object-cover"
                                src={imagesArray[2] || imagesArray[1] || imagesArray[0] || heroImage}
                            />
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* PROJECT LINK */}
            <section className="py-24 px-6 text-center">
                <motion.a
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex flex-col items-center max-w-full"
                >
                    <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-slate-500 mb-8">Visit Project</span>
                    <div className="text-2xl md:text-5xl font-black uppercase tracking-tighter border-b-2 border-white/10 pb-4 group-hover:border-primary transition-colors flex items-center gap-2 max-w-[90vw] overflow-hidden">
                        <span className="truncate">{new URL(project.link || "https://example.com").hostname}</span>
                        <span className="material-icons-round group-hover:rotate-45 transition-transform shrink-0">north_east</span>
                    </div>
                </motion.a>
            </section>

            {/* NEXT PROJECT FOOTER */}
            <section className="py-48 px-6 border-t border-white/5 bg-panel-dark/20 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-primary to-transparent opacity-20"></div>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="max-w-7xl mx-auto text-center relative z-10"
                >
                    <span className="text-primary text-[10px] font-bold uppercase tracking-[0.4em] mb-12 block">Next Up</span>
                    <Link to={`/case-study/${nextId}`} className="group inline-block">
                        <h2 className="text-5xl md:text-[8vw] font-black uppercase tracking-tight leading-none text-white/20 group-hover:text-white transition-all duration-700 transform group-hover:scale-105">
                            NEXT CASE
                        </h2>
                        <div className="flex items-center justify-center gap-4 mt-8 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="h-px w-24 bg-white"></span>
                            <span className="text-xs font-bold uppercase tracking-widest">Discover More</span>
                            <span className="h-px w-24 bg-white"></span>
                        </div>
                    </Link>
                </motion.div>
            </section>
        </main>
    );
}
