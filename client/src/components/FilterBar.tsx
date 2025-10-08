import { ActivityFilters, LocationTag, PlayerTag, EnergyTag, DurationTag } from '../types/Activity';

interface FilterBarProps {
  filters: ActivityFilters;
  onFiltersChange: (filters: ActivityFilters) => void;
  activityCount: number;
}

const FilterBar = ({ filters, onFiltersChange, activityCount }: FilterBarProps) => {
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

  return (
    <div className="mb-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-[1.2fr_1fr_0.9fr_1fr_0.8fr] gap-3">
          {/* Location Filters */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">🏠</span>
              <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Où ?</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => toggleLocation('indoor')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filters.location === 'indoor'
                    ? 'bg-cyan-500 text-white shadow-sm'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                Intérieur
              </button>
              <button
                onClick={() => toggleLocation('outdoor')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filters.location === 'outdoor'
                    ? 'bg-green-500 text-white shadow-sm'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                Extérieur
              </button>
              <button
                onClick={() => toggleLocation('both')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filters.location === 'both'
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
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
              <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Joueur ?</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => togglePlayers('solo')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filters.players === 'solo'
                    ? 'bg-purple-500 text-white shadow-sm'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                Solo
              </button>
              <button
                onClick={() => togglePlayers('duo')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filters.players === 'duo'
                    ? 'bg-orange-500 text-white shadow-sm'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                Duo
              </button>
              <button
                onClick={() => togglePlayers('multiple')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filters.players === 'multiple'
                    ? 'bg-pink-500 text-white shadow-sm'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                Plusieurs
              </button>
            </div>
          </div>

          {/* Energy Filters */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">⚡</span>
              <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Énergie</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => toggleEnergy('calm')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filters.energy === 'calm'
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                Calme
              </button>
              <button
                onClick={() => toggleEnergy('active')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filters.energy === 'active'
                    ? 'bg-red-500 text-white shadow-sm'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                Actif
              </button>
              <button
                onClick={() => toggleEnergy('mix')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filters.energy === 'mix'
                    ? 'bg-yellow-500 text-white shadow-sm'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                Mix
              </button>
            </div>
          </div>

          {/* Duration Filters */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">⏱️</span>
              <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Temps</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => toggleDuration('5-10')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filters.duration === '5-10'
                    ? 'bg-teal-500 text-white shadow-sm'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                5-10m
              </button>
              <button
                onClick={() => toggleDuration('10-30')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filters.duration === '10-30'
                    ? 'bg-indigo-500 text-white shadow-sm'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                10-30m
              </button>
              <button
                onClick={() => toggleDuration('30+')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filters.duration === '30+'
                    ? 'bg-violet-500 text-white shadow-sm'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                30m+
              </button>
            </div>
          </div>

          {/* Favorites Filter */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-sm">❤️</span>
              <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Favoris</h3>
            </div>
            <button
              onClick={toggleFavoritesOnly}
              className={`px-2 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                filters.showFavoritesOnly
                  ? 'bg-yellow-400 text-gray-900 shadow-sm'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              Favoris
            </button>
            <p className="text-xs text-gray-600 whitespace-nowrap">
              <span className="font-semibold text-gray-900">{activityCount}</span> activité{activityCount !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Clear filters button */}
        {hasActiveFilters && (
          <div className="flex justify-end pt-4 border-t border-gray-100 mt-4">
            <button
              onClick={clearFilters}
              className="text-xs text-cyan-600 hover:text-cyan-700 font-medium"
            >
              Effacer
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
