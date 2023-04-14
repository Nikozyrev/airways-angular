import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingSummaryRoutingModule } from './booking-summary-routing.module';
import { BookingSummaryPageComponent } from './pages/booking-summary-page/booking-summary-page.component';

@NgModule({
  declarations: [BookingSummaryPageComponent],
  imports: [CommonModule, BookingSummaryRoutingModule],
})
export class BookingSummaryModule {}
