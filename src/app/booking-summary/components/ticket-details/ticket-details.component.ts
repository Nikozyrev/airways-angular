import { IPassengersState } from './../../../booking-details/store/passengers.state.model';
import { Component, Input } from '@angular/core';
import { ITicket } from '../../../flight-selection/models/ticket.model';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss'],
})
export class TicketDetailsComponent {
  @Input() passengers!: IPassengersState;

  @Input() flight!: ITicket | null;
}
