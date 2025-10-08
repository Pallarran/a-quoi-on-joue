import { ActivityFilters, LocationTag, PlayerTag, EnergyTag, DurationTag } from '../types/Activity';

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

  const toggleFavoritesOnly = () => {
    onFiltersChange({ ...filters, showFavoritesOnly: !filters.showFavoritesOnly });
  };

  const clearFilters = () => {
    onFiltersChange({
      location: [],
      players: [],
      energy: [],
      duration: [],
      showFavoritesOnly: false,
    });
  };

  const hasActiveFilters =
    filters.location.length > 0 ||
    filters.players.length > 0 ||
    filters.energy.length > 0 ||
    filters.duration.length > 0 ||
    filters.showFavoritesOnly;

  const inactiveButtonClass = isDarkMode
    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600 border border-gray-600'
    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200';

  const headingClass = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const countTextClass = isDarkMode ? 'text-gray-300' : 'text-gray-600';
  const countBoldClass = isDarkMode ? 'text-white' : 'text-gray-900';

  return (
    <div className="mb-8">
      <div className={`rounded-2xl shadow-sm border p-6 ${
        isDarkMode ? 'bg-[#0a2a3d] border-gray-700' : 'bg-white border-gray-100'
      }`}>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-[1.2fr_1fr_0.9fr_1fr_0.8fr] gap-3">
          {/* Location Filters */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">🏠</span>
              <h3 className={`text-xs font-semibold uppercase tracking-wide ${headingClass}`}>Où ?</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => toggleLocation('indoor')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filters.location.includes('indoor')
                    ? 'bg-cyan-500 text-white shadow-sm'
                    : inactiveButtonClass
                }`}
              >
                Intérieur
              </button>
              <button
                onClick={() => toggleLocation('outdoor')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filters.location.includes('outdoor')
                    ? 'bg-green-500 text-white shadow-sm'
                    : inactiveButtonClass
                }`}
              >
                Extérieur
              </button>
            </div>
          </div>

          {/* Players Filters */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">👥</span>
              <h3 className={`text-xs font-semibold uppercase tracking-wide ${headingClass}`}>Joueur ?</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => togglePlayers('solo')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filters.players.includes('solo') ? 'bg-purple-500 text-white shadow-sm' : inactiveButtonClass}`}>Solo</button>
              <button onClick={() => togglePlayers('duo')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filters.players.includes('duo') ? 'bg-orange-500 text-white shadow-sm' : inactiveButtonClass}`}>Duo</button>
              <button onClick={() => togglePlayers('multiple')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filters.players.includes('multiple') ? 'bg-pink-500 text-white shadow-sm' : inactiveButtonClass}`}>Plusieurs</button>
            </div>
          </div>

          {/* Energy Filters */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">⚡</span>
              <h3 className={`text-xs font-semibold uppercase tracking-wide ${headingClass}`}>Énergie</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => toggleEnergy('calm')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filters.energy.includes('calm') ? 'bg-blue-500 text-white shadow-sm' : inactiveButtonClass}`}>Calme</button>
              <button onClick={() => toggleEnergy('active')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filters.energy.includes('active') ? 'bg-red-500 text-white shadow-sm' : inactiveButtonClass}`}>Actif</button>
            </div>
          </div>

          {/* Duration Filters */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">⏱️</span>
              <h3 className={`text-xs font-semibold uppercase tracking-wide ${headingClass}`}>Temps</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => toggleDuration('5-10')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filters.duration.includes('5-10') ? 'bg-teal-500 text-white shadow-sm' : inactiveButtonClass}`}>5-10m</button>
              <button onClick={() => toggleDuration('10-30')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filters.duration.includes('10-30') ? 'bg-indigo-500 text-white shadow-sm' : inactiveButtonClass}`}>10-30m</button>
              <button onClick={() => toggleDuration('30+')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filters.duration.includes('30+') ? 'bg-violet-500 text-white shadow-sm' : inactiveButtonClass}`}>30m+</button>
            </div>
          </div>

          {/* Favorites Filter */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-sm">❤️</span>
              <h3 className={`text-xs font-semibold uppercase tracking-wide ${headingClass}`}>Favoris</h3>
            </div>
            <button onClick={toggleFavoritesOnly} className={`px-2 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${filters.showFavoritesOnly ? 'bg-yellow-400 text-gray-900 shadow-sm' : inactiveButtonClass}`}>Favoris</button>
            <p className={`text-xs whitespace-nowrap ${countTextClass}`}>
              <span className={`font-semibold ${countBoldClass}`}>{activityCount}</span> activité{activityCount !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Clear filters button */}
        {hasActiveFilters && (
          <div className={`flex justify-end pt-4 border-t mt-4 ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
            <button onClick={clearFilters} className="text-xs text-cyan-500 hover:text-cyan-400 font-medium">Effacer</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
