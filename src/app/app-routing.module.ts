import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./flight-search/flight-search.module').then(
        (m) => m.FlightSearchModule
      ),
  },
  {
    path: 'flights',
    loadChildren: () =>
      import('./flight-selection/flight-selection.module').then(
        (m) => m.FlightSelectionModule
      ),
  },
  {
    path: 'booking-details',
    loadChildren: () =>
      import('./booking-details/booking-details.module').then(
        (m) => m.BookingDetailsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
