import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ITicket, TicketType } from '../../models/ticket.model';
import * as TicketSelectors from '../../store/selectors';

@Component({
  selector: 'app-ticket-select',
  templateUrl: './ticket-select.component.html',
  styleUrls: ['./ticket-select.component.scss'],
})
export class TicketSelectComponent implements OnInit {
  @Input()
  public ticketType!: TicketType;

  public tickets$!: Observable<ITicket[]>;

  public error$!: Observable<string | null>;

  public isLoading$!: Observable<boolean>;

  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.initState();
  }

  private initState() {
    this.tickets$ = this.store.select(
      this.ticketType === 'destination'
        ? TicketSelectors.selectDestinationTickets
        : TicketSelectors.selectReturnTickets
    );
    this.error$ = this.store.select(TicketSelectors.selectError);
    this.isLoading$ = this.store.select(TicketSelectors.selectIsLoading);
  }
}
