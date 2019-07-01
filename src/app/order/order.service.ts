import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private order = [];

  constructor() { }

  public addToOrder(item) {
    console.log('add item', item)
    this.order.push(item);
    console.log('order', this.order)
    return of();
  }

  public getOrder() {
    return of(this.order);
  }

  public addCustomizedPizza(pizza) {
    console.log('pizza', pizza)

    return of();
  }
}
