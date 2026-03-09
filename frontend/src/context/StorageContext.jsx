import { createContext, useContext, useEffect, useState } from "react";
import { database } from "../firebase";
import { ref, onValue, set, push, remove, update } from "firebase/database";

// ... existing code ...

const updateProject = (id, data) => {
    console.log("Updating Project in Firebase:", id, data);

    // If we are just updating a single field like 'pinned', we don't want to process images
    // unless they are explicitly provided in the data.

    const updatedData = {
        ...data,
        updatedAt: new Date().toISOString(),
    };

    // Only process images if they are part of the update data
    if (data.images || data.image) {
        const imagesArray = Array.isArray(data.images)
            ? data.images.filter(Boolean)
            : (data.image ? [data.image] : []);

        if (imagesArray.length) {
            updatedData.images = imagesArray;
            updatedData.image = imagesArray[0];
        }
    }

    // Remove id if present
    if (updatedData.id) delete updatedData.id;

    // Use update() for partial updates, or set() if we want to replace. 
    // For safety with partial updates like pinning, update() is better.
    return update(ref(database, `projects/${id}`), updatedData);
};

const StorageContext = createContext();

// Initial Data for Seeding
const DUMMY_PROJECTS = [
    {
        id: 1,
        name: "E-Commerce Store",
        type: "Full Stack",
        year: "2024",
        status: "Active",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=2000",
        description: "Built a multi-vendor e-commerce platform with role-based access for admin, sellers, and customers. Designed backend APIs for product management, orders, and users, implemented authentication, and integrated frontend with REST APIs.",
        challenge: "Managing complex state for a multi-vendor system where admins, sellers, and customers see different interfaces and data sets.",
        solution: "Implemented Role-Based Access Control (RBAC) in Node.js middleware and created distinct dashboard layouts for each user type.",
        services: ["React.js", "Node.js", "MongoDB", "REST APIs"],
        client: "Personal Project",
        duration: "3 Months",
        link: "https://github.com/lokesh123d/Qusar.git"
    },
    {
        id: 2,
        name: "Student Assessment",
        type: "Education Tech",
        year: "2024",
        status: "Active",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=2000",
        description: "A Full-Stack web application for managing and taking online assessments, featuring secure Google login and role-based access for students and admins.",
        challenge: "Ensuring secure and cheat-proof assessment environments while maintaining a user-friendly interface for students.",
        solution: "Integrated secure Google Auth for identity verification and built a real-time submission system.",
        services: ["MERN Stack", "Google Auth", "Dashboard"],
        client: "NavGurukul",
        duration: "2 Months",
        link: "https://github.com/lokesh123d/Assisment.git"
    },
    {
        id: 3,
        name: "Portfolio Data Manager",
        type: "AI Integration",
        year: "2023",
        status: "Active",
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=2000",
        description: "An AI-powered full stack web application to manage and showcase student portfolios. Built with React, Node.js, Express, MongoDB, and integrated with AI for intelligent content generation.",
        challenge: "Integrating AI content generation seamlessly into a traditional CRUD application flow.",
        solution: "Connected OpenAI APIs to the backend to generate bio descriptions and project summaries automatically.",
        services: ["AI Integration", "React", "Node.js"],
        client: "NavGurukul",
        duration: "4 Months",
        link: "https://github.com/lokesh123d/NavgurukulPortfolioData"
    },
    {
        id: 4,
        name: "AI Content Generator",
        type: "AI / ML",
        year: "2023",
        status: "Legacy",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2000",
        description: "An intelligent content generation platform features text generation, summarization, and creative writing assistance using advanced language models.",
        challenge: "Optimizing API latency and handling large text inputs for summarization.",
        solution: "Implemented efficient prompt engineering and asynchronous processing for long-running generation tasks.",
        services: ["OpenAI API", "React", "Tailwind CSS"],
        client: "Personal Project",
        duration: "2 Months",
        link: "https://github.com/lokesh123d/AiContentGenerator6788.git"
    },
    {
        id: 5,
        name: "Snake Game",
        type: "Game Dev",
        year: "2022",
        status: "Legacy",
        image: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&q=80&w=2000",
        description: "Classic snake game implemented using HTML, CSS, and JavaScript. The player controls a snake that moves around the screen to eat food.",
        challenge: "Game loop logic and collision detection in vanilla JavaScript.",
        solution: "Used requestAnimationFrame for smooth rendering and grid-based coordinate math for collision logic.",
        services: ["HTML5", "CSS3", "JavaScript"],
        client: "Personal Project",
        duration: "1 Month",
        link: "https://github.com/lokesh123d/Snack-Game.git"
    },
    {
        id: 6,
        name: "Amazon Clone",
        type: "E-Commerce",
        year: "2023",
        status: "Active",
        image: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&q=80&w=2000",
        description: "Full-stack MERN application with authentication, admin dashboard, and payment integration. Implemented REST APIs and MongoDB data models.",
        challenge: "Replicating the complex UI/UX of a major e-commerce platform.",
        solution: "Focusing on component reusability in React and scalable database schema design in MongoDB.",
        services: ["MERN Stack", "JWT", "Payment Gateway"],
        client: "Personal Project",
        duration: "3 Months",
        link: "https://github.com/lokesh123d/Amazon-clone.git"
    }
];

