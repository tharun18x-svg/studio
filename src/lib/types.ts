export type Category = 'OC' | 'MBC' | 'BC' | 'BCM' | 'SC';

export const CATEGORIES: Category[] = ['OC', 'MBC', 'BC', 'BCM', 'SC'];

export type FilterCategory = Category | 'ALL';

export type College = {
  id: number;
  name: string;
  ranking: number;
  highestPackage: number; // in LPA
  cutoffs: {
    [key in Category]: number;
  };
  description: string;
  image?: string;
};
