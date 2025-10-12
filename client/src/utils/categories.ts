import { CategoryTag } from '../types/Activity';

export const getCategoryLabel = (category: CategoryTag): string => {
  const labels: Record<CategoryTag, string> = {
    'jeu-de-societe': 'Jeu de société',
    'casse-tete': 'Casse-tête',
    'arts-et-bricolage': 'Arts et bricolage',
  };
  return labels[category];
};

export const getCategoryEmoji = (category: CategoryTag): string => {
  const emojis: Record<CategoryTag, string> = {
    'jeu-de-societe': '♟️',
    'casse-tete': '🧩',
    'arts-et-bricolage': '🎨',
  };
  return emojis[category];
};

export const getAllCategories = (): CategoryTag[] => {
  return [
    'jeu-de-societe',
    'casse-tete',
    'arts-et-bricolage',
  ];
};
