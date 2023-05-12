import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as TicketInfo from '../../../flight-search/store/selectors/tiket.selector';
import { ShoppingCartInterface } from '../cart.model';

export const selectFeature =
  createFeatureSelector<ShoppingCartInterface>('shoppingCart');

export const selectCartList = createSelector(
  selectFeature,
  TicketInfo.selectTripType,
  (state) => state.cartList
);
