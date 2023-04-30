import { IUser } from './user.model';

export interface IAuthResponse {
  accessToken: string;
  user: IUser;
}
