import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingDetailsRoutingModule } from './booking-details-routing.module';
import { BookingDetailsPageComponent } from './pages/booking-details-page/booking-details-page.component';

@NgModule({
  declarations: [BookingDetailsPageComponent],
  imports: [CommonModule, BookingDetailsRoutingModule],
})
export class BookingDetailsModule {}
