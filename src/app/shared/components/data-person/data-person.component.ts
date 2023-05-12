import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  IPassengersState,
  IPassenger,
} from '../../../booking-details/store/passengers.state.model';

@Component({
  selector: 'app-data-person',
  templateUrl: './data-person.component.html',
  styleUrls: ['./data-person.component.scss'],
})
export class DataPersonComponent implements OnInit {
  @Input() createCardForm111!: FormGroup;

  @Input() index!: number;

  @Input() typePassenger!: string;

  createCardForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  get controlsInput() {
    return (this.createCardForm111.get(this.typePassenger) as FormArray)
      .controls[this.index] as FormGroup;
  }

  // writeValue(value: IPassenger) {}

  objKey(obj: IPassengersState, value: string) {
    return obj[value as keyof typeof obj][this.index] as IPassenger;
  }

  ngOnInit() {
    const local = localStorage.getItem('keyFormValue');

    let value: IPassengersState | null = null;

    if (local) value = JSON.parse(local);
    // this.objKey(value, this.typePassenger)?.[this.index]?.firstName || ''
    // console.log(value[this.typePassenger], typeof value);

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
      date: [value ? this.objKey(value, this.typePassenger).date : ''],
      help: [value ? this.objKey(value, this.typePassenger).help : false],
      baggageChecked: [
        value ? this.objKey(value, this.typePassenger).baggageChecked : null,
        Validators.min(0),
      ],
    });

    (this.createCardForm111.controls[this.typePassenger] as FormArray).push(
      this.createCardForm
    );
  }
}
