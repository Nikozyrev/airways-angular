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
  private moveDatesEmitter = new EventEmitter<1 | -1>();

  @Output()
  private selectDateEmitter = new EventEmitter<IViewDate>();

  public move(direction: 1 | -1) {
    this.moveDatesEmitter.emit(direction);
  }

  public selectDate(date: IViewDate) {
    this.selectDateEmitter.emit(date);
  }
}
