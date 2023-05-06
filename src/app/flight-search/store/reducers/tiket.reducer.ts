import { createReducer, on } from '@ngrx/store';
import { AppTicketState, TicketStateInterface } from '../tiket.state.model';
import * as TicketAction from '../actions/tiket.action';

const obj: TicketStateInterface = {
  tripType: '',
  from: '',
  to: '',
  startDate: null,
  endDate: null,
  toppings: [
    {
      type: 'Adult',
      amount: 0,
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
    TicketAction.setTicketInfoSuccess,
    (state, action): AppTicketState => ({
      ...state,
      ticketInfo: action.ticketInfo,
    })
  )
);
