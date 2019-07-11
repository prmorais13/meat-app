import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MEAT_API } from 'app/app-api';

import { ShoppingCarService } from '../restaurant-detail/shopping-car/shopping-car.service';
import { LoginService } from 'app/security/login/login.service';

import { CarItemModel } from '../restaurant-detail/shopping-car/car-item-model';
import { OrderModel } from './order-model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(
    private carService: ShoppingCarService,
    private http: HttpClient // ,
  ) // private loginService: LoginService
  {}

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
    // let headers = new HttpHeaders();
    // if (this.loginService.isLoggedIn()) {
    //   headers = headers.set(
    //     'Authorization',
    //     `Bearer ${this.loginService.userLogado.accessToken}`
    //   );
    // }
    return this.http.post<OrderModel>(`${MEAT_API}/orders`, order);
    // return this.http.post<OrderModel>(`${MEAT_API}/orders`, order, { headers });
    //.pipe(map(order => order.id));
  }
}
