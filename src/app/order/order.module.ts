import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';

import { SharedModule } from 'app/shared/shared.module';
import { OrderRoutingModule } from './order-routing.module';

import { OrderComponent } from './order.component';
import { OrderItemsComponent } from './order-items/order-items.component';
import { DeliveryCostsComponent } from './delivery-costs/delivery-costs.component';

@NgModule({
  declarations: [OrderComponent, OrderItemsComponent, DeliveryCostsComponent],
  imports: [
    //CommonModule,
    SharedModule,
    OrderRoutingModule
  ]
})
export class OrderModule {}
