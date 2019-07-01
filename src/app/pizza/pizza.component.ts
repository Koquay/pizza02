import { Component, OnInit } from '@angular/core';
import { PizzaService } from './pizza.service';
import { OrderService } from '../order/order.service';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.scss']
})
export class PizzaComponent implements OnInit {
  private pizzas;

  constructor(
    private pizzaService:PizzaService,
    private orderService:OrderService
  ) { }

  ngOnInit() {
    this.getPizzaMenu();
  }

  private getPizzaMenu() {
    this.pizzaService.getPizzaMenu().subscribe(pizzas => {
      this.pizzas = pizzas;
      console.log('pizzas', this.pizzas)
    });
  }

  private addToOrder(pizza) {
      console.log('add item', pizza)
      let pizzToAdd = JSON.parse(JSON.stringify(pizza))
      this.orderService.addToOrder(pizzToAdd).subscribe()
  }

  private increaseQuantity(pizza) {
    console.log('pizza quantity', pizza.quantity)
    pizza.quantity += 1;
    console.log('pizza', pizza)
    console.log('pizza', this.pizzas)
  }

  private decreaseQuantity(pizza) {
    console.log('pizza quantity', pizza.quantity)

    if(pizza.quantity > 1)
    {
      pizza.quantity -= 1;
      console.log('pizza', pizza)
      console.log('pizza', this.pizzas)
    }
    
  }

}
