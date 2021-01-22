export interface TodoState {
  isFetching: boolean;
  error?: null | string;
  todos: Record<string, TodoPayload>;
  isUpdatingById: Record<string, boolean>;
}

export interface TodoPayload {
  _id: string;
  name: string;
  checked: boolean;
}
