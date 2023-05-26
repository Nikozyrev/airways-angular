import { CartListInterface } from '../cart.model';
import { createReducer, on } from '@ngrx/store';
import * as cartActions from '../action/cart-action';

const initialState: CartListInterface[] = [];

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
