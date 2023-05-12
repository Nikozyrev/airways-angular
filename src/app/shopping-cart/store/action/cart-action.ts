import { createAction, props } from '@ngrx/store';
import { CartListInterface } from '../cart.model';

export const createShoppingCart = createAction(
  '[ShoppingCart] Success',
  props<{ cartList: CartListInterface }>()
);
