import { AppState } from '../header-state.model';
import { createSelector } from '@ngrx/store';

export const selectDate = createSelector(
  (state: AppState) => state.globalSettings.date,
  (date) => date
);
