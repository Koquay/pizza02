import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../order/order.service';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.scss']
})
export class ViewCartComponent implements OnInit {

  constructor(
    private orderService:OrderService
  ) { }

  ngOnInit() {
  }

}
