import { Activity } from '../types/Activity';
import ActivityCard from './ActivityCard';

interface ActivityListProps {
  activities: Activity[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  isDarkMode?: boolean;
}

const ActivityList = ({ activities, favorites, onToggleFavorite, isDarkMode = false }: ActivityListProps) => {
  if (activities.length === 0) {
    return (
      <div className="text-center py-16">
        <p className={`text-2xl font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Aucune activité trouvée 😢
        </p>
        <p className={`mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          Essaie de changer les filtres !
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {activities.map(activity => (
        <ActivityCard
          key={activity.id}
          activity={activity}
          isFavorite={favorites.includes(activity.id)}
          onToggleFavorite={() => onToggleFavorite(activity.id)}
          isDarkMode={isDarkMode}
        />
      ))}
    </div>
  );
};

export default ActivityList;
