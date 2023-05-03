import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TicketsStateInterface } from './tickets-state.model';

export const selectFeature =
  createFeatureSelector<TicketsStateInterface>('tickets');

export const selectDestinationTickets = createSelector(
  selectFeature,
  (state) => state.destinationTickets
);

export const selectReturnTickets = createSelector(
  selectFeature,
  (state) => state.returnTickets
);

export const selectError = createSelector(
  selectFeature,
  (state) => state.error
);

export const selectIsLoading = createSelector(
  selectFeature,
  (state) => state.isLoading
);
