import { createAction, props } from '@ngrx/store';
import { TicketStateInterface } from '../tiket.state.model';
import {
  ITicket,
  TicketType,
} from '../../../flight-selection/models/ticket.model';

export const setTicketInfoSuccess = createAction(
  '[TicketInfo] Success',
  props<{ ticketInfo: TicketStateInterface }>()
);

export const updateTicketDates = createAction(
  '[TicketInfo] Update Dates',
  props<{ ticket: ITicket; ticketType: TicketType }>()
);
