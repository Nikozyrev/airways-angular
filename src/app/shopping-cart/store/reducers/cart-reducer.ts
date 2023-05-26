import { CartListInterface } from '../cart.model';
import { createReducer, on } from '@ngrx/store';
import * as cartActions from '../action/cart-action';

const initialState: CartListInterface[] = [
  {
    tickets: {
      destinationTicket: {
        flightNum: 1972,
        dates: {
          arrival: new Date('2023-05-15T12:50:00.000Z'),
          departure: new Date('2023-05-15T06:00:00.000Z'),
        },
        locations: {
          departure: 'Aublin',
          arrival: 'Berlin',
        },
        seats: {
          total: 135,
          available: 58,
        },
        price: {
          EUR: 521.59,
          USA: 564.88,
          RUB: 47636.81,
          PLN: 2378.45,
        },
      },
      returnTicket: null,
    },
    passengers: {
      adult: [],
      child: [],
      code: '',
      email: '',
      infant: [],
      telephone: '',
    },
  },
  {
    tickets: {
      destinationTicket: {
        flightNum: 1912,
        dates: {
          arrival: new Date('2023-05-15T12:50:00.000Z'),
          departure: new Date('2023-05-15T06:00:00.000Z'),
        },
        locations: {
          departure: 'Eublin',
          arrival: 'Berlin',
        },
        seats: {
          total: 135,
          available: 58,
        },
        price: {
          EUR: 721.59,
          USA: 564.88,
          RUB: 47636.81,
          PLN: 2378.45,
        },
      },
      returnTicket: null,
    },
    passengers: {
      adult: [],
      child: [],
      code: '',
      email: '',
      infant: [],
      telephone: '',
    },
  },
  {
    tickets: {
      destinationTicket: {
        flightNum: 1952,
        dates: {
          arrival: new Date('2023-05-15T12:50:00.000Z'),
          departure: new Date('2023-05-15T06:00:00.000Z'),
        },
        locations: {
          departure: 'Dublin',
          arrival: 'Berlin',
        },
        seats: {
          total: 135,
          available: 58,
        },
        price: {
          EUR: 121.59,
          USA: 564.88,
          RUB: 47636.81,
          PLN: 2378.45,
        },
      },
      returnTicket: {
        flightNum: 1942,
        dates: {
          arrival: new Date('2023-05-15T12:50:00.000Z'),
          departure: new Date('2023-05-15T06:00:00.000Z'),
        },
        locations: {
          departure: 'Dublin',
          arrival: 'Berlin',
        },
        seats: {
          total: 135,
          available: 58,
        },
        price: {
          EUR: 521.59,
          USA: 564.88,
          RUB: 47636.81,
          PLN: 2378.45,
        },
      },
    },
    passengers: {
      adult: [],
      child: [],
      code: '',
      email: '',
      infant: [],
      telephone: '',
    },
  },
];

const initialStateShoppingHistory: CartListInterface[] = [];

export const shoppingCartReducers = createReducer(
  initialState,
  on(cartActions.createShoppingCart, (state, action): CartListInterface[] => [
    ...state,
    action.cartList,
  ]),
  on(cartActions.updateShoppingCart, (state, action): CartListInterface[] => [
    ...action.cartList,
  ])
);

export const shoppingHistoryReducers = createReducer(
  initialStateShoppingHistory,
  on(
    cartActions.createShoppingHistory,
    (state, action): CartListInterface[] => [...state, action.cartList]
  )
);
