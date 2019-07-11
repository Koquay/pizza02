import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListOrderService {
  private orderUrl = '/api/order/';
  private orders;

  constructor(
    private httpClient:HttpClient
  ) { }

  public getOrders() {
    return this.httpClient.get(this.orderUrl).pipe(
      tap(orders => {
        console.log('list orders', orders)
        this.orders = orders;
      })
    )
  }

  public getOrderById(id) {
    let order = this.orders.find(order => order._id == id);
    return of(order);
  }

  public setOrderStatus(id, completed) {    
    let url = `${this.orderUrl}${id}/${completed}`;
    console.log('url', url);
    return this.httpClient.post(url, {}).pipe(
      tap(order => {
        console.log('updated order', order);
      })
    )
  }
}