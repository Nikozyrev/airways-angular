import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { debounceTime, mergeMap, of } from 'rxjs';
import * as TicketInfoActions from '../../../flight-search/store/actions/tiket.action';
import * as ChosenTicketsActions from '../actions/chosen-tickets.actions';

@Injectable()
export class ChosenTicketsEffects {
  resetChosenTickets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TicketInfoActions.setTicketInfoSuccess),
      debounceTime(300),
      mergeMap(() => of(ChosenTicketsActions.clearTickets()))
    );
  });

  updateTicketInfoDates$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ChosenTicketsActions.saveTicket),
      mergeMap((val) => of(TicketInfoActions.updateTicketDates(val)))
    );
  });

  constructor(private actions$: Actions) {}
}
