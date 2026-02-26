import { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import { BlogItem } from '../components/BlogItem';
import type { BlogPost } from '../types';

/**
 * Blog Page Component
 * Displays blog posts with CRUD functionality using localStorage
 */
export function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({ title: '', content: '' });

  // Load posts from localStorage on mount
  useEffect(() => {
    const savedPosts = localStorage.getItem('blogPosts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);

  // Save posts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('blogPosts', JSON.stringify(posts));
  }, [posts]);

  /**
   * Handle form submission for creating or updating a post
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Please fill in all fields');
      return;
    }

    if (editingPost) {
      // Update existing post
      setPosts(
        posts.map((post) =>
          post.id === editingPost.id
            ? {
                ...post,
                title: formData.title,
                content: formData.content,
                updatedAt: new Date().toISOString(),
              }
            : post
        )
      );
    } else {
      // Create new post
      const newPost: BlogPost = {
        id: Date.now().toString(),
        title: formData.title,
        content: formData.content,
        createdAt: new Date().toISOString(),
      };
      setPosts([newPost, ...posts]);
    }

    // Reset form
    setFormData({ title: '', content: '' });
    setIsFormOpen(false);
    setEditingPost(null);
  };

  /**
   * Handle edit button click
   */
  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({ title: post.title, content: post.content });
    setIsFormOpen(true);
  };

  /**
   * Handle delete button click
   */
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts(posts.filter((post) => post.id !== id));
    }
  };

  /**
   * Handle cancel button click
   */
  const handleCancel = () => {
    setFormData({ title: '', content: '' });
    setIsFormOpen(false);
    setEditingPost(null);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Blog</h1>
            <p className="text-xl text-gray-600">
              My thoughts, experiences, and learnings
            </p>
          </div>
          <button
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            New Post
          </button>
        </div>

        {/* Create/Edit Form */}
        {isFormOpen && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border-2 border-blue-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-900">
                {editingPost ? 'Edit Post' : 'Create New Post'}
              </h2>
              <button
                onClick={handleCancel}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-md transition-colors"
                aria-label="Close form"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter post title"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Content
                </label>
                <textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  rows={8}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Write your post content..."
                  required
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingPost ? 'Update Post' : 'Publish Post'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Blog Posts */}
        <div className="space-y-6">
          {posts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <p className="text-gray-600 text-lg mb-4">
                No blog posts yet. Create your first post!
              </p>
              <button
                onClick={() => setIsFormOpen(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Write Your First Post
              </button>
            </div>
          ) : (
            posts.map((post) => (
              <BlogItem
                key={post.id}
                post={post}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
