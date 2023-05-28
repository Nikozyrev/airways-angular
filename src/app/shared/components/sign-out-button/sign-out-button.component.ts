import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { logout } from '../../../auth/store/actions';

@Component({
  selector: 'app-sign-out-button',
  templateUrl: './sign-out-button.component.html',
  styleUrls: ['./sign-out-button.component.scss'],
})
export class SignOutButtonComponent {
  constructor(private store: Store) {}

  public signOut() {
    this.store.dispatch(logout());
  }
}
