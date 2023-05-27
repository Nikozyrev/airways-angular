import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ITicket, TicketType } from '../../models/ticket.model';
import { selectCurrency } from '../../../header/store/selectors/header-selector';
import * as ChosenTicketsActions from '../../store/actions/chosen-tickets.actions';
import * as ChosenTicketsSelectors from '../../store/selectors/chosen-tickets.selectors';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent implements OnInit, OnChanges {
  @Input()
  public ticket?: ITicket;

  @Input()
  public ticketType!: TicketType;

  @Input()
  public selected?: boolean;

  public currencyCode$!: Observable<string>;

  public canSelect$!: Observable<boolean>;

  constructor(private store: Store) {}

  public saveTicket(ticket: ITicket) {
    this.store.dispatch(
      ChosenTicketsActions.saveTicket({ ticket, ticketType: this.ticketType })
    );
  }

  public editTicket() {
    this.store.dispatch(
      ChosenTicketsActions.removeTicket({ ticketType: this.ticketType })
    );
  }

  public ngOnInit(): void {
    this.currencyCode$ = this.store.select(selectCurrency);
  }

  public ngOnChanges(): void {
    if (this.ticket) {
      this.canSelect$ = this.store.select(
        ChosenTicketsSelectors.selectCanSelectTicket(
          this.ticketType,
          this.ticket
        )
      );
    }
  }

  public calculateDuration(arrival: Date, departure: Date) {
    const durationNum = arrival.getTime() - departure.getTime();
    return durationNum;
  }
}
