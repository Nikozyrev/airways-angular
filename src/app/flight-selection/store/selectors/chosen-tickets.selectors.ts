import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ChosenTicketsStateInterface } from '../chosen-tickets-state.model';
import * as TicketInfo from '../../../flight-search/store/selectors/tiket.selector';

export const selectFeature =
  createFeatureSelector<ChosenTicketsStateInterface>('chosenTickets');

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
