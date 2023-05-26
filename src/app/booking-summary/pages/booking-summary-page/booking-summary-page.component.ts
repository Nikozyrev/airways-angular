import { AppRoutes } from './../../../common/routes.constants';
import { CartListInterface } from './../../../shopping-cart/store/cart.model';
import { selectPassengers } from './../../../booking-details/store/selectors/passengers.selector';
import { IPassengersState } from './../../../booking-details/store/passengers.state.model';
import {
  createShoppingCart,
  createShoppingHistory,
  updateShoppingCart,
} from './../../../shopping-cart/store/action/cart-action';
import { Router } from '@angular/router';
import { TicketStateInterface } from './../../../flight-search/store/tiket.state.model';
import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { selectFeature } from '../../../flight-selection/store/selectors/chosen-tickets.selectors';
import { ChosenTicketsStateInterface } from '../../../flight-selection/store/chosen-tickets-state.model';
import { KeyLocalStorage } from '../../../common/passengers.constants';
import { selectCartFeature } from '../../../shopping-cart/store/selectors/cart-selector';

@Component({
  selector: 'app-booking-summary-page',
  templateUrl: './booking-summary-page.component.html',
  styleUrls: ['./booking-summary-page.component.scss'],
})
export class BookingSummaryPageComponent implements OnDestroy {
  ticket!: TicketStateInterface;

  flight!: CartListInterface;

  currentCart!: CartListInterface[];

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

    if (!this.flight) this.router.navigateByUrl('/');
  }

  public get appRoutes(): typeof AppRoutes {
    return AppRoutes;
  }

  goToBack(): void {
    this.location.back();
  }

  prepareDate() {
    const subTicket = this.store
      .select(selectFeature)
      .subscribe((item) => (this.ticketInfo = item));

    this.subs.add(subTicket);

    const subPassengers = this.store
      .select(selectPassengers)
      .subscribe((item) => (this.passengerstInfo = item));

    this.subs.add(subPassengers);
  }

  private checkSaveCart() {
    const saveTicket = localStorage.getItem(KeyLocalStorage.UpdateTicket);

    if (saveTicket) {
      const ticketsList = this.store
        .select(selectCartFeature)
        .subscribe((val) => {
          this.currentCart = val.filter(
            (v) => JSON.stringify(v) !== saveTicket
          );
        });
      ticketsList.unsubscribe();
      this.store.dispatch(
        updateShoppingCart({
          cartList: this.currentCart,
        })
      );
    }
  }

  goToCart() {
    this.prepareDate();

    this.checkSaveCart();

    this.store.dispatch(
      createShoppingCart({
        cartList: {
          tickets: this.ticketInfo,
          passengers: this.passengerstInfo,
        },
      })
    );
    setTimeout(() => {
      this.router.navigateByUrl(`/${AppRoutes.cart}`);
    });
  }

  goToBuy() {
    this.prepareDate();

    this.checkSaveCart();

    this.store.dispatch(
      createShoppingHistory({
        cartList: {
          tickets: this.ticketInfo,
          passengers: this.passengerstInfo,
        },
      })
    );
    setTimeout(() => {
      this.router.navigateByUrl(`/${AppRoutes.account}`);
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
