import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { GenderSelectComponent } from './components/gender-select/gender-select.component';
import { ReactiveFormsModule } from '@angular/forms';

const materialModules = [
  MatButtonModule,
  MatSelectModule,
  MatInputModule,
  MatMenuModule,
  MatIconModule,
  MatDialogModule,
  MatTabsModule,
  MatCardModule,
  MatFormFieldModule,
  MatButtonToggleModule,
];

@NgModule({
  declarations: [GenderSelectComponent],
  imports: [CommonModule, ReactiveFormsModule, ...materialModules],
  exports: [...materialModules, GenderSelectComponent],
})
export class SharedModule {}
