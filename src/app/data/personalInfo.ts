import type { PersonalInfo } from '../types';

/**
 * Personal information data
 * Update this file to change your personal details
 */
export const personalInfo: PersonalInfo = {
  name: "NSTCrystal",
  role: "Developer",
  shortBio: "Passionate about creating beautiful and functional web experiences. Currently exploring modern web technologies and design systems.",
  fullBio: "I'm an Information Technology student with a strong interest in web development. I am currently focusing on building modern, responsive, and user-friendly web applications using technologies such as React, TypeScript, and modern CSS frameworks.",
  skills: [
    {
      category: "Frontend",
      items: ["React", "TypeScript", "Tailwind CSS", "HTML", "CSS", "JavaScript"]
    },
    {
      category: "Backend",
      items: ["Node.js"]
    },
    {
      category: "Others",
      items: ["Git", "C++", "Python", "Java", "Godot"]
    }
  ],
  education: [
    {
      institution: "Hue University of Sciences",
      degree: "Information technology students",
      period: "2024 - 2028",
      description: "Focused on web development, and data structures"
    }
  ],
  email: "nstcrystal@gmail.com",
  github: "https://github.com/nstcrystal",
  // linkedin: "https://linkedin.com"
};
