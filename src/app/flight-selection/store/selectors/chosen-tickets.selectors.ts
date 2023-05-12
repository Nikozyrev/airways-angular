import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ChosenTicketsStateInterface } from '../chosen-tickets-state.model';
import * as TicketInfo from '../../../flight-search/store/selectors/tiket.selector';
import { TicketType } from '../../models/ticket.model';

export const selectFeature =
  createFeatureSelector<ChosenTicketsStateInterface>('chosenTickets');

export const selectChosenTicket = (ticketType: TicketType) =>
  createSelector(selectFeature, (state) => {
    if (ticketType === 'destination') return state.destinationTicket;
    if (ticketType === 'return') return state.returnTicket;
    return null;
  });

export const selectAreTicketsChosen = createSelector(
  selectFeature,
  TicketInfo.selectTripType,
  (state, tripType) => {
    if (tripType === 'Round Trip') {
      return !!state.destinationTicket && !!state.returnTicket;
    }
    if (tripType === 'One Way') {
      return !!state.destinationTicket;
    }
    return false;
  }
);
