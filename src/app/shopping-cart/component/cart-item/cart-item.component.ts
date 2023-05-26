import { AppRoutes } from './../../../common/routes.constants';
import {
  TypePassenger,
  KeyLocalStorage,
} from './../../../common/passengers.constants';
import { setTicketInfoSuccess } from '../../../flight-search/store/actions/tiket.action';
import { TicketStateInterface } from '../../../flight-search/store/tiket.state.model';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CartListInterface } from '../../store/cart.model';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectCurrency } from '../../../header/store/selectors/header-selector';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from '../../services/shopping-cart.services';
import { selectCartFeature } from '../../store/selectors/cart-selector';
import { updateShoppingCart } from '../../store/action/cart-action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit, OnDestroy {
  @Input() cartItem: CartListInterface | undefined;

  destinationLocation = '';

  returnLocation = '';

  checkboxGroup = this._formBuilder.group({
    checked: [true],
  });

  price = '';

  currency$: Subscription | undefined;

  subs!: Subscription;

  ticketsList: Subscription | undefined;

  constructor(
    private _formBuilder: FormBuilder,
    private store: Store,
    private shoppingCartService: ShoppingCartService,
    private router: Router
  ) {}

  private changeTicketState() {
    const formValue: TicketStateInterface = {
      tripType: this.cartItem?.tickets.returnTicket ? 'Round Trip' : 'One Way',
      from: this.cartItem?.tickets.destinationTicket?.locations
        .departure as string,
      to: this.cartItem?.tickets.destinationTicket?.locations.arrival as string,
      endDate: this.cartItem?.tickets.returnTicket
        ? (this.cartItem?.tickets.returnTicket.dates.departure.toString() as string)
        : null,
      startDate:
        this.cartItem?.tickets.destinationTicket?.dates.departure.toString() as string,
      toppings: [
        {
          type: TypePassenger.Adult,
          amount: this.cartItem?.passengers.adult.length as number,
        },
        {
          type: TypePassenger.Child,
          amount: this.cartItem?.passengers.child.length as number,
        },
        {
          type: TypePassenger.Infant,
          amount: this.cartItem?.passengers.infant.length as number,
        },
      ],
    };

    this.store.dispatch(
      setTicketInfoSuccess({
        ticketInfo: formValue,
      })
    );
  }

  goToPassenger() {
    localStorage.setItem(
      KeyLocalStorage.Passengers,
      JSON.stringify(this.cartItem?.passengers)
    );

    localStorage.setItem(
      KeyLocalStorage.UpdateTicket,
      JSON.stringify(this.cartItem)
    );

    this.changeTicketState();
    this.router.navigateByUrl(`/${AppRoutes.flights}`);
  }

  ngOnInit() {
    this.destinationLocation = this.createFlight(
      this.cartItem?.tickets?.destinationTicket?.locations?.departure,
      this.cartItem?.tickets?.destinationTicket?.locations?.arrival
    );
    this.returnLocation = this.createFlight(
      this.cartItem?.tickets?.returnTicket?.locations?.departure,
      this.cartItem?.tickets?.returnTicket?.locations?.arrival
    );

    this.currency$ = this.store.select(selectCurrency).subscribe((val) => {
      this.price = `${this.shoppingCartService.createPrice(
        val
      )}${this.shoppingCartService.countPrice(
        this.cartItem as CartListInterface,
        val
      )}`;
    });

    if (this.checkboxGroup.get('checked')?.value === true) {
      this.shoppingCartService.increment(this.cartItem as CartListInterface);
    }

    this.checkboxGroup.get('checked')?.valueChanges.subscribe((value) => {
      if (value) {
        this.shoppingCartService.increment(this.cartItem as CartListInterface);
      } else {
        this.shoppingCartService.decrement(this.cartItem as CartListInterface);
      }
    });
  }

  ngOnDestroy(): void {
    this.currency$?.unsubscribe();
  }

  createFlight(from: string | undefined, to: string | undefined) {
    return `${from?.split(' ')[0]} - ${to?.split(' ')[0]}`;
  }

  deleteTicket() {
    this.ticketsList = this.store.select(selectCartFeature).subscribe((val) => {
      if (val.includes(this.cartItem as CartListInterface)) {
        this.store.dispatch(
          updateShoppingCart({
            cartList: val.filter((v) => v !== this.cartItem),
          })
        );
      }
    });
    this.shoppingCartService.decrement(this.cartItem as CartListInterface);
    this.ticketsList.unsubscribe();
  }

  checkPage() {
    return this.router.url.slice(1) === AppRoutes.cart ? true : false;
  }

  goToSummary() {
    if (this.router.url.slice(1) === AppRoutes.cart) return;
    this.router.navigateByUrl(`/${AppRoutes.summary}`, {
      state: {
        tickets: this.cartItem?.tickets,
        passengers: this.cartItem?.passengers,
        path: this.router.url.slice(1),
      },
    });
  }
}
