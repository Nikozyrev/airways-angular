import { Component, Input } from '@angular/core';
import { IFlightBasicInfo } from '../../models/flight.model';

@Component({
  selector: 'app-date-select-card',
  templateUrl: './date-select-card.component.html',
  styleUrls: ['./date-select-card.component.scss'],
})
export class DateSelectCardComponent {
  @Input()
  public flightInfo!: IFlightBasicInfo;
}
