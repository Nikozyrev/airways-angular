import { createAction, props } from '@ngrx/store';
import { IPassengersState } from '../passengers.state.model';

export const setPassengers = createAction(
  '[Passengers] Success',
  props<{ passengers: IPassengersState }>()
);
