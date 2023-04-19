import { createAction, props } from '@ngrx/store';
import { IUser } from '../models/user.model';

const source = '[Auth]';

export const setUser = createAction(
  `${source} Set User`,
  props<{ user: IUser }>()
);
