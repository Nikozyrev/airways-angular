import { IPassenger } from './../../../booking-details/store/passengers.state.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.scss'],
})
export class PassengerComponent {
  @Input() passenger!: IPassenger;
}
