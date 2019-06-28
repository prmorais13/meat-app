import { Component, OnInit } from '@angular/core';
import { ShoppingCarService } from './shopping-car.service';

@Component({
  selector: 'mt-shopping-car',
  templateUrl: './shopping-car.component.html'
})
export class ShoppingCarComponent implements OnInit {
  constructor(private shoppingCarService: ShoppingCarService) {}

  ngOnInit() {}

  items(): any {
    return this.shoppingCarService.items;
  }

  clear() {
    this.shoppingCarService.clear();
  }

  removeItem(item: any) {
    this.shoppingCarService.removeItem(item);
  }

  addItem(item: any) {
    this.shoppingCarService.addItem(item);
  }

  total(): number {
    return this.shoppingCarService.total();
  }
}
