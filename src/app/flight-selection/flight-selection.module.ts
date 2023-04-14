import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlightSelectionRoutingModule } from './flight-selection-routing.module';
import { FlightSelectionPageComponent } from './pages/flight-selection-page/flight-selection-page.component';

@NgModule({
  declarations: [FlightSelectionPageComponent],
  imports: [CommonModule, FlightSelectionRoutingModule],
})
export class FlightSelectionModule {}
