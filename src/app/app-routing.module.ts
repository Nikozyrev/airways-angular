import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from './common/routes.constants';

const routes: Routes = [
  {
    path: AppRoutes.main,
    loadChildren: () =>
      import('./flight-search/flight-search.module').then(
        (m) => m.FlightSearchModule
      ),
  },
  {
    path: AppRoutes.flights,
    loadChildren: () =>
      import('./flight-selection/flight-selection.module').then(
        (m) => m.FlightSelectionModule
      ),
  },
  {
    path: AppRoutes.details,
    loadChildren: () =>
      import('./booking-details/booking-details.module').then(
        (m) => m.BookingDetailsModule
      ),
  },
  {
    path: AppRoutes.summary,
    loadChildren: () =>
      import('./booking-summary/booking-summary.module').then(
        (m) => m.BookingSummaryModule
      ),
  },
  {
    path: AppRoutes.cart,
    loadChildren: () =>
      import('./shopping-cart/shopping-cart.module').then(
        (m) => m.ShoppingCartModule
      ),
  },
  {
    path: AppRoutes.account,
    loadChildren: () =>
      import('./user-account/user-account.module').then(
        (m) => m.UserAccountModule
      ),
  },
  {
    path: '**',
    redirectTo: AppRoutes.main,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
