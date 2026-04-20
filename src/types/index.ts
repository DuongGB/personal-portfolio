// Project types
export interface Project {
  id: string;
  title: string;
  description: string;
  features: string[];
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  image?: string;
  featured?: boolean;
}

// Experience types
export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
  technologies: string[];
  current?: boolean;
}

// Skill types
export interface Skill {
  name: string;
  level: number;
  icon?: string;
}

export interface SkillCategory {
  category: string;
  icon: string;
  color: string;
  skills: Skill[];
}

// Contact form types
export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

// Service types
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

// Nav types
export interface NavLink {
  label: string;
  target: string;
}
