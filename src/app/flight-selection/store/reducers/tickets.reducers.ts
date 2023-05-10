import { createReducer, on } from '@ngrx/store';
import { TicketsStateInterface } from '../tickets-state.model';
import * as TicketsActions from '../actions/tickets.actions';

const initialState: TicketsStateInterface = {
  destinationTickets: [],
  returnTickets: [],
  error: null,
  isLoading: false,
};

export const ticketsReducers = createReducer(
  initialState,
  on(
    TicketsActions.fetchTickets,
    (state): TicketsStateInterface => ({
      ...state,
      error: null,
      isLoading: true,
    })
  ),
  on(
    TicketsActions.fetchTicketsSuccess,
    (state, { destinationTickets, returnTickets }): TicketsStateInterface => ({
      ...state,
      destinationTickets,
      returnTickets: returnTickets ?? [],
      isLoading: false,
    })
  ),
  on(
    TicketsActions.fetchTicketsError,
    (state, { error }): TicketsStateInterface => ({
      ...state,
      error,
      isLoading: false,
    })
  )
);
