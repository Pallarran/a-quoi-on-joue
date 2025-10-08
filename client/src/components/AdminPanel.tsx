import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Activity, LocationTag, PlayerTag, EnergyTag, DurationTag } from '../types/Activity';
import { useActivities } from '../hooks/useActivities';

const AdminPanel = () => {
  const { activities, addActivity, updateActivity, deleteActivity, uploadImage } = useActivities();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    image: '',
    location: 'indoor' as LocationTag,
    players: 'solo' as PlayerTag,
    energy: 'calm' as EnergyTag,
    duration: '10-30' as DurationTag,
    houseLocation: '',
  });

  const handleAuth = async (e: FormEvent) => {
    e.preventDefault();

    if (password.length === 0) {
      setAuthError('Mot de passe requis');
      return;
    }

    try {
      const response = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: {
          'x-admin-password': password,
        },
      });

      if (response.ok) {
        setIsAuthenticated(true);
        setAuthError('');
      } else {
        setAuthError('Mot de passe incorrect');
        setPassword('');
      }
    } catch (error) {
      setAuthError('Erreur de connexion');
      console.error('Auth error:', error);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const imageUrl = await uploadImage(file, password);
    setUploading(false);

    if (imageUrl) {
      setFormData({ ...formData, image: imageUrl });
    } else {
      alert('Échec du téléchargement de l\'image');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const activityData = {
      name: formData.name,
      image: formData.image,
      tags: {
        location: formData.location,
        players: formData.players,
        energy: formData.energy,
        duration: formData.duration,
      },
      houseLocation: formData.houseLocation || undefined,
    };

    let success = false;
    if (editingId) {
      success = await updateActivity(editingId, activityData, password);
    } else {
      success = await addActivity(activityData, password);
    }

    if (success) {
      resetForm();
    } else {
      alert('Échec de l\'opération. Vérifiez le mot de passe.');
    }
  };

  const handleEdit = (activity: Activity) => {
    setEditingId(activity.id);
    setFormData({
      name: activity.name,
      image: activity.image,
      location: activity.tags.location,
      players: activity.tags.players,
      energy: activity.tags.energy,
      duration: activity.tags.duration,
      houseLocation: activity.houseLocation || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette activité ?')) return;

    const success = await deleteActivity(id, password);
    if (!success) {
      alert('Échec de la suppression. Vérifiez le mot de passe.');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      image: '',
      location: 'indoor',
      players: 'solo',
      energy: 'calm',
      duration: '10-30',
      houseLocation: '',
    });
    setEditingId(null);
    setShowForm(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <div className="flex justify-center mb-6">
            <div className="bg-gray-100 p-4 rounded-full">
              <span className="text-5xl">🔒</span>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center mb-6">Panneau d'Administration</h2>

          <form onSubmit={handleAuth}>
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {authError && <p className="text-red-500 text-sm mb-4">{authError}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
            >
              Se connecter
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-gray-800">Panneau d'Administration</h1>
            <Link
              to="/"
              className="text-2xl hover:scale-110 transition-transform"
              title="Retour à l'app"
            >
              🏠
            </Link>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <span className="text-xl">➕</span>
            Nouvelle activité
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {editingId ? 'Modifier l\'activité' : 'Ajouter une activité'}
              </h2>
              <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
                <span className="text-2xl">✖️</span>
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Nom de l'activité</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Image</label>
                <div className="flex gap-4 items-center">
                  <input
                    type="text"
                    placeholder="URL de l'image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <label className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors flex items-center gap-2">
                    <span className="text-lg">📤</span>
                    {uploading ? 'Envoi...' : 'Télécharger'}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Localisation</label>
                <select
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value as LocationTag })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="indoor">Intérieur</option>
                  <option value="outdoor">Extérieur</option>
                  <option value="both">Les deux</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">👥 Joueur</label>
                <select
                  value={formData.players}
                  onChange={(e) => setFormData({ ...formData, players: e.target.value as PlayerTag })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="solo">Solo</option>
                  <option value="duo">Duo</option>
                  <option value="multiple">Plusieurs</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">⚡ Énergie</label>
                <select
                  value={formData.energy}
                  onChange={(e) => setFormData({ ...formData, energy: e.target.value as EnergyTag })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="calm">Calme</option>
                  <option value="active">Actif</option>
                  <option value="mix">Mix</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">⏱️ Temps</label>
                <select
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value as DurationTag })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="5-10">5-10 min</option>
                  <option value="10-30">10-30 min</option>
                  <option value="30+">30+ min</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">📍 Emplacement dans la maison (optionnel)</label>
                <input
                  type="text"
                  placeholder="ex: Salon, Cuisine, Jardin"
                  value={formData.houseLocation}
                  onChange={(e) => setFormData({ ...formData, houseLocation: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
                >
                  {editingId ? 'Mettre à jour' : 'Ajouter'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-400 transition-colors"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Activities List */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Activités existantes</h2>
          <div className="space-y-4">
            {activities.map(activity => (
              <div
                key={activity.id}
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg flex items-center justify-center text-4xl">
                  🌟
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{activity.name}</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-xs px-2 py-1 bg-cyan-100 text-cyan-700 rounded">
                      {activity.tags.location === 'indoor' ? 'Intérieur' : activity.tags.location === 'outdoor' ? 'Extérieur' : 'Les deux'}
                    </span>
                    <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded">
                      {activity.tags.players === 'solo' ? 'Solo' : activity.tags.players === 'duo' ? 'Duo' : 'Plusieurs'}
                    </span>
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                      {activity.tags.energy === 'calm' ? 'Calme' : activity.tags.energy === 'active' ? 'Actif' : 'Mix'}
                    </span>
                    <span className="text-xs px-2 py-1 bg-teal-100 text-teal-700 rounded">
                      {activity.tags.duration === '5-10' ? '5-10m' : activity.tags.duration === '10-30' ? '10-30m' : '30m+'}
                    </span>
                    {activity.houseLocation && (
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                        📍 {activity.houseLocation}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(activity)}
                    className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    <span className="text-xl">✏️</span>
                  </button>
                  <button
                    onClick={() => handleDelete(activity.id)}
                    className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    <span className="text-xl">🗑️</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
