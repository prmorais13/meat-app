import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { OrderService } from './order.service';

import { RadioOptionModel } from '../shared/radio/radio-option-model';
import { CarItemModel } from '../restaurant-detail/shopping-car/car-item-model';
import { OrderModel, OrderItem } from './order-model';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {
  delivery: number = 8;

  paymentOptions: RadioOptionModel[] = [
    { label: 'Dinheiro', value: 'MON' },
    { label: 'Cartão de Débito', value: 'DEB' },
    { label: 'Cartão de Crédito', value: 'CRED' },
    { label: 'Cartão Refeição', value: 'REF' }
  ];

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit() {}

  itemsValue(): number {
    return this.orderService.itemsValue();
  }

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

  checkOrder(order: OrderModel) {
    order.orderItems = this.carItems().map(
      (item: CarItemModel) => new OrderItem(item.quantity, item.menuItem.id)
    );
    this.orderService.checkOrder(order).subscribe(
      (order: OrderModel) => {
        this.router.navigate(['/order-summary']);
        // console.log(`Compra concluída: ${JSON.stringify(order.id)}`);
        this.orderService.clear();
      },
      error => console.error('Erro ao salvar pedido!', error)
    );
  }
}
