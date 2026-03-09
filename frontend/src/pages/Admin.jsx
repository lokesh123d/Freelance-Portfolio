import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStorage } from "../context/StorageContext";

// --- SUB-COMPONENTS (Defined outside to prevent re-mounting on typing) ---

const StatsGrid = ({ visitors, inquiries, projects }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-primary/10 rounded-lg text-primary"><span className="material-icons-round">visibility</span></div>
                <span className="text-primary text-xs font-bold flex items-center">+12.5% <span className="material-icons-round text-xs">trending_up</span></span>
            </div>
            <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Total Visitors</p>
            <h3 className="text-3xl font-bold mt-1">{(visitors / 1000).toFixed(1)}k</h3>
            <div className="h-12 mt-4 flex items-end gap-1">
                {[0.5, 0.75, 0.6, 0.9, 1].map((h, i) => (
                    <div key={i} className="w-full bg-primary/20 rounded-sm transition-all duration-500 group-hover:bg-primary/40" style={{ height: `${h * 100}%` }}></div>
                ))}
            </div>
        </div>
        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-accent-pink/10 rounded-lg text-accent-pink"><span className="material-icons-round">alternate_email</span></div>
                <span className="text-primary text-xs font-bold flex items-center">Active</span>
            </div>
            <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Inquiries</p>
            <h3 className="text-3xl font-bold mt-1">{inquiries.length}</h3>
            <div className="h-12 mt-4 flex items-end gap-1">
                {[0.3, 0.5, 0.8, 0.4, 0.6].map((h, i) => (
                    <div key={i} className="w-full bg-accent-pink/20 rounded-sm" style={{ height: `${h * 100}%` }}></div>
                ))}
            </div>
        </div>
        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-primary/10 rounded-lg text-primary"><span className="material-icons-round">grid_view</span></div>
                <span className="text-primary text-xs font-bold flex items-center">{projects.length} Total</span>
            </div>
            <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Live Projects</p>
            <h3 className="text-3xl font-bold mt-1">{projects.filter(p => p.status === 'Active').length}</h3>
            <div className="h-12 mt-4 flex items-end gap-1">
                {[0.9, 0.8, 0.7, 0.9, 1].map((h, i) => (
                    <div key={i} className="w-full bg-primary/20 rounded-sm" style={{ height: `${h * 100}%` }}></div>
                ))}
            </div>
        </div>
        <div className="glass-panel p-6 rounded-2xl border-primary/20 bg-primary/5">
            <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-primary/20 rounded-lg text-primary"><span className="material-icons-round animate-pulse">sensors</span></div>
                <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span>
            </div>
            <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Active Now</p>
            <h3 className="text-3xl font-bold mt-1 text-primary">184</h3>
            <p className="text-[10px] text-slate-400 mt-4 italic">Users on live project viewing...</p>
        </div>
    </div>
);

