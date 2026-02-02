import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 text-primary">EduPlatform</h3>
            <p className="text-gray-500 text-sm">
              Empowering learners worldwide with high-quality courses and expert instructors.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-gray-900">Platform</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="/courses" className="hover:text-primary">Browse</a></li>
              <li><a href="#" className="hover:text-primary">Mentorship</a></li>
              <li><a href="#" className="hover:text-primary">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-gray-900">Support</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-primary">FAQ</a></li>
              <li><a href="#" className="hover:text-primary">Contact</a></li>
              <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-gray-900">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Github className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-blue-700 transition-colors"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-100 mt-12 pt-8 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} EduPlatform. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
