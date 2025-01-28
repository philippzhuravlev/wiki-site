export const Eras = {
  GOLDEN: 'golden',
  STEEL: 'steel',
  COAL: 'coal'
} as const;

export type Era = typeof Eras[keyof typeof Eras];

export interface EraMetadata {
  id: Era;
  name: string;
  description: string;
  yearRange: string;
}

export const EraData: Record<Era, EraMetadata> = {
  [Eras.GOLDEN]: {
    id: Eras.GOLDEN,
    name: 'Golden Period',
    description: 'The age of prosperity and magic',
    yearRange: '0-500 AG'
  },
  [Eras.STEEL]: {
    id: Eras.STEEL,
    name: 'Era of Steel',
    description: 'The age of innovation and industry',
    yearRange: '501-1000 AG'
  },
  [Eras.COAL]: {
    id: Eras.COAL,
    name: 'Coal Age',
    description: 'The age of darkness and revolution',
    yearRange: '1001-1500 AG'
  }
}; 