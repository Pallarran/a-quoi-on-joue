export type LocationTag = 'indoor' | 'outdoor';
export type PlayerTag = 'solo' | 'duo' | 'multiple';
export type EnergyTag = 'calm' | 'active';
export type DurationTag = '5-10' | '10-30' | '30+';
export type SeasonTag = 'spring' | 'summer' | 'fall' | 'winter' | 'all-year';

export type Activity = {
  id: string;
  name: string;
  image: string;
  tags: {
    location: LocationTag[];
    players: PlayerTag[];
    energy: EnergyTag[];
    duration: DurationTag[];
    season: SeasonTag[];
  };
  houseLocation?: string; // e.g., "Salon", "Cuisine", "Jardin"
  createdAt: string;
};

export type ActivityFilters = {
  location: LocationTag[];
  players: PlayerTag[];
  energy: EnergyTag[];
  duration: DurationTag[];
  season: SeasonTag[];
  showFavoritesOnly: boolean;
};
