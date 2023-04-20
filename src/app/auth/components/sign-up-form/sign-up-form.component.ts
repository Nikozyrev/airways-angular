import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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
    });
  }
}
