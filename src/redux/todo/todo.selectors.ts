import { RootState } from 'redux/types';
import { createSelector } from 'reselect';
import { CategorySelector } from 'redux/category';

export default class TodoSelectors {
  static getTodos(state: RootState) {
    return state.todo.todos;
  }

  static getSelectedCategory(state: RootState) {
    return state.todo.selectedCategory;
  }

  static getCategoryIndex(state: RootState) {
    return state.todo.indexes;
  }

  static getCurrentTodosBySelectedTodo = createSelector(
    TodoSelectors.getTodos,
    TodoSelectors.getSelectedCategory,
    TodoSelectors.getCategoryIndex,
    CategorySelector.getCategories,
    (todos, selectedCategory, indexes, categories) => {
      if (!!selectedCategory) {
        return (indexes.categoryId[selectedCategory] || []).map(
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
