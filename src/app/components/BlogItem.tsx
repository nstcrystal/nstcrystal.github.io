import { Calendar, Edit2, Trash2 } from 'lucide-react';
import type { BlogPost } from '../types';

interface BlogItemProps {
  post: BlogPost;
  onEdit: (post: BlogPost) => void;
  onDelete: (id: string) => void;
}

/**
 * Blog item component
 * Displays a single blog post with edit and delete actions
 */
export function BlogItem({ post, onEdit, onDelete }: BlogItemProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <article className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-semibold text-gray-900">
          {post.title}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(post)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            aria-label="Edit post"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={() => onDelete(post.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
            aria-label="Delete post"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <Calendar size={16} />
        <span>{formatDate(post.createdAt)}</span>
        {post.updatedAt && post.updatedAt !== post.createdAt && (
          <span className="text-xs">
            (Updated: {formatDate(post.updatedAt)})
          </span>
        )}
      </div>

      <div className="text-gray-700 whitespace-pre-wrap">
        {post.content}
      </div>
    </article>
  );
}
