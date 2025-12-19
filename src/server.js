import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json({ limit: '5mb' })); // allow base64 images

// Path to data file for simple persistence
const DATA_FILE = path.join(__dirname, 'admin-data.json');

// Default data structure
const defaultData = {
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

async function loadData() {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return { ...defaultData, ...parsed };
  } catch {
    // If file doesn't exist or is invalid, return defaults
    return { ...defaultData };
  }
}

async function saveData(data) {
  const toSave = JSON.stringify(data, null, 2);
  await fs.writeFile(DATA_FILE, toSave, 'utf-8');
}

// Simple health check
app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

// Get all admin-managed data
app.get('/api/data', async (_req, res) => {
  const data = await loadData();
  res.json(data);
});

// Replace all admin-managed data
app.put('/api/data', async (req, res) => {
  const incoming = req.body || {};
  const data = await loadData();

  const merged = {
    settings: {
      ...data.settings,
      ...(incoming.settings || {})
    },
    faculty: Array.isArray(incoming.faculty) ? incoming.faculty : data.faculty,
    facilities: Array.isArray(incoming.facilities) ? incoming.facilities : data.facilities,
    events: Array.isArray(incoming.events) ? incoming.events : data.events
  };

  await saveData(merged);
  res.json(merged);
});

// Convenience endpoints for individual collections
app.get('/api/faculty', async (_req, res) => {
  const data = await loadData();
  res.json(data.faculty);
});

app.post('/api/faculty', async (req, res) => {
  const data = await loadData();
  const item = { id: Date.now(), ...(req.body || {}) };
  data.faculty.push(item);
  await saveData(data);
  res.json(item);
});

app.delete('/api/faculty/:id', async (req, res) => {
  const data = await loadData();
  const id = Number(req.params.id);
  data.faculty = data.faculty.filter(f => f.id !== id);
  await saveData(data);
  res.json({ ok: true });
});

app.get('/api/facilities', async (_req, res) => {
  const data = await loadData();
  res.json(data.facilities);
});

app.post('/api/facilities', async (req, res) => {
  const data = await loadData();
  const item = { id: Date.now(), ...(req.body || {}) };
  data.facilities.push(item);
  await saveData(data);
  res.json(item);
});

app.delete('/api/facilities/:id', async (req, res) => {
  const data = await loadData();
  const id = Number(req.params.id);
  data.facilities = data.facilities.filter(f => f.id !== id);
  await saveData(data);
  res.json({ ok: true });
});

app.get('/api/events', async (_req, res) => {
  const data = await loadData();
  res.json(data.events);
});

app.post('/api/events', async (req, res) => {
  const data = await loadData();
  const item = { id: Date.now(), ...(req.body || {}) };
  data.events.push(item);
  await saveData(data);
  res.json(item);
});

app.delete('/api/events/:id', async (req, res) => {
  const data = await loadData();
  const id = Number(req.params.id);
  data.events = data.events.filter(e => e.id !== id);
  await saveData(data);
  res.json({ ok: true });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Admin API server running at http://localhost:${PORT}`);
});


