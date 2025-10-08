import { useState } from 'react';
import { X, RotateCw } from 'lucide-react';
import { Activity } from '../types/Activity';

interface SurpriseMeButtonProps {
  activities: Activity[];
}

const SurpriseMeButton = ({ activities }: SurpriseMeButtonProps) => {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [showModal, setShowModal] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL || '';

  const pickRandomActivity = () => {
    if (activities.length === 0) return;

    const randomIndex = Math.floor(Math.random() * activities.length);
    setSelectedActivity(activities[randomIndex]);
    setShowModal(true);
  };

  const pickAnother = () => {
    pickRandomActivity();
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedActivity(null);
  };

  const getPlayersText = (activity: Activity) => {
    const { players } = activity.tags;
    const labels: { [key: string]: string } = {
      solo: 'Solo',
      duo: 'Duo',
      multiple: 'Plusieurs',
    };
    return players.map(p => labels[p]).join(', ');
  };

  const getLocationText = (activity: Activity) => {
    const { location } = activity.tags;
    const labels: { [key: string]: string } = {
      indoor: 'Intérieur',
      outdoor: 'Extérieur',
    };
    return location.map(l => labels[l]).join(', ');
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={pickRandomActivity}
        disabled={activities.length === 0}
        className="fixed bottom-8 right-8 bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all font-bold text-lg flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed z-50"
      >
        <span className="text-2xl">🎲</span>
        Surprends-moi !
      </button>

      {/* Modal */}
      {showModal && selectedActivity && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-white transition-colors"
              aria-label="Fermer"
            >
              <X size={24} />
            </button>

            {/* Image */}
            <div className="relative">
              <img
                src={`${API_URL}${selectedActivity.image}`}
                alt={selectedActivity.name}
                className="w-full h-64 md:h-80 object-cover rounded-t-3xl"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x400?text=Image';
                }}
              />
            </div>

            {/* Content */}
            <div className="p-8">
              <h2 className="text-4xl font-bold text-gray-800 mb-4 text-center">
                {selectedActivity.name}
              </h2>

              <div className="flex flex-wrap justify-center gap-3 mb-8">
                <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-lg font-medium">
                  {getLocationText(selectedActivity)}
                </span>
                <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-lg font-medium">
                  {getPlayersText(selectedActivity)}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={pickAnother}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <RotateCw size={20} />
                  Encore !
                </button>
                <button
                  onClick={closeModal}
                  className="flex-1 bg-gray-200 text-gray-700 px-6 py-4 rounded-xl font-bold text-lg hover:bg-gray-300 transition-all"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SurpriseMeButton;
