import { HttpClient } from '@angular/common/http';
import { selectTiket } from './../../../flight-search/store/selectors/tiket.selector';
import { TiketStateInterface } from './../../../flight-search/store/tiket.state.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, map } from 'rxjs';
import { Location } from '@angular/common';

export interface ITicket {
  from: string;
  to: string;
  departure: string;
  arrival: string;
  price: {
    EUR: number;
    USA: number;
    RUB: number;
    PLN: number;
  };
  flightNum: number;
  seats: {
    total: number;
    available: number;
  };
}

@Component({
  selector: 'app-booking-summary-page',
  templateUrl: './booking-summary-page.component.html',
  styleUrls: ['./booking-summary-page.component.scss'],
})
export class BookingSummaryPageComponent implements OnInit, OnDestroy {
  // ticket$!: Observable<TiketStateInterface>;

  ticket!: TiketStateInterface;

  flight$!: Observable<ITicket>;

  flightAway$!: Observable<ITicket>;

  subscription!: Subscription;

  round = true;

  constructor(
    private store: Store,
    private http: HttpClient,
    private location: Location
  ) {}

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    const ticket$ = this.store.select(selectTiket);
    this.subscription = ticket$.subscribe((item) => (this.ticket = item));
    this.flight$ = <Observable<ITicket>>(
      this.http
        .get<ITicket[]>('/tikets')
        .pipe(
          map((i) =>
            i.find(
              (item) =>
                item.from === this.ticket.from && item.to === this.ticket.to
            )
          )
        )
    );
    // this.flight$.subscribe((i) => console.log(i));

    // this.flightAway$ = <Observable<ITicket>>(
    //   this.http
    //     .get<ITicket[]>('/tikets')
    //     .pipe(
    //       map((i) =>
    //         i.find(
    //           (item) =>
    //             item.from === this.ticket.to && item.to === this.ticket.from
    //         )
    //       )
    //     )
    // );
    // this.flightAway$.subscribe((i) => console.log(i));
  }
}
