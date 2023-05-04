import { Component, Input } from '@angular/core';
import { IViewDate } from '../../models/ticket.model';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent {
  @Input()
  public selectedDate!: IViewDate;
}
