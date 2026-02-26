/**
 * Type definitions for the personal website
 */

export interface Skill {
  category: string;
  items: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  description?: string;
}

export interface PersonalInfo {
  name: string;
  role: string;
  shortBio: string;
  fullBio: string;
  skills: Skill[];
  education: Education[];
  email?: string;
  github?: string;
  linkedin?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  demoLink?: string;
  githubLink?: string;
  imageUrl?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
}
