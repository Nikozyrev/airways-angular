import { Toppings } from '../components/flight-search/flight-search.component';

export interface AppTiketState {
  tiketInfo: TiketStateInterface;
}

export interface TiketStateInterface {
  tripType: string;
  from: string;
  to: string;
  startDate: string | null;
  endDate: string | null;
  toppings: Toppings[];
}
