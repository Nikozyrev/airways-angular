import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ITicketsData, TicketType } from '../../models/ticket.model';
import * as TicketSelectors from '../../store/selectors';

@Component({
  selector: 'app-ticket-select',
  templateUrl: './ticket-select.component.html',
  styleUrls: ['./ticket-select.component.scss'],
})
export class TicketSelectComponent implements OnInit {
  @Input()
  public ticketType!: TicketType;

  public ticketsData$!: Observable<ITicketsData>;

  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.initState();
  }

  private initState() {
    this.ticketsData$ = this.store.select(
      TicketSelectors.selectTicketsData(this.ticketType)
    );
  }
}
