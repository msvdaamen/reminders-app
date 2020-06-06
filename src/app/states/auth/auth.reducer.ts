import {Action, createReducer, on, State} from '@ngrx/store';
import {AuthState} from './auth.state';

import * as AuthActions from './auth.actions';

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false
};

const authReducer = createReducer(
  initialState,
  on(AuthActions.setAuth, (state, {auth}) => {
    return {
      ...state,
      user: auth.user,
      accessToken: auth.accessToken,
      isAuthenticated: true
    };
  }),
  on(AuthActions.logout, state => initialState)
);
// @ts-ignore
export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}
