import { selectTicket } from './../../../flight-search/store/selectors/tiket.selector';
import { TicketStateInterface } from './../../../flight-search/store/tiket.state.model';
import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { ITicketResponse } from '../../../flight-selection/models/ticket.model';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-fare',
  templateUrl: './fare.component.html',
  styleUrls: ['./fare.component.scss'],
})
export class FareComponent implements OnInit {
  @Input() flight!: ITicketResponse;

  ticket$!: Observable<TicketStateInterface>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.ticket$ = this.store.select(selectTicket);
  }
}
