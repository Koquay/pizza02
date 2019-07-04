import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChickenService {
  private menuUrl = '/api/menu?menuItem=chicken';
  private allChicken;
  
  constructor(
    private httpClient:HttpClient
  ) { }

  public getChicken() {
    return this.httpClient.get(this.menuUrl).pipe(
      tap(chicken => {
        console.log('chicken', chicken);
        this.allChicken = chicken;
      })
    )    
  }

  public getChickenById(id) {
    return this.allChicken.find(chicken => chicken._id == id);    
  }
}
