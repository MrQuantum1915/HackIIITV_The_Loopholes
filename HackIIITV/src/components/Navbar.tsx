// In src/components/Navbar.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="text-white rounded-md">
            <img src="/logo.webp" alt="Logo" className="h-10 w-10" />
          </div>
          <span className="text-2xl font-bold text-compass-700">Loopholes</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/roadmap" className="text-gray-700 hover:text-compass-600">
            Roadmap
          </Link>
          <Link to="/planner" className="text-gray-700 hover:text-compass-600">
            Daily Planner
          </Link>
          <Link to="/mentors" className="text-gray-700 hover:text-compass-600">
            Find Mentors
          </Link>
          <Link to="/resources" className="text-gray-700 hover:text-compass-600">
            Resources
          </Link>
          <Link to="/chatbot" className="text-gray-700 hover:text-compass-600"> {/* Add the Chatbot link */}
            Chatbot
          </Link>
        </div>

        {/* User Controls */}
        {/* ... (rest of the Navbar code) */}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3 px-6 space-y-3">
            <Link to="/roadmap" className="block py-2 text-gray-700 hover:text-compass-600">
              Roadmap
            </Link>
            <Link to="/planner" className="block py-2 text-gray-700 hover:text-compass-600">
              Daily Planner
            </Link>
            <Link to="/mentors" className="block py-2 text-gray-700 hover:text-compass-600">
              Find Mentors
            </Link>
            <Link to="/resources" className="block py-2 text-gray-700 hover:text-compass-600">
              Resources
            </Link>
            <Link to="/chatbot" className="block py-2 text-gray-700 hover:text-compass-600"> {/* Add the Chatbot link */}
              Chatbot
            </Link>
            {/* ... (rest of the mobile menu) */}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
