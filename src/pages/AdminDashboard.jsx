import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

// Helper function to convert file to base64
const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const {
    isAuthenticated,
    logout,
    schoolName,
    setSchoolName,
    schoolLogo,
    setSchoolLogo,
    schoolPhoto,
    setSchoolPhoto,
    contactEmail,
    setContactEmail,
    contactPhone,
    setContactPhone,
    contactAddress,
    setContactAddress,
    facultyPhotos,
    addFacultyPhoto,
    deleteFacultyPhoto,
    facilities,
    addFacility,
    updateFacility,
    deleteFacility,
    events,
    addEvent,
    updateEvent,
    deleteEvent
  } = useAdmin();

  const [activeTab, setActiveTab] = useState('school');
  const [showAddFaculty, setShowAddFaculty] = useState(false);
  const [showAddFacility, setShowAddFacility] = useState(false);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [editingFacility, setEditingFacility] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);

  // Form states
  const [facultyForm, setFacultyForm] = useState({ name: '', imageUrl: '', position: '', imageFile: null });
  const [facilityForm, setFacilityForm] = useState({ name: '', description: '', icon: '' });
  const [eventForm, setEventForm] = useState({ title: '', date: '', description: '', imageUrl: '', imageFile: null });
  const [logoFile, setLogoFile] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAddFaculty = async (e) => {
    e.preventDefault();
    let imageUrl = facultyForm.imageUrl;
    
    // If file is uploaded, convert to base64
    if (facultyForm.imageFile) {
      try {
        imageUrl = await convertFileToBase64(facultyForm.imageFile);
      } catch (error) {
        alert('Error uploading image. Please try again.');
        return;
      }
    }
    
    if (!imageUrl) {
      alert('Please provide an image URL or upload an image file.');
      return;
    }
    
    addFacultyPhoto({ ...facultyForm, imageUrl });
    setFacultyForm({ name: '', imageUrl: '', position: '', imageFile: null });
    setShowAddFaculty(false);
  };

  const handleAddFacility = (e) => {
    e.preventDefault();
    if (editingFacility) {
      updateFacility(editingFacility.id, facilityForm);
      setEditingFacility(null);
    } else {
      addFacility(facilityForm);
    }
    setFacilityForm({ name: '', description: '', icon: '' });
    setShowAddFacility(false);
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    let imageUrl = eventForm.imageUrl;
    
    // If file is uploaded, convert to base64
    if (eventForm.imageFile) {
      try {
        imageUrl = await convertFileToBase64(eventForm.imageFile);
      } catch (error) {
        alert('Error uploading image. Please try again.');
        return;
      }
    }
    
    const eventData = { ...eventForm, imageUrl: imageUrl || null };
    
    if (editingEvent) {
      updateEvent(editingEvent.id, eventData);
      setEditingEvent(null);
    } else {
      addEvent(eventData);
    }
    setEventForm({ title: '', date: '', description: '', imageUrl: '', imageFile: null });
    setShowAddEvent(false);
  };

  const handleEditFacility = (facility) => {
    setEditingFacility(facility);
    setFacilityForm(facility);
    setShowAddFacility(true);
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setEventForm(event);
    setShowAddEvent(true);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-indigo-700">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage your school content</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-6">
          <div className="flex flex-wrap border-b border-gray-200">
            {[
              { id: 'school', label: 'School & Logo' },
              { id: 'faculty', label: 'Faculty Photos' },
              { id: 'facilities', label: 'Facilities' },
              { id: 'events', label: 'Events' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-semibold transition-colors duration-300 ${
                  activeTab === tab.id
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-600 hover:text-indigo-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* School Name & Logo Tab */}
        {activeTab === 'school' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-indigo-700 mb-6">School Information</h2>
            <div className="space-y-8">
              {/* School Name */}
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">School Name</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Current School Name</label>
                    <input
                      type="text"
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none transition-all duration-300"
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    This name will be displayed throughout the website.
                  </p>
                </div>
              </div>

              {/* School Logo */}
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">School Logo</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Upload Logo</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (file) {
                          try {
                            const base64 = await convertFileToBase64(file);
                            setSchoolLogo(base64);
                            setLogoFile(file);
                          } catch (error) {
                            alert('Error uploading logo. Please try again.');
                          }
                        }
                      }}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none transition-all duration-300"
                    />
                    {logoFile && (
                      <p className="text-sm text-green-600 mt-1">✓ {logoFile.name} selected</p>
                    )}
                  </div>
                  <div className="text-center text-gray-500">OR</div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Logo URL</label>
                    <input
                      type="url"
                      value={schoolLogo && !schoolLogo.startsWith('data:') ? schoolLogo : ''}
                      onChange={(e) => {
                        setSchoolLogo(e.target.value);
                        setLogoFile(null);
                      }}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none transition-all duration-300"
                      placeholder="https://example.com/logo.png"
                    />
                  </div>
                  {schoolLogo && (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Logo Preview:</p>
                      <div className="border-2 border-gray-200 rounded-lg p-4 inline-block">
                        <img
                          src={schoolLogo}
                          alt="School Logo"
                          className="max-h-32 max-w-48 object-contain"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'block';
                          }}
                        />
                        <div className="hidden text-gray-400 text-sm">Logo not found</div>
                      </div>
                    </div>
                  )}
                  <p className="text-sm text-gray-600">
                    The logo will be displayed in the navigation bar. Leave empty to show only the school name.
                  </p>
                </div>
              </div>

              {/* School Photo */}
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">School Photo (Homepage)</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Upload School Photo</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (file) {
                          try {
                            const base64 = await convertFileToBase64(file);
                            setSchoolPhoto(base64);
                            setPhotoFile(file);
                          } catch (error) {
                            alert('Error uploading school photo. Please try again.');
                          }
                        }
                      }}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none transition-all duration-300"
                    />
                    {photoFile && (
                      <p className="text-sm text-green-600 mt-1">✓ {photoFile.name} selected</p>
                    )}
                  </div>
                  <div className="text-center text-gray-500">OR</div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">School Photo URL</label>
                    <input
                      type="url"
                      value={schoolPhoto && !schoolPhoto.startsWith('data:') ? schoolPhoto : ''}
                      onChange={(e) => {
                        setSchoolPhoto(e.target.value);
                        setPhotoFile(null);
                      }}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none transition-all duration-300"
                      placeholder="https://example.com/school-photo.jpg"
                    />
                  </div>
                  {schoolPhoto && (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">School Photo Preview (used on Home page):</p>
                      <div className="border-2 border-gray-200 rounded-lg p-4 inline-block">
                        <img
                          src={schoolPhoto}
                          alt="School"
                          className="max-h-40 max-w-64 object-cover rounded-lg"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'block';
                          }}
                        />
                        <div className="hidden text-gray-400 text-sm">School photo not found</div>
                      </div>
                    </div>
                  )}
                  <p className="text-sm text-gray-600">
                    This photo appears beside the welcome text on the Home page.
                  </p>
                </div>
              </div>

              {/* Contact Details */}
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">Contact Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none transition-all duration-300"
                      placeholder="contact@school.com"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Phone</label>
                    <input
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none transition-all duration-300"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Address</label>
                    <textarea
                      value={contactAddress}
                      onChange={(e) => setContactAddress(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none transition-all duration-300"
                      rows="3"
                      placeholder="123 Education Street, Learning City, LC 12345"
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    These contact details will be displayed on the Contact page and in the footer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Faculty Photos Tab */}
        {activeTab === 'faculty' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-indigo-700">Faculty Photos</h2>
              <button
                onClick={() => {
                  setShowAddFaculty(true);
                  setFacultyForm({ name: '', imageUrl: '', position: '', imageFile: null });
                }}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300"
              >
                + Add Faculty Photo
              </button>
            </div>

            {showAddFaculty && (
              <form onSubmit={handleAddFaculty} className="mb-6 p-4 bg-gray-50 rounded-lg space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={facultyForm.name}
                    onChange={(e) => setFacultyForm({ ...facultyForm, name: e.target.value })}
                    required
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Position</label>
                  <input
                    type="text"
                    value={facultyForm.position}
                    onChange={(e) => setFacultyForm({ ...facultyForm, position: e.target.value })}
                    required
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Upload Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setFacultyForm({ ...facultyForm, imageFile: file, imageUrl: '' });
                      }
                    }}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none"
                  />
                  {facultyForm.imageFile && (
                    <p className="text-sm text-green-600 mt-1">✓ {facultyForm.imageFile.name} selected</p>
                  )}
                </div>
                <div className="text-center text-gray-500 my-2">OR</div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Image URL</label>
                  <input
                    type="url"
                    value={facultyForm.imageUrl}
                    onChange={(e) => setFacultyForm({ ...facultyForm, imageUrl: e.target.value, imageFile: null })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddFaculty(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="grid md:grid-cols-3 gap-4">
              {facultyPhotos.map(photo => (
                <div key={photo.id} className="border-2 border-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={photo.imageUrl}
                    alt={photo.name}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                    }}
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-indigo-700">{photo.name}</h3>
                    <p className="text-sm text-gray-600">{photo.position}</p>
                    <button
                      onClick={() => deleteFacultyPhoto(photo.id)}
                      className="mt-2 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              {facultyPhotos.length === 0 && (
                <p className="text-gray-600 col-span-3 text-center py-8">No faculty photos added yet.</p>
              )}
            </div>
          </div>
        )}

        {/* Facilities Tab */}
        {activeTab === 'facilities' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-indigo-700">Facilities</h2>
              <button
                onClick={() => {
                  setShowAddFacility(true);
                  setEditingFacility(null);
                  setFacilityForm({ name: '', description: '', icon: '' });
                }}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300"
              >
                + Add Facility
              </button>
            </div>

            {showAddFacility && (
              <form onSubmit={handleAddFacility} className="mb-6 p-4 bg-gray-50 rounded-lg space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Facility Name</label>
                  <input
                    type="text"
                    value={facilityForm.name}
                    onChange={(e) => setFacilityForm({ ...facilityForm, name: e.target.value })}
                    required
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none"
                    placeholder="e.g., Library, Computer Lab, Sports Complex"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Description</label>
                  <textarea
                    value={facilityForm.description}
                    onChange={(e) => setFacilityForm({ ...facilityForm, description: e.target.value })}
                    required
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none"
                    rows="3"
                    placeholder="Describe the facility..."
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Icon (Emoji)</label>
                  <input
                    type="text"
                    value={facilityForm.icon}
                    onChange={(e) => setFacilityForm({ ...facilityForm, icon: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none"
                    placeholder="e.g., 📚 🖥️ 🏃"
                  />
                  <p className="text-sm text-gray-500 mt-1">Optional: Add an emoji to represent this facility</p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    {editingFacility ? 'Update' : 'Add'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddFacility(false);
                      setEditingFacility(null);
                    }}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {facilities.map(facility => (
                <div key={facility.id} className="border-2 border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      {facility.icon && <span className="text-2xl">{facility.icon}</span>}
                      <h3 className="font-bold text-indigo-700">{facility.name}</h3>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditFacility(facility)}
                        className="px-2 py-1 bg-indigo-600 text-white text-xs rounded hover:bg-indigo-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteFacility(facility.id)}
                        className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{facility.description}</p>
                </div>
              ))}
              {facilities.length === 0 && (
                <p className="text-gray-600 col-span-3 text-center py-8">No facilities added yet.</p>
              )}
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-indigo-700">Events</h2>
              <button
                onClick={() => {
                  setShowAddEvent(true);
                  setEditingEvent(null);
                  setEventForm({ title: '', date: '', description: '', imageUrl: '', imageFile: null });
                }}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300"
              >
                + Add Event
              </button>
            </div>

            {showAddEvent && (
              <form onSubmit={handleAddEvent} className="mb-6 p-4 bg-gray-50 rounded-lg space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Title</label>
                  <input
                    type="text"
                    value={eventForm.title}
                    onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                    required
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Date</label>
                  <input
                    type="date"
                    value={eventForm.date}
                    onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                    required
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Description</label>
                  <textarea
                    value={eventForm.description}
                    onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                    required
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none"
                    rows="3"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Upload Event Image (Optional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setEventForm({ ...eventForm, imageFile: file, imageUrl: '' });
                      }
                    }}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none"
                  />
                  {eventForm.imageFile && (
                    <p className="text-sm text-green-600 mt-1">✓ {eventForm.imageFile.name} selected</p>
                  )}
                </div>
                <div className="text-center text-gray-500 my-2">OR</div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Image URL (Optional)</label>
                  <input
                    type="url"
                    value={eventForm.imageUrl && !eventForm.imageUrl.startsWith('data:') ? eventForm.imageUrl : ''}
                    onChange={(e) => setEventForm({ ...eventForm, imageUrl: e.target.value, imageFile: null })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    {editingEvent ? 'Update' : 'Add'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddEvent(false);
                      setEditingEvent(null);
                    }}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-4">
              {events.map(event => (
                <div key={event.id} className="border-2 border-gray-200 rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-indigo-700">{event.title}</h3>
                    <p className="text-gray-600">Date: {new Date(event.date).toLocaleDateString()}</p>
                    <p className="text-gray-600">{event.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditEvent(event)}
                      className="px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteEvent(event.id)}
                      className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              {events.length === 0 && (
                <p className="text-gray-600 text-center py-8">No events added yet.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