const AnalyticsDashboard = ({ visitors, inquiries, projects }) => (
    <div className="space-y-8 animate-fade-in">
        <StatsGrid visitors={visitors} inquiries={inquiries} projects={projects} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 glass-panel p-8 rounded-2xl">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h2 className="text-xl font-bold">Visitor Growth</h2>
                        <p className="text-sm text-slate-500">Unique visitors vs Page views</p>
                    </div>
                </div>
                <div className="relative h-[300px] w-full mt-4 flex items-end">
                    <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
                        <path d="M0 250 Q 50 200, 100 220 T 200 150 T 300 180 T 400 120 T 500 160 T 600 100 T 700 140 T 800 80 T 900 120 T 1000 50" fill="none" stroke="#00f3ff" strokeWidth="4" />
                        <path d="M0 260 Q 50 240, 100 250 T 200 200 T 300 220 T 400 180 T 500 210 T 600 150 T 700 190 T 800 130 T 900 170 T 1000 100" fill="none" stroke="#e8268e" strokeDasharray="6 2" strokeWidth="3" />
                    </svg>
                </div>
                <div className="flex justify-between mt-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'].map(m => <span key={m}>{m}</span>)}
                </div>
            </div>
            <div className="glass-panel p-8 rounded-2xl">
                <h2 className="text-xl font-bold mb-1">Traffic Sources</h2>
                <p className="text-sm text-slate-500 mb-8">Where your audience originates</p>
                <div className="space-y-6">
                    {[
                        { name: "Organic Search", val: 45, color: "bg-primary" },
                        { name: "Direct Traffic", val: 30, color: "bg-accent-pink" },
                        { name: "Social Media", val: 18, color: "bg-slate-400" },
                        { name: "Referrals", val: 7, color: "bg-slate-700" }
                    ].map(s => (
                        <div key={s.name} className="space-y-2">
                            <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                                <span>{s.name}</span>
                                <span>{s.val}%</span>
                            </div>
                            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                <div className={`h-full ${s.color} rounded-full`} style={{ width: `${s.val}%` }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glass-panel rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-white/5 flex justify-between items-center">
                    <h2 className="text-xl font-bold">Popular Projects</h2>
                </div>
                <div className="divide-y divide-white/5">
                    {projects.slice(0, 3).map((p, i) => (
                        <div key={p.id} className="p-6 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                            <div className="flex items-center gap-4">
                                <span className="text-lg font-black text-primary/30 italic w-6">0{i + 1}</span>
                                <img className="w-12 h-12 rounded object-cover" src={p.image} alt={p.name} />
                                <div><p className="font-bold uppercase tracking-tighter">{p.name}</p><p className="text-[10px] text-slate-500">{p.type} • {p.year}</p></div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-lg">{Math.floor(Math.random() * 20000)} <span className="text-[10px] text-slate-500">clicks</span></p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="glass-panel p-8 rounded-2xl flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary"><span className="material-icons-round text-4xl">public</span></div>
                <h2 className="text-xl font-bold">Regional Distribution</h2>
                <p className="text-sm text-slate-500 max-w-xs">Global reach of your work. Most visitors are coming from India, US, and UK.</p>
                <div className="w-full pt-8 grid grid-cols-2 gap-4">
                    <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 text-left"><p className="text-[10px] text-slate-500 font-bold uppercase">Top Country</p><p className="text-lg font-bold">India</p></div>
                    <div className="p-4 bg-accent-pink/5 rounded-xl border border-accent-pink/10 text-left"><p className="text-[10px] text-slate-500 font-bold uppercase">Top City</p><p className="text-lg font-bold">Bengaluru</p></div>
                </div>
            </div>
        </div>
    </div>
);

const InquiriesInbox = ({ inquiries }) => {
    const { deleteInquiry } = useStorage();
    const [selectedInquiry, setSelectedInquiry] = useState(inquiries[0] || null);
    const [replyText, setReplyText] = useState("");

    const handleSendReply = () => {
        if (!replyText.trim() || !selectedInquiry) {
            alert("Please write a reply message!");
            return;
        }
        const subject = `Re: ${selectedInquiry.subject || "Your Inquiry"}`;
        const body = encodeURIComponent(`Hi ${selectedInquiry.name},\n\n${replyText}\n\nBest regards,\nYour Team`);
        window.location.href = `mailto:${selectedInquiry.email}?subject=${encodeURIComponent(subject)}&body=${body}`;
        setReplyText("");
    };

    const handleDelete = () => {
        if (window.confirm(`Delete inquiry from ${selectedInquiry.name}?`)) {
            deleteInquiry(selectedInquiry.id);
            setSelectedInquiry(null);
        }
    };

    return (
        <div className="flex h-full overflow-hidden animate-fade-in -m-8">
            <section className="w-96 border-r border-white/5 flex flex-col bg-panel-dark/20 overflow-y-auto">
                <div className="p-6 border-b border-white/5 flex justify-between items-center"><h2 className="text-lg font-bold uppercase tracking-tighter">Inbox <span className="text-primary text-sm font-normal ml-2">{inquiries.length} msg</span></h2></div>
                <div className="divide-y divide-white/5">
                    {inquiries.map((inq) => (
                        <div
                            key={inq.id}
                            onClick={() => setSelectedInquiry(inq)}
                            className={`p-6 cursor-pointer transition-all ${selectedInquiry?.id === inq.id ? 'bg-primary/5 border-l-2 border-primary' : 'hover:bg-white/5'}`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <span className="text-sm font-bold">{inq.name}</span>
                                <span className="text-[10px] text-slate-500">{new Date(inq.date).toLocaleDateString()}</span>
                            </div>
                            <h3 className="text-sm font-medium text-slate-300 truncate">{inq.subject || "No Subject"}</h3>
                            <p className="text-xs text-slate-500 line-clamp-2 mt-1">{inq.message}</p>
                        </div>
                    ))}
                </div>
            </section>
            <section className="flex-1 flex flex-col bg-background-dark/40 backdrop-blur-md">
                {selectedInquiry ? (
                    <>
                        <div className="h-16 border-b border-white/5 flex items-center px-8 justify-between">
                            <div className="flex items-center space-x-4">
                                <button onClick={handleSendReply} className="p-2 hover:bg-primary/10 rounded-full text-slate-400 hover:text-primary transition-colors" title="Send Reply"><span className="material-icons-round">reply</span></button>
                                <button onClick={handleDelete} className="p-2 hover:bg-red-500/10 rounded-full text-slate-400 hover:text-red-500 transition-colors" title="Delete"><span className="material-icons-round">delete_outline</span></button>
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto p-12 max-w-4xl w-full mx-auto">
                            <div className="mb-12">
                                <h1 className="text-4xl font-bold tracking-tight mb-6">{selectedInquiry.subject || "Project Inquiry"}</h1>
                                <div className="flex justify-between items-center pb-6 border-y border-white/5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg">{selectedInquiry.name[0]}</div>
                                        <div><p className="font-bold text-lg">{selectedInquiry.name}</p><p className="text-sm text-slate-500">{selectedInquiry.email}</p></div>
                                    </div>
                                    <div className="text-right"><p className="text-[10px] text-slate-500 uppercase tracking-widest">Received</p><p className="font-medium">{new Date(selectedInquiry.date).toLocaleString()}</p></div>
                                </div>
                            </div>
                            <div className="text-lg text-slate-300 leading-relaxed space-y-6">
                                <p>{selectedInquiry.message}</p>
                            </div>
                        </div>
                        <div className="p-8 border-t border-white/5 bg-white/5">
                            <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} className="w-full bg-background-dark/50 border border-white/10 rounded-xl p-4 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none h-24 mb-4" placeholder="Write a reply..."></textarea>
                            <div className="flex justify-between items-center"><p className="text-xs text-slate-500">Opens in email client</p><button onClick={handleSendReply} disabled={!replyText.trim()} className="bg-primary text-black px-8 py-3 rounded-xl font-bold tracking-widest uppercase text-xs hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed">Send Reply</button></div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-slate-600 uppercase tracking-widest font-bold">Select a message to read</div>
                )}
            </section>
        </div>
    );
};

const ProjectEditor = ({ projectForm, editingProject, handleChange, handleSave, setEditingProject, deleteProject }) => (
    <div className="animate-fade-in">
        <header className="h-16 flex items-center mb-8 justify-between">
            <div className="flex items-center gap-4">
                <button onClick={() => setEditingProject(null)} className="text-slate-400 hover:text-white text-sm transition-colors flex items-center gap-1"><span className="material-icons-round text-sm">arrow_back</span> Back to Projects</button>
                <span className="text-slate-600">/</span>
                <span className="text-slate-300 font-medium">{editingProject?.id ? 'Edit Project' : 'New Project'}</span>
            </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-8">
                <div className="space-y-4">
                    <label className="block text-[10px] uppercase tracking-wider text-slate-500 mb-1 font-bold">Project Title</label>
                    <input name="name" value={projectForm.name} onChange={handleChange} className="w-full bg-transparent border-none text-4xl font-bold text-white placeholder-slate-800 focus:ring-0 p-0" placeholder="Enter Project Title..." />
                    <div className="grid grid-cols-2 gap-4">
                        <div><label className="block text-[10px] uppercase tracking-wider text-slate-500 mb-1 font-bold">Category</label><input name="type" value={projectForm.type} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition-all font-bold" /></div>
                        <div><label className="block text-[10px] uppercase tracking-wider text-slate-500 mb-1 font-bold">Year</label><input name="year" value={projectForm.year} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition-all font-bold" /></div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-widest">Cover Image URL</h3>
                    <input
                        name="image"
                        value={projectForm.image}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition-all"
                        placeholder="https://..."
                    />
                    {projectForm.image && (
                        <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/10">
                            <img src={projectForm.image} className="w-full h-full object-cover" alt="Preview" />
                        </div>
                    )}
                </div>

                <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-widest">Gallery Images</h3>
                    <p className="text-[11px] text-slate-500">
                        Add multiple image URLs (one per line). The first image is used as the main cover; others appear in the case study gallery.
                    </p>
                    <textarea
                        name="imagesRaw"
                        value={projectForm.imagesRaw}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-slate-300 min-h-[120px] outline-none focus:border-primary/50 font-mono"
                        placeholder={"https://image-1...\nhttps://image-2...\nhttps://image-3..."}
                    />
                </div>

                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-widest">Context & Complexity</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">The Challenge</label>
                            <textarea name="challenge" value={projectForm.challenge} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-slate-300 min-h-[100px] outline-none focus:border-primary/50" placeholder="What was the main problem?"></textarea>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">The Solution</label>
                            <textarea name="solution" value={projectForm.solution} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-slate-300 min-h-[100px] outline-none focus:border-primary/50" placeholder="How was it solved?"></textarea>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-widest">Project Description</h3>
                    <textarea name="description" value={projectForm.description} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 min-h-[300px] text-slate-300 leading-relaxed outline-none focus:border-primary/50" placeholder="The details about the project..."></textarea>
                </div>
            </div>

            <aside className="lg:col-span-4 space-y-8">
                <div className="glass-panel rounded-2xl p-8 border border-white/5 space-y-6">
                    <div className="space-y-4">
                        <div><label className="block text-[10px] uppercase tracking-wider text-slate-500 mb-1 font-bold">Client Name</label><input name="client" value={projectForm.client} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition-all font-bold text-sm" placeholder="e.g. NavGurukul" /></div>
                        <div><label className="block text-[10px] uppercase tracking-wider text-slate-500 mb-1 font-bold">Project Duration</label><input name="duration" value={projectForm.duration} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition-all font-bold text-sm" placeholder="e.g. 3 Months" /></div>
                        <div><label className="block text-[10px] uppercase tracking-wider text-slate-500 mb-1 font-bold">GitHub / Live Link</label><input name="link" value={projectForm.link} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition-all font-bold text-sm" placeholder="https://..." /></div>
                    </div>
                    <div className="editorial-line"></div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-bold uppercase tracking-widest">Status</span>
                        <select name="status" value={projectForm.status} onChange={handleChange} className="bg-white/5 border border-white/10 rounded-lg px-4 py-1.5 text-xs text-primary font-bold uppercase outline-none">
                            <option value="Active">Active</option>
                            <option value="Draft">Draft</option>
                            <option value="Legacy">Legacy</option>
                        </select>
                    </div>
                    <div className="pt-4 flex flex-col gap-3">
                        <button onClick={handleSave} className="w-full bg-primary text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform active:scale-95 shadow-lg shadow-primary/20 uppercase tracking-widest text-xs"><span className="material-icons-round text-lg">save</span> Save Project</button>
                        <button onClick={() => setEditingProject(null)} className="w-full border border-white/10 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white/5 transition-all uppercase tracking-widest text-xs">Cancel</button>
                    </div>
                    <div className="pt-6 border-t border-white/5">
                        {editingProject?.id && <button onClick={() => { if (window.confirm('Delete permanently?')) { deleteProject(editingProject.id); setEditingProject(null); } }} className="w-full text-left flex items-center gap-2 text-red-500/60 hover:text-red-500 transition-colors py-2 text-xs font-bold uppercase tracking-widest"><span className="material-icons-round text-sm">delete</span> Delete Project</button>}
                    </div>
                </div>
                <div className="glass-panel rounded-2xl p-8 border border-white/5">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">SEO Preview</h3>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-1">
                        <p className="text-primary text-sm font-bold truncate">{projectForm.name || 'Project Title'}</p>
                        <p className="text-accent-pink text-[10px] truncate mb-2">lokeshcv.in/case-study/{editingProject?.id || '...'}</p>
                        <p className="text-slate-400 text-[10px] line-clamp-2 italic">{projectForm.description || 'No description provided yet.'}</p>
                    </div>
                </div>
            </aside>
        </div>
    </div>
);

const ProjectsList = ({ projects, searchTerm, setSearchTerm, setProjectForm, setEditingProject, handleProjectClick, togglePinProject }) => {
    const filteredProjects = projects.filter(p => p?.name?.toLowerCase().includes(searchTerm.toLowerCase()));
    // Use loose check to catch projects that might have string "true" or other truthy values
    const pinnedProjects = filteredProjects.filter(p => p?.pinned);
    const unpinnedProjects = filteredProjects.filter(p => !p?.pinned);

    return (
        <div className="animate-fade-in space-y-12">
            <div className="flex justify-between items-center">
                <div><h2 className="text-3xl font-bold uppercase tracking-tighter">Project <span className="text-primary">Registry</span></h2><p className="text-slate-500 text-[10px] uppercase tracking-[0.3em] mt-1">Manage Your Case Studies</p></div>
                <div className="flex gap-4">
                    <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search..." className="bg-white/5 border border-white/10 rounded-full px-6 py-2 text-sm focus:outline-none focus:border-primary w-64" />
                    {projects.length > 0 && (
                        <button
                            onClick={() => {
                                if (window.confirm('Delete ALL projects? This action cannot be undone!')) {
                                    projects.forEach(p => deleteProject(p.id));
                                    setSearchTerm('');
                                }
                            }}
                            className="text-[10px] text-red-500 hover:text-red-600 uppercase tracking-widest font-bold flex items-center gap-1 transition-colors px-4 py-2 rounded-full hover:bg-red-500/10 border border-red-500/20"
                        >
                            <span className="material-icons-round text-sm">delete_sweep</span> Clear All
                        </button>
                    )}
                    <button
                        onClick={() => {
                            setProjectForm({
                                name: "",
                                type: "",
                                image: "",
                                images: [],
                                imagesRaw: "",
                                year: "2024",
                                status: "Active",
                                description: "",
                                client: "",
                                challenge: "",
                                solution: "",
                                duration: "",
                                link: "",
                                pinned: false
                            });
                            setEditingProject({}); // empty object indicates new mode
                        }}
                        className="bg-primary text-black px-8 py-2 rounded-full font-bold uppercase text-[10px] tracking-widest shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
                    >
                        Create New
                    </button>
                </div>
            </div>

            {/* PINNED PROJECTS SECTION */}
            {/* PINNED PROJECTS SECTION */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="material-icons-round text-primary text-xl">push_pin</span>
                        <h3 className="text-xl font-bold uppercase tracking-widest">Pinned Projects</h3>
                        <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest">{pinnedProjects.length}/4</span>
                    </div>
                    {pinnedProjects.length > 0 && (
                        <button
                            onClick={() => {
                                if (window.confirm("Remove all pinned projects from homepage?")) {
                                    pinnedProjects.forEach(p => togglePinProject(p.id, false));
                                }
                            }}
                            className="text-[10px] text-slate-400 hover:text-red-500 uppercase tracking-widest font-bold flex items-center gap-1 transition-colors px-3 py-1 rounded-full hover:bg-red-500/10"
                        >
                            <span className="material-icons-round text-sm">remove_circle_outline</span> Unpin All
                        </button>
                    )}
                </div>

                {pinnedProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {pinnedProjects.map(p => (
                            <div key={p.id} className="glass-panel p-4 rounded-2xl group hover:border-primary/50 transition-all relative border-primary/30 bg-primary/5">
                                <div className="aspect-video rounded-xl overflow-hidden border border-primary/20 mb-4 relative cursor-pointer" onClick={() => handleProjectClick(p)}>
                                    <img src={p.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={p.name} />
                                    <div className="absolute top-3 right-3 bg-panel-dark/80 backdrop-blur px-2 py-1 rounded text-[9px] font-bold uppercase tracking-widest text-primary border border-white/5">{p.status}</div>
                                    <div className="absolute top-3 left-3 bg-primary/30 backdrop-blur-sm px-2 py-1 rounded text-[9px] font-bold uppercase tracking-widest text-primary border border-primary/40 flex items-center gap-1">
                                        <span className="material-icons-round text-xs">push_pin</span>
                                        Pinned
                                    </div>
                                </div>
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1 cursor-pointer" onClick={() => handleProjectClick(p)}>
                                        <h4 className="font-bold uppercase tracking-widest text-sm mb-1 group-hover:text-primary transition-colors">{p.name}</h4>
                                        <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em]">{p.type} / {p.year}</p>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            togglePinProject(p.id, false);
                                        }}
                                        className="p-2 rounded-lg transition-all bg-primary/20 text-primary hover:bg-primary/30"
                                        title="Unpin from homepage"
                                    >
                                        <span className="material-icons-round text-lg">push_pin</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="border border-dashed border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-white/[0.02]">
                        <span className="material-icons-round text-4xl text-slate-600 mb-2">push_pin</span>
                        <p className="text-slate-500 text-sm font-medium">No projects pinned yet</p>
                        <p className="text-slate-600 text-[10px] mt-1 uppercase tracking-wider">Pin projects from the list below to feature them on homepage</p>
                    </div>
                )}
            </div>

            {/* OTHER PROJECTS SECTION */}
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <span className="material-icons-round text-slate-400 text-xl">folder</span>
                    <h3 className="text-xl font-bold uppercase tracking-widest">Other Projects</h3>
                    <span className="bg-white/5 text-slate-400 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest">{unpinnedProjects.length}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {unpinnedProjects.map(p => (
                        <div key={p.id} className="glass-panel p-4 rounded-2xl group hover:border-primary/30 transition-all relative">
                            <div className="aspect-video rounded-xl overflow-hidden border border-white/5 mb-4 relative cursor-pointer" onClick={() => handleProjectClick(p)}>
                                <img src={p.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={p.name} />
                                <div className="absolute top-3 right-3 bg-panel-dark/80 backdrop-blur px-2 py-1 rounded text-[9px] font-bold uppercase tracking-widest text-primary border border-white/5">{p.status}</div>
                            </div>
                            <div className="flex items-start justify-between gap-2">
                                <div className="flex-1 cursor-pointer" onClick={() => handleProjectClick(p)}>
                                    <h4 className="font-bold uppercase tracking-widest text-sm mb-1 group-hover:text-primary transition-colors">{p.name}</h4>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em]">{p.type} / {p.year}</p>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        togglePinProject(p.id, true);
                                    }}
                                    className="p-2 rounded-lg transition-all bg-white/5 text-slate-400 hover:bg-white/10 hover:text-primary"
                                    title={pinnedProjects.length >= 4 ? 'Max 4 projects can be pinned' : 'Pin to homepage'}
                                >
                                    <span className="material-icons-round text-lg">push_pin</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


const SettingsEditor = ({ siteConfig, updateSiteConfig, setShowToast }) => {
    const [tempConfig, setTempConfig] = useState(siteConfig);

    const handleFieldChange = (section, field, value) => {
        setTempConfig({
            ...tempConfig,
            [section]: {
                ...tempConfig[section],
                [field]: value
            }
        });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            await updateSiteConfig(tempConfig);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        } catch (error) {
            console.error(error);
            alert("Failed to update settings");
        }
    };

    return (
        <div className="animate-fade-in space-y-12 max-w-5xl">
            <header>
                <h2 className="text-3xl font-bold uppercase tracking-tighter">Site <span className="text-primary">Configuration</span></h2>
                <p className="text-slate-500 text-[10px] uppercase tracking-[0.3em] mt-1">Manage Global Content & Styles</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Personal Information */}
                <div className="glass-panel p-8 rounded-3xl space-y-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                        <span className="material-icons-round text-lg">person</span> Personal Information
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] uppercase tracking-wider text-slate-500 mb-1 font-bold">Display Name</label>
                            <input value={tempConfig.personal.name} onChange={(e) => handleFieldChange('personal', 'name', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 text-sm font-bold" />
                        </div>
                        <div>
                            <label className="block text-[10px] uppercase tracking-wider text-slate-500 mb-1 font-bold">Professional Role</label>
                            <input value={tempConfig.personal.role} onChange={(e) => handleFieldChange('personal', 'role', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 text-sm font-bold" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] uppercase tracking-wider text-slate-500 mb-1 font-bold">Email</label>
                                <input value={tempConfig.personal.email} onChange={(e) => handleFieldChange('personal', 'email', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 text-xs" />
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase tracking-wider text-slate-500 mb-1 font-bold">Phone</label>
                                <input value={tempConfig.personal.phone} onChange={(e) => handleFieldChange('personal', 'phone', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 text-xs" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] uppercase tracking-wider text-slate-500 mb-1 font-bold">Resume URL</label>
                            <input value={tempConfig.personal.resume} onChange={(e) => handleFieldChange('personal', 'resume', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 text-xs" placeholder="https://..." />
                        </div>
                    </div>
                </div>

                {/* Search Engine Optimization */}
                <div className="glass-panel p-8 rounded-3xl space-y-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-accent-pink flex items-center gap-2">
                        <span className="material-icons-round text-lg">travel_explore</span> Search & SEO
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] uppercase tracking-wider text-slate-500 mb-1 font-bold">Site Meta Title</label>
                            <input value={tempConfig.seo.title} onChange={(e) => handleFieldChange('seo', 'title', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 text-sm font-bold" />
                        </div>
                        <div>
                            <label className="block text-[10px] uppercase tracking-wider text-slate-500 mb-1 font-bold">Site Description</label>
                            <textarea value={tempConfig.seo.description} onChange={(e) => handleFieldChange('seo', 'description', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 text-xs min-h-[100px]" />
                        </div>
                        <div>
                            <label className="block text-[10px] uppercase tracking-wider text-slate-500 mb-1 font-bold">Role Terminology</label>
                            <input value={tempConfig.seo.terminology} onChange={(e) => handleFieldChange('seo', 'terminology', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 text-xs" />
                        </div>
                    </div>
                </div>

                {/* About Content */}
                <div className="glass-panel p-8 rounded-3xl space-y-6 md:col-span-1">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                        <span className="material-icons-round text-lg">info</span> About & Story Content
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] uppercase tracking-wider text-slate-500 mb-1 font-bold">Hero Greeting</label>
                            <input value={tempConfig.about.greeting} onChange={(e) => handleFieldChange('about', 'greeting', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 text-sm font-bold" />
                        </div>
                        <div>
                            <label className="block text-[10px] uppercase tracking-wider text-slate-500 mb-1 font-bold">About Tagline</label>
                            <input value={tempConfig.about.tagline} onChange={(e) => handleFieldChange('about', 'tagline', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 text-sm" />
                        </div>
                        <div>
                            <label className="block text-[10px] uppercase tracking-wider text-slate-500 mb-1 font-bold">Biography</label>
                            <textarea value={tempConfig.about.bio} onChange={(e) => handleFieldChange('about', 'bio', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 text-xs min-h-[120px]" />
                        </div>
                        <div>
                            <label className="block text-[10px] uppercase tracking-wider text-slate-500 mb-1 font-bold">Profile Image URL</label>
                            <input value={tempConfig.personal.profileImage} onChange={(e) => handleFieldChange('personal', 'profileImage', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 text-xs" />
                        </div>
                    </div>
                </div>

                {/* Appearance & Branding */}
                <div className="glass-panel p-8 rounded-3xl space-y-6 md:col-span-2">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-white flex items-center gap-2">
                        <span className="material-icons-round text-lg">palette</span> Visual Identity
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                        <div>
                            <label className="block text-[10px] uppercase tracking-wider text-slate-500 mb-4 font-bold">Primary Theme Color</label>
                            <div className="flex items-center gap-4">
                                <input type="color" value={tempConfig.appearance.primaryColor} onChange={(e) => handleFieldChange('appearance', 'primaryColor', e.target.value)} className="w-16 h-16 rounded-xl bg-transparent border-none cursor-pointer" />
                                <div>
                                    <p className="text-sm font-bold uppercase tracking-widest">{tempConfig.appearance.primaryColor}</p>
                                    <p className="text-[10px] text-slate-500">Choose your brand color</p>
                                </div>
                            </div>
                        </div>
                        <div className="md:col-span-2 p-6 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-6">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: tempConfig.appearance.primaryColor }}>
                                <span className="material-icons-round text-black">auto_awesome</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-sm uppercase tracking-widest">Theme Preview</h4>
                                <p className="text-xs text-slate-400">Buttons, icons, and accents will use this color globally.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-8">
                <button onClick={handleSave} className="bg-primary text-black px-12 py-4 rounded-full font-bold uppercase text-xs tracking-widest shadow-lg shadow-primary/20 hover:scale-105 transition-transform flex items-center gap-2">
                    <span className="material-icons-round text-lg">check_circle</span> Update Site Content
                </button>
            </div>
        </div>
    );
};


// --- MAIN ADMIN COMPONENT ---

export default function Admin() {
    const navigate = useNavigate();
    const { inquiries, bookings, projects, visitors, siteConfig, addProject, deleteProject, updateProject, updateSiteConfig } = useStorage();
    const [activeTab, setActiveTab] = useState("dashboard");
    const [editingProject, setEditingProject] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [showToast, setShowToast] = useState(false);

    const [projectForm, setProjectForm] = useState({
        name: "",
        type: "",
        image: "",
        images: [],
        imagesRaw: "",
        year: "2024",
        status: "Active",
        description: "",
        client: "",
        challenge: "",
        solution: "",
        duration: "",
        link: ""
    });

    const handleLogout = () => {
        localStorage.removeItem("isAdmin");
        navigate("/login");
    };

    const handleProjectClick = (project) => {
        setEditingProject(project);
        const imagesArray = Array.isArray(project.images)
            ? project.images
            : (project.image ? [project.image] : []);

        setProjectForm({
            ...project,
            // ensure no nulls
            challenge: project.challenge || "",
            solution: project.solution || "",
            duration: project.duration || "",
            link: project.link || "",
            images: imagesArray,
            imagesRaw: imagesArray.join("\n")
        });
    };

    const handleSave = async (e) => {
        e.preventDefault();

        try {
            if (editingProject?.id) {
                await updateProject(editingProject.id, projectForm);
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000);
                setEditingProject(null);
            } else {
                const newId = await addProject(projectForm);
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000);
                setEditingProject(null);

                if (newId) {
                    navigate(`/case-study/${newId}`);
                }
            }
        } catch (error) {
            console.error("Failed to save project:", error);
            alert("Failed to save to database. Check console for details.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "imagesRaw") {
            const lines = value
                .split("\n")
                .map((line) => line.trim())
                .filter(Boolean);

            setProjectForm({
                ...projectForm,
                imagesRaw: value,
                images: lines,
                image: lines[0] || projectForm.image
            });
            return;
        }

        setProjectForm({ ...projectForm, [name]: value });
    };

    const togglePinProject = async (projectId, shouldPin) => {
        try {
            // Check if we're trying to pin and already have 4 pinned
            const currentlyPinned = projects.filter(p => p.pinned).length;

            if (shouldPin && currentlyPinned >= 4) {
                alert('Maximum 4 projects can be pinned! Please unpin another project first.');
                return;
            }

            await updateProject(projectId, { pinned: shouldPin });
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2000);
        } catch (error) {
            console.error('Failed to toggle pin:', error);
            alert('Failed to update pin status');
        }
    };

    return (
        <div className="flex bg-background-dark min-h-screen text-gray-100 relative font-display overflow-hidden h-screen">
            <div className="fixed inset-0 z-0 grain-overlay opacity-30"></div>

            <aside className="w-20 border-r border-white/5 flex flex-col items-center py-8 gap-12 z-20 bg-panel-dark/40 backdrop-blur-3xl shrink-0 h-screen overflow-y-auto no-scrollbar">
                <Link to="/" className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center hover:scale-105 transition-transform"><span className="material-icons-round text-primary text-3xl">auto_awesome</span></Link>
                <nav className="flex flex-col gap-8">
                    <button onClick={() => { setActiveTab("dashboard"); setEditingProject(null); }} className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${activeTab === 'dashboard' ? 'bg-primary/10 border border-primary/20 text-primary' : 'text-slate-500 hover:text-white hover:bg-white/5'}`} title="Analytics Dashboard"><span className="material-icons-round">dashboard</span></button>
                    <button onClick={() => { setActiveTab("projects"); setEditingProject(null); }} className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${activeTab === 'projects' ? 'bg-primary/10 border border-primary/20 text-primary' : 'text-slate-500 hover:text-white hover:bg-white/5'}`} title="Manage Projects"><span className="material-icons-round">layers</span></button>
                    <button onClick={() => { setActiveTab("inquiries"); setEditingProject(null); }} className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all relative ${activeTab === 'inquiries' ? 'bg-primary/10 border border-primary/20 text-primary' : 'text-slate-500 hover:text-white hover:bg-white/5'}`} title="Inquiries Inbox"><span className="material-icons-round">email</span>{inquiries.length > 0 && <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary animate-pulse"></span>}</button>
                    <button onClick={() => { setActiveTab("bookings"); setEditingProject(null); }} className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${activeTab === 'bookings' ? 'bg-primary/10 border border-primary/20 text-primary' : 'text-slate-500 hover:text-white hover:bg-white/5'}`} title="Booking Requests"><span className="material-icons-round">calendar_today</span></button>
                    <button onClick={() => { setActiveTab("settings"); setEditingProject(null); }} className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${activeTab === 'settings' ? 'bg-primary/10 border border-primary/20 text-primary' : 'text-slate-500 hover:text-white hover:bg-white/5'}`} title="Site Settings"><span className="material-icons-round">settings_suggest</span></button>
                </nav>
                <div className="mt-auto pt-8 flex flex-col items-center gap-4">
                    <button onClick={handleLogout} className="text-slate-500 hover:text-red-500 transition-colors" title="Logout"><span className="material-icons-round">logout</span></button>
                    <div className="w-10 h-10 rounded-full border border-primary/20 p-0.5 bg-background-dark/80"><div className="w-full h-full rounded-full bg-neutral-muted overflow-hidden"><img src="https://lokesh-three-lyart.vercel.app/profile.jpeg" className="w-full h-full object-cover" /></div></div>
                </div>
            </aside>

            <main className="flex-1 flex flex-col overflow-hidden relative z-10">
                <header className="h-16 flex items-center px-10 glass-panel border-b border-white/5 justify-between shrink-0">
                    <div className="flex items-center gap-4">
                        <span className="text-xs uppercase tracking-[0.3em] font-bold text-slate-500">Kreativ Control</span>
                        <span className="text-slate-700">/</span>
                        <span className="text-slate-200 font-bold uppercase text-[10px] tracking-widest">{activeTab}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic">{new Date().toLocaleTimeString()}</span>
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(0,243,255,0.8)]"></div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto no-scrollbar p-10 bg-background-dark/20 backdrop-blur-sm">
                    {activeTab === "dashboard" && <AnalyticsDashboard visitors={visitors} inquiries={inquiries} projects={projects} />}
                    {activeTab === "projects" && (editingProject ?
                        <ProjectEditor
                            projectForm={projectForm}
                            editingProject={editingProject}
                            handleChange={handleChange}
                            handleSave={handleSave}
                            setEditingProject={setEditingProject}
                            deleteProject={deleteProject}
                        /> :
                        <ProjectsList
                            projects={projects}
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            setProjectForm={setProjectForm}
                            setEditingProject={setEditingProject}
                            handleProjectClick={handleProjectClick}
                            togglePinProject={togglePinProject}
                        />
                    )}
                    {activeTab === "inquiries" && <InquiriesInbox inquiries={inquiries} />}
                    {activeTab === "settings" && <SettingsEditor siteConfig={siteConfig} updateSiteConfig={updateSiteConfig} setShowToast={setShowToast} />}
                    {activeTab === "bookings" && (
                        <div className="animate-fade-in space-y-8">
                            <h2 className="text-3xl font-bold uppercase tracking-tighter">Booking Requests</h2>
                            <div className="glass-panel rounded-3xl overflow-hidden border border-white/5">
                                <table className="w-full text-left">
                                    <thead className="bg-white/5 border-b border-white/5 text-[10px] uppercase tracking-[0.2em] text-slate-500">
                                        <tr><th className="p-6">Status</th><th className="p-6">Date</th><th className="p-6">Time</th><th className="p-6">Type</th><th className="p-6 text-right">Action</th></tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        {bookings.map(b => (
                                            <tr key={b.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                                <td className="p-6"><span className="w-2 h-2 rounded-full bg-primary inline-block mr-2"></span>Active</td>
                                                <td className="p-6 font-mono text-slate-300">{b.date}</td>
                                                <td className="p-6 text-slate-300">{b.time}</td>
                                                <td className="p-6 font-bold uppercase text-xs tracking-widest">{b.type}</td>
                                                <td className="p-6 text-right"><button className="text-[10px] border border-white/10 px-4 py-2 rounded-full hover:bg-white hover:text-black transition-all font-bold tracking-widest uppercase">View</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {showToast && (
                <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] animate-fade-in">
                    <div className="glass-panel border-primary/40 bg-background-dark/80 px-8 py-4 rounded-2xl flex items-center gap-4 shadow-2xl shadow-primary/20 backdrop-blur-xl">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-black font-bold"><span className="material-icons-round text-sm">check</span></div>
                        <p className="text-sm font-bold tracking-widest uppercase">Saved Successfully</p>
                    </div>
                </div>
            )}
        </div>
    );
}
