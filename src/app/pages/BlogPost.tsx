import { useParams, Link } from 'react-router';
import { Calendar, Tag, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { useMemo } from 'react';
import { getBlogPostBySlug, getBlogPostById } from '../utils/blogLoader';
import { MarkdownContent } from '../components/MarkdownContent';
import { TableOfContents } from '../components/TableOfContents';
import { PageTransition } from '../components/PageTransition';
import { BackToTopButton } from '../components/BackToTopButton';

/**
 * Individual Blog Post Page
 * Displays full blog post content with Markdown rendering
 * Features:
 * - Sidebar Table of Contents on desktop
 * - Collapsible TOC on mobile
 * - Supports both slug-based and id-based routing
 */
export function BlogPost() {
  const { id } = useParams<{ id: string }>();
  
  // Try to find post by slug first, then by id (for backwards compatibility)
  const post = useMemo(() => {
    if (!id) return undefined;
    
    // First try as slug
    const bySlug = getBlogPostBySlug(id);
    if (bySlug) return bySlug;
    
    // Then try as numeric id
    const numId = parseInt(id, 10);
    if (!isNaN(numId)) {
      return getBlogPostById(numId);
    }
    
    return undefined;
  }, [id]);

  if (!post) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
            <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
            <Link
              to="/blog"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-block"
            >
              Back to Blog
            </Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <PageTransition>
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Blog
            </Link>
          </motion.div>

          {/* Main Layout: TOC Sidebar + Content */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Table of Contents - Sidebar on desktop, top on mobile */}
            <aside className="lg:w-72 lg:flex-shrink-0">
              <div className="toc-sidebar">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <TableOfContents content={post.content} />
                </motion.div>
              </div>
            </aside>

            {/* Main Article Content */}
            <article className="flex-1 min-w-0">
              {/* Post Header */}
              <motion.header
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  {post.title}
                </h1>

                <div className="flex items-center gap-4 text-gray-600 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar size={18} />
                    <span>{formatDate(post.date)}</span>
                  </div>
                </div>

                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                      >
                        <Tag size={14} />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.header>

              {/* Cover Image */}
              {post.coverImage && (
                <motion.div
                  className="mb-8 rounded-lg overflow-hidden shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-auto"
                  />
                </motion.div>
              )}

              {/* Post Content */}
              <motion.div
                className="bg-white rounded-lg shadow-md p-6 md:p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <MarkdownContent content={post.content} slug={post.slug} />
              </motion.div>

              {/* Related Posts / Navigation */}
              <motion.div
                className="mt-12 pt-8 border-t border-gray-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <ArrowLeft size={20} />
                  View All Posts
                </Link>
              </motion.div>
            </article>
          </div>
        </div>
      </div>
      <BackToTopButton />
    </PageTransition>
  );
}
