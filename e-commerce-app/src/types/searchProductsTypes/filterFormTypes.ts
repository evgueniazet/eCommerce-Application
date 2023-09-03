export interface ISortByForm {
  sort: SortFormType;
  categories: string;
}

export type SortFormType = '' | SortFormPrice | SortFormName;

export type SortFormPrice = 'price asc' | 'price desc';

export type SortFormName = 'name.en asc' | 'name.en desc';
