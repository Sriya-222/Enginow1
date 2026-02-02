import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, User, LogIn } from 'lucide-react';

const Header = () => {
  // TODO: Get auth state from context
  const user = null; 

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              EduPlatform
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/courses" className="text-gray-600 hover:text-primary transition-colors">
              Browse Courses
            </Link>
            
            {user ? (
              <Link to="/dashboard" className="flex items-center space-x-2 text-gray-600 hover:text-primary">
                <User className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-600 hover:text-primary font-medium">
                  Login
                </Link>
                <Link to="/signup" className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg">
                  <LogIn className="h-4 w-4 mr-2" />
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
