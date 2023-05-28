import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Gender, IUserSignUp } from '../../models/user.model';
import { futureDateValidator } from '../../../core/validators/future-date.validator';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
})
export class SignUpFormComponent implements OnInit {
  @Output()
  private signUp = new EventEmitter<IUserSignUp>();

  public signUpForm!: ReturnType<typeof this.createSignUpForm>;

  constructor(private formBuilder: FormBuilder) {}

  public onSubmit(e: SubmitEvent) {
    e.preventDefault();

    const isAgreed = this.signUpForm.controls.agreement.value;

    if (this.signUpForm.valid && isAgreed) {
      const formData = this.signUpForm.value;
      const userData: IUserSignUp = {
        email: formData.email || '',
        password: formData.password || '',
        firstName: formData.firstName || '',
        lastName: formData.lastName || '',
        birthDate: new Date(formData.birthDate || Date.now()),
        gender: formData.gender || Gender.male,
        phone: `${formData.phone?.countryCode}${formData.phone?.phoneNumber}`,
        citizenship: formData.citizenship || '',
      };
      this.signUp.emit(userData);
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
      password: ['', [Validators.required, Validators.minLength(4)]],
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
      agreement: [false, [Validators.required]],
    });
  }
}
