import express from 'express';
import cors from 'cors';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import activitiesRouter from './routes/activities.js';
import adminRouter from './routes/admin.js';
import { adminAuth } from './middleware/auth.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Headers for iframe embedding in Home Assistant
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'ALLOWALL');
  res.setHeader('Content-Security-Policy', "frame-ancestors 'self' http://homeassistant.local:8123");
  next();
});

// Serve uploaded images
app.use('/uploads', express.static(join(__dirname, '../uploads')));

// Serve static images (placeholders)
app.use('/images', express.static(join(__dirname, '../public/images')));

// Public routes
app.use('/api/activities', activitiesRouter);

// Admin routes (protected)
app.use('/api/admin', adminAuth, adminRouter);

// Protected activity mutations
app.post('/api/activities', adminAuth, activitiesRouter);
app.put('/api/activities/:id', adminAuth, activitiesRouter);
app.delete('/api/activities/:id', adminAuth, activitiesRouter);

// Serve React app in production
if (process.env.NODE_ENV === 'production') {
  const clientPath = join(__dirname, '../client/dist');
  app.use(express.static(clientPath));
  // Fallback to index.html for client-side routing
  app.use((req, res) => {
    res.sendFile(join(clientPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
