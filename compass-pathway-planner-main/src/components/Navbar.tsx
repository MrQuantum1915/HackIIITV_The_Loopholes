
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
  DropdownMenuTrigger
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
          <Link to="/roadmap" className="text-gray-700 hover:text-compass-600">Roadmap</Link>
          <Link to="/planner" className="text-gray-700 hover:text-compass-600">Daily Planner</Link>
          <Link to="/mentors" className="text-gray-700 hover:text-compass-600">Find Mentors</Link>
          <Link to="/resources" className="text-gray-700 hover:text-compass-600">Resources</Link>
        </div>
        
        {/* User Controls */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-compass-600 rounded-full"></span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2">
                <div className="bg-compass-100 text-compass-600 p-1 rounded-full">
                  <User className="h-5 w-5" />
                </div>
                <span>Profile</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/profile" className="w-full">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/settings" className="w-full">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/logout" className="w-full">Logout</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex items-center" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden pt-4 pb-3 px-6 space-y-3">
          <Link to="/roadmap" className="block py-2 text-gray-700 hover:text-compass-600">Roadmap</Link>
          <Link to="/planner" className="block py-2 text-gray-700 hover:text-compass-600">Daily Planner</Link>
          <Link to="/mentors" className="block py-2 text-gray-700 hover:text-compass-600">Find Mentors</Link>
          <Link to="/resources" className="block py-2 text-gray-700 hover:text-compass-600">Resources</Link>
          <div className="pt-2 border-t border-gray-200">
            <Link to="/profile" className="block py-2 text-gray-700 hover:text-compass-600">Profile</Link>
            <Link to="/settings" className="block py-2 text-gray-700 hover:text-compass-600">Settings</Link>
            <Link to="/logout" className="block py-2 text-gray-700 hover:text-compass-600">Logout</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
