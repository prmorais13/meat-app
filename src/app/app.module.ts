import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {
  registerLocaleData,
  LocationStrategy,
  HashLocationStrategy
} from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Módulos
import { SharedModule } from './shared/shared.module';

// Componentes
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantComponent } from './restaurants/restaurant/restaurant.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { MenuComponent } from './restaurant-detail/menu/menu.component';
import { ShoppingCarComponent } from './restaurant-detail/shopping-car/shopping-car.component';
import { MenuItemComponent } from './restaurant-detail/menu-item/menu-item.component';
import { ReviewsComponent } from './restaurant-detail/reviews/reviews.component';

import localeBr from '@angular/common/locales/pt';
//import { OrderComponent } from './order/order.component';
//import { AboutComponent } from './about/about.component';
//import { InputComponent } from './shared/input/input.component';
//import { RadioComponent } from './shared/radio/radio.component';
//import { RatingComponent } from './shared/rating/rating.component';
//import { OrderItemsComponent } from './order/order-items/order-items.component';
//import { DeliveryCostsComponent } from './order/delivery-costs/delivery-costs.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './security/login/login.component';
import { UserDetailComponent } from './header/user-detail/user-detail.component';
import { ApplicationErrorHandle } from './error-handle';

registerLocaleData(localeBr);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    RestaurantsComponent,
    RestaurantComponent,
    RestaurantDetailComponent,
    MenuComponent,
    ShoppingCarComponent,
    MenuItemComponent,
    ReviewsComponent,
    //OrderComponent,
    //AboutComponent,
    //InputComponent,
    //RadioComponent,
    //RatingComponent,
    //OrderItemsComponent,
    //DeliveryCostsComponent,
    OrderSummaryComponent,
    NotFoundComponent,
    LoginComponent,
    UserDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    //FormsModule,
    //ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: ErrorHandler, useClass: ApplicationErrorHandle }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
