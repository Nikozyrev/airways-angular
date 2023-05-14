import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs';
import { selectAreTicketsChosen } from '../store/selectors/chosen-tickets.selectors';

export const chosenTicketsGuard: CanActivateFn = () => {
  const router = inject(Router);
  const store = inject(Store);
  const areTicketsChosen$ = store.select(selectAreTicketsChosen);
  return areTicketsChosen$.pipe(
    take(1),
    map((areTicketsChosen) =>
      areTicketsChosen ? true : router.parseUrl('/flights')
    )
  );
};
