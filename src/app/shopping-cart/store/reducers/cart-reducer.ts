import { CartListInterface } from '../cart.model';
import { createReducer, on } from '@ngrx/store';
import * as cartActions from '../action/cart-action';

const initialState: CartListInterface[] = [
  {
    tickets: {
      destinationTicket: {
        flightNum: 1522,
        dates: {
          arrival: new Date(
            'Sun May 21 2023 21:20:00 GMT+0300 (Москва, стандартное время)'
          ),
          departure: new Date(
            'Sun May 21 2023 17:00:00 GMT+0300 (Москва, стандартное время)'
          ),
        },
        locations: {
          arrival: 'Warsaw Modlin',
          departure: 'Dublin',
        },
        seats: {
          available: 11,
          total: 76,
        },
        price: {
          EUR: 362.63,
          PLN: 1653.59,
          RUB: 33119,
          USA: 392.73,
        },
      },
      returnTicket: {
        flightNum: 1522,
        dates: {
          arrival: new Date(
            'Sun May 21 2023 21:20:00 GMT+0300 (Москва, стандартное время)'
          ),
          departure: new Date(
            'Sun May 21 2023 17:00:00 GMT+0300 (Москва, стандартное время)'
          ),
        },
        locations: {
          arrival: 'Dublin',
          departure: 'Warsaw Modlin',
        },
        seats: {
          available: 11,
          total: 76,
        },
        price: {
          EUR: 362.63,
          PLN: 1653.59,
          RUB: 33119,
          USA: 392.73,
        },
      },
    },
    passengers: {
      adult: [
        {
          baggageChecked: null,
          date: '',
          firstName: '',
          gender: 'Male',
          help: false,
          lastName: '',
        },
        {
          baggageChecked: null,
          date: '',
          firstName: '',
          gender: 'Male',
          help: false,
          lastName: '',
        },
      ],
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
        flightNum: 1218,
        dates: {
          arrival: new Date('Tue May 30 2023 03:40:00 GMT+0300'),
          departure: new Date(
            'Mon May 29 2023 21:00:00 GMT+0300 (Москва, стандартное время)'
          ),
        },
        locations: {
          arrival: 'Berlin',
          departure: 'Paris',
        },
        seats: {
          available: 49,
          total: 61,
        },
        price: {
          EUR: 350.64,
          PLN: 1598.92,
          RUB: 32023.95,
          USA: 379.74,
        },
      },
      returnTicket: {
        flightNum: 1723,
        dates: {
          arrival: new Date(
            'Tue May 30 2023 10:10:00 GMT+0300 (Москва, стандартное время)'
          ),
          departure: new Date(
            'Tue May 30 2023 06:00:00 GMT+0300 (Москва, стандартное время)'
          ),
        },
        locations: {
          arrival: 'Paris',
          departure: 'Berlin',
        },
        seats: {
          available: 7,
          total: 100,
        },
        price: {
          EUR: 501.19,
          PLN: 2285.43,
          RUB: 45773.68,
          USA: 542.79,
        },
      },
    },
    passengers: {
      adult: [
        {
          baggageChecked: null,
          date: '',
          firstName: '',
          gender: 'Male',
          help: false,
          lastName: '',
        },
      ],
      child: [],
      code: '',
      email: '',
      infant: [],
      telephone: '',
    },
  },
];

export const shoppingCartReducers = createReducer(
  initialState,
  on(cartActions.createShoppingCart, (state, action): CartListInterface[] => [
    ...state,
    action.cartList,
  ])
);
