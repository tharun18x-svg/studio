export type Category = 'OC' | 'MBC' | 'BC' | 'BCM' | 'SC';

export const CATEGORIES: Category[] = ['OC', 'MBC', 'BC', 'BCM', 'SC'];

export type FilterCategory = Category | 'ALL';

export type Course = {
  id: number;
  name: string;
  cutoffs: {
    [key in Category]: number;
  };
};

export type College = {
  id: number;
  code: number;
  name: string;
  ranking: number;
  highestPackage: number; // in LPA
  description: string;
  image?: string;
  courses: Course[];
};
