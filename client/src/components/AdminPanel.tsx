import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Activity, LocationTag, PlayerTag, EnergyTag, DurationTag, SeasonTag, CategoryTag } from '../types/Activity';
import { useActivities } from '../hooks/useActivities';
import { getSeasonEmoji, getSeasonLabel } from '../utils/seasons';
import { getCategoryLabel, getCategoryEmoji, getAllCategories } from '../utils/categories';

const AdminPanel = () => {
  const { activities, addActivity, updateActivity, deleteActivity, uploadImage } = useActivities();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    image: '',
    location: [] as LocationTag[],
    players: [] as PlayerTag[],
    energy: [] as EnergyTag[],
    duration: [] as DurationTag[],
    season: ['spring', 'summer', 'fall', 'winter'] as SeasonTag[], // Default to all seasons
    category: [] as CategoryTag[],
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
        season: formData.season,
        category: formData.category,
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
      season: activity.tags.season,
      category: activity.tags.category || [],
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
      location: [],
      players: [],
      energy: [],
      duration: [],
      season: ['spring', 'summer', 'fall', 'winter'],
      category: [],
      houseLocation: '',
    });
    setEditingId(null);
    setShowForm(false);
  };

  const toggleTag = <T,>(category: 'location' | 'players' | 'energy' | 'duration' | 'season' | 'category', value: T) => {
    const currentValues = formData[category] as T[];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    setFormData({ ...formData, [category]: newValues });
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
    <div className="min-h-screen bg-gray-50">
      {/* Sticky header */}
      <div className="sticky top-0 bg-gray-50 z-40 border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto p-4 md:p-8 pb-4">
          <div className="flex justify-between items-center mb-4">
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

          {/* Search bar */}
          <div className="mb-0">
            <input
              type="text"
              placeholder="🔍 Rechercher une activité..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 md:p-8 pt-4">
        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={resetForm}>
            <div
              className="bg-white rounded-2xl shadow-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">
                  {editingId ? 'Modifier l\'activité' : 'Ajouter une activité'}
                </h2>
                <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
                  <span className="text-2xl">✖️</span>
                </button>
              </div>

              <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="block text-gray-700 font-medium mb-1">Nom de l'activité</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-3">
                <label className="block text-gray-700 font-medium mb-1">Image</label>
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

              <div className="mb-3">
                <label className="block text-gray-700 font-medium mb-1">🏠 Localisation (sélection multiple)</label>
                <div className="flex flex-wrap gap-2">
                  <label className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={formData.location.includes('indoor')}
                      onChange={() => toggleTag('location', 'indoor')}
                      className="w-4 h-4"
                    />
                    <span>Intérieur</span>
                  </label>
                  <label className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={formData.location.includes('outdoor')}
                      onChange={() => toggleTag('location', 'outdoor')}
                      className="w-4 h-4"
                    />
                    <span>Extérieur</span>
                  </label>
                </div>
              </div>

              <div className="mb-3">
                <label className="block text-gray-700 font-medium mb-1">👥 Joueur (sélection multiple)</label>
                <div className="flex flex-wrap gap-2">
                  <label className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={formData.players.includes('solo')}
                      onChange={() => toggleTag('players', 'solo')}
                      className="w-4 h-4"
                    />
                    <span>Solo</span>
                  </label>
                  <label className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={formData.players.includes('duo')}
                      onChange={() => toggleTag('players', 'duo')}
                      className="w-4 h-4"
                    />
                    <span>Duo</span>
                  </label>
                  <label className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={formData.players.includes('multiple')}
                      onChange={() => toggleTag('players', 'multiple')}
                      className="w-4 h-4"
                    />
                    <span>Plusieurs</span>
                  </label>
                </div>
              </div>

              <div className="mb-3">
                <label className="block text-gray-700 font-medium mb-1">⚡ Énergie (sélection multiple)</label>
                <div className="flex flex-wrap gap-2">
                  <label className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={formData.energy.includes('calm')}
                      onChange={() => toggleTag('energy', 'calm')}
                      className="w-4 h-4"
                    />
                    <span>Calme</span>
                  </label>
                  <label className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={formData.energy.includes('active')}
                      onChange={() => toggleTag('energy', 'active')}
                      className="w-4 h-4"
                    />
                    <span>Actif</span>
                  </label>
                </div>
              </div>

              <div className="mb-3">
                <label className="block text-gray-700 font-medium mb-1">⏱️ Temps (sélection multiple)</label>
                <div className="flex flex-wrap gap-2">
                  <label className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={formData.duration.includes('5-10')}
                      onChange={() => toggleTag('duration', '5-10')}
                      className="w-4 h-4"
                    />
                    <span>5-10 min</span>
                  </label>
                  <label className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={formData.duration.includes('10-30')}
                      onChange={() => toggleTag('duration', '10-30')}
                      className="w-4 h-4"
                    />
                    <span>10-30 min</span>
                  </label>
                  <label className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={formData.duration.includes('30+')}
                      onChange={() => toggleTag('duration', '30+')}
                      className="w-4 h-4"
                    />
                    <span>30+ min</span>
                  </label>
                </div>
              </div>

              <div className="mb-3">
                <label className="block text-gray-700 font-medium mb-1">🌍 Saison (sélection multiple)</label>
                <div className="flex flex-wrap gap-2">
                  <label className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={formData.season.includes('spring')}
                      onChange={() => toggleTag('season', 'spring')}
                      className="w-4 h-4"
                    />
                    <span>{getSeasonEmoji('spring')} {getSeasonLabel('spring')}</span>
                  </label>
                  <label className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={formData.season.includes('summer')}
                      onChange={() => toggleTag('season', 'summer')}
                      className="w-4 h-4"
                    />
                    <span>{getSeasonEmoji('summer')} {getSeasonLabel('summer')}</span>
                  </label>
                  <label className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={formData.season.includes('fall')}
                      onChange={() => toggleTag('season', 'fall')}
                      className="w-4 h-4"
                    />
                    <span>{getSeasonEmoji('fall')} {getSeasonLabel('fall')}</span>
                  </label>
                  <label className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={formData.season.includes('winter')}
                      onChange={() => toggleTag('season', 'winter')}
                      className="w-4 h-4"
                    />
                    <span>{getSeasonEmoji('winter')} {getSeasonLabel('winter')}</span>
                  </label>
                </div>
              </div>

              <div className="mb-3">
                <label className="block text-gray-700 font-medium mb-1">🎲 Catégorie (sélection multiple)</label>
                <div className="flex flex-wrap gap-2">
                  {getAllCategories().map(cat => (
                    <label key={cat} className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={formData.category.includes(cat)}
                        onChange={() => toggleTag('category', cat)}
                        className="w-4 h-4"
                      />
                      <span>{getCategoryEmoji(cat)} {getCategoryLabel(cat)}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-3">
                <label className="block text-gray-700 font-medium mb-1">📍 Emplacement dans la maison (optionnel)</label>
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
          </div>
        )}

        {/* Activities List */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Activités existantes</h2>

          <div className="space-y-4">
            {(() => {
              const filteredActivities = activities.filter(activity =>
                activity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                activity.houseLocation?.toLowerCase().includes(searchQuery.toLowerCase())
              );

              if (filteredActivities.length === 0) {
                return (
                  <div className="text-center py-12 text-gray-500">
                    <p className="text-4xl mb-4">🔍</p>
                    <p className="text-lg">Aucune activité trouvée</p>
                  </div>
                );
              }

              return filteredActivities.map(activity => (
              <div
                key={activity.id}
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg flex items-center justify-center text-4xl overflow-hidden">
                  {activity.image ? (
                    <img
                      src={activity.image}
                      alt={activity.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>🌟</span>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{activity.name}</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {activity.tags.location.map(loc => (
                      <span key={loc} className="text-xs px-2 py-1 bg-cyan-100 text-cyan-700 rounded">
                        {loc === 'indoor' ? 'Intérieur' : 'Extérieur'}
                      </span>
                    ))}
                    {activity.tags.players.map(p => (
                      <span key={p} className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded">
                        {p === 'solo' ? 'Solo' : p === 'duo' ? 'Duo' : 'Plusieurs'}
                      </span>
                    ))}
                    {activity.tags.energy.map(e => (
                      <span key={e} className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                        {e === 'calm' ? 'Calme' : 'Actif'}
                      </span>
                    ))}
                    {activity.tags.duration.map(d => (
                      <span key={d} className="text-xs px-2 py-1 bg-teal-100 text-teal-700 rounded">
                        {d === '5-10' ? '5-10m' : d === '10-30' ? '10-30m' : '30m+'}
                      </span>
                    ))}
                    {activity.tags.season.map(s => (
                      <span key={s} className="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded">
                        {getSeasonEmoji(s)} {getSeasonLabel(s)}
                      </span>
                    ))}
                    {activity.tags.category && activity.tags.category.map(c => (
                      <span key={c} className="text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded">
                        {getCategoryEmoji(c)} {getCategoryLabel(c)}
                      </span>
                    ))}
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
              ));
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
