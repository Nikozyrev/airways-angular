import { createReducer, on } from '@ngrx/store';
import { ChosenTicketsStateInterface } from '../chosen-tickets-state.model';
import * as ChosenTicketsActions from '../actions/chosen-tickets.actions';

const initialState: ChosenTicketsStateInterface = {
  destinationTicket: null,
  returnTicket: null,
};

export const chosenTicketsReducers = createReducer(
  initialState,
  on(
    ChosenTicketsActions.saveTicket,
    (state, { ticket, ticketType }): ChosenTicketsStateInterface => {
      if (ticketType === 'destination') {
        return { ...state, destinationTicket: ticket };
      }
      if (ticketType === 'return') {
        return { ...state, returnTicket: ticket };
      }
      return { ...state };
    }
  ),
  on(
    ChosenTicketsActions.removeTicket,
    (state, { ticketType }): ChosenTicketsStateInterface => {
      if (ticketType === 'destination') {
        return { ...state, destinationTicket: null };
      }
      if (ticketType === 'return') {
        return { ...state, returnTicket: null };
      }
      return { ...state };
    }
  ),
  on(
    ChosenTicketsActions.clearTickets,
    (): ChosenTicketsStateInterface => initialState
  ),
  on(
    ChosenTicketsActions.saveAllTicket,
    (state, { ticketTo, ticketBack }): ChosenTicketsStateInterface => {
      return {
        ...state,
        destinationTicket: ticketTo,
        returnTicket: ticketBack,
      };
    }
  )
);
