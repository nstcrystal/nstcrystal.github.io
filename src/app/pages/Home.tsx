import { Link } from 'react-router';
import { ArrowRight, Code, Briefcase, FileText } from 'lucide-react';
import { personalInfo } from '../data/personalInfo';

/**
 * Home Page Component
 * Landing page with introduction and quick navigation
 */
export function Home() {
  const quickLinks = [
    {
      to: '/about',
      icon: Code,
      title: 'About Me',
      description: 'Learn more about my skills and background',
      color: 'from-blue-500 to-blue-600',
    },
    {
      to: '/projects',
      icon: Briefcase,
      title: 'Projects',
      description: 'Explore my portfolio of work',
      color: 'from-purple-500 to-purple-600',
    },
    {
      to: '/blog',
      icon: FileText,
      title: 'Blog',
      description: 'Read my thoughts and experiences',
      color: 'from-green-500 to-green-600',
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-4">
              Hi, I'm {personalInfo.name}
            </h1>
            <p className="text-xl sm:text-2xl text-gray-700 mb-6">
              {personalInfo.role}
            </p>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              {personalInfo.shortBio}
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/projects"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
              >
                View Projects
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/about"
                className="px-6 py-3 bg-white text-gray-700 rounded-lg hover:bg-gray-100 border border-gray-300 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Explore
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className={`h-2 bg-gradient-to-r ${link.color}`} />
                  <div className="p-6">
                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${link.color} mb-4`}>
                      <Icon className="text-white" size={24} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {link.title}
                    </h3>
                    <p className="text-gray-600">
                      {link.description}
                    </p>
                    <div className="mt-4 inline-flex items-center text-blue-600 group-hover:gap-2 transition-all">
                      Explore
                      <ArrowRight size={16} className="ml-1 group-hover:ml-0 transition-all" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Let's Work Together
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            I'm always interested in hearing about new projects and opportunities.
          </p>
          <a
            href={`mailto:${personalInfo.email}`}
            className="px-8 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors inline-block font-medium"
          >
            Get In Touch
          </a>
        </div>
      </section>
    </div>
  );
}
