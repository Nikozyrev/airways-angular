import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ITicket } from '../../models/ticket.model';
import * as TicketsActions from '../../store/actions';
import * as TicketsSelectors from '../../store/selectors';

@Component({
  selector: 'app-flight-selection',
  templateUrl: './flight-selection.component.html',
  styleUrls: ['./flight-selection.component.scss'],
})
export class FlightSelectionComponent implements OnInit {
  public tickets$!: Observable<ITicket[]>;

  public error$!: Observable<string | null>;

  public isLoading$!: Observable<boolean>;

  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.tickets$ = this.store.select(TicketsSelectors.selectTickets);
    this.error$ = this.store.select(TicketsSelectors.selectError);
    this.isLoading$ = this.store.select(TicketsSelectors.selectIsLoading);

    this.store.dispatch(TicketsActions.fetchTickets());
  }
}
