import { useToast } from '../context/ToastContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Toast() {
    const { toasts, removeToast } = useToast();

    return (
        <div className="fixed top-8 right-8 z-50 flex flex-col gap-3 pointer-events-none">
            <AnimatePresence>
                {toasts.map((toast) => (
                    <motion.div
                        key={toast.id}
                        initial={{ opacity: 0, y: -20, x: 100 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, y: -20, x: 100 }}
                        transition={{ duration: 0.3 }}
                        className={`pointer-events-auto glass-panel px-6 py-4 rounded-2xl flex items-center gap-3 shadow-2xl backdrop-blur-xl border ${
                            toast.type === 'success'
                                ? 'border-primary/40 bg-primary/5'
                                : toast.type === 'error'
                                ? 'border-red-500/40 bg-red-500/5'
                                : 'border-yellow-500/40 bg-yellow-500/5'
                        }`}
                    >
                        {toast.type === 'success' && (
                            <>
                                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-black flex-shrink-0">
                                    <span className="material-icons-round text-sm">check</span>
                                </div>
                                <p className="text-sm font-bold tracking-widest uppercase text-white">{toast.message}</p>
                            </>
                        )}
                        {toast.type === 'error' && (
                            <>
                                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                                    <span className="material-icons-round text-sm">error</span>
                                </div>
                                <p className="text-sm font-bold tracking-widest uppercase text-red-200">{toast.message}</p>
                            </>
                        )}
                        {toast.type === 'info' && (
                            <>
                                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black flex-shrink-0">
                                    <span className="material-icons-round text-sm">info</span>
                                </div>
                                <p className="text-sm font-bold tracking-widest uppercase text-yellow-100">{toast.message}</p>
                            </>
                        )}
                        <button
                            onClick={() => removeToast(toast.id)}
                            className="ml-auto text-slate-400 hover:text-white transition-colors flex-shrink-0"
                        >
                            <span className="material-icons-round">close</span>
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
