import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MEAT_API } from 'app/app-api';

import { ShoppingCarService } from '../restaurant-detail/shopping-car/shopping-car.service';

import { CarItemModel } from '../restaurant-detail/shopping-car/car-item-model';
import { OrderModel } from './order-model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(
    private carService: ShoppingCarService,
    private http: HttpClient
  ) {}

  itemsValue(): number {
    return this.carService.total();
  }

  carItems(): CarItemModel[] {
    return this.carService.items;
  }

  increaseQty(item: CarItemModel) {
    this.carService.increaseQty(item);
  }

  decreaseQty(item: CarItemModel) {
    this.carService.decreaseQty(item);
  }

  remove(item: CarItemModel) {
    this.carService.removeItem(item);
  }

  clear() {
    this.carService.clear();
  }

  checkOrder(order: OrderModel): Observable<OrderModel> {
    // const headers = new Headers();
    // headers.append('ContentType', 'application/json')
    return this.http.post<OrderModel>(`${MEAT_API}/orders`, order);
  }
}
