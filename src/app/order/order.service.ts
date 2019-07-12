import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Subject } from 'rxjs';
import { CustomizeService } from '../customize/customize.service';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { tap, catchError } from 'rxjs/operators';
import { Order, OrderItem, Topping } from '../shared/models/data-models';
import { MessageService } from '../shared/message/message/message.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public order = [];
  private basePizza;
  private editItem;
  private orderUrl = '/api/order';

  constructor(
    private customizeService: CustomizeService,
    private router: Router,
    private httpClient: HttpClient,
    private messageService:MessageService
  ) { }

  public addToOrder(item) {
    console.log('add item', item)
    this.removeEditedItem(item);
    this.addUniqueId(item);
    this.order.push(item);
    this.sortOrder();
    console.log('order', this.order)
    return of();
  }

  private sortOrder() {
    this.order = _.orderBy(this.order, ['itemCreatedAt'], ['asc']);
  }

  private removeEditedItem(editItem) {
    if (this.editItem) {
      if (this.editItem.uniqueId == editItem.uniqueId) {
        editItem.itemCreatedAt = this.editItem.itemCreatedAt;
        let index = this.order.findIndex(item => item.uniqueId == this.editItem.uniqueId);
        if (index >= 0) {
          this.order.splice(index, 1);
          console.log('delete unique id', this.order)
        }
      }
    }
  }

  public getOrder() {
    return of(this.order);
  }

  private addUniqueId(item) {
    item.uniqueId = Math.random();
  }

  public edit(item) {
    console.log('edit item', item)
    this.editItem = JSON.parse(JSON.stringify(item));
    this.router.navigate([this.editItem.customizer]);
    return of();
  }

  public getEditItem() {
    return of(this.editItem);
  }

  public placeOrder(order) {
    console.log('place order', order)

    let newOrder = this.createOrder(order);

    return this.httpClient.post(this.orderUrl, { order: newOrder }).pipe(
      tap(order => {
        console.log('new order', order);
      }),
      catchError(error => {
        this.messageService.sendErrorMessage(error);
        throw error;
      })
    )
  }

  private createOrder(order) {
    console.log('create order', order);

    let newOrder = new Order();
    let toppings = [];

    for (let item of order) {
      let orderItem = new OrderItem();

      orderItem.name = item.name;
      orderItem.item = item.item;
      orderItem.price = item.price;
      orderItem.quantity = item.quantity;
      orderItem.instruction = item.instruction;

      for (let xtopping of item.xtraToppings) {
        let topping = new Topping();
        topping.amount = xtopping.amount;
        topping.double = xtopping.double;
        topping.kind = xtopping.kind;
        topping.location = xtopping.location;
        topping.name = xtopping.name;
        topping.price = xtopping.price;
        topping.title = xtopping.title;

        orderItem.toppings.push(topping);
      }

      console.log('orderItem', orderItem)

      newOrder.orderItems.push(orderItem);
    }

    newOrder.delivery = order.delivery;

    console.log('Created Order', newOrder)
    return JSON.stringify(newOrder);
  }
}