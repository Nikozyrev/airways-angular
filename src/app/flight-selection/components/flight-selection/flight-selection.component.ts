import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { fetchTickets } from '../../store/actions/tickets.actions';
import { selectTripType } from '../../../flight-search/store/selectors/tiket.selector';
import { selectAreTicketsChosen } from '../../store/selectors/chosen-tickets.selectors';
import * as ChosenTicketsActions from '../../store/actions/chosen-tickets.actions';

@Component({
  selector: 'app-flight-selection',
  templateUrl: './flight-selection.component.html',
  styleUrls: ['./flight-selection.component.scss'],
})
export class FlightSelectionComponent implements OnInit {
  public tripType$!: Observable<string>;

  public areTicketsChosen$!: Observable<boolean>;

  constructor(private store: Store) {}

  public handleMoveBack() {
    this.store.dispatch(ChosenTicketsActions.clearTickets());
  }

  public ngOnInit(): void {
    this.tripType$ = this.store.select(selectTripType);
    this.areTicketsChosen$ = this.store.select(selectAreTicketsChosen);
    this.store.dispatch(fetchTickets());
  }
}
