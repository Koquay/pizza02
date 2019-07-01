import { Component, OnInit } from '@angular/core';
import { OrderService } from './order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  private order;

  constructor(
    private orderServiice:OrderService
  ) { }

  ngOnInit() {
    this.getOrders();
  }

  private getOrders() {
    this.orderServiice.getOrder().subscribe(order => {
      this.order = order;
      console.log('order', this.order)
    })
  }

  private increaseQuantity(item) {
    console.log('item quantity', item.quantity)
    item.quantity += 1;
    console.log('item', item)
  }

  private decreaseQuantity(item) {
    console.log('item quantity', item.quantity)

    if(item.quantity > 1)
    {
      item.quantity -= 1;
      console.log('item', item)
    }
  }

  private getSubtotal() {
    let subtotal = 0;

    for(let item of this.order) {
      subtotal += item.price * item.quantity;
    }

    return subtotal;
  }

  private getGstHst() {
    return this.getSubtotal() * .10;
  }

  private getDeliveryCharge() {
    return 5.00;
  }

  private getDiscount() {
    return this.getSubtotal() * .05;
  }

  private getTotal() {
    return this.getSubtotal() + this.getGstHst() + this.getDeliveryCharge() - this.getDiscount();
  }


}
