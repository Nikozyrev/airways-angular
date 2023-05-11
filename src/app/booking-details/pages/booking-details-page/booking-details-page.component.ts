import { IPassengersState } from './../../store/passengers.state.model';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { countryCodes as data } from '../../../common/code.constants';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { Subscription, map } from 'rxjs';
import { setPassengers } from '../../store/actions/passengers.action';
import { selectTicket } from '../../../flight-search/store/selectors/tiket.selector';
import { TicketStateInterface } from '../../../flight-search/store/tiket.state.model';
import { Toppings } from '../../../flight-search/components/flight-search/flight-search.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-details-page',
  templateUrl: './booking-details-page.component.html',
  styleUrls: ['./booking-details-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BookingDetailsPageComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  createCardForm!: FormGroup;

  countryCodes = data;

  adult!: null | number[];

  child!: null | number[];

  infant!: null | number[];

  subscription!: Subscription;

  onSubmit() {
    this.createCardForm.markAllAsTouched();
    // console.log(this.createCardForm.value.adult);
    // if (this.createCardForm.invalid) return;
    this.store.dispatch(
      setPassengers({ passengers: this.createCardForm.value })
    );

    localStorage.setItem(
      'keyFormValue',
      JSON.stringify(this.createCardForm.value)
    );

    this.router.navigateByUrl('/summary');
    // setTimeout(() => {

    // });
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

  ngAfterViewInit(): void {
    // console.log(this.createCardForm.value);
    console.log('ngAfterViewInit', this.createCardForm.value);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    const local = localStorage.getItem('keyFormValue');

    let value: IPassengersState | null = null;

    if (local) value = JSON.parse(local);

    const i = this.store.select(selectTicket);
    this.subscription = i
      .pipe(map((item: TicketStateInterface) => item.toppings))
      .subscribe((item) =>
        item.forEach((person: Toppings) => {
          if (person.type === 'Adult') this.adult = new Array(person.amount);
          if (person.type === 'Child') this.child = new Array(person.amount);
          if (person.type === 'Infant') this.infant = new Array(person.amount);
        })
      );

    // const local = JSON.parse(localStorage.getItem('keyFormValue') as string);
    // console.log(this.createCardForm.value);

    this.createCardForm = this.fb.group({
      adult: this.fb.array([]),
      child: this.fb.array([]),
      infant: this.fb.array([]),
      code: [value?.code || ''],
      telephone: [value?.telephone || ''],
      email: [value?.email || '', [Validators.email]],
    });

    console.log(this.createCardForm.value);
  }
}
