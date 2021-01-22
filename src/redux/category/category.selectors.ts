import { RootState } from 'redux/types';

export default class CategorySelectors {
  static getCategories(state: RootState) {
    return state.category.categories;
  }
}
