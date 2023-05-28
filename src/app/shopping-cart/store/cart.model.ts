import { IPassengersState } from './../../booking-details/store/passengers.state.model';
import { ChosenTicketsStateInterface } from '../../../app/flight-selection/store/chosen-tickets-state.model';

export interface CartListInterface {
  tickets: ChosenTicketsStateInterface;
  passengers: IPassengersState;
  path?: string;
}
