import { Component, Input, OnInit } from '@angular/core';
import { CartListInterface } from '../../store/cart.model';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
  @Input() cartItem: CartListInterface | undefined;

  destinationLocation = '';

  returnLocation = '';

  checkboxGroup = this._formBuilder.group({
    checked: [true],
  });

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.destinationLocation = this.createFlight(
      this.cartItem?.tickets?.destinationTicket?.locations?.departure,
      this.cartItem?.tickets?.destinationTicket?.locations?.arrival
    );
    this.returnLocation = this.createFlight(
      this.cartItem?.tickets?.returnTicket?.locations?.departure,
      this.cartItem?.tickets?.returnTicket?.locations?.arrival
    );
  }

  createFlight(from: string | undefined, to: string | undefined) {
    return `${from?.split(' ')[0]} - ${to?.split(' ')[0]}`;
  }
}
