import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { OrderService } from '../../order/order.service';
import { MessageService } from '../message/message/message.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ViewOrderGuard implements CanActivate  {

  constructor(
    private orderService:OrderService,
    private messageService:MessageService
  ) {}

  canActivate() : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if(this.orderService.order.length > 0) {
      return true;
    }

    const error = {error: 'There are no items in your order.', status:500};
      
    this.messageService.sendErrorMessage(new HttpErrorResponse(error));
  }
}
