import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' })); // allow large base64 images

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/school-website';
const DB_NAME = 'school-website';
const COLLECTION_NAME = 'data';

let client;
let db;

// Connect to MongoDB
async function connectDB() {
  try {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    db = client.db(DB_NAME);
    console.log('✅ Connected to MongoDB');
    
    // Create collection if it doesn't exist
    const collections = await db.listCollections().toArray();
    const collectionExists = collections.some(c => c.name === COLLECTION_NAME);
    
    if (!collectionExists) {
      // Initialize with default data
      const defaultData = {
        _id: 'main',
        settings: {
          schoolName: 'Swastik High School',
          schoolLogo: '',
          schoolPhoto: '',
          contactEmail: 'contact@myschool.com',
          contactPhone: '+1 (555) 123-4567',
          contactAddress: '123 Education Street, Learning City, LC 12345'
        },
        faculty: [],
        facilities: [],
        events: []
      };
      await db.collection(COLLECTION_NAME).insertOne(defaultData);
      console.log('✅ Initialized database with default data');
    }
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
}

// Load data from MongoDB
async function loadData() {
  try {
    const doc = await db.collection(COLLECTION_NAME).findOne({ _id: 'main' });
    if (doc) {
      const { _id, ...data } = doc;
      return data;
    }
    // Return defaults if no data found
    return {
      settings: {
        schoolName: 'Swastik High School',
        schoolLogo: '',
        schoolPhoto: '',
        contactEmail: 'contact@myschool.com',
        contactPhone: '+1 (555) 123-4567',
        contactAddress: '123 Education Street, Learning City, LC 12345'
      },
      faculty: [],
      facilities: [],
      events: []
    };
  } catch (error) {
    console.error('Error loading data:', error);
    throw error;
  }
}

// Save data to MongoDB
async function saveData(data) {
  try {
    await db.collection(COLLECTION_NAME).updateOne(
      { _id: 'main' },
      { $set: { ...data, _id: 'main' } },
      { upsert: true }
    );
    console.log('✅ Data saved to MongoDB');
  } catch (error) {
    console.error('Error saving data:', error);
    throw error;
  }
}

// Root route - API information
app.get('/', (_req, res) => {
  res.json({
    message: 'School Website API Server',
    version: '2.0.0',
    database: 'MongoDB',
    endpoints: {
      health: '/api/health',
      data: '/api/data',
      faculty: '/api/faculty',
      facilities: '/api/facilities',
      events: '/api/events'
    }
  });
});

// Simple health check
app.get('/api/health', async (_req, res) => {
  try {
    if (!db) {
      return res.status(503).json({ ok: false, message: 'Database not connected' });
    }
    // Test database connection
    await db.admin().ping();
    res.json({ ok: true, message: 'API is running', database: 'connected' });
  } catch (error) {
    res.status(503).json({ ok: false, message: 'Database connection failed', error: error.message });
  }
});

// Get all admin-managed data
app.get('/api/data', async (_req, res) => {
  try {
    const data = await loadData();
    res.json(data);
  } catch (error) {
    console.error('Error loading data:', error);
    res.status(500).json({ error: 'Failed to load data' });
  }
});

// Replace all admin-managed data
app.put('/api/data', async (req, res) => {
  try {
    const incoming = req.body || {};
    const currentData = await loadData();

    const merged = {
      settings: {
        ...currentData.settings,
        ...(incoming.settings || {})
      },
      faculty: Array.isArray(incoming.faculty) ? incoming.faculty : currentData.faculty,
      facilities: Array.isArray(incoming.facilities) ? incoming.facilities : currentData.facilities,
      events: Array.isArray(incoming.events) ? incoming.events : currentData.events
    };

    await saveData(merged);
    res.json(merged);
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'Failed to save data' });
  }
});

// Convenience endpoints for individual collections
app.get('/api/faculty', async (_req, res) => {
  try {
    const data = await loadData();
    res.json(data.faculty);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load faculty' });
  }
});

app.post('/api/faculty', async (req, res) => {
  try {
    const data = await loadData();
    const item = { id: Date.now(), ...(req.body || {}) };
    data.faculty.push(item);
    await saveData(data);
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add faculty' });
  }
});

app.delete('/api/faculty/:id', async (req, res) => {
  try {
    const data = await loadData();
    const id = Number(req.params.id);
    data.faculty = data.faculty.filter(f => f.id !== id);
    await saveData(data);
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete faculty' });
  }
});

app.get('/api/facilities', async (_req, res) => {
  try {
    const data = await loadData();
    res.json(data.facilities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load facilities' });
  }
});

app.post('/api/facilities', async (req, res) => {
  try {
    const data = await loadData();
    const item = { id: Date.now(), ...(req.body || {}) };
    data.facilities.push(item);
    await saveData(data);
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add facility' });
  }
});

app.delete('/api/facilities/:id', async (req, res) => {
  try {
    const data = await loadData();
    const id = Number(req.params.id);
    data.facilities = data.facilities.filter(f => f.id !== id);
    await saveData(data);
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete facility' });
  }
});

app.get('/api/events', async (_req, res) => {
  try {
    const data = await loadData();
    res.json(data.events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load events' });
  }
});

app.post('/api/events', async (req, res) => {
  try {
    const data = await loadData();
    const item = { id: Date.now(), ...(req.body || {}) };
    data.events.push(item);
    await saveData(data);
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add event' });
  }
});

app.delete('/api/events/:id', async (req, res) => {
  try {
    const data = await loadData();
    const id = Number(req.params.id);
    data.events = data.events.filter(e => e.id !== id);
    await saveData(data);
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

// Start server
const PORT = process.env.PORT || 4000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Admin API server running at http://localhost:${PORT}`);
      console.log(`Using MongoDB for persistent storage`);
    });
  })
  .catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
  });

