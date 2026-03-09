import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useStorage } from "../context/StorageContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === "/";
    const { siteConfig } = useStorage();
    const personal = siteConfig?.personal || {};

    const toggleMenu = () => setIsOpen(!isOpen);

    const navLinks = [
        { name: "Work", path: "#work", isHash: true },
        { name: "Services", path: "/services", isHash: false },
        { name: "About", path: "/about", isHash: false },
        { name: "Contact", path: "/contact", isHash: false }
    ];

    return (
        <nav className="fixed top-0 md:top-8 left-0 md:left-1/2 md:-translate-x-1/2 z-90 w-full md:max-w-2xl px-0 md:px-4">
            <motion.div
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`glass-nav md:rounded-full px-6 md:px-8 py-4 md:py-4 flex items-center justify-between shadow-2xl transition-all duration-500 ${isOpen ? 'bg-background-dark/95 backdrop-blur-3xl' : ''}`}
            >
                <Link
                    to="/"
                    onClick={() => setIsOpen(false)}
                    className="text-primary font-bold text-2xl tracking-tight hover:scale-105 transition-transform z-100"
                >
                    {(personal.name || "Lokesh").split(' ')[0]}
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white">
                    {navLinks.map((link) => (
                        <div key={link.name}>
                            {link.isHash ? (
                                isHome ? (
                                    <a href={link.path} className="px-4 py-2 rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-300 relative group cursor-pointer">
                                        {link.name}
                                        <span className="absolute -bottom-0.5 left-4 right-4 h-0.5 bg-primary scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                                    </a>
                                ) : (
                                    <Link to={`/${link.path}`} className="px-4 py-2 rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-300 relative group cursor-pointer">
                                        {link.name}
                                        <span className="absolute -bottom-0.5 left-4 right-4 h-0.5 bg-primary scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                                    </Link>
                                )
                            ) : (
                                <Link
                                    to={link.path}
                                    className={`px-4 py-2 rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-300 relative group cursor-pointer ${location.pathname === link.path ? 'bg-primary/10 text-primary' : ''}`}
                                >
                                    {link.name}
                                    <span className="absolute -bottom-0.5 left-4 right-4 h-0.5 bg-primary scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                                </Link>
                            )}
                        </div>
                    ))}
                </div>

                {/* Mobile Burger Toggle */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden text-white focus:outline-none z-100 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10"
                >
                    <span className="material-icons-round text-2xl">
                        {isOpen ? 'close' : 'menu'}
                    </span>
                </button>
            </motion.div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="fixed inset-0 bg-background-dark/95 backdrop-blur-3xl z-95 flex flex-col items-center justify-center gap-10 md:hidden"
                    >
                        {navLinks.map((link, i) => (
                            <motion.div
                                key={link.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.3, delay: i * 0.05 }}
                            >
                                {link.isHash ? (
                                    isHome ? (
                                        <a
                                            href={link.path}
                                            onClick={() => setIsOpen(false)}
                                            className="text-4xl font-bold uppercase tracking-[0.2em] text-white hover:text-primary transition-colors"
                                        >
                                            {link.name}
                                        </a>
                                    ) : (
                                        <Link
                                            to={`/${link.path}`}
                                            onClick={() => setIsOpen(false)}
                                            className="text-4xl font-bold uppercase tracking-[0.2em] text-white hover:text-primary transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    )
                                ) : (
                                    <Link
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className={`text-4xl font-bold uppercase tracking-[0.2em] transition-colors ${location.pathname === link.path ? 'text-primary' : 'text-white hover:text-primary'}`}
                                    >
                                        {link.name}
                                    </Link>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
