import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppTicketState } from '../tiket.state.model';
import { daysShift } from '../../../common/date-time.constants';

export const selectFeature =
  createFeatureSelector<AppTicketState>('TicketInfo');

export const selectTicket = createSelector(
  selectFeature,
  (state) => state.ticketInfo
);

export const selectTicketToppings = createSelector(
  selectFeature,
  (state) => state.ticketInfo.toppings
);

export const selectSearchParams = createSelector(selectFeature, (state) => {
  const departureGte = state.ticketInfo.startDate
    ? new Date(Date.parse(state.ticketInfo.startDate) - daysShift)
    : new Date(Date.now() - daysShift);

  const departureLte = state.ticketInfo.endDate
    ? new Date(Date.parse(state.ticketInfo.endDate) + daysShift)
    : new Date(departureGte.getTime() + daysShift * 2);

  return {
    tripType: state.ticketInfo.tripType,
    from: state.ticketInfo.from,
    to: state.ticketInfo.to,
    departure_gte: departureGte.toISOString(),
    departure_lte: departureLte.toISOString(),
  };
});

export const selectTripType = createSelector(
  selectFeature,
  (state) => state.ticketInfo.tripType
);
