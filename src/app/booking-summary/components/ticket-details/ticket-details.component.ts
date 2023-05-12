import { selectPassengers } from './../../../booking-details/store/selectors/passengers.selector';
import { IPassengersState } from './../../../booking-details/store/passengers.state.model';
import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

interface ITicket {
  from: string;
  to: string;
  departure: string;
  arrival: string;
  price: {
    EUR: number;
    USA: number;
    RUB: number;
    PLN: number;
  };
  flightNum: number;
  seats: {
    total: number;
    available: number;
  };
}

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss'],
})
export class TicketDetailsComponent implements OnInit {
  @Input() round!: boolean;

  @Input() flight!: ITicket;

  passengers$!: Observable<IPassengersState>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.passengers$ = this.store.select(selectPassengers);
    console.log(this.flight);
  }
}
