import { Component, OnInit } from '@angular/core';
import { ChickenCustomizerService } from './chicken-customizer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChickenService } from '../chicken/chicken.service';
import { OrderService } from '../order/order.service';

@Component({
  selector: 'app-chicken-customizer',
  templateUrl: './chicken-customizer.component.html',
  styleUrls: ['./chicken-customizer.component.scss']
})
export class ChickenCustomizerComponent implements OnInit {
  private sauces;
  private xtraToppings = [];
  private chicken;
  private editId = '';

  constructor(
    private chickenCustomizerService: ChickenCustomizerService,
    private chickenService: ChickenService,
    private activatedRoute: ActivatedRoute,
    private orderService:OrderService,
    private router:Router
  ) { }

  ngOnInit() {
    this.getSauces();
    this.getChicken();
  }

  private getSauces() {
    this.chickenCustomizerService.getSauces().subscribe(sauces => {
      console.log('sauces', sauces);
      this.sauces = sauces;
    })
  }

  private addSauce(sauce) {
    console.log('sauce', sauce)
    let index = this.xtraToppings.findIndex(xTopping => xTopping.name == sauce.name);

    if (index >= 0) {
      this.xtraToppings.splice(index, 1);
    }

    if(sauce.amount == 'heavy') {
      sauce.double = true;
    } else {
      sauce.double = false;
    }

    if (sauce.amount !== 'none') {
      this.xtraToppings.push(sauce);
    }    

    console.log('xtraToppings', this.xtraToppings)
  }

  private getChicken() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('id', id);

    if(id) {
      this.chicken = this.chickenService.getChickenById(id);
    } else {
      if(this.editId != 'edited') {
        this.edit();
      }      
    } 
    
    console.log('chicken', this.chicken)
  }

  private computePrice() {
    var saucePrice = 0;

    for (let sauce of this.xtraToppings) {
      let tmpPrice = sauce.price;
      if (sauce.amount == 'heavy') {
        tmpPrice *= 2;
      }
      saucePrice += tmpPrice;
    }

    let price = this.chicken.quantity * (this.chicken.price + saucePrice)
    return price;
  }

  private increaseQuantity() {
    this.chicken.quantity += 1;
  }

  private decreaseQuantity() {
    if (this.chicken.quantity > 1) {
      this.chicken.quantity -= 1;
    }
  }

  private addToOrder() {
    let newChicken = JSON.parse(JSON.stringify(this.chicken));
    newChicken.xtraToppings = JSON.parse(JSON.stringify(this.xtraToppings));
    console.log('newChicken', newChicken);    
    newChicken.customizer = '/chicken-customizer';
    this.orderService.addToOrder(newChicken).subscribe();
    this.cancelOrder();
  }

  private edit() {
    this.orderService.getEditItem().subscribe(item => {
      console.log('item to edit', item);
      this.editId ='edited';
      this.chicken = item;
      this.xtraToppings = item.xtraToppings;
      this.setSauceAmounts();
    })
  }

  private cancelOrder() {
    this.xtraToppings = [];    
    this.chicken.quantity = 1;
    this.chicken.amount = 'none';
    this.getSauces();
  }


  private setSauceAmounts() {
    this.chickenCustomizerService.getSauces().subscribe(sauces => {
      console.log('sauces', sauces);
      this.sauces = sauces;

      for(let topping of this.xtraToppings) {
        let sauce = this.sauces.find(sauce => sauce.name == topping.name);
        sauce.amount = topping.amount;
      }
    })    
  }

  private saveOrder() {
    this.addToOrder();
    this.router.navigate(['/order'])
    
  }
}
