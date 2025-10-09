export type Season = 'winter' | 'spring' | 'summer' | 'fall';

/**
 * Get the current season based on the current month (Northern Hemisphere)
 * Winter: December, January, February
 * Spring: March, April, May
 * Summer: June, July, August
 * Fall: September, October, November
 */
export const getCurrentSeason = (): Season => {
  const month = new Date().getMonth(); // 0 = January, 11 = December

  if (month === 11 || month === 0 || month === 1) {
    return 'winter';
  } else if (month >= 2 && month <= 4) {
    return 'spring';
  } else if (month >= 5 && month <= 7) {
    return 'summer';
  } else {
    return 'fall';
  }
};

/**
 * Get the emoji for a given season
 */
export const getSeasonEmoji = (season: Season): string => {
  switch (season) {
    case 'winter':
      return '❄️';
    case 'spring':
      return '🌸';
    case 'summer':
      return '☀️';
    case 'fall':
      return '🍂';
  }
};

/**
 * Get the French label for a given season
 */
export const getSeasonLabel = (season: Season): string => {
  switch (season) {
    case 'winter':
      return 'Hiver';
    case 'spring':
      return 'Printemps';
    case 'summer':
      return 'Été';
    case 'fall':
      return 'Automne';
  }
};
