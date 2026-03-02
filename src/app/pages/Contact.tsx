import { motion } from 'motion/react';
import { Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { ContactForm } from '../components/ContactForm';
import { SocialLinks } from '../components/SocialLinks';
import { personalInfo } from '../data/personalInfo';

/**
 * Contact Page Component
 * 
 * Features:
 * - Simplified contact form (Name + Message only)
 * - Social media connections
 * - Contact information cards
 * - Smooth animations
 * - Responsive layout
 * - Professional design
 * 
 * Layout:
 * - Left side: Contact information + Social links
 * - Right side: Contact form
 * - Mobile: Stacked layout
 */
export function Contact() {
  return (
    <PageTransition>
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Get In Touch
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Have a question or want to work together? I'd love to hear from you.
              Fill out the form below and I'll get back to you as soon as possible.
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Contact Info */}
            <motion.div
              className="lg:col-span-1 space-y-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Contact Information Card */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <MessageCircle className="text-blue-600" size={24} />
                  Contact Info
                </h2>

                <div className="space-y-4">
                  {/* Email */}
                  {personalInfo.email && (
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg mt-1">
                        <Mail className="text-blue-600" size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Email</p>
                        <a
                          href={`mailto:${personalInfo.email}`}
                          className="text-gray-900 hover:text-blue-600 transition-colors"
                        >
                          {personalInfo.email}
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Location */}
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg mt-1">
                      <MapPin className="text-blue-600" size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Location</p>
                      <p className="text-gray-900">Hue / VietNam</p>
                    </div>
                  </div>

                  {/* Response Time */}
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg mt-1">
                      <Clock className="text-blue-600" size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Response Time</p>
                      <p className="text-gray-900">Usually within 2 - 3 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Contact Card */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Let's Collaborate
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  I'm always interested in hearing about:
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                    Freelance opportunities
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                    Collaboration on projects
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                    Technical discussions
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                    Job opportunities
                  </li>
                </ul>
              </div>

              {/* Social Links Card */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <SocialLinks />
              </div>
            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-white rounded-2xl shadow-md p-8 md:p-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Send a Message
                </h2>
                <ContactForm />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}