import { createAction, props } from '@ngrx/store';
import { IUser, IUserLogIn, IUserSignUp } from '../models/user.model';

const source = '[Auth]';

export const setUser = createAction(
  `${source} Set User`,
  props<{ user: IUser | null }>()
);

export const setError = createAction(
  `${source} Error`,
  props<{ error: string }>()
);

export const signUp = createAction(
  `${source} Sign Up`,
  props<{ userData: IUserSignUp }>()
);

export const login = createAction(
  `${source} Login`,
  props<{ userData: IUserLogIn }>()
);

export const logout = createAction(`${source} Logout`);
