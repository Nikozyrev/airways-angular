import { createAction, props } from '@ngrx/store';
import { ShoppingCartInterface } from '../cart.model';

export const createShoppingCart = createAction(
  '[ShoppingCart] Success',
  props<{ cartList: ShoppingCartInterface }>()
);
