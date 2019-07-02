import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  private menuUrl = '/api/menu';
  private pizzas;

  constructor(
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private httpClient:HttpClient
  ) { }

  getPizzaMenu() {    
    return this.httpClient.get(this.menuUrl).pipe(
      tap(pizzas => {
        console.log('pizzas', pizzas)
        this.pizzas = pizzas; 
      })
    )
  }

  public getPizzaToCustomize(id:string) {
    let pizza = this.pizzas.find(pizza => pizza._id == id);
    let basePizza = this.pizzas.find(base => base.name == 'BASE')
    console.log('basePizza original', basePizza);
    let pizzaToCustomize = JSON.parse(JSON.stringify(pizza));
    let basePizzaToCustomize = JSON.parse(JSON.stringify(basePizza));
    

    return forkJoin([of(pizzaToCustomize), of(basePizzaToCustomize)]);
  }
  
  public getBasePizza() {
    let basePizza = this.pizzas.find(base => base.name == 'BASE')
    let basePizzaToCustomize = JSON.parse(JSON.stringify(basePizza));
    return of(basePizzaToCustomize);
  }
}
