import { RateTypePassenger } from './../../common/passengers.constants';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartListInterface } from '../store/cart.model';

@Injectable()
export class ShoppingCartService {
  select$ = new BehaviorSubject<CartListInterface[]>([]);

  createPrice(currency: string) {
    let currencyIcon = '€';
    switch (currency) {
      case 'EUR':
        currencyIcon = '€';
        break;
      case 'USA':
        currencyIcon = '$';
        break;
      case 'RUB':
        currencyIcon = '₽';
        break;
      case 'PLN':
        currencyIcon = 'zł';
        break;
    }
    return currencyIcon;
  }

  countPrice(cartItem: CartListInterface, currency: string) {
    let totalPrice = cartItem.tickets.destinationTicket?.price[
      currency
    ] as number;
    if (cartItem.tickets.returnTicket) {
      totalPrice += cartItem.tickets.returnTicket?.price[currency];
    }
    let price = 0;
    if (cartItem.passengers.adult.length > 0) {
      price +=
        (totalPrice as number) *
        RateTypePassenger.Adult *
        cartItem.passengers.adult.length;
    }
    if (cartItem.passengers.child.length > 0) {
      price +=
        (totalPrice as number) *
        RateTypePassenger.Child *
        cartItem.passengers.child.length;
    }
    if (cartItem.passengers.infant.length > 0) {
      price +=
        (totalPrice as number) *
        RateTypePassenger.Infant *
        cartItem.passengers.infant.length;
    }
    return price.toFixed(2);
  }

  increment(el: CartListInterface) {
    const currentArray = this.select$.getValue();
    const updatedArray = [...currentArray, el];
    this.select$.next(updatedArray);
  }

  decrement(el: CartListInterface) {
    const currentArray = this.select$.getValue();
    const updatedArray = currentArray.filter((v) => v !== el);
    this.select$.next(updatedArray);
  }

  reset() {
    this.select$.next([]);
  }
}
