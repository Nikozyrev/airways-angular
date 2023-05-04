import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { countryCodes as data } from '../../../common/code.constants';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { Subscription, map } from 'rxjs';
import { setPassengers } from '../../store/actions/passengers.action';
import { selectTiket } from '../../../flight-search/store/selectors/tiket.selector';

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

  subscription!: Subscription;

  onSubmit() {
    this.createCardForm.markAllAsTouched();
    console.log(this.createCardForm.value);
    if (this.createCardForm.invalid) return;
    this.store.dispatch(
      setPassengers({ passengers: this.createCardForm.value })
    );
  }

  goBack(): void {
    this.location.back();
  }

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private store: Store
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    const i = this.store.select(selectTiket);
    this.subscription = i.pipe(map((item) => item.toppings)).subscribe((item) =>
      item.forEach((person) => {
        if (person.type === 'Adult') this.adult = new Array(person.amount);
        if (person.type === 'Child') this.child = new Array(person.amount);
        if (person.type === 'Infant') this.infant = new Array(person.amount);
      })
    );

    console.log(this.adult);

    this.createCardForm = this.fb.group({
      adult: this.fb.array([]),
      child: this.fb.array([]),
      infant: this.fb.array([]),
      code: [''],
      telephone: [''],
      email: ['', [Validators.email]],
    });
  }
}
