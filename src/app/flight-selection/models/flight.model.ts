export interface IFlightPrice {
  priceNum: number;
  currencyCode: string;
}

export interface IFlightDates {
  departure: Date;
  arrival: Date;
}

export interface IFlightLocations {
  departure: string;
  arrival: string;
}

export interface IFlightSeats {
  available: number;
  total: number;
}

export interface IFlight {
  number: string;
  dates: IFlightDates;
  locations: IFlightLocations;
  seats: IFlightSeats;
  price: IFlightPrice;
}

export interface IFlightBasicInfo {
  flightDate: Date;
  flightPrice: IFlightPrice;
  flightSeats: IFlightSeats;
  selected?: boolean;
}
