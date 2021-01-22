import { CategoryPayload } from 'redux/category';
import { TodoPayload } from 'redux/todo';

export enum ReduxModules {
  AUTH = 'auth',
  TODO = 'todo',
  CATEGORY = 'category',
}

export enum ReduxCollections {
  TODO = 'todos',
  CATEGORY = 'categories',
}

export const Indexes = {
  [ReduxModules.TODO]: ['categoryId'],
  [ReduxModules.CATEGORY]: ['isDeleted'],
};

export interface ReduxCollectionType {
  [ReduxCollections.TODO]: TodoPayload[];
  [ReduxCollections.CATEGORY]: CategoryPayload[];
}
