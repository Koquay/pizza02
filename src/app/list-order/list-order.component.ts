import { Component, OnInit } from '@angular/core';
import { ListOrderService } from './list-order.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss']
})
export class ListOrderComponent implements OnInit {
  private orders;
  private pendingOrders;
  private completedOrders;
  
  constructor(
    private listOrderService:ListOrderService
  ) { }

  ngOnInit() {
    this.getOrdersOnInterval();
  }

  private getOrdersOnInterval() {
    this.getOrders();

    let orderInterval = interval(60000); //1000 = 1 seconds

    // orderInterval.subscribe(() => {
    //   console.log('****** INTERVAL *********', new Date().getMinutes());
    //   this.getOrders();
    // })
    
  }

  private getOrders() {
    this.listOrderService.getOrders().subscribe(orders => {
      this.orders = orders;
      this.pendingOrders = this.orders.filter(order => order.status != "Completed" && order.status != "Cancelled" );
      this.completedOrders = this.orders.filter(order => order.status == "Completed" || order.status == "Cancelled");
      console.log('pendingOrders', this.pendingOrders)
    })
  }
}
