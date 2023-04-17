import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AuthDialogComponent } from './components/auth-dialog/auth-dialog.component';

@NgModule({
  declarations: [AuthDialogComponent],
  imports: [CommonModule, SharedModule],
})
export class AuthModule {}
