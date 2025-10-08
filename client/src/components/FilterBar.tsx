import { ActivityFilters, LocationTag, PlayerTag, EnergyTag, DurationTag } from '../types/Activity';

interface FilterBarProps {
  filters: ActivityFilters;
  onFiltersChange: (filters: ActivityFilters) => void;
  activityCount: number;
  isDarkMode?: boolean;
}

const FilterBar = ({ filters, onFiltersChange, activityCount, isDarkMode = false }: FilterBarProps) => {
  const toggleLocation = (location: LocationTag | 'all') => {
    // If clicking the same filter, deselect it
    onFiltersChange({ ...filters, location: filters.location === location ? 'all' : location });
  };

  const togglePlayers = (players: PlayerTag | 'all') => {
    // If clicking the same filter, deselect it
    onFiltersChange({ ...filters, players: filters.players === players ? 'all' : players });
  };

  const toggleEnergy = (energy: EnergyTag | 'all') => {
    // If clicking the same filter, deselect it
    onFiltersChange({ ...filters, energy: filters.energy === energy ? 'all' : energy });
  };

  const toggleDuration = (duration: DurationTag | 'all') => {
    // If clicking the same filter, deselect it
    onFiltersChange({ ...filters, duration: filters.duration === duration ? 'all' : duration });
  };

  const toggleFavoritesOnly = () => {
    onFiltersChange({ ...filters, showFavoritesOnly: !filters.showFavoritesOnly });
  };

  const clearFilters = () => {
    onFiltersChange({
      location: 'all',
      players: 'all',
      energy: 'all',
      duration: 'all',
      showFavoritesOnly: false,
    });
  };

  const hasActiveFilters =
    filters.location !== 'all' ||
    filters.players !== 'all' ||
    filters.energy !== 'all' ||
    filters.duration !== 'all' ||
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
                  filters.location === 'indoor'
                    ? 'bg-cyan-500 text-white shadow-sm'
                    : inactiveButtonClass
                }`}
              >
                Intérieur
              </button>
              <button
                onClick={() => toggleLocation('outdoor')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filters.location === 'outdoor'
                    ? 'bg-green-500 text-white shadow-sm'
                    : inactiveButtonClass
                }`}
              >
                Extérieur
              </button>
              <button
                onClick={() => toggleLocation('both')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filters.location === 'both'
                    ? 'bg-blue-500 text-white shadow-sm'
                    : inactiveButtonClass
                }`}
              >
                Les deux
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
              <button onClick={() => togglePlayers('solo')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filters.players === 'solo' ? 'bg-purple-500 text-white shadow-sm' : inactiveButtonClass}`}>Solo</button>
              <button onClick={() => togglePlayers('duo')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filters.players === 'duo' ? 'bg-orange-500 text-white shadow-sm' : inactiveButtonClass}`}>Duo</button>
              <button onClick={() => togglePlayers('multiple')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filters.players === 'multiple' ? 'bg-pink-500 text-white shadow-sm' : inactiveButtonClass}`}>Plusieurs</button>
            </div>
          </div>

          {/* Energy Filters */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">⚡</span>
              <h3 className={`text-xs font-semibold uppercase tracking-wide ${headingClass}`}>Énergie</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => toggleEnergy('calm')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filters.energy === 'calm' ? 'bg-blue-500 text-white shadow-sm' : inactiveButtonClass}`}>Calme</button>
              <button onClick={() => toggleEnergy('active')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filters.energy === 'active' ? 'bg-red-500 text-white shadow-sm' : inactiveButtonClass}`}>Actif</button>
              <button onClick={() => toggleEnergy('mix')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filters.energy === 'mix' ? 'bg-yellow-500 text-white shadow-sm' : inactiveButtonClass}`}>Mix</button>
            </div>
          </div>

          {/* Duration Filters */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">⏱️</span>
              <h3 className={`text-xs font-semibold uppercase tracking-wide ${headingClass}`}>Temps</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => toggleDuration('5-10')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filters.duration === '5-10' ? 'bg-teal-500 text-white shadow-sm' : inactiveButtonClass}`}>5-10m</button>
              <button onClick={() => toggleDuration('10-30')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filters.duration === '10-30' ? 'bg-indigo-500 text-white shadow-sm' : inactiveButtonClass}`}>10-30m</button>
              <button onClick={() => toggleDuration('30+')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filters.duration === '30+' ? 'bg-violet-500 text-white shadow-sm' : inactiveButtonClass}`}>30m+</button>
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
