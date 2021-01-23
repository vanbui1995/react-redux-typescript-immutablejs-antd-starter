import { IndexesType } from 'enums';
import { CategoryPayload } from 'redux/category';

export interface TodoState {
  isFetching: boolean;
  error?: null | string;
  todos: Record<string, TodoPayload>;
  isUpdatingById: Record<string, boolean>;
  selectedCategory: null | string;
  indexes: IndexesType;
}

export interface TodoPayload {
  _id: string;
  name: string;
  checked: boolean;
  categoryId: string;
  category?: CategoryPayload;
}
