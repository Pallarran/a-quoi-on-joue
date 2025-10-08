export type LocationTag = 'indoor' | 'outdoor' | 'both';
export type PlayerTag = 'solo' | 'duo' | 'multiple';
export type EnergyTag = 'calm' | 'active' | 'mix';
export type DurationTag = '5-10' | '10-30' | '30+';

export type Activity = {
  id: string;
  name: string;
  image: string;
  tags: {
    location: LocationTag;
    players: PlayerTag;
    energy: EnergyTag;
    duration: DurationTag;
  };
  houseLocation?: string; // e.g., "Salon", "Cuisine", "Jardin"
  createdAt: string;
};

export type ActivityFilters = {
  location: LocationTag | 'all';
  players: PlayerTag | 'all';
  energy: EnergyTag | 'all';
  duration: DurationTag | 'all';
  showFavoritesOnly: boolean;
};
