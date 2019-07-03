class OrderModel {
  public id: string;
  public address: string;
  public number: number;
  optionalAddress: string;
  paymentOption: string;
  public orderItems: OrderItem[] = [];
}

class OrderItem {
  constructor(public quantity: number, public menuId: string) {}
}

export { OrderModel, OrderItem };
