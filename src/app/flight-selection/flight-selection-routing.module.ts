import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightSelectionPageComponent } from './pages/flight-selection-page/flight-selection-page.component';

const routes: Routes = [{ path: '', component: FlightSelectionPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FlightSelectionRoutingModule {}
