import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  combineLatest,
  map,
} from 'rxjs';
import {
  ITicket,
  ITicketsData,
  IViewDate,
  TicketType,
} from '../../models/ticket.model';
import * as TicketSelectors from '../../store/selectors/tickets.selectors';
import * as ChosenTicketSelectors from '../../store/selectors/chosen-tickets.selectors';
import { DAY_MILLISECONDS } from '../../../common/date-time.constants';

@Component({
  selector: 'app-ticket-select',
  templateUrl: './ticket-select.component.html',
  styleUrls: ['./ticket-select.component.scss'],
})
export class TicketSelectComponent implements OnInit, OnDestroy {
  @Input()
  public ticketType!: TicketType;

  public ticketsData$!: Observable<ITicketsData>;

  private dates$ = new BehaviorSubject<Date[]>([]);

  public selectedViewDate$ = new BehaviorSubject<IViewDate>({
    date: new Date(),
    selected: false,
    tickets: [],
  });

  public viewDates$!: Observable<IViewDate[]>;

  public selectedTicket$!: Observable<ITicket | null>;

  private subscription!: Subscription;

  constructor(private store: Store) {}

  public selectDate(date: IViewDate) {
    this.selectedViewDate$.next(date);
  }

  public moveDates(direction: -1 | 1) {
    const currentDates = this.dates$.value;
    const startDate = currentDates[0];
    const newDates = this.createDatesArray(
      this.getDateFrom(startDate, direction),
      5
    );
    this.dates$.next(newDates);
  }

  private subscribeToTicketsData() {
    this.subscription = this.ticketsData$.subscribe((data) => {
      const selectedDate = new Date(data.selectedDate || Date.now());
      const dates = this.createDatesArray(
        this.getDateFrom(selectedDate, -2),
        5
      );
      this.selectedViewDate$.next({
        date: selectedDate,
        selected: true,
        tickets: data.tickets.filter(
          (ticket) =>
            ticket.dates.departure.toDateString() ===
            selectedDate.toDateString()
        ),
      });
      this.dates$.next(dates);
    });
  }

  private createViewDates() {
    this.viewDates$ = combineLatest([
      this.selectedViewDate$,
      this.dates$,
      this.ticketsData$,
    ]).pipe(
      map(([selectedDate, dates, data]) => {
        const viewDates = dates.map((date) => {
          const day = date.toDateString();
          const tickets = data.tickets.filter(
            (ticket) => ticket.dates.departure.toDateString() === day
          );
          return {
            date,
            tickets,
            selected: day === selectedDate.date.toDateString(),
          } as IViewDate;
        });
        return viewDates;
      })
    );
  }

  private createDatesArray(date: Date, days: number) {
    const dateTime = date.getTime();
    const datesArr = Array.from(new Array(days));
    return datesArr.map((_, i) => new Date(dateTime + DAY_MILLISECONDS * i));
  }

  private getDateFrom(date: Date, diffDays: number) {
    const dateTime = date.getTime();
    return new Date(dateTime + DAY_MILLISECONDS * diffDays);
  }

  public ngOnInit(): void {
    this.ticketsData$ = this.store.select(
      TicketSelectors.selectTicketsData(this.ticketType)
    );
    this.selectedTicket$ = this.store.select(
      ChosenTicketSelectors.selectChosenTicket(this.ticketType)
    );
    this.subscribeToTicketsData();
    this.createViewDates();
  }

  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
