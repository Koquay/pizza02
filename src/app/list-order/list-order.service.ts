import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { MessageService } from '../shared/message/message/message.service';

@Injectable({
  providedIn: 'root'
})
export class ListOrderService {
  private orderUrl = '/api/order/';
  private orders;

  constructor(
    private httpClient:HttpClient,
    private messageService:MessageService
  ) { }

  public getOrders() {
    return this.httpClient.get(this.orderUrl).pipe(
      tap(orders => {
        console.log('list orders', orders)
        this.orders = orders;
      }),
      catchError(error => {        
        this.messageService.sendErrorMessage(error);
        throw error;
      })
    )
  }

  public getOrderById(id) {
    let order = this.orders.find(order => order._id == id);
    return of(order);
  }

  public setOrderStatus(id, status) {    
    let url = `${this.orderUrl}${id}/${status}`;
    console.log('url', url);
    return this.httpClient.post(url, {}).pipe(
      tap(order => {
        console.log('updated order', order);
      }),
      catchError(error => {
        this.messageService.sendErrorMessage(error);
        throw error;
      })
    )
  }
}
