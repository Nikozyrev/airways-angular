import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  ngOnInit() {
    this.createCardForm = this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern('[-_a-zA-Z]*'),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern('[-_a-zA-Z]*'),
        ],
      ],
      gender: ['Male'],
      date: [''],
      help: [false],
      baggageChecked: [null, Validators.min(0)],
    });

    (this.createCardForm111.controls[this.typePassenger] as FormArray).push(
      this.createCardForm
    );
  }
}
