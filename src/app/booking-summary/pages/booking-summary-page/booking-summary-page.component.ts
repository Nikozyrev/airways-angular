import { CartListInterface } from './../../../shopping-cart/store/cart.model';
import { selectPassengers } from './../../../booking-details/store/selectors/passengers.selector';
import { IPassengersState } from './../../../booking-details/store/passengers.state.model';
import { createShoppingCart } from './../../../shopping-cart/store/action/cart-action';
import { Router } from '@angular/router';
import { TicketStateInterface } from './../../../flight-search/store/tiket.state.model';
import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { selectFeature } from '../../../flight-selection/store/selectors/chosen-tickets.selectors';
import { ChosenTicketsStateInterface } from '../../../flight-selection/store/chosen-tickets-state.model';

@Component({
  selector: 'app-booking-summary-page',
  templateUrl: './booking-summary-page.component.html',
  styleUrls: ['./booking-summary-page.component.scss'],
})
export class BookingSummaryPageComponent implements OnDestroy {
  ticket!: TicketStateInterface;

  flight!: CartListInterface;

  subs: Subscription = new Subscription();

  ticketInfo!: ChosenTicketsStateInterface;

  passengerstInfo!: IPassengersState;

  constructor(
    private store: Store,
    private location: Location,
    private router: Router
  ) {
    this.flight = this.router.getCurrentNavigation()?.extras
      .state as CartListInterface;

    console.log(this.flight);
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

  goBuy() {
    setTimeout(() => {
      this.router.navigateByUrl('/');
    }, 500);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
