import { motion } from 'motion/react';
import { GraduationCap, Briefcase } from 'lucide-react';
import type { Education } from '../types';

interface TimelineItemProps {
  item: Education;
  index: number;
  type?: 'education' | 'experience';
}

/**
 * Timeline Item Component
 * Displays education or experience in a vertical timeline format
 */
export function TimelineItem({ item, index, type = 'education' }: TimelineItemProps) {
  const Icon = type === 'education' ? GraduationCap : Briefcase;

  return (
    <motion.div
      className="relative flex gap-6 pb-8 last:pb-0"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
    >
      {/* Timeline Line */}
      <div className="relative flex flex-col items-center">
        {/* Icon Circle */}
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 border-4 border-white shadow-md z-10">
          <Icon size={20} className="text-blue-600" />
        </div>
        {/* Vertical Line */}
        <div className="w-0.5 h-full bg-gray-200 absolute top-12" />
      </div>

      {/* Content */}
      <div className="flex-1 pt-1">
        {/* Period */}
        <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full mb-2">
          {item.period}
        </span>

        {/* Degree/Position */}
        <h3 className="text-xl font-semibold text-gray-900 mb-1">
          {item.degree}
        </h3>

        {/* Institution/Company */}
        <p className="text-gray-600 font-medium mb-2">
          {item.institution}
        </p>

        {/* Description */}
        {item.description && (
          <p className="text-gray-600 leading-relaxed">
            {item.description}
          </p>
        )}
      </div>
    </motion.div>
  );
}
