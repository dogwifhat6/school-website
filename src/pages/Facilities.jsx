import React from 'react';
import { useAdmin } from '../context/AdminContext';

export default function Facilities() {
  const { facilities } = useAdmin();

  return (
    <div className="min-h-screen py-10 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-indigo-700 mb-4">
            Facilities
          </h1>
          <p className="text-xl text-gray-600">
            Explore the facilities that support our students&apos; growth
          </p>
        </div>

        {facilities.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-lg">
            <p className="text-gray-600 text-lg">
              No facilities added yet. Please log in as admin to add facilities.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((facility) => (
              <div
                key={facility.id}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                {facility.icon && (
                  <div className="text-5xl mb-4 text-center">
                    {facility.icon}
                  </div>
                )}
                <h3 className="text-xl font-bold text-indigo-700 mb-2 text-center">
                  {facility.name}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {facility.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


