import { motion } from 'motion/react';
import { Code2, Database, Globe, Palette, Server, Terminal } from 'lucide-react';

interface SkillCardProps {
  category: string;
  skills: string[];
  index: number;
}

/**
 * Skill Card Component
 * Displays a category of skills with an icon and visual badge design
 */
export function SkillCard({ category, skills, index }: SkillCardProps) {
  // Map category names to icons
  const getIcon = () => {
    const iconProps = { size: 24, className: 'text-blue-600' };
    
    switch (category.toLowerCase()) {
      case 'frontend':
        return <Code2 {...iconProps} />;
      case 'backend':
        return <Server {...iconProps} />;
      case 'database':
        return <Database {...iconProps} />;
      case 'tools':
        return <Terminal {...iconProps} />;
      case 'design':
        return <Palette {...iconProps} />;
      default:
        return <Globe {...iconProps} />;
    }
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      {/* Icon and Category */}
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-50 rounded-lg">
          {getIcon()}
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{category}</h3>
      </div>

      {/* Skills List */}
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
