import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCartFeature } from '../../store/selectors/cart-selector';
import { CartListInterface } from '../../store/cart.model';

@Component({
  selector: 'app-shopping-cart-component',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  chosenTickets$: Observable<CartListInterface[]> | undefined;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.chosenTickets$ = this.store.select(selectCartFeature);
  }
}
