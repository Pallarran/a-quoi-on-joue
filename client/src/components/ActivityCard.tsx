import { Activity } from '../types/Activity';

interface ActivityCardProps {
  activity: Activity;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const ActivityCard = ({ activity, isFavorite, onToggleFavorite }: ActivityCardProps) => {
  const getPlayersText = () => {
    const labels: { [key: string]: string } = {
      solo: 'Solo',
      duo: 'Duo',
      multiple: 'Plusieurs',
    };
    return labels[activity.tags.players];
  };

  const getEnergyText = () => {
    const labels: { [key: string]: string } = {
      calm: 'Calme',
      active: 'Actif',
      mix: 'Mix',
    };
    return labels[activity.tags.energy];
  };

  const getDurationText = () => {
    const labels: { [key: string]: string} = {
      '5-10': '5-10 min',
      '10-30': '10-30 min',
      '30+': '30+ min',
    };
    return labels[activity.tags.duration];
  };

  // Different emoji based on activity name
  const getEmoji = () => {
    const name = activity.name.toLowerCase();
    if (name.includes('trésor')) return '🗺️';
    if (name.includes('musicale')) return '🎵';
    if (name.includes('cuillère')) return '🥄';
    if (name.includes('dessin')) return '🎨';
    if (name.includes('cache')) return '🙈';
    if (name.includes('mime')) return '🎭';
    if (name.includes('yoga')) return '🧘';
    if (name.includes('couleur')) return '🌈';
    if (name.includes('tente') || name.includes('couverture')) return '🏕️';
    if (name.includes('pique-nique')) return '🧺';
    return '🌟';
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <div className="w-full h-56 bg-gradient-to-br from-cyan-50 to-blue-50 flex items-center justify-center">
          <span className="text-7xl">{getEmoji()}</span>
        </div>
        <button
          onClick={onToggleFavorite}
          className="absolute top-4 right-4 bg-white rounded-full p-2.5 shadow-md hover:shadow-lg transition-all"
          aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        >
          <span className="text-xl">{isFavorite ? '❤️' : '🤍'}</span>
        </button>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">{activity.name}</h3>

        {/* House Location */}
        {activity.houseLocation && (
          <div className="flex items-center gap-1.5 text-gray-600 mb-3">
            <span className="text-base">📍</span>
            <span className="text-sm font-medium">{activity.houseLocation}</span>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          <span className="inline-block px-3 py-1.5 bg-gray-50 text-gray-700 rounded-lg text-xs font-medium border border-gray-200">
            {getPlayersText()}
          </span>
          <span className="inline-block px-3 py-1.5 bg-gray-50 text-gray-700 rounded-lg text-xs font-medium border border-gray-200">
            {getEnergyText()}
          </span>
          <span className="inline-block px-3 py-1.5 bg-gray-50 text-gray-700 rounded-lg text-xs font-medium border border-gray-200">
            {getDurationText()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
