import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductCustomizerService {
  private toppingsUrl = '/api/toppings?kind=';
  private toppings;

  constructor(
    private httpClient:HttpClient
  ) { }

  public getToppings(productType) {
    return this.httpClient.get(`${this.toppingsUrl}${productType}`).pipe(
      tap(toppings => {
        console.log('toppings', toppings)
      })
    )
  }
}
