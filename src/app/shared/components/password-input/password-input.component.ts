import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordInputComponent {
  @Input()
  public control = new FormControl();

  public hidePassword = true;

  public getErrorMessage() {
    if (this.control.hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }
}
