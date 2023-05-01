import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as TicketsActions from './actions';
import { ITicket } from '../models/ticket.model';
import { TicketsService } from '../services/tickets.service';

@Injectable()
export class TicketsEffects {
  fetchTickets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TicketsActions.fetchTickets),
      mergeMap(() =>
        this.ticketsService.getTickets().pipe(
          map((res) => this.handleSuccessAuth(res)),
          catchError((error) => this.handleError(error))
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private ticketsService: TicketsService
  ) {}

  private handleSuccessAuth(tickets: ITicket[]) {
    return TicketsActions.fetchTicketsSuccess({ tickets });
  }

  private handleError(error: HttpErrorResponse) {
    const err = error.status === 0 ? `Server is unavailable` : error.error;
    return of(TicketsActions.fetchTicketsError({ error: err }));
  }
}
