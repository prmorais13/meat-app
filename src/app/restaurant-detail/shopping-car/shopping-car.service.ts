import { Injectable } from '@angular/core';

import { CarItemModel } from './car-item-model';
import { MenuItemModel } from './../menu-item/menu-item-model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCarService {
  items: CarItemModel[] = new Array();

  constructor() {}

  clear() {
    this.items = [];
  }

  addItem(item: MenuItemModel) {
    let foundItem = this.items.find(mItem => mItem.menuItem.id === item.id);

    if (foundItem) {
      foundItem.quantity++;
    } else {
      this.items.push(new CarItemModel(item));
    }
  }

  removeItem(item: CarItemModel) {
    this.items.splice(this.items.indexOf(item), 1);
  }

  total(): number {
    return this.items
      .map(item => item.value())
      .reduce((prev, value) => prev + value, 0);
  }
}
