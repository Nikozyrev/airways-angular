import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlightSelectionRoutingModule } from './flight-selection-routing.module';
import { FlightSelectionPageComponent } from './pages/flight-selection-page/flight-selection-page.component';
import { DateSelectCardComponent } from './components/date-select-card/date-select-card.component';
import { FlightDateSelectComponent } from './components/flight-date-select/flight-date-select.component';
import { FlightSeatsAvailabilityDirective } from './directives/flight-seats-availability.directive';

@NgModule({
  declarations: [
    FlightSelectionPageComponent,
    DateSelectCardComponent,
    FlightDateSelectComponent,
    FlightSeatsAvailabilityDirective,
  ],
  imports: [CommonModule, FlightSelectionRoutingModule],
})
export class FlightSelectionModule {}
