import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SaladCustomizerService {
  private toppingsUrl = '/api/toppings?kind=salad';

  constructor(
    private httpClient:HttpClient
  ) { }

  public getToppings() {
    return this.httpClient.get(this.toppingsUrl).pipe(
      tap(toppings =>  {
        console.log('toppings', toppings)
      })
    )
  }
}
