import { IUser } from '../models/user.model';

export interface UserStateInterface {
  user: IUser | null;
  error: string | null;
}
