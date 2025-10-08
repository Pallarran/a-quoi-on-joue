import { useState, useMemo } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { useActivities } from './hooks/useActivities';
import { useFavorites } from './hooks/useFavorites';
import { useTheme } from './hooks/useTheme';
import { ActivityFilters } from './types/Activity';
import FilterBar from './components/FilterBar';
import ActivityList from './components/ActivityList';
import SurpriseMeButton from './components/SurpriseMeButton';
import AdminPanel from './components/AdminPanel';

function KidsApp() {
  const { activities, loading } = useActivities();
  const { favorites, toggleFavorite } = useFavorites();
  const { isDarkMode, toggleTheme } = useTheme();

  const [filters, setFilters] = useState<ActivityFilters>({
    location: [],
    players: [],
    energy: [],
    duration: [],
    showFavoritesOnly: false,
  });

  const filteredActivities = useMemo(() => {
    return activities.filter(activity => {
      if (filters.showFavoritesOnly && !favorites.includes(activity.id)) {
        return false;
      }

      // If filter is empty (no selections), show all
      // If filter has selections, activity must match at least one selected value
      if (filters.location.length > 0 && !filters.location.some(loc => activity.tags.location.includes(loc))) {
        return false;
      }

      if (filters.players.length > 0 && !filters.players.some(p => activity.tags.players.includes(p))) {
        return false;
      }

      if (filters.energy.length > 0 && !filters.energy.some(e => activity.tags.energy.includes(e))) {
        return false;
      }

      if (filters.duration.length > 0 && !filters.duration.some(d => activity.tags.duration.includes(d))) {
        return false;
      }

      return true;
    });
  }, [activities, filters, favorites]);

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-[#091f2b]' : 'bg-white'}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors ${isDarkMode ? 'bg-[#091f2b]' : 'bg-white'}`}>
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Header */}
        <header className="mb-8">
          <div className={`rounded-2xl shadow-sm border p-8 text-center bg-cover bg-center relative ${
            isDarkMode
              ? 'bg-gradient-to-br from-[#0a2a3d] to-[#0d3449] border-gray-700'
              : 'bg-gradient-to-br from-cyan-50 to-blue-50 border-gray-100'
          }`}>
            <button
              onClick={toggleTheme}
              className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center text-2xl hover:scale-110 transition-transform opacity-60 hover:opacity-100"
              title={isDarkMode ? 'Mode jour' : 'Mode nuit'}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            <Link
              to="/admin"
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-2xl hover:scale-110 transition-transform opacity-30 hover:opacity-100"
              title="Admin"
            >
              ⚙️
            </Link>
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-2xl shadow-md flex items-center justify-center text-3xl">
                ♟️
              </div>
              <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                À quoi on joue ?
              </h1>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-600 rounded-2xl shadow-md flex items-center justify-center text-3xl">
                🎨
              </div>
            </div>
            <p className={`text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Trouve une super activité à faire !
            </p>
          </div>
        </header>

        {/* Filters */}
        <FilterBar
          filters={filters}
          onFiltersChange={setFilters}
          activityCount={filteredActivities.length}
          isDarkMode={isDarkMode}
        />

        {/* Activity List */}
        <ActivityList
          activities={filteredActivities}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          isDarkMode={isDarkMode}
        />

        {/* Surprise Me Button */}
        <SurpriseMeButton activities={filteredActivities} />
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<KidsApp />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
