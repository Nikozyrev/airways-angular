import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { userReducers } from './store/reducers';
import { SharedModule } from '../shared/shared.module';
import { AuthDialogComponent } from './components/auth-dialog/auth-dialog.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { SocialLoginButtonsComponent } from './components/social-login-buttons/social-login-buttons.component';

@NgModule({
  declarations: [
    AuthDialogComponent,
    LoginFormComponent,
    SignUpFormComponent,
    SocialLoginButtonsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('user', userReducers),
  ],
})
export class AuthModule {}
