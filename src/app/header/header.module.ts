import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './pages/header.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { HeaderFormComponent } from './components/form.components';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent, HeaderFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ],
  exports: [HeaderComponent],
})
export class HeaderModule {}
