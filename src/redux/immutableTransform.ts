import { Record, RecordOf } from 'immutable';
import { createTransform } from 'redux-persist';
import { AuthState } from 'redux/auth';
import { initData as initDataAuth } from 'redux/auth/auth.reducer';
const CustomImmutableTransform = createTransform(
  // transform state on its way to being serialized and persisted.
  (inboundState: RecordOf<AuthState>) => {
    console.log({ inboundState });
    // convert mySet to an Array.
    return inboundState.toJSON();
  },
  // transform state being rehydrated
  (outboundState: AuthState) => {
    const defaultState = Record(outboundState)({
      ...initDataAuth,
      accessToken: outboundState.accessToken,
    });
    // convert mySet back to a Set.
    return defaultState;
  },
  // define which reducers this transform gets called for.
  { whitelist: ['auth'] },
);

export default CustomImmutableTransform;
