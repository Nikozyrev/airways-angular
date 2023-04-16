import { createAction, props } from '@ngrx/store';

export const getDate = createAction('Success');
export const getDateSuccess = createAction(
  '[Date] Success',
  props<{ date: string }>()
);
export const getDateFailed = createAction(
  '[Date] Get Date Failed',
  props<{ error: string }>()
);

export const getCurrencySuccess = createAction(
  '[Currency] Get currency Success',
  props<{ currency: string }>()
);
