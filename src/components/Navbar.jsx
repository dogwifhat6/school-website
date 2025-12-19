import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, schoolName, schoolLogo } = useAdmin();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`w-full bg-white shadow-lg sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'shadow-xl' : 'shadow-lg'
    }`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors duration-300">
          {schoolLogo && (
            <img
              src={schoolLogo}
              alt="School Logo"
              className="h-10 w-10 object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          )}
          <span>{schoolName}</span>
        </Link>
        
        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-lg font-medium items-center">
          <li>
            <Link 
              className={`relative transition-all duration-300 hover:text-indigo-600 ${
                isActive('/') ? 'text-indigo-600 font-semibold' : 'text-gray-700'
              }`}
              to="/"
            >
              Home
              {isActive('/') && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-600 animate-slide-in"></span>
              )}
            </Link>
          </li>
          <li>
            <Link 
              className={`relative transition-all duration-300 hover:text-indigo-600 ${
                isActive('/about') ? 'text-indigo-600 font-semibold' : 'text-gray-700'
              }`}
              to="/about"
            >
              About
              {isActive('/about') && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-600 animate-slide-in"></span>
              )}
            </Link>
          </li>
          <li>
            <Link 
              className={`relative transition-all duration-300 hover:text-indigo-600 ${
                isActive('/faculty') ? 'text-indigo-600 font-semibold' : 'text-gray-700'
              }`}
              to="/faculty"
            >
              Faculty
              {isActive('/faculty') && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-600 animate-slide-in"></span>
              )}
            </Link>
          </li>
          <li>
            <Link 
              className={`relative transition-all duration-300 hover:text-indigo-600 ${
                isActive('/events') ? 'text-indigo-600 font-semibold' : 'text-gray-700'
              }`}
              to="/events"
            >
              Events
              {isActive('/events') && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-600 animate-slide-in"></span>
              )}
            </Link>
          </li>
          <li>
            <Link 
              className={`relative transition-all duration-300 hover:text-indigo-600 ${
                isActive('/facilities') ? 'text-indigo-600 font-semibold' : 'text-gray-700'
              }`}
              to="/facilities"
            >
              Facilities
              {isActive('/facilities') && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-600 animate-slide-in"></span>
              )}
            </Link>
          </li>
          <li>
            <Link 
              className={`relative transition-all duration-300 hover:text-indigo-600 ${
                isActive('/contact') ? 'text-indigo-600 font-semibold' : 'text-gray-700'
              }`}
              to="/contact"
            >
              Contact
              {isActive('/contact') && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-600 animate-slide-in"></span>
              )}
            </Link>
          </li>
          {isAuthenticated && (
            <li>
              <Link 
                className={`relative transition-all duration-300 hover:text-indigo-600 ${
                  isActive('/admin') ? 'text-indigo-600 font-semibold' : 'text-gray-700'
                }`}
                to="/admin"
              >
                Admin
                {isActive('/admin') && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-600 animate-slide-in"></span>
                )}
              </Link>
            </li>
          )}
          {!isAuthenticated && (
            <li>
              <Link 
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300"
                to="/admin/login"
              >
                Admin Login
              </Link>
            </li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 hover:text-indigo-600 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${
        isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <ul className="px-6 py-4 space-y-4">
          <li>
            <Link 
              className={`block transition-all duration-300 hover:text-indigo-600 ${
                isActive('/') ? 'text-indigo-600 font-semibold' : 'text-gray-700'
              }`}
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              className={`block transition-all duration-300 hover:text-indigo-600 ${
                isActive('/about') ? 'text-indigo-600 font-semibold' : 'text-gray-700'
              }`}
              to="/about"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <Link 
              className={`block transition-all duration-300 hover:text-indigo-600 ${
                isActive('/faculty') ? 'text-indigo-600 font-semibold' : 'text-gray-700'
              }`}
              to="/faculty"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Faculty
            </Link>
          </li>
          <li>
            <Link 
              className={`block transition-all duration-300 hover:text-indigo-600 ${
                isActive('/events') ? 'text-indigo-600 font-semibold' : 'text-gray-700'
              }`}
              to="/events"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Events
            </Link>
          </li>
          <li>
            <Link 
              className={`block transition-all duration-300 hover:text-indigo-600 ${
                isActive('/facilities') ? 'text-indigo-600 font-semibold' : 'text-gray-700'
              }`}
              to="/facilities"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Facilities
            </Link>
          </li>
          <li>
            <Link 
              className={`block transition-all duration-300 hover:text-indigo-600 ${
                isActive('/contact') ? 'text-indigo-600 font-semibold' : 'text-gray-700'
              }`}
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </li>
          {isAuthenticated && (
            <li>
              <Link 
                className={`block transition-all duration-300 hover:text-indigo-600 ${
                  isActive('/admin') ? 'text-indigo-600 font-semibold' : 'text-gray-700'
                }`}
                to="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Admin
              </Link>
            </li>
          )}
          {!isAuthenticated && (
            <li>
              <Link 
                className="block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300 text-center"
                to="/admin/login"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Admin Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
