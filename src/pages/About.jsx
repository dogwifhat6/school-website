import React, { useEffect, useRef, useState } from 'react';
import { useAdmin } from '../context/AdminContext';

export default function About() {
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef([]);
  const { facilities } = useAdmin();

  useEffect(() => {
    const observers = sectionRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleSections((prev) => new Set([...prev, index]));
            }
          });
        },
        { threshold: 0.1 }
      );
      
      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  const stats = [
    { number: '500+', label: 'Students' },
    { number: '50+', label: 'Teachers' },
    { number: '20+', label: 'Years Experience' },
    { number: '95%', label: 'Success Rate' }
  ];

  const values = [
    {
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, setting high standards for our students and ourselves.',
      icon: '⭐'
    },
    {
      title: 'Innovation',
      description: 'Embracing new teaching methods and technologies to enhance the learning experience.',
      icon: '💡'
    },
    {
      title: 'Community',
      description: 'Building a strong sense of community where everyone feels valued and supported.',
      icon: '🤝'
    },
    {
      title: 'Growth',
      description: 'Fostering personal and academic growth in a nurturing and encouraging environment.',
      icon: '🌱'
    }
  ];

  return (
    <div className="min-h-screen py-10 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div 
          ref={(el) => (sectionRefs.current[0] = el)}
          className={`text-center mb-16 transition-all duration-1000 ${
            visibleSections.has(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-indigo-700 mb-4">
            About Us
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We focus on excellence and student growth, creating an environment where every student can thrive.
          </p>
        </div>

        {/* Stats Section */}
        <div 
          ref={(el) => (sectionRefs.current[1] = el)}
          className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 transition-all duration-1000 ${
            visibleSections.has(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Mission Section */}
        <div 
          ref={(el) => (sectionRefs.current[2] = el)}
          className={`bg-gradient-to-r from-indigo-50 to-purple-50 p-8 md:p-12 rounded-2xl mb-20 transition-all duration-1000 ${
            visibleSections.has(2) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}
        >
          <h2 className="text-3xl font-bold text-indigo-700 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our mission is to provide a world-class education that empowers students to reach their full potential. 
            We believe in fostering critical thinking, creativity, and character development alongside academic excellence. 
            Through innovative teaching methods and a supportive community, we prepare our students to be confident, 
            responsible, and successful individuals ready to make a positive impact in the world.
          </p>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-indigo-700 mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                ref={(el) => (sectionRefs.current[3 + index] = el)}
                className={`bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 cursor-pointer group ${
                  visibleSections.has(3 + index) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-5xl mb-4 transform group-hover:rotate-12 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-indigo-700 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Facilities Section */}
        {facilities.length > 0 && (
          <div 
            ref={(el) => (sectionRefs.current[7] = el)}
            className={`mb-20 transition-all duration-1000 ${
              visibleSections.has(7) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl font-bold text-center text-indigo-700 mb-12">Our Facilities</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {facilities.map((facility, index) => (
                <div
                  key={facility.id}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {facility.icon && (
                    <div className="text-5xl mb-4 text-center">{facility.icon}</div>
                  )}
                  <h3 className="text-xl font-bold text-indigo-700 mb-3 text-center">
                    {facility.name}
                  </h3>
                  <p className="text-gray-600 text-center leading-relaxed">
                    {facility.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* History Section */}
        <div 
          ref={(el) => (sectionRefs.current[8] = el)}
          className={`bg-white p-8 md:p-12 rounded-2xl shadow-lg transition-all duration-1000 ${
            visibleSections.has(8) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}
        >
          <h2 className="text-3xl font-bold text-indigo-700 mb-4">Our History</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Founded with a vision to transform education, our school has been a beacon of learning and excellence 
            for over two decades. We started as a small institution with a big dream and have grown into a 
            comprehensive educational community serving hundreds of students. Our journey has been marked by 
            continuous innovation, dedicated faculty, and the success of our students who have gone on to achieve 
            great things in their chosen fields.
          </p>
        </div>
      </div>
    </div>
  );
}
