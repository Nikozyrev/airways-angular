import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app/header/store/header-state.model';
import { selectDate } from '../../../app/header/store/selectors/header-selector';

@Injectable()
export class AppDateAdapter extends NativeDateAdapter {
  constructor(private store: Store<AppState>) {
    super('en-US');
  }

  private _to2digit(n: number): string {
    return ('00' + n).slice(-2);
  }

  override format(date: Date, displayFormat: string): string {
    if (displayFormat === 'input') {
      const date$ = this.store.select(selectDate);
      let dateFormat = '';
      date$.subscribe((value: string) => {
        switch (value) {
          case 'MM/DD/YYYY':
            dateFormat = `${this._to2digit(
              date.getMonth() + 1
            )}/${this._to2digit(date.getDate())}/${date.getFullYear()}`;
            break;
          case 'DD/MM/YYYY':
            dateFormat = `${this._to2digit(date.getDate())}/${this._to2digit(
              date.getMonth() + 1
            )}/${date.getFullYear()}`;
            break;
          case 'YYYY/DD/MM':
            dateFormat = `${date.getFullYear()}/${this._to2digit(
              date.getDate()
            )}/${this._to2digit(date.getMonth() + 1)}`;
            break;
          case 'YYYY/MM/DD':
            dateFormat = `${date.getFullYear()}/${this._to2digit(
              date.getMonth() + 1
            )}/${this._to2digit(date.getDate())}`;
            break;
        }
      });
      return dateFormat;
    } else if (displayFormat === 'inputMonth') {
      return `${this._to2digit(date.getMonth() + 1)}/${date.getFullYear()}`;
    } else {
      return date.toDateString();
    }
  }
}

export const APP_DATE_FORMATS = {
  parse: {
    dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
  },
  display: {
    dateInput: 'input',
    monthYearLabel: 'inputMonth',
    dateAllyLabel: { year: 'numeric', month: 'long', date: 'numeric' },
    monthYearAllyLabel: { year: 'numeric', month: 'long' },
  },
};
