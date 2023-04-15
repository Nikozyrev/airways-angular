import { Component, Input, OnInit } from '@angular/core';
import { FormsArray } from '../models/header.models';

@Component({
  selector: 'app-header-from',
  templateUrl: './header-form.component.html',
})
export class HeaderFormComponent implements OnInit {
  selectedValue!: string;

  @Input() arrayFrom!: FormsArray[];

  ngOnInit(): void {
    this.selectedValue = this.arrayFrom[0].value;
  }
}
