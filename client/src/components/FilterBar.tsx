import { ActivityFilters, LocationTag, PlayerTag, EnergyTag, DurationTag, SeasonTag } from '../types/Activity';
import { getSeasonEmoji, getSeasonLabel } from '../utils/seasons';
import { RotateCcw } from 'lucide-react';

interface FilterBarProps {
  filters: ActivityFilters;
  onFiltersChange: (filters: ActivityFilters) => void;
  activityCount: number;
  isDarkMode?: boolean;
}

const FilterBar = ({ filters, onFiltersChange, activityCount, isDarkMode = false }: FilterBarProps) => {
  const toggleLocation = (location: LocationTag) => {
    const newLocation = filters.location.includes(location)
      ? filters.location.filter(l => l !== location)
      : [...filters.location, location];
    onFiltersChange({ ...filters, location: newLocation });
  };

  const togglePlayers = (players: PlayerTag) => {
    const newPlayers = filters.players.includes(players)
      ? filters.players.filter(p => p !== players)
      : [...filters.players, players];
    onFiltersChange({ ...filters, players: newPlayers });
  };

  const toggleEnergy = (energy: EnergyTag) => {
    const newEnergy = filters.energy.includes(energy)
      ? filters.energy.filter(e => e !== energy)
      : [...filters.energy, energy];
    onFiltersChange({ ...filters, energy: newEnergy });
  };

  const toggleDuration = (duration: DurationTag) => {
    const newDuration = filters.duration.includes(duration)
      ? filters.duration.filter(d => d !== duration)
      : [...filters.duration, duration];
    onFiltersChange({ ...filters, duration: newDuration });
  };

  const toggleSeason = (season: SeasonTag) => {
    const newSeason = filters.season.includes(season)
      ? filters.season.filter(s => s !== season)
      : [...filters.season, season];
    onFiltersChange({ ...filters, season: newSeason });
  };

  const toggleFavoritesOnly = () => {
    onFiltersChange({ ...filters, showFavoritesOnly: !filters.showFavoritesOnly });
  };

  const clearFilters = () => {
    onFiltersChange({
      location: [],
      players: [],
      energy: [],
      duration: [],
      season: ['spring', 'summer', 'fall', 'winter'], // Reset to all seasons
      showFavoritesOnly: false,
    });
  };

  const hasActiveFilters =
    filters.location.length > 0 ||
    filters.players.length > 0 ||
    filters.energy.length > 0 ||
    filters.duration.length > 0 ||
    filters.season.length !== 4 ||
    filters.showFavoritesOnly;

  const inactiveButtonClass = isDarkMode
    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600 border border-gray-600'
    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200';

  const headingClass = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const countTextClass = isDarkMode ? 'text-gray-300' : 'text-gray-600';
  const countBoldClass = isDarkMode ? 'text-white' : 'text-gray-900';

  return (
    <div className="mb-4">
      <div className={`rounded-2xl shadow-sm border p-4 ${
        isDarkMode ? 'bg-[#0a2a3d] border-gray-700' : 'bg-white border-gray-100'
      }`}>
        {/* Activity count and clear button */}
        <div className={`flex items-center justify-between mb-3 pb-2 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
          <p className={`text-sm ${countTextClass}`}>
            <span className={`font-semibold ${countBoldClass}`}>{activityCount}</span> activité{activityCount !== 1 ? 's' : ''}
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              title="Effacer les filtres"
              className={`p-2 rounded-lg transition-all ${
                isDarkMode
                  ? 'text-cyan-400 hover:bg-gray-800'
                  : 'text-cyan-600 hover:bg-gray-50'
              }`}
            >
              <RotateCcw size={16} />
            </button>
          )}
        </div>

        {/* Filter buttons with headers */}
        <div className="flex items-start justify-between w-full">
          {/* Location Filters */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 mb-3">
              <span className="text-lg">📍</span>
              <h3 className={`text-xs font-semibold uppercase tracking-wide ${headingClass}`}>Où ?</h3>
            </div>
            <div className="flex gap-2">
            <button
              onClick={() => toggleLocation('indoor')}
              title="Intérieur"
              className={`px-3 py-2 rounded-lg text-xl font-medium transition-all ${
                filters.location.includes('indoor')
                  ? 'bg-cyan-200 text-cyan-900 shadow-sm'
                  : inactiveButtonClass
              }`}
            >
              🏠
            </button>
            <button
              onClick={() => toggleLocation('outdoor')}
              title="Extérieur"
              className={`px-3 py-2 rounded-lg text-xl font-medium transition-all ${
                filters.location.includes('outdoor')
                  ? 'bg-green-200 text-green-900 shadow-sm'
                  : inactiveButtonClass
              }`}
            >
              🌳
            </button>
            </div>
          </div>

          {/* Season Filters */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 mb-3">
              <span className="text-lg">🗓️</span>
              <h3 className={`text-xs font-semibold uppercase tracking-wide ${headingClass}`}>Saison</h3>
            </div>
            <div className="flex gap-2">
            <button onClick={() => toggleSeason('spring')} title={getSeasonLabel('spring')} className={`px-3 py-2 rounded-lg text-xl font-medium transition-all ${filters.season.includes('spring') ? 'bg-pink-200 text-pink-900 shadow-sm' : inactiveButtonClass}`}>
              {getSeasonEmoji('spring')}
            </button>
            <button onClick={() => toggleSeason('summer')} title={getSeasonLabel('summer')} className={`px-3 py-2 rounded-lg text-xl font-medium transition-all ${filters.season.includes('summer') ? 'bg-yellow-200 text-yellow-900 shadow-sm' : inactiveButtonClass}`}>
              {getSeasonEmoji('summer')}
            </button>
            <button onClick={() => toggleSeason('fall')} title={getSeasonLabel('fall')} className={`px-3 py-2 rounded-lg text-xl font-medium transition-all ${filters.season.includes('fall') ? 'bg-orange-200 text-orange-900 shadow-sm' : inactiveButtonClass}`}>
              {getSeasonEmoji('fall')}
            </button>
            <button onClick={() => toggleSeason('winter')} title={getSeasonLabel('winter')} className={`px-3 py-2 rounded-lg text-xl font-medium transition-all ${filters.season.includes('winter') ? 'bg-blue-200 text-blue-900 shadow-sm' : inactiveButtonClass}`}>
              {getSeasonEmoji('winter')}
            </button>
            </div>
          </div>

          {/* Players Filters */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 mb-3">
              <span className="text-lg">👨‍👩‍👧</span>
              <h3 className={`text-xs font-semibold uppercase tracking-wide ${headingClass}`}>Joueur ?</h3>
            </div>
            <div className="flex gap-2">
            <button onClick={() => togglePlayers('solo')} title="Solo" className={`px-3 py-2 rounded-lg text-xl font-medium transition-all ${filters.players.includes('solo') ? 'bg-purple-200 text-purple-900 shadow-sm' : inactiveButtonClass}`}>👤</button>
            <button onClick={() => togglePlayers('duo')} title="Duo" className={`px-3 py-2 rounded-lg text-xl font-medium transition-all ${filters.players.includes('duo') ? 'bg-orange-200 text-orange-900 shadow-sm' : inactiveButtonClass}`}>👥</button>
            <button onClick={() => togglePlayers('multiple')} title="Plusieurs" className={`px-3 py-2 rounded-lg text-xl font-medium transition-all ${filters.players.includes('multiple') ? 'bg-pink-200 text-pink-900 shadow-sm' : inactiveButtonClass}`}>👨‍👩‍👧‍👦</button>
            </div>
          </div>

          {/* Energy Filters */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 mb-3">
              <span className="text-lg">💪</span>
              <h3 className={`text-xs font-semibold uppercase tracking-wide ${headingClass}`}>Énergie</h3>
            </div>
            <div className="flex gap-2">
            <button onClick={() => toggleEnergy('calm')} title="Calme" className={`px-3 py-2 rounded-lg text-xl font-medium transition-all ${filters.energy.includes('calm') ? 'bg-blue-200 text-blue-900 shadow-sm' : inactiveButtonClass}`}>🧘</button>
            <button onClick={() => toggleEnergy('active')} title="Actif" className={`px-3 py-2 rounded-lg text-xl font-medium transition-all ${filters.energy.includes('active') ? 'bg-red-200 text-red-900 shadow-sm' : inactiveButtonClass}`}>⚡</button>
            </div>
          </div>

          {/* Duration Filters */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 mb-3">
              <span className="text-lg">🕐</span>
              <h3 className={`text-xs font-semibold uppercase tracking-wide ${headingClass}`}>Temps</h3>
            </div>
            <div className="flex gap-2">
            <button onClick={() => toggleDuration('5-10')} title="5-10 minutes" className={`w-[52px] h-[44px] flex items-center justify-center rounded-lg text-sm font-medium transition-all ${filters.duration.includes('5-10') ? 'bg-teal-200 text-teal-900 shadow-sm' : inactiveButtonClass}`}>5-10</button>
            <button onClick={() => toggleDuration('10-30')} title="10-30 minutes" className={`w-[52px] h-[44px] flex items-center justify-center rounded-lg text-sm font-medium transition-all ${filters.duration.includes('10-30') ? 'bg-indigo-200 text-indigo-900 shadow-sm' : inactiveButtonClass}`}>10-30</button>
            <button onClick={() => toggleDuration('30+')} title="30+ minutes" className={`w-[52px] h-[44px] flex items-center justify-center rounded-lg text-sm font-medium transition-all ${filters.duration.includes('30+') ? 'bg-violet-200 text-violet-900 shadow-sm' : inactiveButtonClass}`}>30+</button>
            </div>
          </div>

          {/* Favorites Filter */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 mb-3">
              <span className="text-lg">❤️</span>
              <h3 className={`text-xs font-semibold uppercase tracking-wide ${headingClass}`}>Favoris</h3>
            </div>
            <div className="flex gap-2">
              <button onClick={toggleFavoritesOnly} className={`px-4 py-2 h-[44px] flex items-center justify-center rounded-lg text-sm font-medium transition-all whitespace-nowrap ${filters.showFavoritesOnly ? 'bg-yellow-200 text-yellow-900 shadow-sm' : inactiveButtonClass}`}>Favoris</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
