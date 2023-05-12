import { HeaderStateInterface } from './../../../header/store/header-state.model';
import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { ITicketResponse } from '../../../flight-selection/models/ticket.model';
import { Store } from '@ngrx/store';
import { selectFeature } from '../../../header/store/selectors/header-selector';

interface Itopping {
  type: string;
  amount: number;
}

@Component({
  selector: 'app-fare-passenger',
  templateUrl: './fare-passenger.component.html',
  styleUrls: ['./fare-passenger.component.scss'],
})
export class FarePassengerComponent implements OnInit {
  @Input() flight!: ITicketResponse;

  @Input() person!: Itopping;

  global$!: Observable<HeaderStateInterface>;

  current!: number;

  constructor(private store: Store) {}

  addCurrency(obj: ITicketResponse, value: string) {
    return (
      obj.price[value as keyof typeof obj.price] *
      this.current *
      this.person.amount
    );
  }

  ngOnInit(): void {
    this.global$ = this.store.select(selectFeature);

    if (this.person.type === 'Adult') this.current = 1;
    if (this.person.type === 'Child') this.current = 0.75;
    if (this.person.type === 'Infant') this.current = 0.4;
  }
}
