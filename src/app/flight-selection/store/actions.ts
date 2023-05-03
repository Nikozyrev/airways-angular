import { createAction, props } from '@ngrx/store';
import { ITicket } from '../models/ticket.model';

const source = '[Tickets]';

export const fetchTickets = createAction(`${source} Fetch Tickets`);

export const fetchTicketsSuccess = createAction(
  `${source} Fetch Tickets Success`,
  props<{ destinationTickets: ITicket[]; returnTickets?: ITicket[] }>()
);

export const fetchTicketsError = createAction(
  `${source} Fetch Tickets Error`,
  props<{ error: string }>()
);
