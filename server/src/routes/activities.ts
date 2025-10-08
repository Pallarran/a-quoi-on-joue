import express from 'express';
import { readFile, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();
const activitiesPath = join(__dirname, '../data/activities.json');

// GET all activities
router.get('/', async (req, res) => {
  try {
    const data = await readFile(activitiesPath, 'utf-8');
    const activities = JSON.parse(data);
    res.json(activities);
  } catch (error) {
    console.error('Error reading activities:', error);
    res.status(500).json({ error: 'Failed to load activities' });
  }
});

// GET single activity
router.get('/:id', async (req, res) => {
  try {
    const data = await readFile(activitiesPath, 'utf-8');
    const activities = JSON.parse(data);
    const activity = activities.find((a: any) => a.id === req.params.id);

    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    res.json(activity);
  } catch (error) {
    console.error('Error reading activity:', error);
    res.status(500).json({ error: 'Failed to load activity' });
  }
});

// POST new activity (admin only)
router.post('/', async (req, res) => {
  try {
    const data = await readFile(activitiesPath, 'utf-8');
    const activities = JSON.parse(data);

    const newActivity = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString()
    };

    activities.push(newActivity);
    await writeFile(activitiesPath, JSON.stringify(activities, null, 2));

    res.status(201).json(newActivity);
  } catch (error) {
    console.error('Error creating activity:', error);
    res.status(500).json({ error: 'Failed to create activity' });
  }
});

// PUT update activity (admin only)
router.put('/:id', async (req, res) => {
  try {
    const data = await readFile(activitiesPath, 'utf-8');
    const activities = JSON.parse(data);
    const index = activities.findIndex((a: any) => a.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    activities[index] = {
      ...activities[index],
      ...req.body,
      id: req.params.id // Preserve ID
    };

    await writeFile(activitiesPath, JSON.stringify(activities, null, 2));
    res.json(activities[index]);
  } catch (error) {
    console.error('Error updating activity:', error);
    res.status(500).json({ error: 'Failed to update activity' });
  }
});

// DELETE activity (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const data = await readFile(activitiesPath, 'utf-8');
    let activities = JSON.parse(data);
    const initialLength = activities.length;

    activities = activities.filter((a: any) => a.id !== req.params.id);

    if (activities.length === initialLength) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    await writeFile(activitiesPath, JSON.stringify(activities, null, 2));
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting activity:', error);
    res.status(500).json({ error: 'Failed to delete activity' });
  }
});

export default router;
