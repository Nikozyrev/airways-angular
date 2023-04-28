import { Component, Input } from '@angular/core';
import { ISelectOption } from '../../models/select-option.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-citizenship-input',
  templateUrl: './citizenship-input.component.html',
  styleUrls: ['./citizenship-input.component.scss'],
})
export class CitizenshipInputComponent {
  @Input()
  public control = new FormControl();

  @Input()
  public citizenshipOptions: ISelectOption[] = [
    { value: 'Belarus', viewValue: 'Republic of Belarus' },
    { value: 'Russia', viewValue: 'Russian Federation' },
  ];

  public getErrorMessage() {
    if (this.control.hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }
}
