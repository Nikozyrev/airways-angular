import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TicketsStateInterface } from './tickets-state.model';
import * as TicketInfo from '../../flight-search/store/selectors/tiket.selector';
import { ITicketsData, TicketType } from '../models/ticket.model';

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

export const selectTicketsData = (ticketType: TicketType) =>
  createSelector(
    selectFeature,
    TicketInfo.selectTiket,
    (tickets, ticketInfo) => {
      const destTicket = ticketType === 'destination';
      return {
        from: destTicket ? ticketInfo.from : ticketInfo.to,
        to: destTicket ? ticketInfo.to : ticketInfo.from,
        selectedDate: destTicket ? ticketInfo.startDate : ticketInfo.endDate,
        tickets: destTicket
          ? tickets.destinationTickets
          : tickets.returnTickets,
        error: tickets.error,
        isLoading: tickets.isLoading,
      } as ITicketsData;
    }
  );
