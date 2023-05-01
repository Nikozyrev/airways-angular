import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TicketsStateInterface } from './tickets-state.model';

export const selectFeature =
  createFeatureSelector<TicketsStateInterface>('tickets');

export const selectTickets = createSelector(
  selectFeature,
  (state) => state.tickets
);

export const selectError = createSelector(
  selectFeature,
  (state) => state.error
);

export const selectIsLoading = createSelector(
  selectFeature,
  (state) => state.isLoading
);
