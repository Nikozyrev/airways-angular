import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ISelectOption } from '../../models/select-option.model';
import { countryCodes } from '../../../common/code.constants';

@Component({
  selector: 'app-phone-number-input',
  templateUrl: './phone-number-input.component.html',
  styleUrls: ['./phone-number-input.component.scss'],
})
export class PhoneNumberInputComponent {
  @Input()
  public group = new FormGroup({
    countryCode: new FormControl(),
    phoneNumber: new FormControl(),
  });

  @Input()
  public countryCodes: ISelectOption[] = countryCodes.map((code) => ({
    value: code.dial_code,
    viewValue: `${code.name} (${code.dial_code})`,
  }));

  public getErrorMessage() {
    if (this.group.controls.phoneNumber.hasError('required')) {
      return 'You must enter a value';
    }

    if (this.group.controls.phoneNumber.hasError('pattern')) {
      return 'Invalid character';
    }

    if (this.group.controls.phoneNumber.hasError('minlength')) {
      return 'Min length is 9 digits';
    }

    if (this.group.controls.phoneNumber.hasError('maxlength')) {
      return 'Max length is 9 digits';
    }

    return '';
  }
}
