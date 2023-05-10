import { ITicket } from '../models/ticket.model';

export interface ChosenTicketsStateInterface {
  destinationTicket: ITicket | null;
  returnTicket: ITicket | null;
}
