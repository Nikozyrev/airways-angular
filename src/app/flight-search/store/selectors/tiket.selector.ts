import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppTicketState } from '../tiket.state.model';

export const selectFeature =
  createFeatureSelector<AppTicketState>('TicketInfo');

export const selectTicket = createSelector(
  selectFeature,
  (state) => state.ticketInfo
);
