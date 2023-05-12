import { createFeatureSelector } from '@ngrx/store';
// import * as TicketInfo from '../../../flight-search/store/selectors/tiket.selector';
import { CartListInterface } from '../cart.model';

export const selectCartFeature =
  createFeatureSelector<CartListInterface[]>('shoppingCart');