export const StorageProvider = ({ children }) => {
    const [inquiries, setInquiries] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [projects, setProjects] = useState([]);
    const [visitors, setVisitors] = useState(0);
    const DEFAULT_CONFIG = {
        personal: {
            name: "Lokesh Dangwal",
            role: "Full Stack Developer",
            email: "lokeshdangwal3@gmail.com",
            phone: "+91 9834818472",
            resume: "#",
            location: "Uttarakhand, India",
            github: "https://github.com/lokesh123d",
            linkedin: "https://www.linkedin.com/in/lokesh-dangwal-444397344",
            profileImage: "https://lokesh-three-lyart.vercel.app/profile.jpeg"
        },
        appearance: {
            primaryColor: "#00f3ff",
            darkMode: true
        },
        seo: {
            title: "Lokesh | Creative Developer",
            description: "Minimalist portfolio of a full stack developer focusing on clean code and immersive experiences.",
            terminology: "MERN Stack Web Developer"
        },
        about: {
            greeting: "Let's Create Something Epic",
            bio: "I am a MERN Stack Web Developer with hands-on experience building full-stack web applications using React, Node.js, Express.js, and MongoDB. I focus on clean code, backend–frontend integration, and delivering working, production-ready solutions.",
            tagline: "Building the future, one line of code at a time."
        }
    };

    const [siteConfig, setSiteConfig] = useState(DEFAULT_CONFIG);

    // Helper to convert Firebase object to array with ID
    const snapToArray = (snapshot) => {
        const data = snapshot.val();
        if (!data) return [];
        return Object.keys(data).map(key => ({
            ...data[key],
            id: key // Keep the Firebase key as the ID
        })).reverse(); // Newest first
    };

    useEffect(() => {
        // --- VISITORS ---
        const visitorsRef = ref(database, 'visitors');
        onValue(visitorsRef, (snapshot) => {
            const val = snapshot.val();
            if (val === null) {
                // Initialize visitors if empty
                set(visitorsRef, 42800);
            } else {
                setVisitors(val);
            }
        });

        // --- INQUIRIES ---
        const inquiriesRef = ref(database, 'inquiries');
        onValue(inquiriesRef, (snapshot) => {
            const data = snapshot.val();
            if (!data) {
                // Initialize empty inquiries list
                setInquiries([]);
            } else {
                setInquiries(snapToArray(snapshot));
            }
        });

        // --- BOOKINGS ---
        const bookingsRef = ref(database, 'bookings');
        onValue(bookingsRef, (snapshot) => {
            setBookings(snapToArray(snapshot));
        });

        // --- PROJECTS ---
        const projectsRef = ref(database, 'projects');
        onValue(projectsRef, (snapshot) => {
            const data = snapshot.val();
            if (!data) {
                // Initialize empty projects list if DB is empty
                // DUMMY_PROJECTS seeding disabled as per user request for clean backend-only data
                setProjects([]);
            } else {
                setProjects(snapToArray(snapshot));
            }
        });

        // --- SITE CONFIG ---
        const configRef = ref(database, 'siteConfig');
        onValue(configRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // Merge with defaults to ensure missing sections are filled
                setSiteConfig({
                    ...DEFAULT_CONFIG,
                    ...data,
                    personal: { ...DEFAULT_CONFIG.personal, ...(data.personal || {}) },
                    appearance: { ...DEFAULT_CONFIG.appearance, ...(data.appearance || {}) },
                    seo: { ...DEFAULT_CONFIG.seo, ...(data.seo || {}) },
                    about: { ...DEFAULT_CONFIG.about, ...(data.about || {}) }
                });

                // Dynamically update CSS variables for theme if provided
                if (data.appearance?.primaryColor) {
                    document.documentElement.style.setProperty('--primary', data.appearance.primaryColor);
                }
            } else {
                // Initialize default config if not exists
                set(configRef, DEFAULT_CONFIG);
            }
        });

    }, []);

    const addInquiry = (data) => {
        const newItem = { ...data, date: new Date().toISOString() };
        push(ref(database, 'inquiries'), newItem);
    };

    const addBooking = (data) => {
        const newItem = { ...data, createdAt: new Date().toISOString() };
        push(ref(database, 'bookings'), newItem);
    };

    const addProject = (data) => {
        console.log("Saving Project to Firebase:", data);

        // Normalize images array and primary image
        const imagesArray = Array.isArray(data.images)
            ? data.images.filter(Boolean)
            : (data.image ? [data.image] : []);

        const newItem = {
            ...data,
            status: data.status || 'Active',
            createdAt: new Date().toISOString(),
        };

        if (imagesArray.length) {
            newItem.images = imagesArray;
            newItem.image = imagesArray[0];
        }

        // Remove id if it exists in data to avoid duplication in record
        if (newItem.id) delete newItem.id;

        // Return the newly created key so callers (Admin) can redirect to the case study
        return push(ref(database, 'projects'), newItem).then((newRef) => newRef.key);
    };

    const deleteProject = (id) => {
        console.log("Deleting Project from Firebase:", id);
        return remove(ref(database, `projects/${id}`));
    };

    const updateProject = (id, data) => {
        console.log("Updating Project in Firebase:", id, data);

        // If 'data' contains the full object, 'update' will act like 'set' for those keys.
        // If 'data' is partial (e.g. { pinned: true }), 'update' will only change that field.

        // We need to be careful. If 'data' is the full form data from Admin panel, it's fine.
        // If 'data' is partial from togglePinProject, we should NOT process images/defaults if they are missing.

        const updatedData = {
            ...data,
            updatedAt: new Date().toISOString(),
        };

        // Only process images if they are explicitly in the update object
        if (Object.prototype.hasOwnProperty.call(data, 'images') || Object.prototype.hasOwnProperty.call(data, 'image')) {
            const imagesArray = Array.isArray(data.images)
                ? data.images.filter(Boolean)
                : (data.image ? [data.image] : []);

            if (imagesArray.length) {
                updatedData.images = imagesArray;
                updatedData.image = imagesArray[0];
            }
        }

        // Remove id if present
        if (updatedData.id) delete updatedData.id;

        // Use update() to merge fields instead of replacing the whole path
        return update(ref(database, `projects/${id}`), updatedData);
    };

    const deleteInquiry = (id) => {
        return remove(ref(database, `inquiries/${id}`));
    };

    const updateSiteConfig = (newConfig) => {
        console.log("Updating Site Config:", newConfig);
        return set(ref(database, 'siteConfig'), newConfig);
    };

    return (
        <StorageContext.Provider value={{
            inquiries, bookings, projects, visitors, siteConfig,
            addInquiry, addBooking, addProject, deleteProject, updateProject, deleteInquiry, updateSiteConfig
        }}>
            {children}
        </StorageContext.Provider>
    );
};

export const useStorage = () => useContext(StorageContext);
