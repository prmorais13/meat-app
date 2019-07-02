import { Injectable } from '@angular/core';

import { ShoppingCarService } from '../restaurant-detail/shopping-car/shopping-car.service';

import { CarItemModel } from '../restaurant-detail/shopping-car/car-item-model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private carService: ShoppingCarService) {}

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
}
