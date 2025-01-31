import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomizeService } from './customize.service';
import { ActivatedRoute, Router, } from '@angular/router';
import { PizzaService } from '../pizza/pizza.service';
import { OrderService } from '../order/order.service';
import { DialogService } from '../shared/dialog/dialog.service';
import { Observable, of } from 'rxjs';
import { MessageService } from '../shared/message/message/message.service';

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
  private editId = '';
  private isDirty = false;
  private confirm = false;

  @ViewChild('confirmButton', { static: true })
  private confirmButton: any;

  constructor(
    private customizeService: CustomizeService,
    private activatedRoute: ActivatedRoute,
    private pizzaService: PizzaService,
    private orderService: OrderService,
    private router: Router,
    private dialogService: DialogService,
    private messageService:MessageService
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
    if (id) {
      this.pizzaService.getPizzaToCustomize(id).subscribe(pizzas => {
        this.pizza = pizzas[0];
        this.basePizza = pizzas[1];
        console.log('pizza', this.pizza);
        console.log('basePizza', this.basePizza);
        this.addStandardToppingsToBase(this.pizza.toppings);
      })
    } else {
      if (this.editId != 'edited') {
        this.edit();
      }
    }
  }

  private addStandardToppingsToBase(toppings) {
    for (let name of toppings) {
      let topping = this.toppings.find(topping => topping.name == name);
      let toppingType = topping.type.find(type => type.location == 'both');
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

    this.isDirty = true;

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
    this.isDirty = true;
  }

  private decreaseQuantity() {
    if (this.pizza.quantity > 1) {
      this.pizza.quantity -= 1;
      this.isDirty = true;
    }
  }

  private displaySelection(topping) {
    var amount;

    if (topping.double) {
      amount = 'double servings'
    } else {
      amount = 'single serving'
    }

    let location = `${topping.location} side`;

    if (topping.location == 'both') {
      location = `${location}s`
    }

    return `${topping.title},  ${amount}, ${location}`
  }

  private setLocation(topping) {
    if (topping.location == 'none') {
      topping.location = 'both'

      let type = topping.type.find(type => type.location == 'both');

      this.addXtraTopping(topping, type.img);
    }

    this.computePrice();
  }


  private addToOrder() {
    this.pizza.xtraToppings = this.xtraToppings
    let newPizza = JSON.parse(JSON.stringify(this.pizza));
    newPizza.customizer = '/customize'
    newPizza.itemCreatedAt = Date.now();
    console.log('newPizza', newPizza);
    this.orderService.addToOrder(newPizza).subscribe(obj => {
      this.messageService.sendInfo("Item added to your order.")
      this.initAfterAddToOrder();
    })
    
  }

  private initAfterAddToOrder() {
    this.isDirty = false;
    this.initPizza();
    this.xtraToppings = [];
    this.basePizza.xtraToppings = [];
  }

  private saveOrder() {
    this.addToOrder();
    // this.router.navigate(['/order'])
  }

  private edit() {
    this.orderService.getEditItem().subscribe(item => {
      console.log('item to edit', item);
      this.editId = 'edited';
      this.pizza = item;
      this.pizzaService.getBasePizza().subscribe(base => {
        this.basePizza = base;
        this.addStandardToppingsToBase(this.pizza.toppings);
        this.addExistingXtraToppingsToBase(item);
      })
    })
  }

  private addExistingXtraToppingsToBase(item) {
    for (let xTopping of item.xtraToppings) {
      this.xtraToppings.push(xTopping);
      let chosenTopping = this.toppings.find(topping => topping.name == xTopping.name);
      chosenTopping.location = xTopping.location;
      chosenTopping.double = xTopping.double;
      let type = xTopping.type.find(type => type.location == xTopping.location);
      this.basePizza.xtraToppings.push({ name: xTopping.name, img: type.img });
    }
  }

  private cancelOrder() {
    if (this.canDeactivate()) {
      if (this.editId == 'edited') {        
        this.router.navigate(['/order']);
      } else {
        this.initPizza();
        this.xtraToppings = [];
        this.basePizza.xtraToppings = [];
        this.isDirty = false;
      }
    }
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.isDirty) {

      let result = this.dialogService.confirm("You did not save your changes. Continue?");
      return result;
    }
    return true;
  }

  private discard(confirm) {
    return of(confirm);
  }
}

