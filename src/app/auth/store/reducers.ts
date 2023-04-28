import { createReducer, on } from '@ngrx/store';
import { UserStateInterface } from './user-state.model';
import * as UserActions from './actions';

const initialState: UserStateInterface = {
  user: null,
};

export const userReducers = createReducer(
  initialState,
  on(
    UserActions.setUser,
    (state, { user }): UserStateInterface => ({
      ...state,
      user,
    })
  )
);
