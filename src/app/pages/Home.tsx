import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight, Code, Briefcase, FileText } from 'lucide-react';
import { personalInfo } from '../data/personalInfo';
import { PageTransition } from '../components/PageTransition';
import { heroVariants, staggerContainer, staggerItem } from '../utils/animations';
import { homeHero } from '@/assets/images';

/**
 * Home Page Component
 * Landing page with introduction and quick navigation
 * Enhanced with smooth entrance animations and hero illustration
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
    <PageTransition>
      <div className="min-h-[calc(100vh-4rem)]">
        {/* Hero Section with Illustration */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              {/* Text Content */}
              <motion.div
                className="flex-1 text-center lg:text-left"
                variants={heroVariants}
                initial="initial"
                animate="animate"
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                  Hi, I'm {personalInfo.name}
                </h1>
                <p className="text-xl sm:text-2xl text-gray-700 mb-6">
                  {personalInfo.role}
                </p>
                <p className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 mb-8">
                  {personalInfo.shortBio}
                </p>
                <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                  <Link
                    to="/projects"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 inline-flex items-center justify-center gap-2 cursor-pointer hover:shadow-lg"
                  >
                    View Projects
                    <ArrowRight size={20} />
                  </Link>
                  <Link
                    to="/about"
                    className="px-6 py-3 bg-white text-gray-700 rounded-lg hover:bg-gray-100 border border-gray-300 transition-all duration-200 cursor-pointer hover:shadow-md text-center"
                  >
                    Learn More
                  </Link>
                </div>
              </motion.div>

              {/* Hero Illustration */}
              <motion.div
                className="flex-1 max-w-lg lg:max-w-xl"
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-2xl blur-xl" />
                  <img
                    src={homeHero}
                    alt="Web Development Illustration"
                    className="relative rounded-2xl shadow-xl w-full h-auto"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Quick Navigation Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              className="text-3xl font-bold text-gray-900 text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Explore
            </motion.h2>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-fr"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <motion.div key={link.to} variants={staggerItem} className="h-full">
                    <Link
                      to={link.to}
                      className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden block h-full cursor-pointer"
                    >
                      <motion.div
                        className="h-full flex flex-col"
                        whileHover={{ 
                          y: -4,
                          transition: { duration: 0.3, ease: 'easeOut' }
                        }}
                      >
                        <div className={`h-2 bg-gradient-to-r ${link.color}`} />
                        <div className="p-6 flex flex-col flex-1">
                          <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${link.color} mb-4 w-fit`}>
                            <Icon className="text-white" size={24} />
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                            {link.title}
                          </h3>
                          <p className="text-gray-600 flex-grow">
                            {link.description}
                          </p>
                          <div className="mt-4 inline-flex items-center text-blue-600 gap-1">
                            Explore
                            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <motion.section
          className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Let's Work Together
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              I'm always interested in hearing about new projects and opportunities.
            </p>
            <a
              href={`mailto:${personalInfo.email}`}
              className="px-8 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-all duration-200 inline-block font-medium cursor-pointer hover:shadow-lg"
            >
              Get In Touch
            </a>
          </div>
        </motion.section>
      </div>
    </PageTransition>
  );
}
