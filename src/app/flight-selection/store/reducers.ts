import { createReducer, on } from '@ngrx/store';
import { TicketsStateInterface } from './tickets-state.model';
import * as TicketsActions from './actions';

const initialState: TicketsStateInterface = {
  tickets: [],
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
    (state, { tickets }): TicketsStateInterface => ({
      ...state,
      tickets,
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
