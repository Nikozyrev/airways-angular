export interface AppTiketState {
  tiketInfo: TiketStateInterface;
}

export interface TiketStateInterface {
  tripType: string;
  from: string;
  to: string;
  date: Date | Partial<{ start: Date | null; end: Date | null }> | null;
  toppings: string[];
}
