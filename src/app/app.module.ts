import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { AppRoutingModule } from './app-routing.module';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantComponent } from './restaurants/restaurant/restaurant.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { MenuComponent } from './restaurant-detail/menu/menu.component';
import { ShoppingCarComponent } from './restaurant-detail/shopping-car/shopping-car.component';
import { MenuItemComponent } from './restaurant-detail/menu-item/menu-item.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, HomeComponent, AboutComponent, RestaurantsComponent, RestaurantComponent, RestaurantDetailComponent, MenuComponent, ShoppingCarComponent, MenuItemComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
