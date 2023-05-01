import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppTiketState } from '../tiket.state.model';

export const selectFeature = createFeatureSelector<AppTiketState>('TiketInfo');

export const selectTiket = createSelector(
  selectFeature,
  (state) => state.tiketInfo
);
