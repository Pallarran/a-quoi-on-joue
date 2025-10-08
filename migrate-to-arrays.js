#!/usr/bin/env node

/**
 * Migration script to convert activity tags from single values to arrays
 * This preserves your existing activities while updating to the new format.
 *
 * Run this on your Unraid server:
 *   node migrate-to-arrays.js
 */

const fs = require('fs');
const path = require('path');

const activitiesPath = path.join(__dirname, 'server/src/data/activities.json');

console.log('🔄 Starting migration to array-based tags...');

// Read current activities
const activities = JSON.parse(fs.readFileSync(activitiesPath, 'utf8'));

// Migrate each activity
const migratedActivities = activities.map(activity => {
  const tags = activity.tags;

  // Convert 'both' location to ['indoor', 'outdoor']
  let location = Array.isArray(tags.location) ? tags.location : [];
  if (!Array.isArray(tags.location)) {
    if (tags.location === 'both') {
      location = ['indoor', 'outdoor'];
    } else {
      location = [tags.location];
    }
  }

  // Convert players to array
  const players = Array.isArray(tags.players) ? tags.players : [tags.players];

  // Convert 'mix' energy to ['calm', 'active']
  let energy = Array.isArray(tags.energy) ? tags.energy : [];
  if (!Array.isArray(tags.energy)) {
    if (tags.energy === 'mix') {
      energy = ['calm', 'active'];
    } else {
      energy = [tags.energy];
    }
  }

  // Convert duration to array
  const duration = Array.isArray(tags.duration) ? tags.duration : [tags.duration];

  return {
    ...activity,
    tags: {
      location,
      players,
      energy,
      duration
    }
  };
});

// Backup original file
const backupPath = activitiesPath + '.backup-' + Date.now();
fs.copyFileSync(activitiesPath, backupPath);
console.log(`✅ Backup created: ${backupPath}`);

// Write migrated data
fs.writeFileSync(activitiesPath, JSON.stringify(migratedActivities, null, 2));
console.log(`✅ Migration complete! ${migratedActivities.length} activities updated`);
console.log('🎉 You can now pull the latest changes from GitHub');
