import { ITicket } from '../models/ticket.model';

export interface TicketsStateInterface {
  tickets: ITicket[];
  isLoading: boolean;
  error: string | null;
}
