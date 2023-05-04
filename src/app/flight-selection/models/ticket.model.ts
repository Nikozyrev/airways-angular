export interface ITicketPrice {
  [code: string]: number;
  EUR: number;
  USA: number;
  RUB: number;
  PLN: number;
}

export interface ITicketDates {
  departure: Date;
  arrival: Date;
}

export interface ITicketLocations {
  departure: string;
  arrival: string;
}

export interface ITicketSeats {
  available: number;
  total: number;
}

export interface ITicket {
  flightNum: number;
  dates: ITicketDates;
  locations: ITicketLocations;
  seats: ITicketSeats;
  price: ITicketPrice;
  selected?: boolean;
}

export interface ITicketResponse {
  flightNum: number;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  price: ITicketPrice;
  seats: ITicketSeats;
}

export type TicketType = 'destination' | 'return';

export interface ITicketsData {
  from: string;
  to: string;
  selectedDate: string | null;
  tickets: ITicket[];
  error: string | null;
  isLoading: boolean;
}

export interface IViewDate {
  date: Date;
  tickets: ITicket[];
  selected: boolean;
}
