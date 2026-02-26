import { Outlet } from 'react-router';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

/**
 * Layout component that wraps all pages
 * Provides consistent navigation and footer across the application
 */
export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
