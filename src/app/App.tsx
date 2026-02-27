import { RouterProvider } from 'react-router';
import { router } from './routes';

/**
 * Main App Component
 * Entry point of the application using React Router
 */
export default function App() {
  return <RouterProvider router={router} />;
}
