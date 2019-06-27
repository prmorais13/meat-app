import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RestaurantModel } from './restaurant/restaurant-model';

import { MEAT_API } from 'app/app-api';
import { Observable } from 'rxjs';

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
}
