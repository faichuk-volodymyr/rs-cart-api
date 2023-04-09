import { Injectable } from '@nestjs/common';
import { Order } from '../models';
import { runOrderTransaction } from 'src/utils/runOrderTransaction';

@Injectable()
export class OrderService {
  private orders: Record<string, Order> = {}

  findById(orderId: string): Order {
    return this.orders[ orderId ];
  }

  async create(order: Order) {
    await runOrderTransaction(order)

    return {
      success: true,
      order,
    };
  }

  update(orderId, data) {
    const order = this.findById(orderId);

    if (!order) {
      throw new Error('Order does not exist.');
    }

    this.orders[ orderId ] = {
      ...data,
      id: orderId,
    }
  }
}
