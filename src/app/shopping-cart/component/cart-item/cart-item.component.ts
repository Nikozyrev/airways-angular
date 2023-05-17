import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CartListInterface } from '../../store/cart.model';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectCurrency } from '../../../header/store/selectors/header-selector';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from '../../services/shopping-cart.services';

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

  constructor(
    private _formBuilder: FormBuilder,
    private store: Store,
    private shoppingCartService: ShoppingCartService
  ) {}

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
      this.price = `${this.shoppingCartService.createPrice(val)}${
        (this.cartItem?.tickets?.returnTicket?.price[val]
          ? this.cartItem?.tickets?.returnTicket?.price[val]
          : 0) +
        (this.cartItem?.tickets?.destinationTicket?.price[val]
          ? this.cartItem?.tickets?.destinationTicket?.price[val]
          : 0)
      }`;
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
}
