import { createFeatureSelector } from '@ngrx/store';
import { IPassengersState } from '../passengers.state.model';

export const selectPassengers =
  createFeatureSelector<IPassengersState>('passengers');
