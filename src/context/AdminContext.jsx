import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

// Backend API URL - use environment variable or default to localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

// Log API URL immediately when module loads
console.log('🔍 ADMIN CONTEXT LOADED');
console.log('🔍 VITE_API_URL from env:', import.meta.env.VITE_API_URL);
console.log('🔍 Final API_URL:', API_URL);
console.log('🔍 Current hostname:', typeof window !== 'undefined' ? window.location.hostname : 'server-side');

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [schoolName, setSchoolName] = useState('Swastik High School');
  const [schoolLogo, setSchoolLogo] = useState('');
  const [schoolPhoto, setSchoolPhoto] = useState('');
  const [contactEmail, setContactEmail] = useState('contact@myschool.com');
  const [contactPhone, setContactPhone] = useState('+1 (555) 123-4567');
  const [contactAddress, setContactAddress] = useState('123 Education Street, Learning City, LC 12345');
  const [facultyPhotos, setFacultyPhotos] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load data from backend API (with localStorage fallback)
  useEffect(() => {
    const loadData = async () => {
      // Always log - make it very visible
      console.log('========================================');
      console.log('🔄 SCHOOL WEBSITE - Loading data...');
      console.log('Backend URL:', API_URL);
      console.log('Current hostname:', window.location.hostname);
      console.log('========================================');
      
      // Check if backend is configured
      if (API_URL === 'http://localhost:4000' && window.location.hostname !== 'localhost') {
        console.error('========================================');
        console.error('⚠️⚠️⚠️ BACKEND NOT CONFIGURED! ⚠️⚠️⚠️');
        console.error('VITE_API_URL is not set in Vercel!');
        console.error('Visitors will see empty content.');
        console.error('To fix: Add VITE_API_URL in Vercel environment variables and redeploy.');
        console.error('========================================');
      }
      
      try {
        // Try to fetch from backend API
        const response = await fetch(`${API_URL}/api/data`);
        if (response.ok) {
          const data = await response.json();
          console.log('========================================');
          console.log('✅✅✅ SUCCESS! Data loaded from backend!');
          console.log('Faculty count:', data.faculty?.length || 0);
          console.log('Events count:', data.events?.length || 0);
          console.log('Facilities count:', data.facilities?.length || 0);
          console.log('========================================');
          
          // Update state with backend data
          if (data.settings) {
            setSchoolName(data.settings.schoolName || 'Swastik High School');
            setSchoolLogo(data.settings.schoolLogo || '');
            setSchoolPhoto(data.settings.schoolPhoto || '');
            setContactEmail(data.settings.contactEmail || 'contact@myschool.com');
            setContactPhone(data.settings.contactPhone || '+1 (555) 123-4567');
            setContactAddress(data.settings.contactAddress || '123 Education Street, Learning City, LC 12345');
          }
          
          if (Array.isArray(data.faculty)) {
            setFacultyPhotos(data.faculty);
          }
          if (Array.isArray(data.facilities)) {
            setFacilities(data.facilities);
          }
          if (Array.isArray(data.events)) {
            setEvents(data.events);
          }
          
          setIsLoading(false);
          return;
        } else {
          console.error('========================================');
          console.error('❌ Backend responded with error!');
          console.error('Status:', response.status, response.statusText);
          console.error('Backend URL:', API_URL);
          console.error('========================================');
        }
      } catch (error) {
        console.error('========================================');
        console.error('❌ FAILED to fetch from backend!');
        console.error('Error:', error.message);
        console.error('Backend URL:', API_URL);
        console.error('⚠️ Falling back to localStorage (visitors will see empty content)');
        console.error('========================================');
      }
      
      // Fallback to localStorage if backend is unavailable
      const savedAuth = localStorage.getItem('admin_authenticated');
      const savedSchoolName = localStorage.getItem('school_name');
      const savedSchoolLogo = localStorage.getItem('school_logo');
      const savedSchoolPhoto = localStorage.getItem('school_photo');
      const savedContactEmail = localStorage.getItem('contact_email');
      const savedContactPhone = localStorage.getItem('contact_phone');
      const savedContactAddress = localStorage.getItem('contact_address');
      const savedFacultyPhotos = localStorage.getItem('faculty_photos');
      const savedFacilities = localStorage.getItem('facilities');
      const savedEvents = localStorage.getItem('events');

      if (savedAuth === 'true') {
        setIsAuthenticated(true);
      }
      if (savedSchoolName) {
        setSchoolName(savedSchoolName);
      }
      if (savedSchoolLogo) {
        setSchoolLogo(savedSchoolLogo);
      }
      if (savedSchoolPhoto) {
        setSchoolPhoto(savedSchoolPhoto);
      }
      if (savedContactEmail) {
        setContactEmail(savedContactEmail);
      }
      if (savedContactPhone) {
        setContactPhone(savedContactPhone);
      }
      if (savedContactAddress) {
        setContactAddress(savedContactAddress);
      }
      if (savedFacultyPhotos) {
        setFacultyPhotos(JSON.parse(savedFacultyPhotos));
      }
      if (savedFacilities) {
        setFacilities(JSON.parse(savedFacilities));
      }
      if (savedEvents) {
        setEvents(JSON.parse(savedEvents));
      }
      
      setIsLoading(false);
    };

    loadData();
  }, []);

  // Sync data to backend API whenever it changes
  const syncToBackend = async (data) => {
    // Only sync if backend URL is configured (not localhost in production)
    if (API_URL === 'http://localhost:4000' && window.location.hostname !== 'localhost') {
      console.warn('Backend not configured - using localStorage only');
      // Save to localStorage as backup
      localStorage.setItem('school_name', data.settings?.schoolName || schoolName);
      localStorage.setItem('school_logo', data.settings?.schoolLogo || schoolLogo);
      localStorage.setItem('school_photo', data.settings?.schoolPhoto || schoolPhoto);
      localStorage.setItem('contact_email', data.settings?.contactEmail || contactEmail);
      localStorage.setItem('contact_phone', data.settings?.contactPhone || contactPhone);
      localStorage.setItem('contact_address', data.settings?.contactAddress || contactAddress);
      if (data.faculty) localStorage.setItem('faculty_photos', JSON.stringify(data.faculty));
      if (data.facilities) localStorage.setItem('facilities', JSON.stringify(data.facilities));
      if (data.events) localStorage.setItem('events', JSON.stringify(data.events));
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/data`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Backend responded with status: ${response.status}`);
      }

      console.log('✅ Data synced to backend successfully');
      
      // Also save to localStorage as backup
      localStorage.setItem('school_name', data.settings?.schoolName || schoolName);
      localStorage.setItem('school_logo', data.settings?.schoolLogo || schoolLogo);
      localStorage.setItem('school_photo', data.settings?.schoolPhoto || schoolPhoto);
      localStorage.setItem('contact_email', data.settings?.contactEmail || contactEmail);
      localStorage.setItem('contact_phone', data.settings?.contactPhone || contactPhone);
      localStorage.setItem('contact_address', data.settings?.contactAddress || contactAddress);
      if (data.faculty) localStorage.setItem('faculty_photos', JSON.stringify(data.faculty));
      if (data.facilities) localStorage.setItem('facilities', JSON.stringify(data.facilities));
      if (data.events) localStorage.setItem('events', JSON.stringify(data.events));
    } catch (error) {
      console.error('❌ Failed to sync to backend:', error);
      console.error('Backend URL:', API_URL);
      // Still save to localStorage as backup
      localStorage.setItem('school_name', data.settings?.schoolName || schoolName);
      localStorage.setItem('school_logo', data.settings?.schoolLogo || schoolLogo);
      localStorage.setItem('school_photo', data.settings?.schoolPhoto || schoolPhoto);
      localStorage.setItem('contact_email', data.settings?.contactEmail || contactEmail);
      localStorage.setItem('contact_phone', data.settings?.contactPhone || contactPhone);
      localStorage.setItem('contact_address', data.settings?.contactAddress || contactAddress);
      if (data.faculty) localStorage.setItem('faculty_photos', JSON.stringify(data.faculty));
      if (data.facilities) localStorage.setItem('facilities', JSON.stringify(data.facilities));
      if (data.events) localStorage.setItem('events', JSON.stringify(data.events));
    }
  };

  // Save to backend and localStorage whenever data changes
  useEffect(() => {
    if (!isLoading) {
      syncToBackend({
        settings: {
          schoolName,
          schoolLogo,
          schoolPhoto,
          contactEmail,
          contactPhone,
          contactAddress,
        },
        faculty: facultyPhotos,
        facilities,
        events,
      });
    }
  }, [schoolName, schoolLogo, schoolPhoto, contactEmail, contactPhone, contactAddress, facultyPhotos, facilities, events, isLoading]);

  const login = (username, password) => {
    // Default credentials: admin / admin123
    if (username === 'Admin' && password === 'Halisa123') {
      setIsAuthenticated(true);
      localStorage.setItem('admin_authenticated', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_authenticated');
  };

  const addFacultyPhoto = (photo) => {
    const newPhoto = {
      id: Date.now(),
      ...photo,
      createdAt: new Date().toISOString()
    };
    setFacultyPhotos([...facultyPhotos, newPhoto]);
  };

  const deleteFacultyPhoto = (id) => {
    setFacultyPhotos(facultyPhotos.filter(photo => photo.id !== id));
  };


  const addFacility = (facility) => {
    const newFacility = {
      id: Date.now(),
      ...facility,
      createdAt: new Date().toISOString()
    };
    setFacilities([...facilities, newFacility]);
  };

  const updateFacility = (id, updatedFacility) => {
    setFacilities(facilities.map(facility => 
      facility.id === id ? { ...facility, ...updatedFacility } : facility
    ));
  };

  const deleteFacility = (id) => {
    setFacilities(facilities.filter(facility => facility.id !== id));
  };

  const addEvent = (event) => {
    const newEvent = {
      id: Date.now(),
      ...event,
      createdAt: new Date().toISOString()
    };
    setEvents([...events, newEvent]);
  };

  const updateEvent = (id, updatedEvent) => {
    setEvents(events.map(event => 
      event.id === id ? { ...event, ...updatedEvent } : event
    ));
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        login,
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
        deleteEvent,
        isLoading
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

