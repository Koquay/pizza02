import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { MessageService } from '../shared/message/message/message.service';

@Injectable({
  providedIn: 'root'
})
export class CustomizeService {
  private toppingsUrl = '/api/toppings?kind=pizza';

  constructor(
    private httpClient:HttpClient,
    private messageService:MessageService
  ) { }

  public getToppings() {
    return this.httpClient.get(this.toppingsUrl).pipe(
      tap(toppings => console.log('toppings', toppings)),
      catchError(error => {        
        this.messageService.sendErrorMessage(error);
        throw error;
      })
    )
  }
}
