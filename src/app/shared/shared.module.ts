import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { DataPersonComponent } from './components/data-person/data-person.component';

import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

const materialModules = [
  MatButtonModule,
  MatSelectModule,
  MatInputModule,
  MatMenuModule,
  MatIconModule,
  MatNativeDateModule,
  MatRippleModule,
  MatFormFieldModule,
  FormsModule,
  ReactiveFormsModule,
  MatTooltipModule,
  MatButtonToggleModule,
  MatDatepickerModule,
  MatSlideToggleModule,
];

@NgModule({
  declarations: [DataPersonComponent],
  imports: [CommonModule, ...materialModules],
  exports: [...materialModules, DataPersonComponent],
})
export class SharedModule {}
