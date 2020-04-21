import { createAction, props } from '@ngrx/store';
import { Login } from '../model/login.model';
import { User } from '../model/user.model';

export enum AuthActionTypes {
  Login_Request = '[Auth] Login_Request',
  Login_Success = '[Auth] Login_Success',
  Login_Failure = '[Auth] Login_Failure',
  Logout = '[Auth] Logout',
  SetToken = '[Auth] SetToken',
}

export const loginRequest = createAction(
  AuthActionTypes.Login_Request,
  props<{ user: Login }>()
);

export const loginSuccess = createAction(
  AuthActionTypes.Login_Success,
  props<{ user: User }>()
);

export const loginFailure = createAction(AuthActionTypes.Login_Failure);

export const logout = createAction(AuthActionTypes.Logout);
