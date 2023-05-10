import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { FlightSelectionRoutingModule } from './flight-selection-routing.module';
import { FlightSelectionPageComponent } from './pages/flight-selection-page/flight-selection-page.component';
import { DateSelectCardComponent } from './components/date-select-card/date-select-card.component';
import { FlightDateSelectComponent } from './components/flight-date-select/flight-date-select.component';
import { FlightSeatsAvailabilityDirective } from './directives/flight-seats-availability.directive';
import { FlightSelectionComponent } from './components/flight-selection/flight-selection.component';
import { SharedModule } from '../shared/shared.module';
import { TicketSelectComponent } from './components/ticket-select/ticket-select.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { ticketsReducers } from './store/reducers/tickets.reducers';
import { TicketsEffects } from './store/effects/tickets.effects';

@NgModule({
  declarations: [
    FlightSelectionPageComponent,
    DateSelectCardComponent,
    FlightDateSelectComponent,
    FlightSelectionComponent,
    FlightSeatsAvailabilityDirective,
    TicketSelectComponent,
    TicketComponent,
  ],
  imports: [
    CommonModule,
    FlightSelectionRoutingModule,
    SharedModule,
    StoreModule.forFeature('tickets', ticketsReducers),
    EffectsModule.forFeature([TicketsEffects]),
  ],
})
export class FlightSelectionModule {}
