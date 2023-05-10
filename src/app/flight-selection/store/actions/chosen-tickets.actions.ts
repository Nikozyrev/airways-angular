import { createAction, props } from '@ngrx/store';
import { ITicket, TicketType } from '../../models/ticket.model';

const source = '[Chosen Tickets]';

export const saveTicket = createAction(
  `${source} Save Ticket`,
  props<{ ticket: ITicket; ticketType: TicketType }>()
);

export const removeTicket = createAction(
  `${source} Remove Ticket`,
  props<{ ticketType: TicketType }>()
);
