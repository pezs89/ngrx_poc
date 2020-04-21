import { createReducer, on } from '@ngrx/store';

import { User } from '../model/user.model';
import * as AuthActions from './auth.actions';

export interface AuthState {
  user: User;
}

const initialState: AuthState = {
  user: undefined,
};

export const authReducer = createReducer<AuthState>(
  initialState,
  on(AuthActions.loginSuccess, (state, action) => ({
    ...state,
    user: { ...action.user },
  })),
  on(AuthActions.logout, (state) => ({ ...state }))
);
