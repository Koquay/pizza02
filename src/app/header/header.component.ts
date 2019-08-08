import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../order/order.service';
import { User } from '../shared/models/data-models';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private user: User;

  constructor(
    private router: Router,
    private orderService: OrderService,
    private userService:UserService
  ) {
    this.user = new User();
  }

  ngOnInit() {
  }

  private logIn() {
    console.log('user', this.user)
    this.userService.login(this.user).subscribe(user => {
      this.router.navigate(['/list-orders'])
    });    
  }
}
