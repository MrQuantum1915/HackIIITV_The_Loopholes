
import React, { ReactNode } from 'react';
import Navbar from './Navbar';

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  title, 
  subtitle 
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {(title || subtitle) && (
          <div className="mb-8 text-center md:text-left">
            {title && <h1 className="text-3xl font-bold text-gray-900">{title}</h1>}
            {subtitle && <p className="mt-2 text-lg text-gray-600">{subtitle}</p>}
          </div>
        )}
        
        {children}
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center space-x-2">
                <div className="text-white rounded-md">
                <img src="/logo.webp" alt="Logo" className="h-8 w-8" />
                </div>
                <span className="font-bold text-compass-700">Loopholes</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Your Academic Pathway Planner</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-compass-600">About</a>
              <a href="#" className="text-gray-600 hover:text-compass-600">Contact</a>
              <a href="#" className="text-gray-600 hover:text-compass-600">Privacy</a>
              <a href="#" className="text-gray-600 hover:text-compass-600">Terms</a>
            </div>
          </div>
          <div className="text-center mt-6 text-sm text-gray-500">
            © {new Date().getFullYear()} Loopholes. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PageLayout;
