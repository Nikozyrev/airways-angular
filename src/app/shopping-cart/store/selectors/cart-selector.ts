import { createFeatureSelector } from '@ngrx/store';
import { CartListInterface } from '../cart.model';

export const selectCartFeature =
  createFeatureSelector<CartListInterface[]>('shoppingCart');

export const selectShoppingHistory =
  createFeatureSelector<CartListInterface[]>('shoppingHistory');
