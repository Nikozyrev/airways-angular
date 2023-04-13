import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingDetailsPageComponent } from './pages/booking-details-page/booking-details-page.component';

const routes: Routes = [{ path: '', component: BookingDetailsPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingDetailsRoutingModule {}
