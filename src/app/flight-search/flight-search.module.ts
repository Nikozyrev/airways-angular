import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlightSearchRoutingModule } from './flight-search-routing.module';
import { FlightSearchComponent } from './components/flight-search/flight-search.component';
import { FlightSearchPageComponent } from './pages/flight-search-page/flight-search-page.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers/tiket.reducer';

@NgModule({
  declarations: [FlightSearchComponent, FlightSearchPageComponent],
  imports: [
    CommonModule,
    FlightSearchRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    StoreModule.forFeature('TicketInfo', reducers),
  ],
})
export class FlightSearchModule {}
