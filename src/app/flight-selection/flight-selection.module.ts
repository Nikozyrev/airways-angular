import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightSelectionRoutingModule } from './flight-selection-routing.module';
import { FlightSelectionPageComponent } from './pages/flight-selection-page/flight-selection-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [FlightSelectionPageComponent],
  imports: [CommonModule, FlightSelectionRoutingModule, SharedModule],
})
export class FlightSelectionModule {}
