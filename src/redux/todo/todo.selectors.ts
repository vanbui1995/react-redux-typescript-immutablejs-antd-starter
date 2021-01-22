import { RootState } from 'redux/types';
import { createSelector } from 'reselect';
import { CategoryPayload, CategorySelector } from 'redux/category';
import { TodoPayload } from './types';

export default class TodoSelectors {
  static getTodos(state: RootState) {
    return state.todo.todos;
  }

  static getSelectedCategory(state: RootState) {
    return state.todo.selectedCategory;
  }

  static getCurrentTodosBySelectedTodo = createSelector(
    TodoSelectors.getTodos,
    TodoSelectors.getSelectedCategory,
    CategorySelector.getCategories,
    (todos, selectedCategory, categories) => {
      const mapCategory = (todo: TodoPayload): TodoPayload => ({
        ...todo,
        category: categories[todo.categoryId],
      });
      return Object.values(todos)
        .filter(todo => todo.categoryId === selectedCategory)
        .map(mapCategory);
    },
  );
}
