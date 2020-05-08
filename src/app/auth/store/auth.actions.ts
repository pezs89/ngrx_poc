import { createAction, props } from '@ngrx/store';
import { Login } from '../model/login.model';
import { User } from '../model/user.model';

export enum AuthActionTypes {
  Login_Request = '[Auth] Login Request',
  Login_Success = '[Auth] Login Success',
  Login_Failure = '[Auth] Login Failure',
  Logout_Request = '[Auth] Logout Request',
  Logout_Success = '[Auth] Logout Success',
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

export const logoutRequest = createAction(AuthActionTypes.Logout_Request);
export const logoutSuccess = createAction(AuthActionTypes.Logout_Success);
