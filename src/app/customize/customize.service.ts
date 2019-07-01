import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomizeService {
  private toppingsUrl = '/api/toppings';

  constructor(
    private httpClient:HttpClient
  ) { }

  public getToppings() {
    return this.httpClient.get(this.toppingsUrl).pipe(
      tap(toppings => console.log('toppings', toppings))
    )
  }
}
