import { Calendar, Tag, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import type { BlogPostData } from '../utils/blogLoader';

interface BlogPostCardProps {
  post: BlogPostData;
}

/**
 * Blog Post Card Component
 * Displays a blog post preview with animated hover effect
 * Features consistent height, cursor pointer, and enhanced hover interactions
 * Updated to work with markdown-based blog posts
 */
export function BlogPostCard({ post }: BlogPostCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Use excerpt from frontmatter, or extract first paragraph from content
  const excerpt = post.excerpt || post.content
    .split('\n')
    .find(line => line.trim() && !line.startsWith('#'))
    ?.substring(0, 150) || '';

  return (
    <motion.article
      className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col cursor-pointer"
      initial={{ scale: 1, y: 0 }}
      whileHover={{ 
        scale: 1.02, 
        y: -4,
        boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
        transition: { duration: 0.3, ease: 'easeOut' }
      }}
    >
      {/* Cover Image */}
      {post.coverImage && (
        <div className="h-48 overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      
      <Link to={`/blog/${post.slug}`} className="block flex-1 flex flex-col">
        <div className="p-6 flex flex-col flex-1">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
            {post.title}
          </h2>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              <span>{formatDate(post.date)}</span>
            </div>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                >
                  <Tag size={12} />
                  {tag}
                </span>
              ))}
            </div>
          )}

          <p className="text-gray-600 line-clamp-3 flex-grow">
            {excerpt}...
          </p>

          <div className="mt-4 text-blue-600 font-medium inline-flex items-center gap-1 group">
            Read more 
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
