import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextInputComponent {
  @Input()
  public control = new FormControl();

  @Input()
  public label = 'Enter text';

  public getErrorMessage() {
    if (this.control.hasError('required')) {
      return 'You must enter a value';
    }

    if (this.control.hasError('pattern')) {
      return 'Invalid character';
    }

    return '';
  }
}
