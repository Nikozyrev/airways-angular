import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  public loginForm!: ReturnType<typeof this.createLoginForm>;

  constructor(private formBuilder: FormBuilder) {}

  public onSubmit(e: SubmitEvent) {
    e.preventDefault();
  }

  public ngOnInit() {
    this.loginForm = this.createLoginForm();
  }

  private createLoginForm() {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
}
