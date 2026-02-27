import { Calendar, Tag } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import type { BlogPost } from '../types';
import { cardHover } from '../utils/animations';

interface BlogPostCardProps {
  post: BlogPost;
}

/**
 * Blog Post Card Component
 * Displays a blog post preview with animated hover effect
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

  // Extract first paragraph as excerpt
  const excerpt = post.content
    .split('\n')
    .find(line => line.trim() && !line.startsWith('#'))
    ?.substring(0, 150) || '';

  return (
    <motion.article
      className="bg-white rounded-lg shadow-md overflow-hidden"
      variants={cardHover}
      initial="rest"
      whileHover="hover"
    >
      <Link to={`/blog/${post.id}`} className="block">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
            {post.title}
          </h2>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              <span>{formatDate(post.createdAt)}</span>
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

          <p className="text-gray-600 line-clamp-3">
            {excerpt}...
          </p>

          <div className="mt-4 text-blue-600 font-medium inline-flex items-center group-hover:gap-2 transition-all">
            Read more →
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
