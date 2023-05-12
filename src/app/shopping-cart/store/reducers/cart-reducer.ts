import { CartListInterface } from '../cart.model';
import { createReducer, on } from '@ngrx/store';
import * as cartActions from '../action/cart-action';

const initialState: CartListInterface[] = [];

export const shoppingCartReducers = createReducer(
  initialState,
  on(cartActions.createShoppingCart, (state, action): CartListInterface[] => [
    ...state,
    action.cartList,
  ])
);
