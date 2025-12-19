import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const { schoolName, schoolLogo, schoolPhoto } = useAdmin();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: '📚',
      title: 'Quality Education',
      description: 'Excellence in teaching and learning'
    },
    {
      icon: '🎓',
      title: 'Expert Faculty',
      description: 'Experienced and dedicated teachers'
    },
    {
      icon: '🌟',
      title: 'Holistic Development',
      description: 'Nurturing minds and character'
    },
    {
      icon: '🏆',
      title: 'Achievements',
      description: 'Celebrating success and growth'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h1 className="text-5xl md:text-7xl font-bold text-indigo-700 mb-6 animate-fade-in">
              Welcome to <span className="text-purple-600">{schoolName}</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 animate-fade-in-delay">
              A place where learning meets creativity
            </p>
            <div className="flex gap-4 flex-wrap animate-fade-in-delay-2">
              <Link
                to="/about"
                className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Learn More
              </Link>
              <Link
                to="/contact"
                className="px-8 py-3 bg-white text-indigo-600 border-2 border-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* School Photo */}
          <div className="relative animate-fade-in-delay">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-gradient-to-br from-indigo-100 to-purple-100">
              {schoolPhoto ? (
                <img
                  src={schoolPhoto}
                  alt={`${schoolName} campus`}
                  className="w-full h-72 md:h-96 object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-full h-72 md:h-96 flex items-center justify-center text-center px-6 text-gray-500">
                  <p>
                    Add a school photo via the admin dashboard "School & Logo" section to show it here.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-indigo-200 rounded-full opacity-20 animate-float-delay"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-200 rounded-full opacity-20 animate-float-delay-2"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-indigo-700 mb-12">
            Why Choose Us?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer group"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-indigo-700 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Join Us?</h2>
          <p className="text-xl mb-8 opacity-90">
            Discover more about our programs and facilities
          </p>
          <Link
            to="/events"
            className="inline-block px-8 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View Events
          </Link>
        </div>
      </section>
    </div>
  );
}
