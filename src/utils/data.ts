import type { Project, Experience, SkillCategory, Service, NavLink } from '@/types'

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', target: 'home' },
  { label: 'About', target: 'about' },
  { label: 'Skills', target: 'skills' },
  { label: 'Projects', target: 'projects' },
  { label: 'Experience', target: 'experience' },
  { label: 'Architecture', target: 'architecture' },
  { label: 'Contact', target: 'contact' },
]

export const CV_URL = 'https://drive.google.com/uc?export=download&id=1QWdgp1gEF2cJdt4slakH0SUCJDvJRjcG'
export const EMAIL = 'duongnguyenqn1323@gmail.com'

export const SKILLS: SkillCategory[] = [
  {
    category: 'Frontend',
    icon: 'FaReact',
    color: 'from-cyan-500 to-blue-500',
    skills: [
      { name: 'ReactJS', level: 90 },
      { name: 'NextJS', level: 85 },
      { name: 'React Native', level: 80 },
      { name: 'TailwindCSS', level: 95 },
      { name: 'Redux', level: 85 },
      { name: 'Bootstrap', level: 90 },
    ],
  },
  {
    category: 'Backend',
    icon: 'FaNodeJs', // Will use Java icon in component or stick to generic
    color: 'from-orange-500 to-red-600',
    skills: [
      { name: 'Java', level: 90 },
      { name: 'Spring Boot', level: 92 },
      { name: 'REST API', level: 95 },
      { name: 'JWT', level: 90 },
      { name: 'RBAC', level: 88 },
    ],
  },
  {
    category: 'Architecture',
    icon: 'FaSitemap',
    color: 'from-indigo-500 to-purple-600',
    skills: [
      { name: 'Microservices', level: 85 },
      { name: 'Event-driven', level: 80 },
      { name: 'Client-server', level: 90 },
    ],
  },
  {
    category: 'DevOps',
    icon: 'FaDocker',
    color: 'from-blue-600 to-cyan-600',
    skills: [
      { name: 'Docker', level: 85 },
      { name: 'AWS (EC2, S3, Cognito)', level: 80 },
      { name: 'CI/CD', level: 75 },
    ],
  },
  {
    category: 'Database',
    icon: 'FaDatabase',
    color: 'from-emerald-500 to-teal-600',
    skills: [
      { name: 'PostgreSQL', level: 88 },
      { name: 'MongoDB', level: 85 },
      { name: 'SQL Server', level: 82 },
      { name: 'MariaDB', level: 85 },
    ],
  },
  {
    category: 'Realtime & Messaging',
    icon: 'FaNetworkWired',
    color: 'from-amber-500 to-orange-600',
    skills: [
      { name: 'WebSocket / Socket.IO', level: 88 },
      { name: 'Kafka', level: 75 },
      { name: 'Redis', level: 82 },
    ],
  },
  {
    category: 'Monitoring',
    icon: 'FaChartLine',
    color: 'from-pink-500 to-rose-600',
    skills: [
      { name: 'Prometheus', level: 78 },
      { name: 'Grafana', level: 80 },
    ],
  },
  {
    category: 'AI / Data',
    icon: 'FaRobot',
    color: 'from-violet-500 to-fuchsia-600',
    skills: [
      { name: 'Gemini AI / AWS Bedrock', level: 85 },
      { name: 'Python FastAPI', level: 82 },
      { name: 'Prophet Model', level: 75 },
      { name: 'Recommendation Systems', level: 80 },
    ],
  },
]

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Tech E-commerce Platform',
    description:
      'Full-stack e-commerce system supporting high-volume product sales with secure authentication, role-based access control, and AI-powered user support.',
    features: [
      'Secure Authentication with JWT',
      'Role-Based Access Control',
      'AI Integrated User Support (Gemini)',
      'High-volume inventory management',
    ],
    techStack: ['ReactJS', 'Spring Boot', 'MariaDB', 'JWT', 'Firebase', 'Docker', 'Gemini AI'],
    githubUrl: 'https://github.com/DuongGB',
    liveUrl: 'https://demo.example.com',
    featured: true,
  },
  {
    id: '2',
    title: 'Multi-Platform Social Chat',
    description:
      'Real-time social communication system supporting private and group messaging across Web and Mobile platforms.',
    features: [
      'Private and Group Messaging',
      'Web & Mobile (Cross-platform)',
      'Real-time updates with Socket.IO',
      'Image uploads with Cloudinary',
    ],
    techStack: ['ReactJS', 'React Native', 'MongoDB', 'WebSocket', 'Socket.IO', 'Redux', 'AWS SNS', 'Cloudinary'],
    githubUrl: 'https://github.com/DuongGB',
    liveUrl: 'https://demo.example.com',
    featured: true,
  },
  {
    id: '3',
    title: 'AI-Enhanced E-commerce',
    description:
      'Full-stack system with AI-powered product recommendation and revenue prediction using machine learning models.',
    features: [
      'AI Recommendation System',
      'Revenue Forecasting (Prophet)',
      'FastAPI for ML integration',
      'AWS cloud deployment',
    ],
    techStack: ['ReactJS', 'TailwindCSS', 'Spring Boot', 'Python FastAPI', 'Prophet', 'PostgreSQL', 'Docker', 'AWS'],
    githubUrl: 'https://github.com/DuongGB',
    liveUrl: 'https://demo.example.com',
    featured: true,
  },
  {
    id: '4',
    title: 'Laboratory Info System',
    description:
      'Enterprise-grade microservices system developed during internship, supporting patient management, payment processing, and real-time notifications.',
    features: [
      'Microservices Architecture',
      'Real-time Kafka messaging',
      'System Monitoring (Prometheus/Grafana)',
      'Auth with AWS Cognito',
    ],
    techStack: ['Spring Boot', 'Kafka', 'Redis', 'AWS Cognito', 'Docker', 'Prometheus', 'Grafana', 'Socket.IO'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://demo.example.com',
    featured: true,
  },
]

