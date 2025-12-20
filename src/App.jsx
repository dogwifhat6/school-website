import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdminProvider, useAdmin } from './context/AdminContext';

// Debug: Log when App loads
console.log('🚀 APP.JSX LOADED');
console.log('🚀 Environment variables:', import.meta.env);
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Faculty from './pages/Faculty';
import Events from './pages/Events';
import Facilities from './pages/Facilities';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 p-4 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transform transition-all duration-300 hover:scale-110 hover:shadow-2xl ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
}

function AppContent() {
  const { schoolName, contactEmail, contactPhone, contactAddress } = useAdmin();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 text-gray-800">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/events" element={<Events />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      <footer className="mt-20 py-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">{schoolName}</h3>
              <p className="text-indigo-100">
                Empowering students to achieve excellence through quality education and holistic development.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-indigo-100">
                <li><a href="/" className="hover:text-white transition-colors duration-300">Home</a></li>
                <li><a href="/about" className="hover:text-white transition-colors duration-300">About</a></li>
                <li><a href="/faculty" className="hover:text-white transition-colors duration-300">Faculty</a></li>
                <li><a href="/events" className="hover:text-white transition-colors duration-300">Events</a></li>
                <li><a href="/facilities" className="hover:text-white transition-colors duration-300">Facilities</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors duration-300">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-indigo-100">
                <li>📧 {contactEmail}</li>
                <li>📞 {contactPhone}</li>
                <li>📍 {contactAddress}</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-indigo-400 pt-8 text-center text-indigo-100">
            © 2025 {schoolName} — All Rights Reserved
          </div>
        </div>
      </footer>
      <ScrollToTop />
    </div>
  );
}

export default function App() {
  return (
    <AdminProvider>
      <Router>
        <AppContent />
      </Router>
    </AdminProvider>
  );
}
