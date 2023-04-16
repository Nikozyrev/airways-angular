import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './pages/header.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HeaderFormComponent } from './components/form.components';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { reducers } from './redux/reducers/header-reducer';

@NgModule({
  declarations: [HeaderComponent, HeaderFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule,
    StoreModule.forFeature('header', reducers),
  ],
  exports: [HeaderComponent],
})
export class HeaderModule {}
