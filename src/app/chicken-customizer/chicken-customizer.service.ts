import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChickenCustomizerService {
  private menuUrl = '/api/toppings?kind=sauce';
  private sauces;
  
  constructor(
    private httpClient:HttpClient
  ) { }

  public getSauces() {
    return this.httpClient.get(this.menuUrl).pipe(
      tap(sauces => {
        this.sauces = sauces;
        console.log('sauces', this.sauces);
      })
    )
  }

  
}
