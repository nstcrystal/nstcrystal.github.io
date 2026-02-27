import { motion } from 'motion/react';
import { personalInfo } from '../data/personalInfo';
import { Mail, Github, Linkedin } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { SkillCard } from '../components/SkillCard';
import { TimelineItem } from '../components/TimelineItem';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
// import profileImageUrl from '../../../public/avatar.png'

/**
 * Enhanced About Page Component
 * 
 * UX Improvements:
 * - Profile image for visual engagement
 * - Skill cards with icons for better organization
 * - Timeline design for education section
 * - Smooth entrance animations throughout
 * - Better visual hierarchy
 * - Fully responsive layout
 * 
 * Design Philosophy:
 * - Less text-heavy, more visual
 * - Clear sections with breathing room
 * - Interactive elements with hover states
 * - Professional yet approachable
 */
export function About() {
  const profileImageUrl = "";

  return (
    <PageTransition>
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section with Profile Image */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Profile Image */}
            <motion.div
              className="mb-6 inline-block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="relative">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-xl mx-auto">
                  <ImageWithFallback
                    src={profileImageUrl}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Decorative ring */}
                <div className="absolute inset-0 rounded-full border-4 border-blue-200 opacity-20 animate-pulse" />
              </div>
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              About Me
            </h1>
            <p className="text-xl md:text-2xl text-blue-600 font-medium mb-4">
              {personalInfo.role}
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {personalInfo.shortBio}
            </p>
          </motion.div>

          {/* Bio Section */}
          <motion.section
            className="bg-white rounded-2xl shadow-md p-8 md:p-10 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="w-2 h-8 bg-blue-600 rounded-full" />
              My Story
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              {personalInfo.fullBio}
            </p>
          </motion.section>

          {/* Skills Section */}
          <section className="mb-12">
            <motion.h2
              className="text-3xl font-bold text-gray-900 mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Technical Skills
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {personalInfo.skills.map((skill, index) => (
                <SkillCard
                  key={skill.category}
                  category={skill.category}
                  skills={skill.items}
                  index={index}
                />
              ))}
            </div>
          </section>

          {/* Education & Experience Timeline */}
          <section className="mb-12">
            <motion.h2
              className="text-3xl font-bold text-gray-900 mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Education & Experience
            </motion.h2>

            <div className="bg-white rounded-2xl shadow-md p-8 md:p-10">
              <div className="max-w-3xl mx-auto">
                {personalInfo.education.map((edu, index) => (
                  <TimelineItem
                    key={index}
                    item={edu}
                    index={index}
                    type="education"
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <motion.section
            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-md p-8 md:p-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Let's Connect
            </h2>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              I'm always interested in hearing about new opportunities, collaborations, or just having a chat about technology.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {personalInfo.email && (
                <motion.a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail size={20} />
                  Email Me
                </motion.a>
              )}
              {personalInfo.github && (
                <motion.a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github size={20} />
                  GitHub
                </motion.a>
              )}
              {personalInfo.linkedin && (
                <motion.a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin size={20} />
                  LinkedIn
                </motion.a>
              )}
            </div>
          </motion.section>
        </div>
      </div>
    </PageTransition>
  );
}
