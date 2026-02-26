import { useState } from 'react';
import { projects } from '../data/projects';
import { ProjectCard } from '../components/ProjectCard';

/**
 * Projects Page Component
 * Displays all projects with filtering by technology
 */
export function Projects() {
  const [selectedTech, setSelectedTech] = useState<string>('All');

  // Extract unique technologies from all projects
  const allTechnologies = Array.from(
    new Set(projects.flatMap((project) => project.technologies))
  ).sort();

  // Filter projects based on selected technology
  const filteredProjects =
    selectedTech === 'All'
      ? projects
      : projects.filter((project) =>
          project.technologies.includes(selectedTech)
        );

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Projects</h1>
          <p className="text-xl text-gray-600">
            A collection of my work and side projects
          </p>
        </div>

        {/* Technology Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setSelectedTech('All')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedTech === 'All'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              All
            </button>
            {allTechnologies.map((tech) => (
              <button
                key={tech}
                onClick={() => setSelectedTech(tech)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedTech === tech
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
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
  );
}
