import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, remove } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAWGAJ4j4b98NFSvuYpfo6q7rWtR3ck_ss",
    authDomain: "dangwallokesh4.firebaseapp.com",
    databaseURL: "https://dangwallokesh4-default-rtdb.firebaseio.com",
    projectId: "dangwallokesh4",
    storageBucket: "dangwallokesh4.firebasestorage.app",
    messagingSenderId: "983481847205",
    appId: "1:983481847205:web:b9cd10c53cbd15d8296c4c",
    measurementId: "G-RYSN44FZ1C"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const PROJECTS = [
    {
        name: "Lumina E-Commerce",
        type: "Full Stack Development",
        year: "2024",
        status: "Active",
        image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=2000",
        description: "Lumina is a next-generation multi-vendor marketplace designed for high-end fashion retailers. It features a custom-built inventory management system and a seamless checkout experience.",
        subtitle: "Redefining the digital shopping experience through minimalist aesthetics and powerful performance.",
        challenge: "The primary challenge was handling real-time inventory updates across multiple vendors while maintaining a sub-100ms response time for search and filtering.",
        solution: "We implemented a custom caching layer using Redis and optimized MongoDB queries with complex indexing, resulting in a lightning-fast user experience.",
        client: "Lumina Global",
        duration: "5 Months",
        link: "https://lumina-demo.com",
        services: ["React.js", "Node.js", "MongoDB", "Redis Integration"]
    },
    {
        name: "EduPulse AI",
        type: "Ed-Tech / AI Integration",
        year: "2024",
        status: "Active",
        image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=2000",
        description: "EduPulse AI is an intelligent assessment platform that adapts to a student's learning pace. It uses LLMs to generate personalized feedback and focus areas for students.",
        subtitle: "Leveraging Artificial Intelligence to create personalized learning paths for every student.",
        challenge: "Generating meaningful, context-aware feedback from assessment data without significant API costs or latency.",
        solution: "We developed a hybrid processing model where common feedback is handled locally, and complex insights are generated using fine-tuned OpenAI models with prompt caching.",
        client: "NavGurukul",
        duration: "3 Months",
        link: "https://edupulse.edu",
        services: ["LLM Integration", "React.js", "FastAPI", "Python"]
    },
    {
        name: "Zenith Portfolio",
        type: "Creative Branding",
        year: "2023",
        status: "Active",
        image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2000",
        description: "A digital sanctuary for creative professionals to showcase their work. Zenith focuses on typography-driven design and brutalist architecture.",
        subtitle: "Where content meets character. A brutalist approach to digital storytelling.",
        challenge: "Balancing high-quality image assets and complex GSAP animations while maintaining a high Lighthouse performance score.",
        solution: "Utilized Next-gen image formats (WebP/Avif) and scroll-triggered animation lazy loading to ensure the site remains fluid and fast.",
        client: "Creative Collective",
        duration: "2 Months",
        link: "https://zenith-portfolio.com",
        services: ["GSAP", "Three.js", "Modern CSS", "UI/UX"]
    },
    {
        name: "Stellar Cloud",
        type: "SaaS Dashboard",
        year: "2023",
        status: "Active",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000",
        description: "Stellar Cloud provides real-time infrastructure monitoring for cloud-native applications. It visualizes complex network nodes and traffic patterns.",
        subtitle: "Simplifying complex data through intuitive visualization and real-time monitoring.",
        challenge: "Creating a real-time 3D visualization of network traffic that is both informative and performant.",
        solution: "Built a custom WebGL engine within React using Three.js to render thousands of dynamic nodes with 60FPS.",
        client: "Stellar Systems",
        duration: "6 Months",
        link: "https://stellar-cloud.io",
        services: ["Three.js", "D3.js", "React.js", "WebSocket"]
    }
];

async function seed() {
    console.log("Cleaning old data...");
    await remove(ref(database, 'projects'));

    console.log("Seeding detailed projects...");
    const projectsRef = ref(database, 'projects');
    for (const p of PROJECTS) {
        const newRef = push(projectsRef);
        await set(newRef, { ...p, createdAt: new Date().toISOString() });
        console.log(`Added: ${p.name}`);
    }
    console.log("Seeding complete! Your projects now have full case study details.");
    process.exit(0);
}

seed().catch(err => {
    console.error(err);
    process.exit(1);
});
