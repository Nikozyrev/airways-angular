import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/main/header.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HeaderFormComponent } from './components/select/form.components';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers/header-reducer';

@NgModule({
  declarations: [HeaderComponent, HeaderFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule,
    StoreModule.forFeature('globalSettings', reducers),
  ],
  exports: [HeaderComponent],
})
export class HeaderModule {}
