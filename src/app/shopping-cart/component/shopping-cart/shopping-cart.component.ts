import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
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

  currency$: Subscription | undefined;

  promoValue = '';

  currencyIcon = '';

  currency = '';

  promoList = ['promo', 'airways'];

  selectedTickets: CartListInterface[] = [];

  selectedTicketsAmount = 0;

  ticketsListActive: Subscription | undefined;

  promoActive = 0;

  sortDirection = '';

  sortName = '';

  constructor(
    private store: Store,
    private shoppingCartService: ShoppingCartService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.chosenTickets = this.store.select(selectCartFeature);

    this.currency$ = this.store.select(selectCurrency).subscribe((v) => {
      this.currencyIcon = this.shoppingCartService.createPrice(v);
      this.currency = v;
    });

    this.ticketsListActive = this.shoppingCartService.select$.subscribe((v) => {
      let totalPrice = 0;
      v.forEach((ticket) => {
        totalPrice += ticket.tickets.destinationTicket?.price[this.currency]
          ? ticket.tickets.destinationTicket?.price[this.currency]
          : 0;
        totalPrice += ticket.tickets.returnTicket?.price[this.currency]
          ? ticket.tickets.returnTicket?.price[this.currency]
          : 0;
      });
      if (this.promoActive > 0) {
        totalPrice = +(
          totalPrice -
          (totalPrice * this.promoActive) / 100
        ).toFixed(2);
      }
      this.totalCost = totalPrice.toFixed(2);
      this.selectedTicketsAmount = v.length;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.currency$?.unsubscribe();
    this.chosenTickets$?.unsubscribe();
    this.shoppingCartService.reset();
    this.ticketsListActive?.unsubscribe();
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
