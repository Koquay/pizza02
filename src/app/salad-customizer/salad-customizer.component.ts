import { Component, OnInit } from '@angular/core';
import { SaladCustomizerService } from './salad-customizer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SaladsService } from '../salads/salads.service';
import { OrderService } from '../order/order.service';

@Component({
  selector: 'app-salad-customizer',
  templateUrl: './salad-customizer.component.html',
  styleUrls: ['./salad-customizer.component.scss']
})
export class SaladCustomizerComponent implements OnInit {
  private toppings;
  private salad;
  private xtraToppings = [];
  private editId;

  constructor(
    private saladCustomizerService:SaladCustomizerService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private saladsService:SaladsService,
    private orderService:OrderService
  ) { }

  ngOnInit() {
    this.getToppings();
    this.getSalad();
  }

  private getToppings() {
    this.saladCustomizerService.getToppings().subscribe(toppings => {
      this.toppings = toppings;
    })
  }

  private getSalad() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if(id) {
      this.saladsService.getSaladById(id).subscribe(salad => {
        this.salad = salad;
      })
    } else {
      if(this.editId != 'edited') {
        this.edit();
      }      
    } 
  }

  private computePrice() {
    var toppingPrice = 0;

    for (let topping of this.xtraToppings) {
      let tmpPrice = topping.price;
      if (topping.amount == 'double') {
        tmpPrice *= 2;
      }
      toppingPrice += tmpPrice;
    }

    let price = this.salad.quantity * (this.salad.price + toppingPrice)
    return price;
  }

  private addTopping(topping) {
    console.log('topping', topping)
    let index = this.xtraToppings.findIndex(xTopping => xTopping.name == topping.name);

    if (index >= 0) {
      this.xtraToppings.splice(index, 1);
    }

    if(topping.amount == 'double') {
      topping.double = true;
    } else {
      topping.double = false;
    }

    if (topping.amount !== 'none') {
      this.xtraToppings.push(topping);
    }    

    console.log('xtraToppings', this.xtraToppings)
  }

  private increaseQuantity() {
    this.salad.quantity += 1;
  }

  private decreaseQuantity() {
    if (this.salad.quantity > 1) {
      this.salad.quantity -= 1;
    }
  }

  private addToOrder() {
    let newSalad = JSON.parse(JSON.stringify(this.salad));
    newSalad.xtraToppings = JSON.parse(JSON.stringify(this.xtraToppings));
    console.log('newSalad', newSalad);    
    newSalad.customizer = '/salad-customizer';
    this.orderService.addToOrder(newSalad).subscribe();
    this.cancelOrder();
  }

  private cancelOrder() {
    this.xtraToppings = [];    
    this.salad.quantity = 1;
    this.salad.amount = 'none';
    this.getToppings();
  }

  private edit() {
    this.orderService.getEditItem().subscribe(item => {
      console.log('item to edit', item);
      this.editId ='edited';
      this.salad = item;
      this.xtraToppings = item.xtraToppings;
      this.setToppingAmounts();
    })
  }

  private setToppingAmounts() {
    this.saladCustomizerService.getToppings().subscribe(toppings => {
      console.log('toppings', toppings);
      this.toppings = toppings;

      for(let topping of this.xtraToppings) {
        let xTopping = this.toppings.find(tp => tp.name == topping.name);
        xTopping.amount = topping.amount;
      }
    })    
  }

  private saveOrder() {
    this.addToOrder();
    this.router.navigate(['/order'])
    
  }

  private displaySelection(topping) {
    var amount;

      if(topping.double) {
        amount = 'double'
      } else {
        amount = 'single'        
      }
      return `${topping.title},  ${amount}`
  }

}
