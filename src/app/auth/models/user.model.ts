export enum Gender {
  male = 'male',
  female = 'female',
}

export interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  gender: Gender;
  phone: string;
  citizenship: string;
}

export interface IUserSignUp extends IUser {
  password: string;
}

export interface IUserLogIn {
  email: string;
  password: string;
}
