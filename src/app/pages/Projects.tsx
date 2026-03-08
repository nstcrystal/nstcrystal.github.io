import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { projects } from '../data/projects';
import { ProjectCard } from '../components/ProjectCard';
import { PageTransition } from '../components/PageTransition';
import { filterItemVariants } from '../utils/animations';

/**
 * Projects Page Component
 * Displays all projects with filtering by technology
 * Enhanced with staggered grid animations and smooth filtering
 */
export function Projects() {
  const [selectedTech, setSelectedTech] = useState<string>('All');

  // Extract unique technologies from all projects
  const allTechnologies = Array.from(
    new Set(projects.flatMap((project) => project.technologies))
  ).sort();

  // Sort projects by ID descending (newest first) and filter based on selected technology
  const filteredProjects = useMemo(() => {
    const sorted = [...projects].sort((a, b) => Number(b.id) - Number(a.id));
    return selectedTech === 'All'
      ? sorted
      : sorted.filter((project) => project.technologies.includes(selectedTech));
  }, [selectedTech]);

  return (
    <PageTransition>
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Projects</h1>
            <p className="text-xl text-gray-600">
              A collection of my work and side projects
            </p>
          </motion.div>

          {/* Technology Filter */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => setSelectedTech('All')}
                className={`px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedTech === 'All'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 hover:shadow-sm border border-gray-300'
                }`}
              >
                All
              </button>
              {allTechnologies.map((tech) => (
                <button
                  key={tech}
                  onClick={() => setSelectedTech(tech)}
                  className={`px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedTech === tech
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-100 hover:shadow-sm border border-gray-300'
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            <AnimatePresence mode="wait">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={filterItemVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ delay: index * 0.04 }}
                  className="h-full"
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* No Results Message */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No projects found with the selected technology.
              </p>
            </div>
          )}

          {/* Project Count */}
          <div className="text-center mt-12 text-gray-600">
            Showing {filteredProjects.length} of {projects.length} projects
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
