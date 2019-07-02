import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CarItemModel } from 'app/restaurant-detail/shopping-car/car-item-model';

@Component({
  selector: 'mt-order-items',
  templateUrl: './order-items.component.html'
})
export class OrderItemsComponent implements OnInit {
  @Input() items: CarItemModel[];

  @Output() increaseQty = new EventEmitter<CarItemModel>();
  @Output() decreaseQty = new EventEmitter<CarItemModel>();
  @Output() remove = new EventEmitter<CarItemModel>();

  constructor() {}

  ngOnInit() {}

  emitIncreaseQty(item: CarItemModel) {
    this.increaseQty.emit(item);
  }

  emitDecreaseQty(item: CarItemModel) {
    this.decreaseQty.emit(item);
  }

  emitRemove(item: CarItemModel) {
    this.remove.emit(item);
  }
}
