import  { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Palette } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center">
              <Palette className="h-8 w-8 text-indigo-400" />
              <span className="ml-2 text-xl font-bold text-white">Konkora</span>
            </Link>
            <p className="mt-4 text-gray-400 text-sm">
              Creative design studio specializing in wedding invitations, birthday cards, website development, and prototype creation.
            </p>
          </div>
          
          {/* Quick links */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-indigo-400 transition-colors">Home</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-indigo-400 transition-colors">Services</Link></li>
              <li><Link to="/portfolio" className="text-gray-400 hover:text-indigo-400 transition-colors">Portfolio</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-indigo-400 transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          {/* Contact info */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-4 text-white">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-indigo-400 mr-2 mt-1" />
                <span className="text-gray-400">+250 798515630</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-indigo-400 mr-2 mt-1" />
                <span className="text-gray-400">nshutifidele1@gmail.com</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-indigo-400 mr-2 mt-1" />
                <span className="text-gray-400">Rwanda, Rubavu District</span>
              </li>
            </ul>
          </div>
          
          {/* Social links */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-4 text-white">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-600 transition-colors">
                <Facebook className="h-5 w-5 text-white" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-600 transition-colors">
                <Instagram className="h-5 w-5 text-white" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-600 transition-colors">
                <Twitter className="h-5 w-5 text-white" />
              </a>
            </div>
            <p className="mt-6 text-sm text-gray-400">
              Subscribe to our newsletter for the latest updates on our designs and services.
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8">
          <p className="text-center text-gray-400 text-sm">
            &copy; {currentYear} Konkora Design Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
 