import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IUserLogIn } from '../../models/user.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  @Output()
  private logIn = new EventEmitter<IUserLogIn>();

  public loginForm!: ReturnType<typeof this.createLoginForm>;

  constructor(private formBuilder: FormBuilder) {}

  public onSubmit(e: SubmitEvent) {
    e.preventDefault();

    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      const userData: IUserLogIn = {
        email: formData.email || '',
        password: formData.password || '',
      };
      this.logIn.emit(userData);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  public ngOnInit() {
    this.loginForm = this.createLoginForm();
  }

  private createLoginForm() {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }
}
