import { selectPassengers } from './../../../booking-details/store/selectors/passengers.selector';
import { IPassengersState } from './../../../booking-details/store/passengers.state.model';
import { createShoppingCart } from './../../../shopping-cart/store/action/cart-action';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { selectTicket } from './../../../flight-search/store/selectors/tiket.selector';
import { TicketStateInterface } from './../../../flight-search/store/tiket.state.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, map } from 'rxjs';
import { Location } from '@angular/common';
import { ITicketResponse } from '../../../flight-selection/models/ticket.model';
import { selectFeature } from '../../../flight-selection/store/selectors/chosen-tickets.selectors';
import { ChosenTicketsStateInterface } from '../../../flight-selection/store/chosen-tickets-state.model';

@Component({
  selector: 'app-booking-summary-page',
  templateUrl: './booking-summary-page.component.html',
  styleUrls: ['./booking-summary-page.component.scss'],
})
export class BookingSummaryPageComponent implements OnInit, OnDestroy {
  // ticket$!: Observable<TiketStateInterface>;

  ticket!: TicketStateInterface;

  flight$!: Observable<ITicketResponse>;

  flightAway$!: Observable<ITicketResponse>;

  subscription!: Subscription;

  round = true;

  subs = new Subscription();

  ticketInfo!: ChosenTicketsStateInterface;

  passengerstInfo!: IPassengersState;

  constructor(
    private store: Store,
    private http: HttpClient,
    private location: Location,
    private router: Router
  ) {
    console.log('router', this.router.getCurrentNavigation()?.extras.state);
  }

  goBack(): void {
    this.location.back();
  }

  goCart() {
    const subTicket = this.store
      .select(selectFeature)
      .subscribe((item) => (this.ticketInfo = item));

    this.subs.add(subTicket);

    const subPassengers = this.store
      .select(selectPassengers)
      .subscribe((item) => (this.passengerstInfo = item));

    this.subs.add(subPassengers);
    this.store.dispatch(
      createShoppingCart({
        cartList: {
          tickets: this.ticketInfo,
          passengers: this.passengerstInfo,
        },
      })
    );
    setTimeout(() => {
      this.router.navigateByUrl('/cart');
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    const ticket$ = this.store.select(selectTicket);
    this.store.select(selectFeature).subscribe((item) => console.log(item));
    this.subscription = ticket$.subscribe((item) => (this.ticket = item));
    this.flight$ = <Observable<ITicketResponse>>(
      this.http
        .get<ITicketResponse[]>('/tikets')
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
