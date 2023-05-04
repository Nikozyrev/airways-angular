import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IViewDate } from '../../models/ticket.model';

@Component({
  selector: 'app-flight-date-select',
  templateUrl: './flight-date-select.component.html',
  styleUrls: ['./flight-date-select.component.scss'],
})
export class FlightDateSelectComponent {
  @Input()
  public flightDates: IViewDate[] = [];

  @Output()
  private moveDates = new EventEmitter<1 | -1>();

  public move(direction: 1 | -1) {
    this.moveDates.emit(direction);
  }
}
