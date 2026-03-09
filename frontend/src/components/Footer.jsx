import { useStorage } from "../context/StorageContext";

export default function Footer() {
    const { siteConfig } = useStorage();
    const personal = siteConfig?.personal || {};

    return (
        <footer className="py-12 px-6 max-w-7xl mx-auto border-t border-neutral-muted/30">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <p className="text-neutral-500 text-sm font-medium uppercase tracking-widest">
                    © {new Date().getFullYear()} {personal.name}
                </p>
                <div className="flex gap-12 text-sm font-medium uppercase tracking-widest">
                    <a className="hover:text-primary transition-colors" href={personal.github} target="_blank" rel="noopener noreferrer">
                        GitHub
                    </a>
                    <a className="hover:text-primary transition-colors" href={personal.linkedin} target="_blank" rel="noopener noreferrer">
                        LinkedIn
                    </a>
                    <a className="hover:text-primary transition-colors" href={`mailto:${personal.email}`}>
                        Email
                    </a>
                </div>
                <p className="text-neutral-500 text-sm font-medium uppercase tracking-widest">
                    {personal.location} / Remote
                </p>
            </div>
        </footer>
    );
}
