import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingSummaryPageComponent } from './pages/booking-summary-page/booking-summary-page.component';

const routes: Routes = [{ path: '', component: BookingSummaryPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingSummaryRoutingModule {}
