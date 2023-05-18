import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { take, tap } from 'rxjs';
import { selectIsLogged } from '../store/selectors';
import { AlertService } from '../../core/services/alert.service';
import { AuthModalService } from '../services/auth-modal.service';

export const authGuard: CanActivateFn = () => {
  const alertService = inject(AlertService);
  const authModalService = inject(AuthModalService);
  const store = inject(Store);
  const isLogged$ = store.select(selectIsLogged);

  return isLogged$.pipe(
    take(1),
    tap((isLogged) => {
      if (!isLogged) {
        alertService.showAlert('Please log in');
        authModalService.openDialog();
      }
    })
  );
};
