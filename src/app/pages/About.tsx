import { personalInfo } from '../data/personalInfo';
import { Mail, Github, Linkedin } from 'lucide-react';

/**
 * About Page Component
 * Displays personal information, skills, and education
 */
export function About() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Me</h1>
          <p className="text-xl text-gray-600">{personalInfo.role}</p>
        </div>

        {/* Introduction */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
          <p className="text-gray-700 leading-relaxed">
            {personalInfo.fullBio}
          </p>
        </section>

        {/* Skills */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Skills</h2>
          <div className="space-y-6">
            {personalInfo.skills.map((skillGroup) => (
              <div key={skillGroup.category}>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Education</h2>
          <div className="space-y-6">
            {personalInfo.education.map((edu, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {edu.degree}
                </h3>
                <p className="text-blue-600 font-medium">{edu.institution}</p>
                <p className="text-sm text-gray-500 mb-2">{edu.period}</p>
                {edu.description && (
                  <p className="text-gray-700">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Contact Information */}
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact</h2>
          <div className="space-y-4">
            {personalInfo.email && (
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Mail size={20} />
                <span>{personalInfo.email}</span>
              </a>
            )}
            {personalInfo.github && (
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Github size={20} />
                <span>{personalInfo.github}</span>
              </a>
            )}
            {personalInfo.linkedin && (
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Linkedin size={20} />
                <span>{personalInfo.linkedin}</span>
              </a>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
