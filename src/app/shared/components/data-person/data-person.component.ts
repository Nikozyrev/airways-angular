import { DatePipe } from '@angular/common';
import { selectDate } from './../../../header/store/selectors/header-selector';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  IPassengersState,
  IPassenger,
} from '../../../booking-details/store/passengers.state.model';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-data-person',
  templateUrl: './data-person.component.html',
  styleUrls: ['./data-person.component.scss'],
  providers: [DatePipe],
})
export class DataPersonComponent implements OnInit, OnDestroy {
  @Input() createCardFormParents!: FormGroup;

  @Input() index!: number;

  @Input() typePassenger!: string;

  createCardForm!: FormGroup;

  date!: string;

  subscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private datePipe: DatePipe
  ) {}

  get controlsInput() {
    return (this.createCardFormParents.get(this.typePassenger) as FormArray)
      .controls[this.index] as FormGroup;
  }

  objKey(obj: IPassengersState, value: string) {
    return obj[value as keyof typeof obj][this.index] as IPassenger;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    const local = localStorage.getItem('keyFormValue');

    let value: IPassengersState | null = null;

    if (local) value = JSON.parse(local);

    this.createCardForm = this.fb.group({
      firstName: [
        value ? this.objKey(value, this.typePassenger).firstName : '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern('[-_a-zA-Z]*'),
        ],
      ],
      lastName: [
        value ? this.objKey(value, this.typePassenger).lastName : '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern('[-_a-zA-Z]*'),
        ],
      ],
      gender: [value ? this.objKey(value, this.typePassenger).gender : 'Male'],
      date: [
        value
          ? this.datePipe.transform(
              this.objKey(value, this.typePassenger).date,
              this.date
            )
          : '',
      ],
      help: [value ? this.objKey(value, this.typePassenger).help : false],
      baggageChecked: [
        value ? this.objKey(value, this.typePassenger).baggageChecked : null,
        Validators.min(0),
      ],
    });

    (this.createCardFormParents.controls[this.typePassenger] as FormArray).push(
      this.createCardForm
    );

    this.subscription = this.store.select(selectDate).subscribe((i) => {
      this.date = i;
      this.createCardForm.patchValue({
        date: new Date(this.createCardForm.get('date')?.value),
      });
    });
  }
}
