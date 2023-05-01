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
}

export interface ITicketBasicInfo {
  ticketDate: Date;
  ticketPrice: ITicketPrice;
  ticketSeats: ITicketSeats;
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
