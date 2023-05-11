import { createAction, props } from '@ngrx/store';
import { TicketStateInterface } from '../tiket.state.model';

export const setTicketInfoSuccess = createAction(
  '[TicketInfo] Success',
  props<{ ticketInfo: TicketStateInterface }>()
);
