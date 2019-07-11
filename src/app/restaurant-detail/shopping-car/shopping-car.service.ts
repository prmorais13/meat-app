import { Injectable } from '@angular/core';

import { NotificationService } from 'app/shared/messages/notification.service';

import { CarItemModel } from './car-item-model';
import { MenuItemModel } from './../menu-item/menu-item-model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCarService {
  items: CarItemModel[] = new Array();

  constructor(private notificationService: NotificationService) {}

  clear() {
    this.items = [];
  }

  addItem(item: MenuItemModel) {
    let foundItem = this.items.find(mItem => mItem.menuItem.id === item.id);

    if (foundItem) {
      // foundItem.quantity++;
      this.increaseQty(foundItem);
    } else {
      this.items.push(new CarItemModel(item));
    }
    this.notificationService.notify(`Você adicionou o item ${item.name}`);
  }

  increaseQty(item: CarItemModel) {
    item.quantity++;
  }

  removeItem(item: CarItemModel) {
    this.items.splice(this.items.indexOf(item), 1);
    this.notificationService.notify(
      `Você removeu o item ${item.menuItem.name}`
    );
  }

  decreaseQty(item: CarItemModel) {
    item.quantity--;
    if (item.quantity === 0) {
      this.removeItem(item);
    }
  }

  total(): number {
    return this.items
      .map(item => item.value())
      .reduce((prev, value) => prev + value, 0);
  }
}
