import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-email-input',
  templateUrl: './email-input.component.html',
  styleUrls: ['./email-input.component.scss'],
})
export class EmailInputComponent {
  @Input()
  public control = new FormControl();

  public getErrorMessage() {
    if (this.control.hasError('required')) {
      return 'You must enter a value';
    }

    if (this.control.hasError('email')) {
      return 'Not a valid email';
    }

    return '';
  }
}
