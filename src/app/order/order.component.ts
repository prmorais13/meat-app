import { Component, OnInit } from '@angular/core';
import { RadioOptionModel } from 'app/shared/radio/radio-option-model';

import { OrderService } from './order.service';

import { CarItemModel } from 'app/restaurant-detail/shopping-car/car-item-model';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {
  paymentOptions: RadioOptionModel[] = [
    { label: 'Dinheiro', value: 'MON' },
    { label: 'Cartão de Débito', value: 'DEB' },
    { label: 'Cartão de Crédito', value: 'CRED' },
    { label: 'Cartão Refeição', value: 'REF' }
  ];

  constructor(private orderService: OrderService) {}

  ngOnInit() {}

  carItems(): CarItemModel[] {
    return this.orderService.carItems();
  }

  increaseQty(item: CarItemModel) {
    this.orderService.increaseQty(item);
  }

  decreaseQty(item: CarItemModel) {
    this.orderService.decreaseQty(item);
  }

  remove(item: CarItemModel) {
    this.orderService.remove(item);
  }
}
