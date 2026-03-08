import { motion } from "motion/react";
import {
  Github,
  Facebook,
  Youtube,
  Linkedin,
  Instagram,
  Twitter,
  Mail,
} from "lucide-react";
import { personalInfo } from "../data/personalInfo";

/**
 * Social Link Interface
 */
interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
  color: string;
  hoverColor: string;
}

/**
 * Social Links Component
 *
 * Features:
 * - Display multiple social media connections
 * - Hover effects with scale and shadow
 * - Color transitions
 * - Responsive grid layout
 * - Opens in new tab
 * - Accessible with ARIA labels
 *
 * Usage:
 * <SocialLinks />
 */
export function SocialLinks() {
  // Build social links array from personalInfo
  const socialLinks: SocialLink[] = [];

  if (personalInfo.github) {
    socialLinks.push({
      name: "GitHub",
      url: personalInfo.github,
      icon: <Github size={24} />,
      color: "bg-gray-900",
      hoverColor: "hover:bg-gray-800",
    });
  }

  if (personalInfo.linkedin) {
    socialLinks.push({
      name: 'LinkedIn',
      url: personalInfo.linkedin,
      icon: <Linkedin size={24} />,
      color: 'bg-blue-700',
      hoverColor: 'hover:bg-blue-800',
    });
  }

  if (personalInfo.facebook) {
    socialLinks.push({
      name: "Facebook",
      url: personalInfo.facebook,
      icon: <Facebook size={24} />,
      color: "bg-blue-600",
      hoverColor: "hover:bg-blue-700",
    });
  }

  if (personalInfo.youtube) {
    socialLinks.push({
      name: "YouTube",
      url: personalInfo.youtube,
      icon: <Youtube size={24} />,
      color: "bg-red-600",
      hoverColor: "hover:bg-red-700",
    });
  }

  if (personalInfo.instagram) {
    socialLinks.push({
      name: "Instagram",
      url: personalInfo.instagram,
      icon: <Instagram size={24} />,
      color:
        "bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500",
      hoverColor:
        "hover:from-purple-700 hover:via-pink-700 hover:to-orange-600",
    });
  }

  if (personalInfo.twitter) {
    socialLinks.push({
      name: "Twitter",
      url: personalInfo.twitter,
      icon: <Twitter size={24} />,
      color: "bg-sky-500",
      hoverColor: "hover:bg-sky-600",
    });
  }

  if (personalInfo.email) {
    socialLinks.push({
      name: "Email",
      url: `mailto:${personalInfo.email}`,
      icon: <Mail size={24} />,
      color: "bg-gray-700",
      hoverColor: "hover:bg-gray-800",
    });
  }

  // Don't render if no social links
  if (socialLinks.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-900">
        Connect With Me
      </h3>

      {/* Social Links Grid */}
      <div className="grid grid-cols-2 gap-3">
        {socialLinks.map((social, index) => (
          <motion.a
            key={social.name}
            href={social.url}
            target={
              social.name !== "Email" ? "_blank" : undefined
            }
            rel={
              social.name !== "Email"
                ? "noopener noreferrer"
                : undefined
            }
            className={`
              flex items-center justify-center gap-2
              px-4 py-3 rounded-xl
              text-white font-medium text-sm
              transition-all duration-300
              ${social.color}
              ${social.hoverColor}
              hover:shadow-lg
              active:scale-95
              cursor-pointer
            `}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Connect on ${social.name}`}
          >
            {social.icon}
            <span>{social.name}</span>
          </motion.a>
        ))}
      </div>

      {/* Optional: Description */}
      <p className="text-xs text-gray-500 text-center mt-4">
        Follow me on social media for updates and content
      </p>
    </div>
  );
}
