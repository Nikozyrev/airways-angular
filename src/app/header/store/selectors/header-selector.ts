import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HeaderStateInterface } from '../header-state.model';

export const selectFeature =
  createFeatureSelector<HeaderStateInterface>('global settings');

export const selectDate = createSelector(selectFeature, (state) => state.date);
