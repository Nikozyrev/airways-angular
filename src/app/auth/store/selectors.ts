import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserStateInterface } from './user-state.model';

export const selectFeature = createFeatureSelector<UserStateInterface>('auth');

export const selectIsLogged = createSelector(
  selectFeature,
  (state) => !!state.user
);

export const selectUserName = createSelector(
  selectFeature,
  (state) => `${state.user?.firstName} ${state.user?.lastName}`
);
