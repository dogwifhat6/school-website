import React from 'react';
import { useAdmin } from '../context/AdminContext';

export default function Faculty() {
  const { facultyPhotos } = useAdmin();

  return (
    <div className="min-h-screen py-10 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-indigo-700 mb-4">
            Faculty
          </h1>
          <p className="text-xl text-gray-600">
            Meet the dedicated educators of our school
          </p>
        </div>

        {facultyPhotos.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-lg">
            <p className="text-gray-600 text-lg">
              No faculty photos added yet. Please log in as admin to add faculty details.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facultyPhotos.map((photo) => (
              <div
                key={photo.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden card-hover"
              >
                <div className="aspect-square overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100">
                  {photo.imageUrl ? (
                    <img
                      src={photo.imageUrl}
                      alt={photo.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl">
                      👨‍🏫
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-indigo-700 mb-1">
                    {photo.name}
                  </h3>
                  <p className="text-gray-600 mb-1">{photo.position}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


