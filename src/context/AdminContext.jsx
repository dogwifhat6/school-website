import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

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
  const [sportsEventPhotos, setSportsEventPhotos] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [events, setEvents] = useState([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('admin_authenticated');
    const savedSchoolName = localStorage.getItem('school_name');
    const savedSchoolLogo = localStorage.getItem('school_logo');
    const savedSchoolPhoto = localStorage.getItem('school_photo');
    const savedContactEmail = localStorage.getItem('contact_email');
    const savedContactPhone = localStorage.getItem('contact_phone');
    const savedContactAddress = localStorage.getItem('contact_address');
    const savedFacultyPhotos = localStorage.getItem('faculty_photos');
    const savedSportsPhotos = localStorage.getItem('sports_event_photos');
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
    if (savedSportsPhotos) {
      setSportsEventPhotos(JSON.parse(savedSportsPhotos));
    }
    if (savedFacilities) {
      setFacilities(JSON.parse(savedFacilities));
    }
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('school_name', schoolName);
  }, [schoolName]);

  useEffect(() => {
    localStorage.setItem('school_logo', schoolLogo);
  }, [schoolLogo]);

  useEffect(() => {
    localStorage.setItem('school_photo', schoolPhoto);
  }, [schoolPhoto]);

  useEffect(() => {
    localStorage.setItem('contact_email', contactEmail);
  }, [contactEmail]);

  useEffect(() => {
    localStorage.setItem('contact_phone', contactPhone);
  }, [contactPhone]);

  useEffect(() => {
    localStorage.setItem('contact_address', contactAddress);
  }, [contactAddress]);

  useEffect(() => {
    localStorage.setItem('faculty_photos', JSON.stringify(facultyPhotos));
  }, [facultyPhotos]);

  useEffect(() => {
    localStorage.setItem('sports_event_photos', JSON.stringify(sportsEventPhotos));
  }, [sportsEventPhotos]);

  useEffect(() => {
    localStorage.setItem('facilities', JSON.stringify(facilities));
  }, [facilities]);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

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

  const addSportsEventPhoto = (photo) => {
    const newPhoto = {
      id: Date.now(),
      ...photo,
      createdAt: new Date().toISOString()
    };
    setSportsEventPhotos([...sportsEventPhotos, newPhoto]);
  };

  const deleteSportsEventPhoto = (id) => {
    setSportsEventPhotos(sportsEventPhotos.filter(photo => photo.id !== id));
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
        sportsEventPhotos,
        addSportsEventPhoto,
        deleteSportsEventPhoto,
        facilities,
        addFacility,
        updateFacility,
        deleteFacility,
        events,
        addEvent,
        updateEvent,
        deleteEvent
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

