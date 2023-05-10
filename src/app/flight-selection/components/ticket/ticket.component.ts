import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITicket, IViewDate } from '../../models/ticket.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCurrency } from '../../../header/store/selectors/header-selector';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent implements OnInit {
  @Input()
  public selectedDate!: IViewDate;

  @Output()
  public saveTicket = new EventEmitter<ITicket>();

  public currencyCode$!: Observable<string>;

  constructor(private store: Store) {}

  public handleSaveTicket(ticket: ITicket) {
    this.saveTicket.emit(ticket);
  }

  public ngOnInit(): void {
    this.currencyCode$ = this.store.select(selectCurrency);
  }

  public calculateDuration(arrival: Date, departure: Date) {
    const durationNum = arrival.getTime() - departure.getTime();
    return durationNum;
  }
}
