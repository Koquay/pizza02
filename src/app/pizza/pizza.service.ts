import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';
import { MessageService } from '../shared/message/message/message.service';



@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  private menuUrl = '/api/menu?menuItem=pizza';
  private pizzas;

  constructor(
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private httpClient:HttpClient,
    private messageService:MessageService
  ) { }

  getPizzaMenu() {    
    return this.httpClient.get(this.menuUrl).pipe(
      tap(pizzas => {
        console.log('pizzas', pizzas)
        this.pizzas = pizzas; 
      }),
      catchError(error => {        
        this.messageService.sendErrorMessage(error);
        throw error;
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


