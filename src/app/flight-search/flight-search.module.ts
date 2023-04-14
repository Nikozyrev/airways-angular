import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlightSearchRoutingModule } from './flight-search-routing.module';
import { FlightSearchComponent } from './components/flight-search/flight-search.component';
import { FlightSearchPageComponent } from './pages/flight-search-page/flight-search-page.component';

@NgModule({
  declarations: [FlightSearchComponent, FlightSearchPageComponent],
  imports: [CommonModule, FlightSearchRoutingModule],
})
export class FlightSearchModule {}
