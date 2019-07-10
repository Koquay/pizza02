import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCustomizerService } from './product-customizer.service';
import { ProductService } from '../product/product.service';
import { OrderService } from '../order/order.service';

@Component({
  selector: 'app-product-customizer',
  templateUrl: './product-customizer.component.html',
  styleUrls: ['./product-customizer.component.scss']
})
export class ProductCustomizerComponent implements OnInit {
  private toppings;
  private product;
  private xtraToppings = [];
  private editId;

  constructor(
    private activatedRoute:ActivatedRoute,
    private productCustomizerservice:ProductCustomizerService,
    private productService:ProductService,
    private orderService:OrderService,
    private router:Router
  ) { }

  ngOnInit() {
    this.getToppings();
    this.getProduct();
  }

  private getToppings() {    
    let productType = this.activatedRoute.snapshot.paramMap.get('productType');
    console.log('productType', productType)
    this.productCustomizerservice.getToppings(productType).subscribe(toppings => {
      this.toppings = toppings;
    })
  }

  private async getProduct() {
    let productId = this.activatedRoute.snapshot.paramMap.get('productId');
    console.log('productId', productId)

    if(productId) {
      this.productService.getProduct(productId).subscribe(product => {
        this.product = product;
      })
    }else {
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

    let price = this.product.quantity * (this.product.price + toppingPrice)
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
    this.product.quantity += 1;
  }

  private decreaseQuantity() {
    if (this.product.quantity > 1) {
      this.product.quantity -= 1;
    }
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

  private addToOrder() {
    let newProduct = JSON.parse(JSON.stringify(this.product));
    newProduct.xtraToppings = JSON.parse(JSON.stringify(this.xtraToppings));        
    newProduct.customizer = '/product-customizer';
    newProduct.itemCreatedAt = Date.now();
    console.log('Product to add ', newProduct);
    this.orderService.addToOrder(newProduct).subscribe();
    this.cancelOrder();
  }

  private cancelOrder() {
    this.xtraToppings = [];    
    this.product.quantity = 1;
    this.product.amount = 'none';
    this.getToppings();
  }

  private edit() {
    this.orderService.getEditItem().subscribe(item => {
      console.log('item to edit', item);
      this.editId ='edited';
      this.product = item;
      this.xtraToppings = item.xtraToppings;
      this.setToppingAmounts();
    })
  }

  private setToppingAmounts() {
    this.productCustomizerservice.getToppings(this.product.item).subscribe(toppings => {
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
}
