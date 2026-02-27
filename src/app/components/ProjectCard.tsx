import { ExternalLink, Github } from 'lucide-react';
import { motion } from 'motion/react';
import type { Project } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProjectCardProps {
  project: Project;
}

/**
 * Enhanced Project Card Component
 * 
 * Features:
 * - Project thumbnail image with fallback
 * - Hover animations (scale + shadow)
 * - Image overlay effect on hover
 * - Technology badges
 * - Action buttons (Demo, GitHub)
 * - Consistent card height
 * - Fully responsive
 * 
 * UX Improvements:
 * - Visual hierarchy with image at top
 * - Clear call-to-action buttons
 * - Smooth hover interactions
 * - Technology stack prominently displayed
 */
export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.article
      className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full"
      initial={{ scale: 1 }}
      whileHover={{ 
        scale: 1.03, 
        y: -8,
        transition: { duration: 0.3, ease: 'easeOut' }
      }}
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500 group">
        {project.imageUrl ? (
          <>
            <ImageWithFallback
              src={project.imageUrl}
              alt={project.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Image Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </>
        ) : (
          // Fallback gradient with project initials
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-white text-5xl font-bold opacity-50">
              {project.name.substring(0, 2).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Project Name */}
        <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
          {project.name}
        </h3>

        {/* Project Description */}
        <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
          {project.description}
        </p>

        {/* Technology Stack */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                +{project.technologies.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-auto pt-4 border-t border-gray-100">
          {project.demoLink && (
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <ExternalLink size={16} />
              Demo
            </a>
          )}
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors text-sm font-medium ${
                project.demoLink ? 'flex-1' : 'flex-1'
              }`}
            >
              <Github size={16} />
              Code
            </a>
          )}
          {!project.demoLink && !project.githubLink && (
            <div className="flex-1 text-center py-2 text-gray-400 text-sm">
              Coming Soon
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}
