import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';

import { OrderService } from './order.service';

import { RadioOptionModel } from '../shared/radio/radio-option-model';
import { CarItemModel } from '../restaurant-detail/shopping-car/car-item-model';
import { OrderModel, OrderItem } from './order-model';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {
  orderForm: FormGroup;

  delivery: number = 8;

  paymentOptions: RadioOptionModel[] = [
    { label: 'Dinheiro', value: 'MON' },
    { label: 'Cartão de Débito', value: 'DEB' },
    { label: 'Cartão de Crédito', value: 'CRED' },
    { label: 'Cartão Refeição', value: 'REF' }
  ];

  constructor(
    private orderService: OrderService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.orderForm = this.fb.group(
      {
        name: this.fb.control('', [
          Validators.required,
          Validators.minLength(5)
        ]),
        email: this.fb.control('', [Validators.required, Validators.email]),
        emailConfirmation: this.fb.control('', [
          Validators.required,
          Validators.email
        ]),
        address: this.fb.control('', [
          Validators.required,
          Validators.minLength(5)
        ]),
        number: this.fb.control('', [
          Validators.required,
          Validators.pattern('^[0-9]*$')
        ]),
        optionalAddress: this.fb.control(''),
        paymentOption: this.fb.control('', [Validators.required])
      },
      { validators: OrderComponent.equalsTo }
    );
  }

  static equalsTo(group: AbstractControl): { [key: string]: boolean } {
    const email = group.get('email');
    const emailConfirmation = group.get('emailConfirmation');

    if (!email || !emailConfirmation) {
      return undefined;
    }

    if (email.value !== emailConfirmation.value) {
      return { emailIsNotMatch: true };
    }

    return undefined;
  }

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
