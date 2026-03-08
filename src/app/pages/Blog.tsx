import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { blogPosts } from '../data/blogPosts';
import { BlogPostCard } from '../components/BlogPostCard';
import { PageTransition } from '../components/PageTransition';
import { filterItemVariants } from '../utils/animations';

/**
 * Blog Page Component - Owner Managed
 * 
 * Displays blog posts managed by the website owner through data files.
 * This approach is better for portfolios because:
 * 
 * 1. Security: No public CRUD endpoints to exploit
 * 2. Performance: No database queries needed
 * 3. SEO: Content is available at build time
 * 4. Version Control: Track changes with Git
 * 5. Simplicity: No backend infrastructure required
 * 6. Cost: Free hosting on static platforms
 * 
 * To add a new post: Edit /src/app/data/blogPosts.ts
 */
export function Blog() {
  const [selectedTag, setSelectedTag] = useState<string>('All');

  // Extract unique tags from all posts
  const allTags = Array.from(
    new Set(blogPosts.flatMap((post) => post.tags || []))
  ).sort();

  // Sort posts by ID descending (newest first) and filter based on selected tag
  const filteredPosts = useMemo(() => {
    const sorted = [...blogPosts].sort((a, b) => Number(b.id) - Number(a.id));
    return selectedTag === 'All'
      ? sorted
      : sorted.filter((post) => post.tags?.includes(selectedTag));
  }, [selectedTag]);

  return (
    <PageTransition>
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
            <p className="text-xl text-gray-600">
              My thoughts, experiences, and learnings
            </p>
          </motion.div>

          {/* Tag Filter */}
          {allTags.length > 0 && (
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex flex-wrap gap-2 justify-center">
                <button
                  onClick={() => setSelectedTag('All')}
                  className={`px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedTag === 'All'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-100 hover:shadow-sm border border-gray-300'
                  }`}
                >
                  All
                </button>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedTag === tag
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-white text-gray-700 hover:bg-gray-100 hover:shadow-sm border border-gray-300'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="wait">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  variants={filterItemVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ delay: index * 0.04 }}
                  className="h-full"
                >
                  <BlogPostCard post={post} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* No Results Message */}
          {filteredPosts.length === 0 && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-gray-600 text-lg">
                No blog posts found with the selected tag.
              </p>
            </motion.div>
          )}

          {/* Post Count */}
          <motion.div
            className="text-center mt-12 text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Showing {filteredPosts.length} of {blogPosts.length} posts
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
