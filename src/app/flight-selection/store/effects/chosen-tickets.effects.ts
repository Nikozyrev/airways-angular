import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, of } from 'rxjs';
import * as TicketInfoActions from '../../../flight-search/store/actions/tiket.action';
import * as ChosenTicketsActions from '../actions/chosen-tickets.actions';

@Injectable()
export class ChosenTicketsEffects {
  resetChosenTickets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TicketInfoActions.setTicketInfoSuccess),
      mergeMap(() => of(ChosenTicketsActions.clearTickets()))
    );
  });

  constructor(private actions$: Actions) {}
}
