import { CartListInterface } from './../../../shopping-cart/store/cart.model';
import { HeaderStateInterface } from './../../../header/store/header-state.model';
import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectFeature } from '../../../header/store/selectors/header-selector';
import {
  TypePassenger,
  RateTypePassenger,
} from '../../../common/passengers.constants';
import { Toppings } from '../../../flight-search/components/flight-search/flight-search.component';

@Component({
  selector: 'app-fare-passenger',
  templateUrl: './fare-passenger.component.html',
  styleUrls: ['./fare-passenger.component.scss'],
})
export class FarePassengerComponent implements OnInit {
  @Input() flight!: CartListInterface;

  @Input() person!: Toppings;

  global$!: Observable<HeaderStateInterface>;

  current!: number;

  constructor(private store: Store) {}

  addCurrency(obj: CartListInterface, value: string) {
    const priceThere = obj.tickets.destinationTicket?.price;
    const priceBack = obj.tickets.returnTicket?.price;

    const currentThere = priceThere
      ? priceThere[value as keyof typeof priceThere]
      : 0;

    const currentBack = priceBack
      ? priceBack[value as keyof typeof priceBack]
      : 0;

    return (currentThere + currentBack) * this.current * this.person.amount;
  }

  ngOnInit(): void {
    this.global$ = this.store.select(selectFeature);

    if (this.person.type === TypePassenger.Adult)
      this.current = RateTypePassenger.Adult;
    if (this.person.type === TypePassenger.Child)
      this.current = RateTypePassenger.Child;
    if (this.person.type === TypePassenger.Infant)
      this.current = RateTypePassenger.Infant;
  }
}
