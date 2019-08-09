import { Component, OnInit } from '@angular/core';
import { ListOrderService } from '../list-order/list-order.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-display-order',
  templateUrl: './display-order.component.html',
  styleUrls: ['./display-order.component.scss']
})
export class DisplayOrderComponent implements OnInit {
  private order;

  constructor(
    private listOrderService: ListOrderService,
    private activatedRoute: ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit() {
    this.getOrder();
  }

  private getOrder() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('id = ', id);

    this.listOrderService.getOrderById(id).subscribe(order => {
      this.order = order;
      console.log('display order', this.order)
    })
  }

  private setOrderStatus() {
    console.log('completed order', this.order);
    this.listOrderService.setOrderStatus(this.order._id, this.order.status).subscribe(() => {
      this.router.navigate(['/list-orders'])
    });    
  }

  private getToppingDetails(topping) {
    let details = topping.title + ", ";

    if (topping.double) {
      details = details + 'double'
    } else {
      details = details + 'single'
    }

    if (topping.location) {
      details = details + ', ' + topping.location + ' side';

      if (topping.location == 'both') {
        details = details + 's';
      }
    }

    return details;
  }

  private getLineItemTotal(item) {
    
    let total = (item.price + this.getToppingTotal(item)) * item.quantity;
    return total;
  }

  private getToppingTotal(item) {
    let toppingTotal = 0;
    for(let topping of item.toppings) {
      toppingTotal += topping.price;

      if(topping.double) {
        toppingTotal += topping.price;
      }
    }

    return toppingTotal;
  }

  private getSubtotal() {
    let subtotal = 0;

    for(let item of this.order.orderItems) {
      subtotal += this.getLineItemTotal(item);
    }

    return subtotal;
  }

  private getGST() {
    return .10 * this.getSubtotal();
  }

  private getPST() {
    return .10 * this.getSubtotal();
  }

  private getDiscount() {
    return .10 * this.getSubtotal();
  }

  private getTotal() {
    return (this.getSubtotal() + this.getGST() + this.getPST() + this.getDeliveryCharge() - this.getDiscount());
  }

  private getDeliveryCharge() {
    if (this.order.delivery.method == 'Delivery') {
      return .10 * this.getSubtotal();
    } else {
      return 0;
    }
  }
}
