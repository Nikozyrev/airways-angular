import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-gender-select',
  templateUrl: './gender-select.component.html',
  styleUrls: ['./gender-select.component.scss'],
})
export class GenderSelectComponent {
  @Input()
  public control = new FormControl();
}
