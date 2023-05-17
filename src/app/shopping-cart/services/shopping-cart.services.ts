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
}
