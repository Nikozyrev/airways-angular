import { createAction, props } from '@ngrx/store';
import { CartListInterface } from '../cart.model';

export const createShoppingCart = createAction(
  '[ShoppingCart] Success',
  props<{ cartList: CartListInterface }>()
);

export const updateShoppingCart = createAction(
  '[ShoppingCart] Update',
  props<{ cartList: CartListInterface[] }>()
);

export const createShoppingHistory = createAction(
  '[ShoppingHistory] Success',
  props<{ cartList: CartListInterface }>()
);

export const updateShoppingHistory = createAction(
  '[ShoppingHistory] Update',
  props<{ cartList: CartListInterface[] }>()
);

export const updateShoppingArrayHistory = createAction(
  '[ShoppingArrayHistory] Update',
  props<{ cartList: CartListInterface[] }>()
);
