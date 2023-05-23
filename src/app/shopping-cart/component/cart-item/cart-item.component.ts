import {
  TypePassenger,
  KeyLocalStorage,
} from './../../../common/passengers.constants';
import { Component, Input, OnInit } from '@angular/core';
import { CartListInterface } from '../../store/cart.model';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { setTicketInfoSuccess } from '../../../flight-search/store/actions/tiket.action';
import { TicketStateInterface } from '../../../flight-search/store/tiket.state.model';
// import * as ChosenTicketsActions from '../../../flight-selection/store/actions/chosen-tickets.actions';
// import { ITicket } from '../../../flight-selection/models/ticket.model';

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

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private store: Store
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

    this.changeTicketState();
    this.router.navigateByUrl('/flights');

    // setTimeout(() => {
    //   this.store.dispatch(
    //     ChosenTicketsActions.saveAllTicket({
    //       ticketTo: this.cartItem?.tickets.destinationTicket as ITicket,
    //       ticketBack: this.cartItem?.tickets.returnTicket
    //         ? this.cartItem?.tickets.returnTicket
    //         : null,
    //     })
    //   );
    // });
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
  }

  createFlight(from: string | undefined, to: string | undefined) {
    return `${from?.split(' ')[0]} - ${to?.split(' ')[0]}`;
  }
}
