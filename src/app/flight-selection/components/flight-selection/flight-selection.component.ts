import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectTripType } from '../../../flight-search/store/selectors/tiket.selector';
import { fetchTickets } from '../../store/actions';

@Component({
  selector: 'app-flight-selection',
  templateUrl: './flight-selection.component.html',
  styleUrls: ['./flight-selection.component.scss'],
})
export class FlightSelectionComponent implements OnInit {
  public tripType$!: Observable<string>;

  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.tripType$ = this.store.select(selectTripType);
    this.store.dispatch(fetchTickets());
  }
}
