import { createReducer, on } from '@ngrx/store';
import { UserStateInterface } from './user-state.model';
import * as UserActions from './actions';

const savedUser = localStorage.getItem('user');

const initialState: UserStateInterface = {
  user: savedUser ? JSON.parse(savedUser) : null,
  error: null,
};

export const userReducers = createReducer(
  initialState,
  on(
    UserActions.setUser,
    (state, { user }): UserStateInterface => ({
      ...state,
      user,
    })
  ),
  on(
    UserActions.setError,
    (state, { error }): UserStateInterface => ({
      ...state,
      error,
    })
  )
);
