import { HeaderStateInterface } from './../../../header/store/header-state.model';
import { CartListInterface } from './../../../shopping-cart/store/cart.model';
import { selectTicket } from './../../../flight-search/store/selectors/tiket.selector';
import { TicketStateInterface } from './../../../flight-search/store/tiket.state.model';
import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectFeature } from '../../../header/store/selectors/header-selector';
import { RateTypePassenger } from '../../../common/passengers.constants';

@Component({
  selector: 'app-fare',
  templateUrl: './fare.component.html',
  styleUrls: ['./fare.component.scss'],
})
export class FareComponent implements OnInit {
  @Input() flight!: CartListInterface;

  ticket$!: Observable<TicketStateInterface>;

  global$!: Observable<HeaderStateInterface>;

  current!: number;

  constructor(private store: Store) {}

  totalSummary(obj: CartListInterface, value: string) {
    const adult = obj.passengers.adult.length;
    const child = obj.passengers.child.length;
    const infant = obj.passengers.infant.length;

    const priceThere = obj.tickets.destinationTicket?.price;
    const priceBack = obj.tickets.returnTicket?.price;

    const currentThere = priceThere
      ? priceThere[value as keyof typeof priceThere]
      : 0;

    const currentBack = priceBack
      ? priceBack[value as keyof typeof priceBack]
      : 0;

    return (
      (currentThere + currentBack) *
      (RateTypePassenger.Adult * adult +
        RateTypePassenger.Child * child +
        RateTypePassenger.Infant * infant)
    );
  }

  ngOnInit(): void {
    this.global$ = this.store.select(selectFeature);
    this.ticket$ = this.store.select(selectTicket);
  }
}
