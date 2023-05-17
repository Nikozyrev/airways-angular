import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from './common/routes.constants';
import { ticketInfoGuard } from './flight-selection/guards/ticket-info.guard';
import { authGuard } from './auth/guards/auth.guard';
import { chosenTicketsGuard } from './flight-selection/guards/chosen-tickets.guard';

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
    canActivate: [ticketInfoGuard],
  },
  {
    path: AppRoutes.details,
    loadChildren: () =>
      import('./booking-details/booking-details.module').then(
        (m) => m.BookingDetailsModule
      ),
    canActivate: [chosenTicketsGuard, authGuard],
  },
  {
    path: AppRoutes.summary,
    loadChildren: () =>
      import('./booking-summary/booking-summary.module').then(
        (m) => m.BookingSummaryModule
      ),
    canActivate: [chosenTicketsGuard, authGuard],
  },
  {
    path: AppRoutes.cart,
    loadChildren: () =>
      import('./shopping-cart/shopping-cart.module').then(
        (m) => m.ShoppingCartModule
      ),
    canActivate: [authGuard],
  },
  {
    path: AppRoutes.account,
    loadChildren: () =>
      import('./user-account/user-account.module').then(
        (m) => m.UserAccountModule
      ),
    canActivate: [authGuard],
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
