import { createFeatureSelector } from '@ngrx/store';
import { IPassengersState } from '../passengers.state.model';

export const selectCreatePassengers =
  createFeatureSelector<IPassengersState>('passengers');
