import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products;
  private menuUrl = '/api/menu?menuItem=';

  constructor(
    private httpClient:HttpClient
  ) { }

  public getProductByType(type) {
    return this.httpClient.get(`${this.menuUrl}${type}`).pipe(
      tap(products =>{
        console.log('products', products)
        this.products = products;
      })
    )
  }

  public getProduct(productId) {
    let product = this.products.find(product => product._id == productId);
    return of(product);
  }
}
