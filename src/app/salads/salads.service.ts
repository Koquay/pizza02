import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaladsService {
  private menuUrl = '/api/menu?menuItem=salads';
  private salads;

  constructor(
    private httpClient:HttpClient
  ) { }

  public getSalads() {
    return this.httpClient.get(this.menuUrl).pipe(
      tap(salads => {
        console.log('salads', salads)
        this.salads = salads;
      })
    )
  }

  public getSaladById(id) {
    let salad = this.salads.find(salad => salad._id == id);
    return of(salad);
  }

}
