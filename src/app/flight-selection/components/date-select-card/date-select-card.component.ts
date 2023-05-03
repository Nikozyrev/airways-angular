import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ITicket } from '../../models/ticket.model';
import { selectCurrency } from '../../../header/store/selectors/header-selector';

@Component({
  selector: 'app-date-select-card',
  templateUrl: './date-select-card.component.html',
  styleUrls: ['./date-select-card.component.scss'],
})
export class DateSelectCardComponent implements OnInit {
  @Input()
  public ticketInfo!: ITicket;

  public currencyCode$!: Observable<string>;

  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.currencyCode$ = this.store.select(selectCurrency);
  }
}
