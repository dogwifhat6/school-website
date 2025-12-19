import React, { useState, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxImage, setLightboxImage] = useState(null);
  const [visibleImages, setVisibleImages] = useState(new Set());
  const { facultyPhotos, events } = useAdmin();

  const categories = ['all', 'faculty', 'events'];

  // Combine all photos
  const allPhotos = [
    ...facultyPhotos.map(photo => ({
      id: photo.id,
      category: 'faculty',
      title: photo.name,
      description: photo.position,
      imageUrl: photo.imageUrl,
      type: 'faculty'
    })),
    ...events.map(event => ({
      id: event.id,
      category: 'events',
      title: event.title,
      description: event.description,
      imageUrl: event.imageUrl || null,
      type: 'event',
      date: event.date
    }))
  ];

  const filteredImages = selectedCategory === 'all' 
    ? allPhotos 
    : allPhotos.filter(img => img.category === selectedCategory);

  useEffect(() => {
    const observers = filteredImages.map((img) => {
      const element = document.getElementById(`gallery-item-${img.id}`);
      if (!element) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleImages((prev) => new Set([...prev, img.id]));
            }
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(element);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, [filteredImages]);

  const openLightbox = (image) => {
    setLightboxImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') closeLightbox();
    };
    if (lightboxImage) {
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }
  }, [lightboxImage]);

  return (
    <div className="min-h-screen py-10 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-indigo-700 mb-4">
            Gallery
          </h1>
          <p className="text-xl text-gray-600">
            Explore our school's vibrant moments and achievements
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-indigo-50 shadow-md hover:shadow-lg'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              id={`gallery-item-${image.id}`}
              className={`bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform transition-all duration-500 cursor-pointer group ${
                visibleImages.has(image.id)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => openLightbox(image)}
            >
              {/* Image */}
              {image.imageUrl ? (
                <div className="aspect-square overflow-hidden">
                  <img
                    src={image.imageUrl}
                    alt={image.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="aspect-square bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-8xl transform group-hover:scale-110 transition-transform duration-300 hidden">
                    {image.type === 'faculty' ? '👨‍🏫' : image.type === 'event' ? '🎉' : '⚽'}
                  </div>
                </div>
              ) : (
                <div className="aspect-square bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-8xl transform group-hover:scale-110 transition-transform duration-300">
                  {image.type === 'faculty' ? '👨‍🏫' : image.type === 'event' ? '🎉' : '⚽'}
                </div>
              )}
              <div className="p-4">
                <h3 className="text-lg font-bold text-indigo-700 group-hover:text-indigo-600 transition-colors">
                  {image.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {image.description || 'Click to view'}
                </p>
              </div>
            </div>
          ))}
          {filteredImages.length === 0 && (
            <div className="col-span-3 text-center py-12">
              <p className="text-gray-600 text-xl">No photos available in this category.</p>
              <p className="text-gray-500 text-sm mt-2">Admin can add photos from the admin dashboard.</p>
            </div>
          )}
        </div>

        {/* Lightbox */}
        {lightboxImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={closeLightbox}
          >
            <div className="relative max-w-4xl max-h-full">
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 text-white text-4xl hover:text-indigo-400 transition-colors duration-300"
                aria-label="Close"
              >
                ✕
              </button>
              <div
                className="bg-white rounded-lg p-8 max-w-4xl max-h-[90vh] overflow-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {lightboxImage.imageUrl ? (
                  <img
                    src={lightboxImage.imageUrl}
                    alt={lightboxImage.title}
                    className="w-full h-auto rounded-lg mb-4"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="text-8xl text-center mb-4">
                    {lightboxImage.type === 'faculty' ? '👨‍🏫' : '⚽'}
                  </div>
                )}
                <h2 className="text-3xl font-bold text-indigo-700 text-center mb-4">
                  {lightboxImage.title}
                </h2>
                {lightboxImage.description && (
                  <p className="text-gray-600 text-center">
                    {lightboxImage.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
