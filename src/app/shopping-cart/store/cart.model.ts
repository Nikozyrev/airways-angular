import { ChosenTicketsStateInterface } from '../../../app/flight-selection/store/chosen-tickets-state.model';

export interface ShoppingCartInterface {
  cartList: CartListInterface[];
}

export interface CartListInterface {
  tickets: ChosenTicketsStateInterface;
}
