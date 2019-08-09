import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { ActivatedRoute, Route, Router, NavigationEnd } from '@angular/router';
import { OrderService } from '../order/order.service';
import { MessageService } from '../shared/message/message/message.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  private productType;
  private products;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private router: Router,
    private messageService:MessageService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    } 

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });
  }

  ngOnInit() {
    this.getProductByType();
  }

  private getProductByType() {
    this.productType = this.activatedRoute.snapshot.paramMap.get('productType');
    console.log('productType', this.productType);

    this.productService.getProductByType(this.productType).subscribe(products => {
      this.products = products;
    })
  }

  private increaseQuantity(product) {
    console.log('product quantity', product.quantity)
    product.quantity += 1;
    console.log('product', product)
    console.log('product', this.products)
  }

  private decreaseQuantity(product) {
    console.log('product quantity', product.quantity)

    if (product.quantity > 1) {
      product.quantity -= 1;
      console.log('product', product)
      console.log('product', this.products)
    }

  }

  private addToOrder(product) {
    console.log('add item', product)
    let productToAdd = JSON.parse(JSON.stringify(product))
    if(productToAdd.customizable) {
      productToAdd.customizer = '/product-customizer';
    } else {
      productToAdd.customizer = '/product/' + productToAdd.item;
    }  

    productToAdd.itemCreatedAt = Date.now();
    productToAdd.xtraToppings = [];
    this.orderService.addToOrder(productToAdd).subscribe(order => {
      this.messageService.sendInfo("Item added to your order.")
    })
  }

}
