import { Component, OnInit } from '@angular/core';
import { CustomizeService } from './customize.service';
import { ActivatedRoute, } from '@angular/router';
import { PizzaService } from '../pizza/pizza.service';
import { OrderService } from '../order/order.service';

@Component({
  selector: 'app-customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.scss']
})
export class CustomizeComponent implements OnInit {
  private toppings;
  private pizza;
  private basePizza;
  private xtraToppings = [];

  constructor(
    private customizeService: CustomizeService,
    private activatedRoute: ActivatedRoute,
    private pizzaService: PizzaService,
    private orderService:OrderService
  ) { }

  ngOnInit() {
    this.initPizza();
  }

  private initPizza() {
    this.customizeService.getToppings().subscribe(toppings => {
      this.toppings = toppings;
      this.getPizzaToCustomize();
    })
  }

  private getPizzaToCustomize() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('id', id);
    this.pizzaService.getPizzaToCustomize(id).subscribe(pizzas => {
      this.pizza = pizzas[0];
      this.basePizza = pizzas[1];
      console.log('pizza', this.pizza);
      console.log('basePizza', this.basePizza);
      this.addStandardToppingsToBase(this.pizza.toppings);
    })
  }

  private addStandardToppingsToBase(toppings) {
    for (let name of toppings) {
      let topping = this.toppings.find(topping => topping.name == name);
      console.log('topping.name ', topping)
      let toppingType = topping.type.find(type => type.location == 'both');
      console.log('toppingType', toppingType)
      this.basePizza.toppings.push(toppingType.img);
      console.log('basePizza after toppings', this.basePizza)
    }
  }

  private addXtraTopping(topping, img) {
    let oldTopping = this.xtraToppings.findIndex(oldTopping => oldTopping.name == topping.name);

    if (oldTopping >= 0) {
      this.xtraToppings.splice(oldTopping, 1);
    }

    let oldImg = this.basePizza.xtraToppings.findIndex(oldTopping => oldTopping.name == topping.name);

    if (oldImg >= 0) {
      this.basePizza.xtraToppings.splice(oldImg, 1);
    }

    if (topping.location !== 'none') {
      this.xtraToppings.push(topping);
      this.basePizza.xtraToppings.push({ name: topping.name, img: img });
    } else {
      topping.double = false;
    }

    console.log('xtraToppings', this.xtraToppings)
  }

  private computePrice() {
    let xtraToppingsPrice = 0;

    for (let topping of this.xtraToppings) {
      if (topping.double) {
        xtraToppingsPrice += topping.price * 2;
      } else {
        xtraToppingsPrice += topping.price;
      }
    }

    let price = (this.pizza.price + xtraToppingsPrice) * this.pizza.quantity;

    return price;
  }

  private increaseQuantity() {
    this.pizza.quantity += 1;
  }

  private decreaseQuantity() {
    if (this.pizza.quantity > 1) {
      this.pizza.quantity -= 1;
    }
  }

  private displaySelection(topping) {
    var amount;

      if(topping.double) {
        amount = 'double servings'
      } else {
        amount = 'single serving'        
      }

      let location = `${topping.location} side`;

      if(topping.location == 'both') {
        location = `${location}s`
      }

      return `${topping.title},  ${amount}, ${location}`
  }

  private setLocation(topping) {
    if(topping.location == 'none')
    {
      topping.location = 'both'

      let type = topping.type.find(type => type.location == 'both');
    
      this.addXtraTopping(topping, type.img);
    }      

    this.computePrice();
  }

  private cancelOrder() {
    this.initPizza();
    this.xtraToppings = [];
  }

  private addToOrder() {
    console.log('basePiza', this.basePizza);
    console.log('pizza', this.pizza);    
    console.log('xtraToppigs', this.xtraToppings)
    let newPizza = JSON.parse(JSON.stringify(this.pizza));
    let newXtraToppings = JSON.parse(JSON.stringify(this.xtraToppings));
    newPizza.xtraToppings = newXtraToppings;
    console.log('newPizza', newPizza);    
    this.orderService.addCustomizedPizza(newPizza).subscribe();
    this.cancelOrder();
  }
}
