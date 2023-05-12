import { ShoppingCartInterface } from '../cart.model';
import { createReducer, on } from '@ngrx/store';
import * as cartActions from '../action/cart-action';

const initialState: ShoppingCartInterface = {
  cartList: [
    {
      tickets: {
        destinationTicket: {
          flightNum: 1478,
          dates: {
            arrival: new Date('2023-05-13T18:10:00.000Z'),
            departure: new Date('2023-05-13T18:00:00.000Z'),
          },
          locations: {
            departure: 'Warsaw Modlin',
            arrival: 'Luxemburg',
          },
          seats: {
            total: 89,
            available: 77,
          },
          price: {
            EUR: 411.75,
            USA: 445.93,
            RUB: 37605.13,
            PLN: 1877.58,
          },
        },
        returnTicket: null,
      },
    },
  ],
};

export const shoppingCartReducers = createReducer(
  initialState,
  on(
    cartActions.createShoppingCart,
    (state): ShoppingCartInterface => ({
      ...state,
    })
  )
);
