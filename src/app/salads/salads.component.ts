import { Component, OnInit } from '@angular/core';
import { SaladsService } from './salads.service';
import { OrderService } from '../order/order.service';

@Component({
  selector: 'app-salads',
  templateUrl: './salads.component.html',
  styleUrls: ['./salads.component.scss']
})
export class SaladsComponent implements OnInit {
  private salads;

  constructor(
    private saladsService:SaladsService,
    private orderService:OrderService
  ) { }

  ngOnInit() {
    this.getSalads();
  }

  private getSalads() {
    this.saladsService.getSalads().subscribe(salads => {
      this.salads = salads;
    })
  }

  private increaseQuantity(salad) {
    console.log('salad quantity', salad.quantity)
    salad.quantity += 1;
    console.log('salad', salad)
    console.log('salad', this.salads)
  }

  private decreaseQuantity(salad) {
    console.log('salad quantity', salad.quantity)

    if(salad.quantity > 1)
    {
      salad.quantity -= 1;
      console.log('salad', salad)
      console.log('salad', this.salads)
    }
    
  }

  private addToOrder(salad) {
    console.log('add item', salad)
    let saladToAdd = JSON.parse(JSON.stringify(salad))
    this.orderService.addToOrder(saladToAdd).subscribe()
}

}
