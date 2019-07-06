import { Component, OnInit } from '@angular/core';
import { ChickenService } from './chicken.service';
import { OrderService } from '../order/order.service';

@Component({
  selector: 'app-chicken',
  templateUrl: './chicken.component.html',
  styleUrls: ['./chicken.component.scss']
})
export class ChickenComponent implements OnInit {
  private chicken;

  constructor(
    private chickenService:ChickenService,
    private orderService:OrderService
  ) { }

  ngOnInit() {
    this.getChicken();
  }

  private getChicken() {
    this.chickenService.getChicken().subscribe(chicken => {
      console.log('chicken', chicken)
      this.chicken = chicken;
    })
  }

  private increaseQuantity(chicken) {
    console.log('chicken quantity', chicken.quantity)
    chicken.quantity += 1;
    console.log('chicken', chicken)
    console.log('chicken', this.chicken)
  }

  private decreaseQuantity(chicken) {
    console.log('chicken quantity', chicken.quantity)

    if(chicken.quantity > 1)
    {
      chicken.quantity -= 1;
      console.log('chicken', chicken)
      console.log('chicken', this.chicken)
    }
    
  }

  private addToOrder(chick) {
    console.log('add item', chick)
    let chickToAdd = JSON.parse(JSON.stringify(chick))
    this.orderService.addToOrder(chickToAdd).subscribe()
}

}
