import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import { AppTiketState, TiketStateInterface } from '../tiket.state.model';
import * as TiketAction from '../actions/tiket.action';

const obj: TiketStateInterface = {
  tripType: '',
  from: '',
  to: '',
  startDate: '',
  endDate: '',
  toppings: [
    {
      type: 'Adult',
      amount: 1,
    },
    {
      type: 'Child',
      amount: 1,
    },
    {
      type: 'Infant',
      amount: 1,
    },
  ],
};

export const initialState: AppTiketState = {
  tiketInfo: obj,
};

export const reducers = createReducer(
  initialState,
  on(
    TiketAction.setTiketInfoSuccess,
    (state, action): AppTiketState => ({
      ...state,
      tiketInfo: action.tiketInfo,
    })
  )
);

export const selectCardFeatureSelector =
  createFeatureSelector<AppTiketState>('TiketInfo');
