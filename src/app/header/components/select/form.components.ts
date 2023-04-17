import { Component, Input, OnInit } from '@angular/core';
import { FormsArray } from '../../models/header.models';
import { Store } from '@ngrx/store';
import {
  getCurrencySuccess,
  getDateSuccess,
} from '../../store/actions/header-action';

@Component({
  selector: 'app-header-from',
  templateUrl: './header-form.component.html',
})
export class HeaderFormComponent implements OnInit {
  selectedValue!: string;

  @Input() arrayFrom!: FormsArray[];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.selectedValue = this.arrayFrom[0].value;
  }

  select() {
    if (this.selectedValue.includes('/')) {
      this.store.dispatch(getDateSuccess({ date: this.selectedValue }));
    } else {
      this.store.dispatch(getCurrencySuccess({ currency: this.selectedValue }));
    }
  }
}
