import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import * as AuthActions from './actions';
import { AuthModalService } from '../services/auth-modal.service';
import { AlertService } from '../../core/services/alert.service';
import { IUser } from '../models/user.model';

@Injectable()
export class AuthEffects {
  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signUp),
      mergeMap(({ userData }) =>
        this.authService.signUp(userData).pipe(
          map(({ user }) => this.handleSuccessAuth(user)),
          catchError((error) => this.handleError(error))
        )
      )
    );
  });

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ userData }) =>
        this.authService.login(userData).pipe(
          map(({ user }) => this.handleSuccessAuth(user)),
          catchError((error) => this.handleError(error))
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private authModalService: AuthModalService,
    private alertService: AlertService
  ) {}

  private handleSuccessAuth(user: IUser) {
    this.alertService.showAlert('You have logged in');
    this.authModalService.closeDialog();
    return AuthActions.setUser({ user });
  }

  private handleError(error: HttpErrorResponse) {
    const err = error.status === 0 ? `Server is unavailable` : error.error;
    this.alertService.showAlert(err);
    return of(AuthActions.setError({ error: err }));
  }
}
