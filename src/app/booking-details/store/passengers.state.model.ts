export interface IPassengersState {
  adult: IPassenger[];
  child: IPassenger[];
  code: string;
  email: string;
  infant: IPassenger[];
  telephone: string;
}

export interface IPassenger {
  baggageChecked: null | number;
  date: string;
  firstName: string;
  gender: string;
  help: boolean;
  lastName: string;
}
