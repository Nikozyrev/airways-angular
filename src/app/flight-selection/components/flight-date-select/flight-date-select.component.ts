import { Component, Input } from '@angular/core';
import { IFlightBasicInfo } from '../../models/flight.model';

const mockedDates: IFlightBasicInfo[] = [
  {
    flightDate: new Date('2023-05-01'),
    flightPrice: { priceNum: 100, currencyCode: 'USD' },
    flightSeats: { available: 15, total: 100 },
  },
  {
    flightDate: new Date('2023-05-02'),
    flightPrice: { priceNum: 200, currencyCode: 'USD' },
    flightSeats: { available: 5, total: 100 },
  },
  {
    flightDate: new Date('2023-05-03'),
    flightPrice: { priceNum: 300, currencyCode: 'USD' },
    flightSeats: { available: 10, total: 100 },
    selected: true,
  },
  {
    flightDate: new Date('2023-05-04'),
    flightPrice: { priceNum: 400, currencyCode: 'USD' },
    flightSeats: { available: 70, total: 100 },
  },
  {
    flightDate: new Date('2023-05-05'),
    flightPrice: { priceNum: 500, currencyCode: 'USD' },
    flightSeats: { available: 50, total: 100 },
  },
];

@Component({
  selector: 'app-flight-date-select',
  templateUrl: './flight-date-select.component.html',
  styleUrls: ['./flight-date-select.component.scss'],
})
export class FlightDateSelectComponent {
  @Input()
  public flightDates: IFlightBasicInfo[] = mockedDates;
}
