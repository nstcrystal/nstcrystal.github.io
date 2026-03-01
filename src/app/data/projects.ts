import type { Project } from '../types';
import { projectImages } from '@/assets/images/';


export const projects: Project[] = [
  {
    id: "1",
    name: "Flappy Bird",
    description: "I made flappy bird game based on a very famous game in 2013 created by a Vietnamese programmer named Nguyen Ha Dong",
    technologies: ["Python"],
    imageUrl: projectImages.flappy_bird,
    demoLink: "",
    githubLink: "https://github.com/nstcrystal/Flappy_bird.git",
  }
];