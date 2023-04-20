import { createReducer, on } from '@ngrx/store';
import { AppTiketState, TiketStateInterface } from '../tiket.state.model';
import * as TiketAction from '../actions/tiket.action';

const obj: TiketStateInterface = {
  tripType: '',
  from: '',
  to: '',
  date: null,
  toppings: [''],
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
