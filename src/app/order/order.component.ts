import { Component, OnInit } from '@angular/core';
import { OrderService } from './order.service';
import { Delivery } from './delivery';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../shared/dialog/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  private order;
  private delivery: Delivery;
  private orderPlaced = false;

  constructor(
    private orderService: OrderService,
    public dialog: MatDialog
  ) {
    this.delivery = new Delivery();
  }

  ngOnInit() {
    this.getOrders();
    this.orderPlaced = false;
  }

  private getOrders() {
    this.orderService.getOrder().subscribe(order => {
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

    if (item.quantity > 1) {
      item.quantity -= 1;
      console.log('item', item)
    }
  }

  private getSubtotal() {
    let subtotal = 0;

    for (let item of this.order) {
      subtotal += this.getItemPrice(item);
    }

    return subtotal;
  }

  private getGST() {
    return this.getSubtotal() * .10;
  }

  private getPST() {
    return this.getSubtotal() * .10;
  }

  private getDeliveryCharge() {
    if (this.delivery.method == 'Delivery') {
      return this.getSubtotal() * .10;
    } else {
      return 0;
    }
  }

  private getDiscount() {
    return this.getSubtotal() * .10;
  }

  private getTotal() {
    return this.getSubtotal() + this.getGST() + this.getPST() + this.getDeliveryCharge() - this.getDiscount();
  }

  public getItemPrice(item) {
    let xtraToppingsPrice = 0;

    if (item.xtraToppings) {
      for (let topping of item.xtraToppings) {
        if (topping.double) {
          xtraToppingsPrice += topping.price * 2;
        } else {
          xtraToppingsPrice += topping.price;
        }
      }
    }

    let price = (item.price + xtraToppingsPrice) * item.quantity;

    return price;
  }

  private remove(uniqueId) {
    // this.openDialog();
    let itemIndex = this.order.findIndex(item => item.uniqueId == uniqueId);

    if (itemIndex >= 0) {
      this.order.splice(itemIndex, 1);
      console.log('item after delete', this.order)
    }
  }

  private edit(item) {
    this.orderService.edit(item).subscribe();
  }

  private getItemDescription(item) {
    var description = item.name;

    if (item.xtraToppings.length) {
      description = description + " w/ ";

      item.xtraToppings.forEach((topping, index) => {
        if (index == item.xtraToppings.length - 1) {
          description = description + " and " + topping.title;
        } else {
          description = description + topping.title + ", ";
        }
      });
    }

    return description;
  }

  private showDelivery() {
    console.log('delivery', this.delivery)
  }

  private placeOrder() {
    this.order.delivery = this.delivery;
    this.orderService.placeOrder(this.order).subscribe(() => {
      this.orderPlaced = true;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Delete this item?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Yes clicked');
        // DO SOMETHING
      }
    });
  }
}
