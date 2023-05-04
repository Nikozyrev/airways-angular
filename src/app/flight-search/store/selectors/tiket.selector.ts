import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppTiketState } from '../tiket.state.model';
import { daysShift } from '../../../common/date-time.constants';

export const selectFeature = createFeatureSelector<AppTiketState>('TiketInfo');

export const selectTiket = createSelector(
  selectFeature,
  (state) => state.tiketInfo
);

export const selectSearchParams = createSelector(selectFeature, (state) => {
  const departureGte = state.tiketInfo.startDate
    ? new Date(Date.parse(state.tiketInfo.startDate) - daysShift)
    : new Date(Date.now() - daysShift);

  const departureLte = state.tiketInfo.endDate
    ? new Date(Date.parse(state.tiketInfo.endDate) + daysShift)
    : new Date(departureGte.getTime() + daysShift * 2);

  return {
    tripType: state.tiketInfo.tripType,
    from: state.tiketInfo.from,
    to: state.tiketInfo.to,
    departure_gte: departureGte.toISOString(),
    departure_lte: departureLte.toISOString(),
  };
});

export const selectTripType = createSelector(
  selectFeature,
  (state) => state.tiketInfo.tripType
);
