import { ITicket } from '../models/ticket.model';

export interface TicketsStateInterface {
  destinationTickets: ITicket[];
  returnTickets: ITicket[];
  isLoading: boolean;
  error: string | null;
}
