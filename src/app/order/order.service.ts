import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { CustomizeService } from '../customize/customize.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public order = [];
  private basePizza;
  private editItem;

  constructor(
    private customizeService:CustomizeService,
    private router:Router
  ) { }

  public addToOrder(item) {
    console.log('add item', item)
    this.addUniqueId(item);
    this.order.push(item);
    console.log('order', this.order)
    return of();
  }

  public getOrder() {
    return of(this.order);
  }

  private addUniqueId(item) {
    item.uniqueId = Math.random();
  }

  public edit(item) {
    console.log('edit item', item)
    this.editItem = JSON.parse(JSON.stringify(item));
    let index = this.order.findIndex(item => item.uniqueId == this.editItem.uniqueId);
    if(index >= 0) {
      this.order.splice(index, 1);
      console.log('order after delete', this.order)
    }
    this.editItem.uniqueId = "";
    this.router.navigate([this.editItem.customizer]);
    return of();
  }

  public getEditItem() {
    return of(this.editItem);
  }
}
