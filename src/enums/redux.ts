import { CategoryPayload } from 'redux/category';
import { TodoPayload } from 'redux/todo';

export enum ReduxModules {
  AUTH = 'AUTH',
  TODO = 'TODO',
  CATEGORY = 'CATEGORY',
}

export enum ReduxModulesName {
  AUTH = 'auth',
  TODO = 'todo',
  CATEGORY = 'category',
}

export const ReduxCollections = {
  [ReduxModules.TODO]: 'todos',
  [ReduxModules.CATEGORY]: 'categories',
};

export enum IndexeKeys {
  TODO_CATEGORY_ID = 'categoryId',
  CATEGORY_IS_DELETED = 'isDeleted',
}

export const ReduxIndexes = {
  [ReduxModules.TODO]: [IndexeKeys.TODO_CATEGORY_ID],
  [ReduxModules.CATEGORY]: [IndexeKeys.CATEGORY_IS_DELETED],
};
export interface ReduxCollectionType {
  [ReduxModules.TODO]?: TodoPayload[];
  [ReduxModules.CATEGORY]?: CategoryPayload[];
}

export type IndexesType = Record<IndexeKeys, Record<string, string[]>>;
