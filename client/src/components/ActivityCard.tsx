import { useState } from 'react';
import { X } from 'lucide-react';
import { Activity } from '../types/Activity';
import { getSeasonEmoji, getSeasonLabel } from '../utils/seasons';

interface ActivityCardProps {
  activity: Activity;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  isDarkMode?: boolean;
}

const ActivityCard = ({ activity, isFavorite, onToggleFavorite, isDarkMode = false }: ActivityCardProps) => {
  const [showModal, setShowModal] = useState(false);

  const getPlayersText = () => {
    const labels: { [key: string]: string } = {
      solo: 'Solo',
      duo: 'Duo',
      multiple: 'Plusieurs',
    };
    return activity.tags.players.map(p => labels[p]).join(', ');
  };

  const getEnergyText = () => {
    const labels: { [key: string]: string } = {
      calm: 'Calme',
      active: 'Actif',
    };
    return activity.tags.energy.map(e => labels[e]).join(', ');
  };

  const getDurationText = () => {
    const labels: { [key: string]: string} = {
      '5-10': '5-10 min',
      '10-30': '10-30 min',
      '30+': '30+ min',
    };
    return activity.tags.duration.map(d => labels[d]).join(', ');
  };

  const getLocationText = () => {
    const labels: { [key: string]: string } = {
      indoor: 'Intérieur',
      outdoor: 'Extérieur',
    };
    return activity.tags.location.map(l => labels[l]).join(', ');
  };

  const getSeasonText = () => {
    return activity.tags.season.map(s => `${getSeasonEmoji(s)} ${getSeasonLabel(s)}`).join(', ');
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
    <>
      {/* Simplified Card */}
      <div className={`rounded-2xl shadow-sm border overflow-hidden hover:shadow-lg transition-all cursor-pointer group ${
        isDarkMode ? 'bg-[#0a2a3d] border-gray-700' : 'bg-white border-gray-100'
      }`}>
        <div
          className="relative"
          onClick={() => setShowModal(true)}
        >
          <div className={`w-full h-56 flex items-center justify-center rounded-2xl ${
            isDarkMode ? 'bg-gradient-to-br from-[#0d3449] to-[#0a2a3d]' : 'bg-gradient-to-br from-cyan-50 to-blue-50'
          }`}>
            <span className="text-7xl group-hover:scale-110 transition-transform">{getEmoji()}</span>
          </div>

          {/* Name bubble at bottom-left (dynamic size) */}
          <div className={`absolute bottom-3 left-3 px-3 py-2 rounded-full backdrop-blur-md shadow-lg max-w-[calc(100%-6rem)] ${
            isDarkMode ? 'bg-gray-900/90' : 'bg-white/90'
          }`}>
            <h3 className={`text-sm font-bold truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {activity.name}
            </h3>
          </div>

          {/* Favorite button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite();
            }}
            className={`absolute top-3 right-3 rounded-full p-2.5 shadow-md hover:shadow-lg transition-all ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}
            aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          >
            <span className="text-xl">{isFavorite ? '❤️' : '🤍'}</span>
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={() => setShowModal(false)}>
          <div
            className={`rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl ${
              isDarkMode ? 'bg-[#0a2a3d]' : 'bg-white'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className={`absolute top-4 right-4 rounded-full p-2 shadow-md hover:shadow-lg transition-all ${
                isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white/90 hover:bg-white'
              }`}
              aria-label="Fermer"
            >
              <X size={24} className={isDarkMode ? 'text-white' : 'text-gray-900'} />
            </button>

            {/* Image/Emoji */}
            <div className="relative">
              <div className={`w-full h-64 md:h-80 flex items-center justify-center ${
                isDarkMode ? 'bg-gradient-to-br from-[#0d3449] to-[#0a2a3d]' : 'bg-gradient-to-br from-cyan-50 to-blue-50'
              }`}>
                <span className="text-9xl">{getEmoji()}</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {activity.name}
                </h2>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite();
                  }}
                  className={`rounded-full p-3 shadow-md hover:shadow-lg transition-all ${
                    isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                  }`}
                >
                  <span className="text-2xl">{isFavorite ? '❤️' : '🤍'}</span>
                </button>
              </div>

              {/* House Location */}
              {activity.houseLocation && (
                <div className={`flex items-center gap-2 mb-6 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span className="text-xl">📍</span>
                  <span className="font-medium">{activity.houseLocation}</span>
                </div>
              )}

              {/* Tags */}
              <div className="grid grid-cols-2 gap-2 mb-6">
                <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <div className={`text-sm mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Où ?</div>
                  <div className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{getLocationText()}</div>
                </div>
                <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <div className={`text-sm mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Joueurs</div>
                  <div className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{getPlayersText()}</div>
                </div>
                <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <div className={`text-sm mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Énergie</div>
                  <div className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{getEnergyText()}</div>
                </div>
                <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <div className={`text-sm mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Durée</div>
                  <div className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{getDurationText()}</div>
                </div>
                <div className={`p-3 rounded-xl col-span-2 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <div className={`text-sm mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Saison</div>
                  <div className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{getSeasonText()}</div>
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={() => setShowModal(false)}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                  isDarkMode
                    ? 'bg-gray-800 text-white hover:bg-gray-700'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ActivityCard;
