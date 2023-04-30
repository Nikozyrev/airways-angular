import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IUserLogIn, IUserSignUp } from '../../models/user.model';
import * as UserActions from '../../store/actions';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss'],
})
export class AuthDialogComponent {
  constructor(private store: Store) {}

  public onLogIn(userData: IUserLogIn) {
    this.store.dispatch(UserActions.login({ userData }));
  }

  public onSignUp(userData: IUserSignUp) {
    this.store.dispatch(UserActions.signUp({ userData }));
  }
}
