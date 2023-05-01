import { Component, Input } from '@angular/core';
import { ITicketBasicInfo } from '../../models/ticket.model';

@Component({
  selector: 'app-flight-date-select',
  templateUrl: './flight-date-select.component.html',
  styleUrls: ['./flight-date-select.component.scss'],
})
export class FlightDateSelectComponent {
  @Input()
  public flightDates: ITicketBasicInfo[] = [
    {
      ticketDate: new Date(),
      ticketPrice: { EUR: 12, PLN: 11, RUB: 13, USA: 14 },
      ticketSeats: { available: 100, total: 200 },
      selected: true,
    },
  ];
}
