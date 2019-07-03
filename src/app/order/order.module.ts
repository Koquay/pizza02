import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { SharedModule } from '../shared/modules/shared/shared.module';

@NgModule({
  declarations: [OrderComponent],
  imports: [
    CommonModule,
    FormsModule,
    OrderRoutingModule,
    SharedModule
  ]
})
export class OrderModule { }
