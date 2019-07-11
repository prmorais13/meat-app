import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  FormControl
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
  orderId: string;

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
    this.createForm();
    // this.orderForm = this.fb.group(
    //   {
    //     name: new FormControl('', {
    //       validators: [Validators.required, Validators.minLength(5)],
    //       updateOn: 'blur'
    //     }),
    //     email: this.fb.control('', [Validators.required, Validators.email]),
    //     emailConfirmation: this.fb.control('', [
    //       Validators.required,
    //       Validators.email
    //     ]),
    //     address: this.fb.control('', [
    //       Validators.required,
    //       Validators.minLength(5)
    //     ]),
    //     number: this.fb.control('', [
    //       Validators.required,
    //       Validators.pattern('^[0-9]*$')
    //     ]),
    //     optionalAddress: this.fb.control(''),
    //     paymentOption: this.fb.control('', [Validators.required])
    //   },
    //   { validators: OrderComponent.equalsTo }
    // );
  }

  createForm() {
    this.orderForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(5)]],
        email: ['', [Validators.required, Validators.email]],
        emailConfirmation: ['', [Validators.required, Validators.email]],
        address: ['', [Validators.required, Validators.minLength(5)]],
        number: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
        optionalAddress: [''],
        paymentOption: ['', [Validators.required]]
      },
      { validators: [OrderComponent.equalsTo], updateOn: 'blur' }
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
      order => {
        this.router.navigate(['/order-summary']);
        this.orderId = order.id;
        this.orderService.clear();
      },
      error => console.error('Erro ao salvar pedido!', error)
    );
  }

  isOrderCompleted(): boolean {
    return this.orderId !== undefined;
  }
}
