import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AuthDialogComponent } from './components/auth-dialog/auth-dialog.component';
import { LoginFormComponent } from './components/login-form/login-form.component';

@NgModule({
  declarations: [AuthDialogComponent, LoginFormComponent],
  imports: [CommonModule, ReactiveFormsModule, SharedModule],
})
export class AuthModule {}
