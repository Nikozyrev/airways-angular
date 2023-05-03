import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppTiketState } from '../tiket.state.model';

export const selectFeature = createFeatureSelector<AppTiketState>('TiketInfo');

export const selectTiket = createSelector(
  selectFeature,
  (state) => state.tiketInfo
);

export const selectSearchParams = createSelector(selectFeature, (state) => ({
  from: state.tiketInfo.from,
  to: state.tiketInfo.to,
  departure_gte: state.tiketInfo.startDate
    ? new Date(state.tiketInfo.startDate).toISOString()
    : '',
  departure_lte: state.tiketInfo.endDate
    ? new Date(state.tiketInfo.endDate).toISOString()
    : '',
  tripType: state.tiketInfo.tripType,
}));

export const selectTripType = createSelector(
  selectFeature,
  (state) => state.tiketInfo.tripType
);
