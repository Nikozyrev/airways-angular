import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, combineLatest, map, take } from 'rxjs';
import { ITicketsData, IViewDate, TicketType } from '../../models/ticket.model';
import * as TicketSelectors from '../../store/selectors';
import { DAY_MILLISECONDS } from '../../../common/date-time.constants';

@Component({
  selector: 'app-ticket-select',
  templateUrl: './ticket-select.component.html',
  styleUrls: ['./ticket-select.component.scss'],
})
export class TicketSelectComponent implements OnInit {
  @Input()
  public ticketType!: TicketType;

  public ticketsData$!: Observable<ITicketsData>;

  private selectedDate$ = new BehaviorSubject(new Date());

  private dates$ = new BehaviorSubject<Date[]>([]);

  public viewDates$!: Observable<IViewDate[]>;

  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.initState();
  }

  private initState() {
    this.ticketsData$ = this.store.select(
      TicketSelectors.selectTicketsData(this.ticketType)
    );

    this.ticketsData$.pipe(take(1)).subscribe((data) => {
      const selectedDate = new Date(data.selectedDate || Date.now());
      const dates = this.createDatesArray(
        this.getDateFrom(selectedDate, -2),
        5
      );
      this.selectedDate$.next(selectedDate);
      this.dates$.next(dates);
    });

    this.viewDates$ = combineLatest([
      this.selectedDate$,
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
            selected: day === selectedDate.toDateString(),
          } as IViewDate;
        });
        return viewDates;
      })
    );
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

  private createDatesArray(date: Date, days: number) {
    const dateTime = date.getTime();
    const datesArr = Array.from(new Array(days));
    return datesArr.map((_, i) => new Date(dateTime + DAY_MILLISECONDS * i));
  }

  private getDateFrom(date: Date, diffDays: number) {
    const dateTime = date.getTime();
    return new Date(dateTime + DAY_MILLISECONDS * diffDays);
  }
}
