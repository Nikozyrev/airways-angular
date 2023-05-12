import { createReducer, on } from '@ngrx/store';
import { IPassengersState } from '../passengers.state.model';
import { setPassengers } from '../actions/passengers.action';

export const initialState: IPassengersState = {
  adult: [],
  child: [],
  code: '',
  email: '',
  infant: [],
  telephone: '',
};

export const reducers = createReducer(
  initialState,
  on(setPassengers, (state, action): IPassengersState => action.passengers)
);
