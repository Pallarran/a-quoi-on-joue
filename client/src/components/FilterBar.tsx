import { ActivityFilters, LocationTag, PlayerTag, EnergyTag, DurationTag, SeasonTag } from '../types/Activity';
import { getSeasonEmoji, getSeasonLabel, getCurrentSeason } from '../utils/seasons';

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
      season: [getCurrentSeason()], // Reset to current season
      showFavoritesOnly: false,
    });
  };

  const hasActiveFilters =
    filters.location.length > 0 ||
    filters.players.length > 0 ||
    filters.energy.length > 0 ||
    filters.duration.length > 0 ||
    filters.season.length !== 1 || filters.season[0] !== getCurrentSeason() ||
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
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-[0.9fr_1.3fr_1fr_0.8fr_1fr_0.9fr] gap-2">
          {/* Location Filters */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">🏠</span>
              <h3 className={`text-xs font-semibold uppercase tracking-wide ${headingClass}`}>Où ?</h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => toggleLocation('indoor')}
                title="Intérieur"
                className={`px-2 py-1 rounded-lg text-base font-medium transition-all ${
                  filters.location.includes('indoor')
                    ? 'bg-cyan-500 text-white shadow-sm'
                    : inactiveButtonClass
                }`}
              >
                🏠
              </button>
              <button
                onClick={() => toggleLocation('outdoor')}
                title="Extérieur"
                className={`px-2 py-1 rounded-lg text-base font-medium transition-all ${
                  filters.location.includes('outdoor')
                    ? 'bg-green-500 text-white shadow-sm'
                    : inactiveButtonClass
                }`}
              >
                🌳
              </button>
            </div>
          </div>

          {/* Season Filters */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">{getSeasonEmoji(getCurrentSeason())}</span>
              <h3 className={`text-xs font-semibold uppercase tracking-wide ${headingClass}`}>Saison</h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button onClick={() => toggleSeason('spring')} title={getSeasonLabel('spring')} className={`px-2 py-1 rounded-lg text-base font-medium transition-all ${filters.season.includes('spring') ? 'bg-pink-400 text-white shadow-sm' : inactiveButtonClass}`}>
                {getSeasonEmoji('spring')}
              </button>
              <button onClick={() => toggleSeason('summer')} title={getSeasonLabel('summer')} className={`px-2 py-1 rounded-lg text-base font-medium transition-all ${filters.season.includes('summer') ? 'bg-yellow-400 text-gray-900 shadow-sm' : inactiveButtonClass}`}>
                {getSeasonEmoji('summer')}
              </button>
              <button onClick={() => toggleSeason('fall')} title={getSeasonLabel('fall')} className={`px-2 py-1 rounded-lg text-base font-medium transition-all ${filters.season.includes('fall') ? 'bg-orange-500 text-white shadow-sm' : inactiveButtonClass}`}>
                {getSeasonEmoji('fall')}
              </button>
              <button onClick={() => toggleSeason('winter')} title={getSeasonLabel('winter')} className={`px-2 py-1 rounded-lg text-base font-medium transition-all ${filters.season.includes('winter') ? 'bg-blue-400 text-white shadow-sm' : inactiveButtonClass}`}>
                {getSeasonEmoji('winter')}
              </button>
              <button onClick={() => toggleSeason('all-year')} title={getSeasonLabel('all-year')} className={`px-2 py-1 rounded-lg text-base font-medium transition-all ${filters.season.includes('all-year') ? 'bg-emerald-500 text-white shadow-sm' : inactiveButtonClass}`}>
                {getSeasonEmoji('all-year')}
              </button>
            </div>
          </div>

          {/* Players Filters */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">👥</span>
              <h3 className={`text-xs font-semibold uppercase tracking-wide ${headingClass}`}>Joueur ?</h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button onClick={() => togglePlayers('solo')} title="Solo" className={`px-2 py-1 rounded-lg text-base font-medium transition-all ${filters.players.includes('solo') ? 'bg-purple-500 text-white shadow-sm' : inactiveButtonClass}`}>👤</button>
              <button onClick={() => togglePlayers('duo')} title="Duo" className={`px-2 py-1 rounded-lg text-base font-medium transition-all ${filters.players.includes('duo') ? 'bg-orange-500 text-white shadow-sm' : inactiveButtonClass}`}>👥</button>
              <button onClick={() => togglePlayers('multiple')} title="Plusieurs" className={`px-2 py-1 rounded-lg text-base font-medium transition-all ${filters.players.includes('multiple') ? 'bg-pink-500 text-white shadow-sm' : inactiveButtonClass}`}>👨‍👩‍👧‍👦</button>
            </div>
          </div>

          {/* Energy Filters */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">⚡</span>
              <h3 className={`text-xs font-semibold uppercase tracking-wide ${headingClass}`}>Énergie</h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button onClick={() => toggleEnergy('calm')} title="Calme" className={`px-2 py-1 rounded-lg text-base font-medium transition-all ${filters.energy.includes('calm') ? 'bg-blue-500 text-white shadow-sm' : inactiveButtonClass}`}>🧘</button>
              <button onClick={() => toggleEnergy('active')} title="Actif" className={`px-2 py-1 rounded-lg text-base font-medium transition-all ${filters.energy.includes('active') ? 'bg-red-500 text-white shadow-sm' : inactiveButtonClass}`}>⚡</button>
            </div>
          </div>

          {/* Duration Filters */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">⏱️</span>
              <h3 className={`text-xs font-semibold uppercase tracking-wide ${headingClass}`}>Temps</h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button onClick={() => toggleDuration('5-10')} title="5-10 minutes" className={`px-2 py-1 rounded-lg text-xs font-medium transition-all ${filters.duration.includes('5-10') ? 'bg-teal-500 text-white shadow-sm' : inactiveButtonClass}`}>5-10</button>
              <button onClick={() => toggleDuration('10-30')} title="10-30 minutes" className={`px-2 py-1 rounded-lg text-xs font-medium transition-all ${filters.duration.includes('10-30') ? 'bg-indigo-500 text-white shadow-sm' : inactiveButtonClass}`}>10-30</button>
              <button onClick={() => toggleDuration('30+')} title="30+ minutes" className={`px-2 py-1 rounded-lg text-xs font-medium transition-all ${filters.duration.includes('30+') ? 'bg-violet-500 text-white shadow-sm' : inactiveButtonClass}`}>30+</button>
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
