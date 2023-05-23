import { ChosenTicketsStateInterface } from './../../../flight-selection/store/chosen-tickets-state.model';
import { selectFeature } from './../../../flight-selection/store/selectors/chosen-tickets.selectors';
import { IPassengersState } from './../../store/passengers.state.model';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { countryCodes as data } from '../../../common/code.constants';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { setPassengers } from '../../store/actions/passengers.action';
import { selectTicketToppings } from '../../../flight-search/store/selectors/tiket.selector';
import { Toppings } from '../../../flight-search/components/flight-search/flight-search.component';
import { Router } from '@angular/router';
import {
  TypePassenger,
  KeyLocalStorage,
} from '../../../common/passengers.constants';

@Component({
  selector: 'app-booking-details-page',
  templateUrl: './booking-details-page.component.html',
  styleUrls: ['./booking-details-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BookingDetailsPageComponent implements OnInit, OnDestroy {
  createCardForm!: FormGroup;

  countryCodes = data;

  adult!: null | number[];

  child!: null | number[];

  infant!: null | number[];

  subscription = new Subscription();

  ticketAll!: ChosenTicketsStateInterface;

  get typePassenger(): typeof TypePassenger {
    return TypePassenger;
  }

  onSubmit() {
    this.createCardForm.markAllAsTouched();

    // !!!!!!Обязательно разкомитить!!!!
    // if (this.createCardForm.invalid) return;

    const ticket = this.store
      .select(selectFeature)
      .subscribe((item) => (this.ticketAll = item));

    this.subscription.add(ticket);

    this.store.dispatch(
      setPassengers({ passengers: this.createCardForm.value })
    );

    localStorage.setItem(
      KeyLocalStorage.Passengers,
      JSON.stringify(this.createCardForm.value)
    );

    this.router.navigateByUrl('/summary', {
      state: {
        tickets: this.ticketAll,
        passengers: this.createCardForm.value,
      },
    });
  }

  goBack(): void {
    this.location.back();
  }

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private store: Store,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    const local = localStorage.getItem(KeyLocalStorage.Passengers);
    let value: IPassengersState | null = null;

    if (local) value = JSON.parse(local);

    const sub = this.store.select(selectTicketToppings).subscribe((item) =>
      item.forEach((person: Toppings) => {
        if (person.type === TypePassenger.Adult)
          this.adult = new Array(person.amount);
        if (person.type === TypePassenger.Child)
          this.child = new Array(person.amount);
        if (person.type === TypePassenger.Infant)
          this.infant = new Array(person.amount);
      })
    );

    this.subscription.add(sub);

    this.createCardForm = this.fb.group({
      adult: this.fb.array([]),
      child: this.fb.array([]),
      infant: this.fb.array([]),
      code: [value?.code || ''],
      telephone: [value?.telephone || ''],
      email: [value?.email || '', [Validators.email]],
    });
  }
}
