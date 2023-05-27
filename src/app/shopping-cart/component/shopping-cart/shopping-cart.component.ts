import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { selectCartFeature } from '../../store/selectors/cart-selector';
import { CartListInterface } from '../../store/cart.model';
import { ShoppingCartService } from '../../services/shopping-cart.services';
import { selectCurrency } from '../../../header/store/selectors/header-selector';

@Component({
  selector: 'app-shopping-cart-component',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  chosenTickets: Observable<CartListInterface[]> | undefined;

  totalCost = '';

  chosenTickets$: Subscription | undefined;

  currency$: Observable<string> | undefined;

  promoValue = '';

  currencyIcon = '';

  currency = '';

  promoList = ['promo', 'airways'];

  selectedTickets: CartListInterface[] = [];

  selectedTicketsAmount = 0;

  promoActive = 0;

  sortDirection = 'Up';

  sortName = 'No';

  combineStream$: Subscription | undefined;

  constructor(
    private store: Store,
    private shoppingCartService: ShoppingCartService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.chosenTickets = this.store.select(selectCartFeature);

    this.currency$ = this.store.select(selectCurrency);

    this.combineStream$ = combineLatest(
      this.currency$,
      this.shoppingCartService.select$
    ).subscribe(([currency, tickets]) => {
      this.currencyIcon = this.shoppingCartService.createPrice(currency);
      this.currency = currency;
      let totalPrice = 0;
      tickets.forEach((ticket: CartListInterface) => {
        totalPrice += +this.shoppingCartService.countPrice(ticket, currency);
      });
      if (this.promoActive > 0) {
        totalPrice = +(
          totalPrice -
          (totalPrice * this.promoActive) / 100
        ).toFixed(2);
      }
      this.totalCost = totalPrice.toFixed(2);
      this.selectedTicketsAmount = tickets.length;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.shoppingCartService.reset();
    this.combineStream$?.unsubscribe();
  }

  applyPromo() {
    if (this.promoList.includes(this.promoValue)) {
      this.totalCost = `${(+this.totalCost - +this.totalCost * 0.1).toFixed(
        2
      )}`;
      this.promoActive += 10;
      this.promoList = this.promoList.filter((v) => v !== this.promoValue);
    }
  }

  changeSortOrder(name: string, direction: string) {
    this.sortDirection = direction;
    this.sortName = name;
  }
}
