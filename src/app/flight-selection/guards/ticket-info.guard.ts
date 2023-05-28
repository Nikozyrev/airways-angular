import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs';
import { selectTripType } from '../../flight-search/store/selectors/tiket.selector';

export const ticketInfoGuard: CanActivateFn = () => {
  const router = inject(Router);
  const store = inject(Store);
  const tripType = store.select(selectTripType);

  return tripType.pipe(
    take(1),
    map((type) => (type ? true : router.parseUrl('/')))
  );
};
