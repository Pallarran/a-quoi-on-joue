import { Activity } from '../types/Activity';
import ActivityCard from './ActivityCard';

interface ActivityListProps {
  activities: Activity[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

const ActivityList = ({ activities, favorites, onToggleFavorite }: ActivityListProps) => {
  if (activities.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-2xl text-gray-500 font-medium">
          Aucune activité trouvée 😢
        </p>
        <p className="text-gray-400 mt-2">
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
        />
      ))}
    </div>
  );
};

export default ActivityList;
