import { useState, useEffect } from 'react';
import { Activity } from '../types/Activity';

const API_URL = '/api';

export const useActivities = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/activities`);
      if (!response.ok) throw new Error('Failed to fetch activities');
      const data = await response.json();
      setActivities(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const addActivity = async (activity: Omit<Activity, 'id' | 'createdAt'>, password: string) => {
    try {
      const response = await fetch(`${API_URL}/activities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': password,
        },
        body: JSON.stringify(activity),
      });

      if (!response.ok) throw new Error('Failed to add activity');

      await fetchActivities();
      return true;
    } catch (err) {
      console.error('Error adding activity:', err);
      return false;
    }
  };

  const updateActivity = async (id: string, activity: Partial<Activity>, password: string) => {
    try {
      const response = await fetch(`${API_URL}/activities/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': password,
        },
        body: JSON.stringify(activity),
      });

      if (!response.ok) throw new Error('Failed to update activity');

      await fetchActivities();
      return true;
    } catch (err) {
      console.error('Error updating activity:', err);
      return false;
    }
  };

  const deleteActivity = async (id: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/activities/${id}`, {
        method: 'DELETE',
        headers: {
          'x-admin-password': password,
        },
      });

      if (!response.ok) throw new Error('Failed to delete activity');

      await fetchActivities();
      return true;
    } catch (err) {
      console.error('Error deleting activity:', err);
      return false;
    }
  };

  const uploadImage = async (file: File, password: string): Promise<string | null> => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(`${API_URL}/admin/upload`, {
        method: 'POST',
        headers: {
          'x-admin-password': password,
        },
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to upload image');

      const data = await response.json();
      return data.url;
    } catch (err) {
      console.error('Error uploading image:', err);
      return null;
    }
  };

  return {
    activities,
    loading,
    error,
    fetchActivities,
    addActivity,
    updateActivity,
    deleteActivity,
    uploadImage,
  };
};
