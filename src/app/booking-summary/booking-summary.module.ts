import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingSummaryRoutingModule } from './booking-summary-routing.module';
import { BookingSummaryPageComponent } from './pages/booking-summary-page/booking-summary-page.component';
import { PassengerComponent } from './components/passenger/passenger.component';
import { TicketDetailsComponent } from './components/ticket-details/ticket-details.component';
import { FareComponent } from './components/fare/fare.component';
import { FarePassengerComponent } from './components/fare-passenger/fare-passenger.component';

@NgModule({
  declarations: [
    BookingSummaryPageComponent,
    PassengerComponent,
    TicketDetailsComponent,
    FareComponent,
    FarePassengerComponent,
  ],
  imports: [CommonModule, BookingSummaryRoutingModule, SharedModule],
})
export class BookingSummaryModule {}
