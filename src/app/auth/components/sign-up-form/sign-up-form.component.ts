import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Gender } from '../../models/user.model';
import { futureDateValidator } from '../../../core/validators/future-date.validator';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
})
export class SignUpFormComponent implements OnInit {
  public signUpForm!: ReturnType<typeof this.createSignUpForm>;

  constructor(private formBuilder: FormBuilder) {}

  public onSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (this.signUpForm.valid) {
      this.signUpForm.reset();
    } else {
      this.signUpForm.markAllAsTouched();
    }
  }

  public ngOnInit() {
    this.signUpForm = this.createSignUpForm();
  }

  private createSignUpForm() {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      birthDate: ['', [Validators.required, futureDateValidator]],
      gender: [Gender.male, [Validators.required]],
      phone: this.formBuilder.group({
        countryCode: ['', [Validators.required]],
        phoneNumber: [
          '',
          [
            Validators.required,
            Validators.pattern('[0-9]*'),
            Validators.minLength(9),
            Validators.maxLength(9),
          ],
        ],
      }),
      citizenship: ['', [Validators.required]],
    });
  }
}
