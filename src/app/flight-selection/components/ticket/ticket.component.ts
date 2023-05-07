import { Component, Input, OnInit } from '@angular/core';
import { IViewDate } from '../../models/ticket.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCurrency } from '../../../header/store/selectors/header-selector';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent implements OnInit {
  @Input()
  public selectedDate!: IViewDate;

  public currencyCode$!: Observable<string>;

  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.currencyCode$ = this.store.select(selectCurrency);
  }
}
