import { CategoryPayload } from 'redux/category';
import { TodoPayload } from './types';

export default class TodoUtils {
  static prepareDataFromBE = (
    todosFromBE: TodoPayload[],
  ): {
    todos: TodoPayload[];
    categories: CategoryPayload[];
  } => {
    return todosFromBE.reduce(
      (
        {
          todos,
          categories,
        }: { todos: TodoPayload[]; categories: CategoryPayload[] },
        todo,
      ) => {
        todos.push(todo);
        if (todo.category) {
          categories.push(todo.category);
        }
        return {
          todos,
          categories,
        };
      },
      { todos: [], categories: [] },
    );
  };
}
