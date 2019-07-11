import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../order/order.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router:Router,
    private orderService:OrderService
  ) { }

  ngOnInit() {
  }
}
