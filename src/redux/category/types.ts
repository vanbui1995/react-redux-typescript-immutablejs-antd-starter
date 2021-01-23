import { IndexesType } from 'enums';

export interface CategoryState {
  isFetching: boolean;
  error?: null | string;
  categories: Record<string, CategoryPayload>;
  isUpdatingById: Record<string, boolean>;
  indexes: IndexesType;
}

export interface CategoryPayload {
  _id: string;
  name: string;
  isDeleted: boolean;
}
