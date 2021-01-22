import { ReduxCollections } from 'enums';
import { CategoryPayload } from 'redux/category';

export interface TodoState {
  isFetching: boolean;
  error?: null | string;
  [ReduxCollections.TODO]: Record<string, TodoPayload>;
  isUpdatingById: Record<string, boolean>;
  selectedCategory: null | string;
}

export interface TodoPayload {
  _id: string;
  name: string;
  checked: boolean;
  categoryId: string;
  category?: CategoryPayload;
}
