import { RootState } from 'redux/types';
import { createSelector } from 'reselect';
import { CategorySelector } from 'redux/category';
import { IndexeKeys } from 'enums';

export default class TodoSelectors {
  static getTodos(state: RootState) {
    return state.todo.todos;
  }

  static getSelectedCategory(state: RootState) {
    return state.todo.selectedCategory;
  }

  static getCategoryIndex(state: RootState) {
    return state.todo.indexes[IndexeKeys.TODO_CATEGORY_ID];
  }

  static getCurrentTodosBySelectedCategory = createSelector(
    TodoSelectors.getTodos,
    TodoSelectors.getSelectedCategory,
    TodoSelectors.getCategoryIndex,
    CategorySelector.getCategories,
    (todos, selectedCategory, categoryIndex, categories) => {
      if (!!selectedCategory) {
        return (categoryIndex[selectedCategory] || []).map(
          (todoId: string) => ({
            ...todos[todoId],
            category: categories[todos[todoId].categoryId],
          }),
        );
      }
      return [];
    },
  );
}
