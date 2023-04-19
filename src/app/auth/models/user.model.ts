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
