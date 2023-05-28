import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-single-date-input',
  templateUrl: './single-date-input.component.html',
  styleUrls: ['./single-date-input.component.scss'],
})
export class SingleDateInputComponent {
  @Input()
  public control = new FormControl();

  @Input()
  public label = 'Enter date';

  public getErrorMessage() {
    if (this.control.hasError('required')) {
      return 'You must enter a value';
    }

    if (this.control.hasError('futureDate')) {
      return this.control.errors?.['futureDate'].message;
    }

    return '';
  }
}
