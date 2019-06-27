import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RestaurantModel } from './restaurant/restaurant-model';
import { MenuItemModel } from '../restaurant-detail/menu-item/menu-item-model';

import { MEAT_API } from 'app/app-api';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {
  constructor(private http: HttpClient) {}

  restaurants(): Observable<RestaurantModel[]> {
    return this.http.get<RestaurantModel[]>(`${MEAT_API}/restaurants`);
  }

  restaurantById(id: string): Observable<RestaurantModel> {
    return this.http.get<RestaurantModel>(`${MEAT_API}/restaurants/${id}`);
  }

  reviewsOfRestaurant(id: string): Observable<any> {
    return this.http.get(`${MEAT_API}/restaurants/${id}/reviews`);
  }

  menuOfRestaurant(id: string): Observable<MenuItemModel[]> {
    return this.http.get<MenuItemModel[]>(`${MEAT_API}/restaurants/${id}/menu`);
  }
}
