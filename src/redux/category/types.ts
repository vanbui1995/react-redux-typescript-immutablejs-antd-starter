import { ReduxCollections } from 'enums';

export interface CategoryState {
  isFetching: boolean;
  error?: null | string;
  categories: Record<string, CategoryPayload>;
  isUpdatingById: Record<string, boolean>;
}

export interface CategoryPayload {
  _id: string;
  name: string;
  isDeleted: boolean;
}
