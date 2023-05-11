import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HeaderStateInterface } from '../header-state.model';

export const selectFeature =
  createFeatureSelector<HeaderStateInterface>('globalSettings');

export const selectDate = createSelector(selectFeature, (state) => state.date);

export const selectCurrency = createSelector(
  selectFeature,
  (state) => state.currency
);
