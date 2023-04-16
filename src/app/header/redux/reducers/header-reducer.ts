import { createReducer, on } from '@ngrx/store';
import { HeaderStateInterface } from '../header-state.model';
import * as HeaderAction from '../actions/header-action';

export const initialState: HeaderStateInterface = {
  date: 'MM/DD/YYYY',
  currency: 'EUR',
};

export const reducers = createReducer(
  initialState,
  on(HeaderAction.getDate, (state) => ({ ...state })),
  on(HeaderAction.getDateSuccess, (state, action) => ({
    ...state,
    date: action.date,
  })),
  on(HeaderAction.getDateFailed, (state, action) => ({
    ...state,
    error: action.error,
  })),
  on(HeaderAction.getCurrencySuccess, (state, action) => ({
    ...state,
    currency: action.currency,
  }))
);
