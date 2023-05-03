import { Component, Input } from '@angular/core';
import { ITicket } from '../../models/ticket.model';

@Component({
  selector: 'app-flight-date-select',
  templateUrl: './flight-date-select.component.html',
  styleUrls: ['./flight-date-select.component.scss'],
})
export class FlightDateSelectComponent {
  @Input()
  public flightDates: ITicket[] = [];
}
