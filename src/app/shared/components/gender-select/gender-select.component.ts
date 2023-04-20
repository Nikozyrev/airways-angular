import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-gender-select',
  templateUrl: './gender-select.component.html',
  styleUrls: ['./gender-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenderSelectComponent {
  @Input()
  public control = new FormControl();
}
