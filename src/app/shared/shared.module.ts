import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { GenderSelectComponent } from './components/gender-select/gender-select.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { DividerComponent } from './components/divider/divider.component';
import { PasswordInputComponent } from './components/password-input/password-input.component';
import { EmailInputComponent } from './components/email-input/email-input.component';
import { SingleDateInputComponent } from './components/single-date-input/single-date-input.component';
import { PhoneNumberInputComponent } from './components/phone-number-input/phone-number-input.component';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { APP_DATE_FORMATS, AppDateAdapter } from './adapter/date-adapter';
import { CitizenshipInputComponent } from './components/citizenship-input/citizenship-input.component';

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
  MatDatepickerModule,
  MatCheckboxModule,
];

@NgModule({
  declarations: [
    EmailInputComponent,
    PasswordInputComponent,
    TextInputComponent,
    GenderSelectComponent,
    DividerComponent,
    SingleDateInputComponent,
    PhoneNumberInputComponent,
    CitizenshipInputComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, ...materialModules],
  exports: [
    ...materialModules,
    EmailInputComponent,
    PasswordInputComponent,
    GenderSelectComponent,
    TextInputComponent,
    DividerComponent,
    SingleDateInputComponent,
    PhoneNumberInputComponent,
    CitizenshipInputComponent,
  ],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
  ],
})
export class SharedModule {}
