import { Action, ReducersMapObject } from 'redux';
import { RouterState } from 'connected-react-router';
import { RecordOf } from 'immutable';

import { AuthState } from './auth/types';
import { TodoState } from './todo';
import { CategoryState } from './category';

export interface StandardAction<T = any, U = any> {
  type: string;
  payload?: T;
  error?: string;
  meta?: U;
}

export interface RootState {
  readonly auth: RecordOf<AuthState>;
  readonly todo: RecordOf<TodoState>;
  readonly category: RecordOf<CategoryState>;
}

export type Reducers = ReducersMapObject<RootState>;

export type MetaAction<Type, Meta, Error> = Action<Type> & {
  meta?: Meta;
  error?: Error;
};

export type PayloadAction<
  Type,
  Payload = void,
  Meta = void,
  Error = void
> = MetaAction<Type, Meta, Error> & {
  readonly payload?: Payload;
};
