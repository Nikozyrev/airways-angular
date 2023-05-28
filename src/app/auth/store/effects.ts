import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import * as AuthActions from './actions';
import { AuthModalService } from '../services/auth-modal.service';
import { AlertService } from '../../core/services/alert.service';
import { IAuthResponse } from '../models/user-server-data.model';

@Injectable()
export class AuthEffects {
  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signUp),
      mergeMap(({ userData }) =>
        this.authService.signUp(userData).pipe(
          map((res) => this.handleSuccessAuth(res)),
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
          map((res) => this.handleSuccessAuth(res)),
          catchError((error) => this.handleError(error))
        )
      )
    );
  });

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.logout),
      mergeMap(() => {
        this.authService.logout();
        this.router.navigate(['/']);
        return of(AuthActions.setUser({ user: null }));
      })
    );
  });

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private authModalService: AuthModalService,
    private alertService: AlertService,
    private router: Router
  ) {}

  private handleSuccessAuth(res: IAuthResponse) {
    this.authService.saveUser(res);
    this.alertService.showAlert('You have logged in');
    this.authModalService.closeDialog();
    return AuthActions.setUser({ user: res.user });
  }

  private handleError(error: HttpErrorResponse) {
    const err = error.status === 0 ? `Server is unavailable` : error.error;
    this.alertService.showAlert(err);
    return of(AuthActions.setError({ error: err }));
  }
}
