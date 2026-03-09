import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Fixed credentials
        const ADMIN_EMAIL = "admin@lokesh.com";
        const ADMIN_PASS = "admin123";

        if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
            localStorage.setItem("isAdmin", "true");
            navigate("/admin");
        } else {
            setError("Invalid email or password");
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-background-dark p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[150px]"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-pink/5 blur-[150px]"></div>

            <div className="glass-panel w-full max-w-md p-10 rounded-3xl relative z-10 border border-white/5 shadow-2xl">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <span className="material-icons-round text-primary text-4xl">auto_awesome</span>
                    </div>
                    <h1 className="text-3xl font-bold uppercase tracking-tighter">Admin <span className="text-primary">Portal</span></h1>
                    <p className="text-neutral-500 text-[10px] uppercase tracking-[0.4em] mt-2">Lokesh Management Suite</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 block ml-1">Email Address</label>
                        <input
                            type="email"
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-neutral-700 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            placeholder="admin@lokesh.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 block ml-1">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-neutral-700 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && <p className="text-accent-pink text-[10px] font-bold uppercase tracking-widest text-center">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-primary text-black font-bold py-5 rounded-xl uppercase tracking-[0.2em] text-xs hover:scale-[1.02] transition-transform active:scale-95 shadow-xl shadow-primary/20 mt-4"
                    >
                        Sign In
                    </button>

                    <div className="pt-4 text-center">
                        <p className="text-[9px] text-neutral-600 uppercase tracking-widest">Forgot password? Contact system administrator.</p>
                    </div>
                </form>
            </div>

            <div className="fixed bottom-6 text-center w-full">
                <p className="text-[10px] text-neutral-500 uppercase tracking-[0.3em]">© 2026 Lokesh Dangwal Control Panel</p>
            </div>
        </main>
    );
}
