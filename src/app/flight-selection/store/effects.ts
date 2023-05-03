import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as TicketsActions from './actions';
import { TicketsService } from '../services/tickets.service';
import { selectSearchParams } from '../../flight-search/store/selectors/tiket.selector';

@Injectable()
export class TicketsEffects {
  fetchTickets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TicketsActions.fetchTickets),
      concatLatestFrom(() => this.store.select(selectSearchParams)),
      mergeMap(([, params]) => {
        if (params.tripType === 'Round Trip') {
          return this.ticketsService.getTwoWayTickets(params).pipe(
            map((res) => TicketsActions.fetchTicketsSuccess({ ...res })),
            catchError((error) => this.handleError(error))
          );
        }
        // const arrivalDate = new Date(
        //   Date.parse(params.departure_gte) + 3600
        // ).toISOString();
        // console.log(arrivalDate);

        return this.ticketsService
          .getTickets({ ...params, departure_lte: '' })
          .pipe(
            map((res) =>
              TicketsActions.fetchTicketsSuccess({
                destinationTickets: res,
              })
            ),
            catchError((error) => this.handleError(error))
          );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private store: Store,
    private ticketsService: TicketsService
  ) {}

  private handleError(error: HttpErrorResponse) {
    const err = error.status === 0 ? `Server is unavailable` : error.error;
    return of(TicketsActions.fetchTicketsError({ error: err }));
  }
}
