import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HeaderModule } from './header/header.module';
import { FooterModule } from './footer/footer.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from '@ngrx/store';
import { shoppingCartReducers } from './shopping-cart/store/reducers/cart-reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    HeaderModule,
    FooterModule,
    SharedModule,
    AuthModule,
    StoreModule.forFeature('shoppingCart', shoppingCartReducers),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
