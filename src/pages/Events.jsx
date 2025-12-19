import React from 'react';
import { useAdmin } from '../context/AdminContext';

export default function Events() {
  const { events } = useAdmin();

  const sortedEvents = [...events].sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date) - new Date(a.date);
  });

  return (
    <div className="min-h-screen py-10 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-indigo-700 mb-4">
            Events
          </h1>
          <p className="text-xl text-gray-600">
            Discover our school events and celebrations
          </p>
        </div>

        {sortedEvents.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-lg">
            <p className="text-gray-600 text-lg">
              No events added yet. Please log in as admin to add events.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {sortedEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden md:flex card-hover"
              >
                {event.imageUrl && (
                  <div className="md:w-1/3 w-full h-56 md:h-auto overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                <div className={`p-6 ${event.imageUrl ? 'md:w-2/3' : 'w-full'}`}>
                  <h3 className="text-2xl font-bold text-indigo-700 mb-2">
                    {event.title}
                  </h3>
                  {event.date && (
                    <p className="text-sm text-gray-500 mb-2">
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                  )}
                  <p className="text-gray-600 mb-2">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


