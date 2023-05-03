import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { countryCodes as data } from '../../../common/code.constants';
import { Location } from '@angular/common';

@Component({
  selector: 'app-booking-details-page',
  templateUrl: './booking-details-page.component.html',
  styleUrls: ['./booking-details-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BookingDetailsPageComponent implements OnInit {
  createCardForm!: FormGroup;

  countryCodes = data;

  adult = new Array(1);

  child = new Array(1);

  infant = new Array(1);

  onSubmit() {
    this.createCardForm.markAllAsTouched();
    console.log(this.createCardForm.value);
    if (this.createCardForm.invalid) return;
    console.log('11111');
  }

  goBack(): void {
    this.location.back();
  }

  constructor(private fb: FormBuilder, private location: Location) {}

  ngOnInit(): void {
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
