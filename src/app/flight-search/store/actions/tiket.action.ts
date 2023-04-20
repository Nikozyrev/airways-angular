import { createAction, props } from '@ngrx/store';
import { TiketStateInterface } from '../tiket.state.model';

export const setTiketInfoSuccess = createAction(
  '[TiketInfo] Success',
  props<{ tiketInfo: TiketStateInterface }>()
);
