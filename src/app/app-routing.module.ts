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
    path: 'details',
    loadChildren: () =>
      import('./booking-details/booking-details.module').then(
        (m) => m.BookingDetailsModule
      ),
  },
  {
    path: 'summary',
    loadChildren: () =>
      import('./booking-summary/booking-summary.module').then(
        (m) => m.BookingSummaryModule
      ),
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./shopping-cart/shopping-cart.module').then(
        (m) => m.ShoppingCartModule
      ),
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./user-account/user-account.module').then(
        (m) => m.UserAccountModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