export const EXPERIENCES: Experience[] = [
  {
    id: '1',
    company: 'FPT Software',
    role: 'Intern Java Developer',
    duration: 'Sep 2025 – Nov 2025',
    startDate: '2025-09-01',
    endDate: '2025-11-01',
    responsibilities: [
      'Built microservices using Spring Boot',
      'Implemented authentication with AWS Cognito and JWT',
      'Designed event-driven architecture using Kafka',
      'Implemented caching with Redis',
      'Developed real-time notification system',
      'Integrated monitoring using Prometheus and Grafana',
    ],
    technologies: ['Spring Boot', 'AWS Cognito', 'Kafka', 'Redis', 'Prometheus', 'Grafana'],
  },
]

export const SERVICES: Service[] = [
  {
    id: '1',
    title: 'Web Development',
    description:
      'Building performant and scalable web applications using React and Spring Boot.',
    icon: 'FaGlobe',
    features: ['ReactJS / NextJS', 'Spring Boot', 'Responsive Design', 'JWT Auth'],
  },
  {
    id: '2',
    title: 'Mobile App Development',
    description:
      'Creating cross-platform mobile applications with React Native for seamless user experiences.',
    icon: 'FaMobile',
    features: ['React Native', 'Real-time features', 'Native modules integration', 'Push notifications'],
  },
  {
    id: '3',
    title: 'Microservices Architecture',
    description:
      'Designing and implementing independent services with event-driven communication.',
    icon: 'FaServer',
    features: ['Kafka / RabbitMQ', 'API Gateway', 'Docker / Containerization', 'Distributed caching'],
  },
  {
    id: '4',
    title: 'AI Integration',
    description:
      'Integrating machine learning models and AI services into production systems.',
    icon: 'FaRobot',
    features: ['Recommendation Systems', 'Revenue Forecasting', 'Gemini AI / Bedrock', 'FastAPI'],
  },
]
