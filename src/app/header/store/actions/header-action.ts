import { createAction, props } from '@ngrx/store';

export const getDateSuccess = createAction(
  '[Date] Success',
  props<{ date: string }>()
);

export const getCurrencySuccess = createAction(
  '[Currency] Get currency Success',
  props<{ currency: string }>()
);
