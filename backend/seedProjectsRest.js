const https = require('https');
const http = require('http');

const DATABASE_URL = 'https://dangwallokesh4-default-rtdb.firebaseio.com';

const projectsData = [
    {
        name: "DK Holidays Car Rental Platform",
        type: "Full Stack",
        year: "2024",
        status: "Active",
        pinned: true,
        image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?auto=format&fit=crop&q=80&w=2000",
        images: [
            "https://images.unsplash.com/photo-1464207687429-7505649dae38?auto=format&fit=crop&q=80&w=2000",
            "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=2000",
            "https://images.unsplash.com/photo-1693521072519-506b48896a00?auto=format&fit=crop&q=80&w=2000"
        ],
        description: "A comprehensive booking platform for DK Holidays in Dharamshala that enables customers to arrange transportation and travel services through an integrated interface. The platform includes vehicle booking, flight and train ticketing, insurance integration, and a complete admin dashboard for operations management.",
        challenge: "Building an integrated booking system that could handle multiple service types (vehicles, flights, trains) while maintaining real-time inventory management and providing institutional-grade role-based access controls.",
        solution: "Implemented a unified platform using React 18 for the frontend and Node.js/Express for the backend. Used Firebase Firestore for flexible data storage and Firebase Authentication for secure role-based access. Integrated Turtlemint for insurance and WhatsApp API for direct customer communication.",
        services: ["React 18", "Node.js", "Express.js", "Firebase", "Firestore", "WhatsApp API"],
        client: "DK Holidays, Dharamshala",
        duration: "4 Months",
        link: "https://github.com/lokesh123d/cilent-2-project.git"
    },
    {
        name: "QuizMaster - AI-Powered Quiz Platform",
        type: "EdTech",
        year: "2024",
        status: "Active",
        pinned: true,
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=2000",
        images: [
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=2000",
            "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2000",
            "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=2000"
        ],
        description: "A full-stack MERN application designed for Navgurukul that combines interactive quiz-taking with AI-powered quiz generation. The platform enables students to take quizzes with instant feedback and detailed explanations, while administrators can generate quizzes using AI from various file formats including JSON, PDF, and text files.",
        challenge: "Creating a secure educational platform with institutional authentication that could generate high-quality quizzes using AI while maintaining a distraction-free student experience and tracking detailed performance metrics.",
        solution: "Built using React 19, Node.js, and MongoDB with Google OAuth for institutional email validation. Implemented AI-powered quiz generation using OpenAI APIs, with comprehensive performance tracking and a responsive glassmorphism UI design that emphasizes usability.",
        services: ["React 19", "Node.js", "MongoDB", "Google OAuth", "OpenAI API", "Express.js", "JWT Auth"],
        client: "Navgurukul",
        duration: "3 Months",
        link: "https://github.com/lokesh123d/Assisment.git"
    },
    {
        name: "Qusar - E-Commerce Platform",
        type: "E-Commerce",
        year: "2024",
        status: "Active",
        pinned: true,
        image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=2000",
        images: [
            "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=2000",
            "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=2000",
            "https://images.unsplash.com/photo-1522869635100-ce306e08e75f?auto=format&fit=crop&q=80&w=2000"
        ],
        description: "A production-ready e-commerce platform built with a modern tech stack. Features comprehensive product management, secure payment gateway integration, user authentication, and order management system. The platform is currently deployed and actively serving customers.",
        challenge: "Developing a scalable e-commerce platform that could handle multiple product categories, secure payment processing, and maintain high performance during peak traffic periods.",
        solution: "Implemented using JavaScript across the stack with React for frontend and Node.js for backend. Integrated multiple payment service providers and implemented robust order management and inventory tracking systems.",
        services: ["React", "Node.js", "Express.js", "Payment Gateway", "MongoDB"],
        client: "Personal Project",
        duration: "4.5 Months",
        link: "https://github.com/lokesh123d/Qusar.git"
    },
    {
        name: "Banda Digital - Digital Marketing & CSC Services",
        type: "Web Design",
        year: "2024",
        status: "Active",
        pinned: true,
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=2000",
        images: [
            "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=2000",
            "https://images.unsplash.com/photo-1460925895917-adf4ee868993?auto=format&fit=crop&q=80&w=2000",
            "https://images.unsplash.com/photo-1551031554-2b374a5e57cc?auto=format&fit=crop&q=80&w=2000"
        ],
        description: "Banda Digital - A professional website showcasing digital marketing and Common Service Center (CSC) services for a service provider in Banda, Uttar Pradesh. The platform enables appointment booking and service discovery through WhatsApp integration while serving both Hindi and English-speaking users.",
        challenge: "Creating a modern bilingual website that could showcase multiple service categories with engaging UI while integrating WhatsApp for customer inquiries and providing a professional online presence for a local service provider.",
        solution: "Built using React 18 with Vite for optimal performance. Implemented glassmorphic card designs with smooth animations and hover effects. Integrated WhatsApp API for pre-filled customer inquiries and created an interactive pricing toggle system.",
        services: ["React 18", "Vite", "CSS3", "WhatsApp Integration", "Google Fonts"],
        client: "Banda Digital Services",
        duration: "2 Months",
        link: "https://github.com/lokesh123d/cilent-3-projects.git"
    },
    {
        name: "Backend Ledger - Financial Management System",
        type: "Backend",
        year: "2024",
        status: "Active",
        pinned: false,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000",
        images: [
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000",
            "https://images.unsplash.com/photo-1579621970563-ebec33c760f1?auto=format&fit=crop&q=80&w=2000"
        ],
        description: "A robust backend system designed for financial transaction management and ledger tracking. This backend service provides comprehensive APIs for recording, querying, and analyzing financial transactions with proper data persistence and security protocols.",
        challenge: "Building a scalable backend system that could handle financial transaction data with proper validation, error handling, and security measures while maintaining high performance and data integrity.",
        solution: "Developed using Node.js and Express with a modular architecture. Implemented proper REST API design patterns, transaction validation, and secure data storage mechanisms for financial data.",
        services: ["Node.js", "Express.js", "JavaScript", "REST APIs"],
        client: "Personal Project",
        duration: "2 Months",
        link: "https://github.com/lokesh123d/Backend_Leadger.git"
    }
];

async function addProject(projectData) {
    return new Promise((resolve, reject) => {
        const url = `${DATABASE_URL}/projects.json`;
        const data = JSON.stringify({
            ...projectData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        };

        const req = https.request(url, options, (res) => {
            let responseData = '';
            res.on('data', chunk => responseData += chunk);
            res.on('end', () => {
                if (res.statusCode === 200) {
                    resolve(JSON.parse(responseData));
                } else {
                    reject(new Error(`HTTP ${res.statusCode}: ${responseData}`));
                }
            });
        });

        req.on('error', reject);
        req.write(data);
        req.end();
    });
}

async function seedProjects() {
    try {
        console.log('🚀 Starting to seed projects to Firebase...\n');

        for (let i = 0; i < projectsData.length; i++) {
            const project = projectsData[i];
            await addProject(project);
            console.log(`✅ Added (${i + 1}/${projectsData.length}): ${project.name}`);
            // Add small delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        console.log('\n🎉 All projects seeded successfully!');
        console.log(`Total projects added: ${projectsData.length}`);
        console.log('📍 Pinned projects: 4 (will show on home page)');
        console.log('🌐 Visit your portfolio to see the projects!');
        process.exit(0);

    } catch (error) {
        console.error('❌ Error seeding projects:', error.message);
        process.exit(1);
    }
}

seedProjects();
