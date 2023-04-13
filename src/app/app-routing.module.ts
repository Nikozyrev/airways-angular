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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
