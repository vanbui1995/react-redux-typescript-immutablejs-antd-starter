import { MetaAction, PayloadAction } from './types';

export const createAction = <Type extends string, Meta, Error>(
  type: Type,
  meta?: Meta,
  error?: Error,
): MetaAction<Type, Meta, Error> => ({ type, meta, error });

export const createPayloadAction = <Type extends string, Payload, Meta, Error>(
  type: Type,
  payload?: Payload,
  meta?: Meta,
  error?: Error,
): PayloadAction<Type, Payload, Meta, Error> => ({
  ...createAction(type, meta, error),
  payload,
});

export const normalizeArr = <T>(
  array: T[],
  keyName: string = '_id',
): Record<string, T> => {
  const normalizedObj: Record<string, T> = {};
  array.map(item => {
    normalizedObj[keyName] = item;
  });
  return normalizedObj;
};
