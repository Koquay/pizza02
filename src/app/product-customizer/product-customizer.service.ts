import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { MessageService } from '../shared/message/message/message.service';

@Injectable({
  providedIn: 'root'
})
export class ProductCustomizerService {
  private toppingsUrl = '/api/toppings?kind=';
  private toppings;

  constructor(
    private httpClient:HttpClient,
    private messageService:MessageService
  ) { }

  public getToppings(productType) {
    return this.httpClient.get(`${this.toppingsUrl}${productType}`).pipe(
      tap(toppings => {
        console.log('toppings', toppings)
      }),
      catchError(error => {        
        this.messageService.sendErrorMessage(error);
        throw error;
      })
    )
  }
}
