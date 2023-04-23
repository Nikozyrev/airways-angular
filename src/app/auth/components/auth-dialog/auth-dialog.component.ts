import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IUserLogIn, IUserSignUp } from '../../models/user.model';
import { Store } from '@ngrx/store';
import * as UserActions from '../../store/actions';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss'],
})
export class AuthDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<AuthDialogComponent>,
    private store: Store
  ) {}

  public onLogIn(userData: IUserLogIn) {
    console.log(userData);
    this.dialogRef.close();
  }

  public onSignUp(userData: IUserSignUp) {
    console.log(userData);
    this.store.dispatch(UserActions.setUser({ user: userData }));
    this.dialogRef.close();
  }
}
