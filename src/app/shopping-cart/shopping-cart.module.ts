import { NgModule } from '@angular/core';

import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { ShoppingCartPageComponent } from './pages/shopping-cart-page/shopping-cart-page.component';
import { ShoppingCartComponent } from './component/shopping-cart/shopping-cart.component';
import { StoreModule } from '@ngrx/store';
import { shoppingCartReducers } from './store/reducers/cart-reducer';
import { CartItemComponent } from './component/cart-item/cart-item.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DateRangePipe } from './pipe/dates.pipe';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    ShoppingCartPageComponent,
    ShoppingCartComponent,
    CartItemComponent,
    DateRangePipe,
  ],
  imports: [
    SharedModule,
    ShoppingCartRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature('shoppingCart', shoppingCartReducers),
  ],
  providers: [DatePipe],
})
export class ShoppingCartModule {}
