import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import { AppTicketState, TicketStateInterface } from '../tiket.state.model';
import * as TiketAction from '../actions/tiket.action';

const obj: TicketStateInterface = {
  tripType: '',
  from: '',
  to: '',
  startDate: null,
  endDate: null,
  toppings: [
    {
      type: 'Adult',
      amount: 1,
    },
    {
      type: 'Child',
      amount: 0,
    },
    {
      type: 'Infant',
      amount: 0,
    },
  ],
};

export const initialState: AppTicketState = {
  ticketInfo: obj,
};

export const reducers = createReducer(
  initialState,
  on(
    TiketAction.setTicketInfoSuccess,
    (state, action): AppTicketState => ({
      ...state,
      ticketInfo: {
        ...state.ticketInfo,
        ...action.ticketInfo,
      },
    })
  ),
  on(
    TiketAction.updateTicketDates,
    (state, { ticket, ticketType }): AppTicketState => ({
      ...state,
      ticketInfo: {
        ...state.ticketInfo,
        startDate:
          ticketType === 'destination'
            ? ticket.dates.departure.toISOString()
            : state.ticketInfo.startDate,
        endDate:
          ticketType === 'return'
            ? ticket.dates.departure.toISOString()
            : state.ticketInfo.endDate,
      },
    })
  )
);

export const selectCardFeatureSelector =
  createFeatureSelector<AppTicketState>('TicketInfo');
