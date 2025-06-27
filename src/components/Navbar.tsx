import  { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Palette } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Palette className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Konkora</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                isActive 
                  ? "text-indigo-600 font-medium"
                  : "text-gray-800 hover:text-indigo-600 transition-colors"
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/services" 
              className={({ isActive }) => 
                isActive 
                  ? "text-indigo-600 font-medium"
                  : "text-gray-800 hover:text-indigo-600 transition-colors"
              }
            >
              Services
            </NavLink>
            <NavLink 
              to="/portfolio" 
              className={({ isActive }) => 
                isActive 
                  ? "text-indigo-600 font-medium"
                  : "text-gray-800 hover:text-indigo-600 transition-colors"
              }
            >
              Portfolio
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                isActive 
                  ? "text-indigo-600 font-medium"
                  : "text-gray-800 hover:text-indigo-600 transition-colors"
              }
            >
              Contact
            </NavLink>
            <Link 
              to="/login" 
              className="ml-4 btn btn-outline py-2 px-4 rounded-md text-sm"
            >
              Admin
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-indigo-600 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                isActive 
                  ? "block px-3 py-2 text-base font-medium text-indigo-600 bg-gray-50 rounded-md"
                  : "block px-3 py-2 text-base font-medium text-gray-800 hover:text-indigo-600 hover:bg-gray-50 rounded-md"
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink 
              to="/services" 
              className={({ isActive }) => 
                isActive 
                  ? "block px-3 py-2 text-base font-medium text-indigo-600 bg-gray-50 rounded-md"
                  : "block px-3 py-2 text-base font-medium text-gray-800 hover:text-indigo-600 hover:bg-gray-50 rounded-md"
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </NavLink>
            <NavLink 
              to="/portfolio" 
              className={({ isActive }) => 
                isActive 
                  ? "block px-3 py-2 text-base font-medium text-indigo-600 bg-gray-50 rounded-md"
                  : "block px-3 py-2 text-base font-medium text-gray-800 hover:text-indigo-600 hover:bg-gray-50 rounded-md"
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              Portfolio
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                isActive 
                  ? "block px-3 py-2 text-base font-medium text-indigo-600 bg-gray-50 rounded-md"
                  : "block px-3 py-2 text-base font-medium text-gray-800 hover:text-indigo-600 hover:bg-gray-50 rounded-md"
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </NavLink>
            <NavLink 
              to="/login" 
              className="block px-3 py-2 text-base font-medium text-gray-800 hover:text-indigo-600 hover:bg-gray-50 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Admin
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}
 