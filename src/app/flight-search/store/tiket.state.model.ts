import { Toppings } from '../components/flight-search/flight-search.component';

export interface AppTicketState {
  ticketInfo: TicketStateInterface;
}

export interface TicketStateInterface {
  tripType: string;
  from: string;
  to: string;
  startDate: string | null;
  endDate: string | null;
  toppings: Toppings[];
}
