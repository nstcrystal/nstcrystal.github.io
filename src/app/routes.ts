import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Projects } from './pages/Projects';
import { Blog } from './pages/Blog';
import { NotFound } from './pages/NotFound';

/**
 * Router configuration using React Router Data mode
 * Defines all application routes
 */
export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'about',
        Component: About,
      },
      {
        path: 'projects',
        Component: Projects,
      },
      {
        path: 'blog',
        Component: Blog,
      },
      {
        path: '*',
        Component: NotFound,
      },
    ],
  },
]);